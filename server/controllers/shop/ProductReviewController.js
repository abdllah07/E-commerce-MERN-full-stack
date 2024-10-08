const Product = require("../../models/Product");
const Review = require("../../models/Review");



const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } =
            req.body;
    

    
        const checkExistingReview = await Review.findOne({
            productId,
            userId,
        });
    
        if (checkExistingReview) {
            return res.status(400).json({
            success: false,
            message: "You already reviewed this product!",
            });
        }
    
        const newReview = new Review({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });
    
        await newReview.save();
    
        const reviews = await Review.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview =
            reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            totalReviewsLength;
    
        await Product.findByIdAndUpdate(productId, { averageReview });
    
        res.status(201).json({
            success: true,
            data: newReview,
        });
        } catch (e) {
        console.log(e);
            res.status(500).json({
                success: false,
                message: "Error",
            });
        }
};

const getProductReviews = async(req , res) => {
    try {

        const {productId} = req.params; 

        const reviews = await Review.find({productId});

        if(!reviews) {
            return res.status(404).json({ success: false, message: "No reviews found for this product" });
        }

        res.status(200).json({ success: true, data: reviews});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}

module.exports = {addProductReview , getProductReviews}