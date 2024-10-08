import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import propTypes from 'prop-types'
function AddressCard({addressInfo , handleDeleteAddress  , handleEditAddress}) {
    return (
        <Card className="cursor-pointer">
            <CardContent className={`grid gap-4 p-4 `}>
                <label >Address : {addressInfo?.address}</label>
                <label >city : {addressInfo?.city}</label>
                <label >pincode : {addressInfo?.pincode}</label>
                <label >phone : {addressInfo?.phone}</label>
                <label >notes : {addressInfo?.notes}</label>


            </CardContent>
            <CardFooter className="flex justify-between p-3">
                <Button onClick = {()=> handleEditAddress(addressInfo)}>Edit</Button>
                <Button className="bg-red-500" onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>

            </CardFooter>
        </Card>
    )
}



AddressCard.propTypes = {
    addressInfo: propTypes.object,
    handleDeleteAddress : propTypes.func,
    handleEditAddress : propTypes.func,
}

export default AddressCard