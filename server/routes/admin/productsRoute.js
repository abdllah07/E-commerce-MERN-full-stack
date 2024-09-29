
// admin 
const express = require('express');



const {handleImageUpload , addProduct , editProduct , deleteProduct , fetchAllProduct} = require('../../controllers/admin/productsController');



const {upload} = require('../../helpers/cloudinary')

const router = express.Router();


router.post('/upload-image' , upload.single('my_file') , handleImageUpload);

router.get('/get' , fetchAllProduct)
router.post('/add' , addProduct)
router.put('/edit/:id' , editProduct)
router.delete('/delete/:id' , deleteProduct)

module.exports = router;