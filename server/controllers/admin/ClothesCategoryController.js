const { imageUploadUtil } = require("../../helpers/cloudinary");
const ClothesCategories = require("../../models/ClothesCategories");


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



const addCategory = async (req , res ) => { 
    try {

        const {title , image } = req.body;
        if(!title ||!image ) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const newCategory = new ClothesCategories({
            title ,image  
        })

        await newCategory.save();
        res.status(200).json({ success: true, message: "Category created successfully", data: newCategory });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
} 


const fetchAllCategory = async (req  , res ) => {
    try {

        const listCategories = await ClothesCategories.find({});
        res.status(200).json({ success: true, message: "Category fetched successfully", data: listCategories });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


const editCategory = async (req , res ) => {
    try {

        const {id} = req.params;

        const {title , image} = req.body;

        const findCategory = await ClothesCategories.findById(id);

        if(!findCategory) return res.status(401).json({ success :  false , message : 'Category not found'});

        findCategory.title = title || findCategory.title;
        findCategory.image = image || findCategory.image;

        await findCategory.save();
        res.status(200).json({ success: true, message: "Category updated successfully", data: findCategory });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


const deleteCategory = async (req , res ) => {
    try {

        const {id} = req.params;
        const findCategory = await ClothesCategories.findByIdAndDelete(id);
        if(!findCategory) return res.status(401).json({ success :  false , message : 'Category not found'});
        if(findCategory) return res.status(200).json({ success : true, message : "Category deleted successfully" }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}


module.exports = {handleImageUpload , fetchAllCategory , addCategory , editCategory , deleteCategory};