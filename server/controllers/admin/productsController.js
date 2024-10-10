const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req , res ) => {
    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+req.file.mimetype +";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success : true,
            result
        })
        
    } catch (error) {
        console.log(error);
        res.json({success : false , message : 'error catch' });
        
    }
}



// add new product 
const addProduct = async (req , res) => {
    try {

        const {image , title , description , category , brand , price  , salePrice , totalStock , isBestSelling ,isAdvantageous} = req.body ; 


        console.log( isBestSelling ,isAdvantageous)

        const newlyCreatedProduct = new Product({
            image , title , description , category , brand , price  , salePrice , totalStock , isBestSelling ,isAdvantageous
        })

        await newlyCreatedProduct.save();
        res.status(200).json({ success: true, message: "Product created successfully", data: newlyCreatedProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


// fetch all products 

const fetchAllProduct = async (req , res) => {
    try {   

        const listOfProduct = await Product.find({});
        res.status(200).json({ success: true, message: "Product fetched successfully", data: listOfProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}

// edit a product 
const editProduct = async (req , res) => {
    try {

        const {id} = req.params ; 

        const {image , title , description , category , brand , price  , salePrice , totalStock , isBestSelling ,isAdvantageous} = req.body ;

        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(401).json({success :  false , message : 'Product not found'});

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price == "" ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice == "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.isBestSelling = isBestSelling || findProduct.isBestSelling;
        findProduct.isAdvantageous = isAdvantageous || findProduct.isAdvantageous;

        await findProduct.save();
        res.status(200).json({ success: true, message: "Product updated successfully", data: findProduct });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}



// delete a products 
const deleteProduct = async (req , res) => {


    try {
        const {id} = req.params ; 
        const findProduct = await Product.findByIdAndDelete(id);
        if(!findProduct) return res.status(401).json({success :  false , message : 'Product not found'});
        if(findProduct) return res.status(200).json({success : true , message : 'Product deleted successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


module.exports = {handleImageUpload , addProduct , fetchAllProduct , editProduct , deleteProduct};