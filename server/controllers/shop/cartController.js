

const Cart = require('../../models/Cart')
const Product = require('../../models/Product')

const addToCart = async(req , res) => {
    try {
        // Destructure userId, productId, and quantity from the request body
        const { userId, productId, quantity } = req.body;

        // Validate if all required fields are provided and the quantity is a positive number
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        // Find the product by its productId in the database
        const product = await Product.findById(productId);
        // If product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find the user's cart by their userId
        let cart = await Cart.findOne({userId });

        // If the cart doesn't exist, create a new cart for the user
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Find the index of the product in the user's cart (if it exists)
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() == productId);

        // If the product is not in the cart, add it with the given quantity
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            // If the product is already in the cart, update its quantity
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        // Save the updated cart to the database
        await cart.save();

        res.status(200).json({ success: true, message: "Product added to cart successfully", data: cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}

const fetchCartItems = async(req, res) => {
    try {
        const { userId } = req.params;

        // Validate if userId is provided
        if (!userId) {
            return res.status(404).json({ success: false, message: "User ID is mandatory!" });
        }

        // Fetch the user's cart and populate the product details for each item
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',  // 'items' instead of 'item'
            select: 'title price image salePrice',  // Select only the relevant fields
        });

        // If no cart is found, return a 404 error
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found for this user" });
        }

        // Filter out any items where the productId is missing (invalid items)
        const validItems = cart.items.filter(productItem => productItem.productId);

        // If any invalid items were found and removed, update the cart
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();  // Save the updated cart
        }

        // Map over validItems to create a custom response with product details
        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id ,
            image: item.productId.image ,
            title: item.productId.title ,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity ,
        }));

        res.status(200).json({ 
            success: true, 
            message: "Cart items fetched successfully", 
            data: { ...cart._doc, items: populateCartItems }  // Spread original cart properties and replace items
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}

const updateCartItemQty = async(req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found for this user" });
        }

        // Find the index of the product in the cart
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        // If the product is not in the cart, return a 404 error
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in the cart" });
        }

        // Update the quantity of the product in the cart
        cart.items[findCurrentProductIndex].quantity = quantity;
        
        // Save the updated cart to the database
        await cart.save();

        // Populate product details for each cart item
        await cart.populate({
            path: 'items.productId',  // Populate the product details from Product model
            select: 'title price image salePrice',  // Select only the necessary fields
        });

        // Map over the cart items and return the populated product details
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,  // Ensure productId exists
            image: item.productId ? item.productId.image : null,  // Ensure image exists
            title: item.productId ? item.productId.title : 'Product not found',  // Provide fallback title
            price: item.productId ? item.productId.price : null,  // Ensure price exists
            salePrice: item.productId ? item.productId.salePrice : null,  // Ensure salePrice exists
            quantity: item.quantity,  // Return the updated quantity
        }));

        res.status(200).json({ 
            success: true, 
            message: "Cart items updated successfully", 
            data: { ...cart._doc, items: populateCartItems }  // Spread original cart and replace items with populated data
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.log(error);
        // Send a 500 internal server error if something goes wrong
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
};

const deleteCartItem = async(req , res) => {
    try {
        const {userId , productId} = req.params;
        
        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const cart = await Cart.findOne({userId }).populate({
            path: 'items.productId',  // Populate the product details from Product model
            select: 'title price image salePrice',  // Select only the necessary fields
        });
        
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found for this user" });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId) 

        await cart.save();

        await cart.populate({
            path: 'items.productId',  // Populate the product details from Product model
            select: 'title price image salePrice',  // Select only the necessary fields
        });

         // Map over the cart items and return the populated product details
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,  // Ensure productId exists
            image: item.productId ? item.productId.image : null,  // Ensure image exists
            title: item.productId ? item.productId.title : 'Product not found',  // Provide fallback title
            price: item.productId ? item.productId.price : null,  // Ensure price exists
            salePrice: item.productId ? item.productId.salePrice : null,  // Ensure salePrice exists
            quantity: item.quantity,  // Return the updated quantity
        }));

        res.status(200).json({ 
            success: true, 
            message: "Cart items deleted successfully", 
            data: { ...cart._doc, items: populateCartItems }  // Spread original cart and replace items with populated data
        });




    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem,
}