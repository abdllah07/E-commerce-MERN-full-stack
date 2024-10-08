// shop

const express = require('express');


const { addAddress , editAddress , deleteAddress , fetchAllAddress} = require('../../controllers/shop/AddressController');

const router = express.Router();


router.post('/add' , addAddress)
router.get('/get/:userId' , fetchAllAddress)
router.put('/update-Address/:userId/:addressId' , editAddress)
router.delete('/:userId/:addressId' , deleteAddress)


module.exports = router;