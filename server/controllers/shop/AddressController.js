const Address = require("../../models/Address");



const addAddress = async(req , res) => {
    try {

        const {userId, address , city  , pincode , phone , notes } = req.body;

        if(!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const newAddress =  new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        }) 

            await newAddress.save();
            res.status(200).json({ success: true, message: "Address added successfully", data: newAddress });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}
const fetchAllAddress = async(req , res) => {
    try {

        const {userId} = req.params;

        if(!userId) {
            return res.status(400).json({ success: false, message: "User Id is Required" });
        }

        const addressList = await Address.find({ userId });

        if(!addressList) {
            return res.status(404).json({ success: false, message: "Address not found" });  
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Address fetched successfully", 
            data: addressList  
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}
const editAddress = async(req , res) => {
    try {

        const {userId , addressId} = req.params;
        const formData  = req.body;
        if(!userId || !addressId ) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const SelectedAddress = await Address.findOneAndUpdate({
            _id : addressId,
            userId,
        } , formData , {new : true});

        if (!SelectedAddress) {
            return res.status(404).json({ success: false, message: "Address not found for this user" });
        }
        
        res.status(200).json({ success: true, message: "Address updated successfully", data: SelectedAddress });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}
const deleteAddress = async(req , res) => {
    try {

        const {userId , addressId}  = req.params ;
        if(!userId || !addressId) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const deletedAddress = await Address.findByIdAndDelete({
            _id : addressId,
            userId
        });

        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: "Address not found for this user" });
        }

        return res.status(200).json({ success: true, message: "Address deleted successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
}

module.exports = {addAddress , editAddress, deleteAddress , fetchAllAddress}