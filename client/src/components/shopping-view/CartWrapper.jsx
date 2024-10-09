import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import PropTypes from "prop-types";
import CartItemsContent from "./CartItemsContent";
import { useNavigate } from "react-router-dom";
import { CheckCheck } from "lucide-react";

function CartWrapper({cartItems , setOpenCartSheet}) {
    const navigate = useNavigate();
    const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum , item) => sum + (
        item?.salePrice > 0 ? item?.salePrice : item?.price
    ) * item?.quantity  , 0 ) : 0
    return (
        <SheetContent className ="sm:max-w-md ">
            
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ? 
                    cartItems.map(item => 
                        <CartItemsContent key={item.id} cartItem = {item}/>
                    ) : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between ">
                    <span className="font-bold ">Total</span>
                    <span className="font-bold ">{totalCartAmount}$</span>
                </div>
            </div>
            <Button className="w-full mt-6" onClick = {()=> {
                navigate('/shopping/checkout');
                setOpenCartSheet(false);
            }}><CheckCheck className="mr-2"/> Check Out</Button>
        </SheetContent>
    )
}


CartWrapper.propTypes = {
    cartItems: PropTypes.array
}

export default CartWrapper