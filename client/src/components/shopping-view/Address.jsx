import { useEffect, useState } from "react"
import Form from "../common/Form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";


const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode : '',
    notes : ''
} 
function Address() {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditId, setCurrentEditId] = useState(null)
    const dispatch = useDispatch();
    const {toast} = useToast();
    const {user} = useSelector(state => state.auth);
    const {AddressList} = useSelector(state => state.shopAddress);


    function handleManageAddress(event) {
        event.preventDefault();

        if(AddressList.length >= 3  && currentEditId === null){
            setFormData(initialAddressFormData)
            toast({
                title : "You Can Add max 3 addresses",
                variant :'destructive'
            });
            return;
        }

        currentEditId !==null ? dispatch(editAddress({userId : user?.id  ,addressId : currentEditId , formData : formData  })).then(data => {
            if(data?.payload?.success) {
                dispatch(fetchAllAddress({userId : user?.id }));
                setCurrentEditId(null);
                setFormData(initialAddressFormData)
                toast({
                    title : "Address updated successfully",
                    variant :'success'
                })
            }
        }): dispatch(addAddress({
            ...formData,
            userId : user?.id
        })).then(data => {
            if(data?.payload?.success) {
                dispatch(fetchAllAddress({userId : user?.id}))
                setFormData(initialAddressFormData);
                toast({
                    title : "Address added successfully",
                    variant :'success'
                })
            }
        })
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({userId : user?.id , addressId : getCurrentAddress._id })).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddress({userId : user?.id}))
                toast({
                    title : "Address deleted successfully",
                    variant :'success'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode :getCurrentAddress?.pincode,
            notes : getCurrentAddress?.notes
        })
    }

    useEffect(() => {
        dispatch(fetchAllAddress({userId : user?.id}))
    } , [dispatch, user?.id])


    function isFormValid (){
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item )
    }
    
    return <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 ">
                {
                AddressList && AddressList.length > 0 ? AddressList.map(item => <AddressCard 
                    key={item.id} 
                    addressInfo={item} 
                    handleDeleteAddress = {handleDeleteAddress}
                    handleEditAddress = {handleEditAddress}
                    />
                ) : null
                }

                
        </div>
        <CardHeader>
            <CardTitle>{currentEditId !==null ? 'Edit Address ' : 'Add New Address'}</CardTitle>
        </CardHeader>

        <CardContent className = "space-y-3">
                <Form  
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditId !==null ? 'Edit' : 'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
        </CardContent>

    </Card>
}

export default Address