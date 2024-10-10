
// admin 
const express = require('express');



const {handleImageUpload ,addCategory , fetchAllCategory , deleteCategory , editCategory} = require('../../controllers/admin/ClothesCategoryController');



const {upload} = require('../../helpers/cloudinary')

const router = express.Router();


router.post('/upload-image' , upload.single('my_file') , handleImageUpload);

router.get('/get' , fetchAllCategory)
router.post('/add' , addCategory)
router.put('/edit/:id' , editCategory)
router.delete('/delete/:id' , deleteCategory)

module.exports = router;