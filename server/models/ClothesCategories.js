
const mongoose = require('mongoose');


const ClothesCategoriesSchema = new mongoose.Schema({
    title : String,
    image : String,

} , {timestamps : true});



module.exports = mongoose.model('ClothesCategories', ClothesCategoriesSchema)