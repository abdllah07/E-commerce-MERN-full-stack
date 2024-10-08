const Features = require("../../models/Features");



const addFeatureImage = async (req , res) => {
    try {

        const {image} = req.body;
        
        if(!image) return res.status(400).json({ success: false, message: "Invalid data provided" });

        const featureImages = new Features({
            image :  image,
        })

        await featureImages.save();

        res.status(201).json({ success: true, data: featureImages});

        
    } catch (error) {
        console.log(error);
        return res.status(200).json({success: false , message : 'some error record'} );
    }
}

const getFeatureImages = async (req , res) => {
    try {

        const images  = await Features.find({})
        res.status(201).json({ success: true, data: images});

    } catch (error) {
        console.log(error);
        return res.status(200).json({success: false , message : 'some error record'} );
    }
}

module.exports = {addFeatureImage , getFeatureImages}