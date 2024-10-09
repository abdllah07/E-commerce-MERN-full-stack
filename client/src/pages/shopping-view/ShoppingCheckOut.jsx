
import Address from '@/components/shopping-view/Address'
import img from '../../assets/account.jpg'
import { useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping-view/CartItemsContent'
import { Button } from '@/components/ui/button'

function ShoppingCheckOut() {

    const {cartItems} = useSelector(state => state.shopCart)


    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum , item) => sum + (
        item?.salePrice > 0 ? item?.salePrice : item?.price
    ) * item?.quantity  , 0 ) : 0

    return <div className="flex flex-col ">
        <div className="relative h-[300px] w-[400px] overflow-hidden">
            <img src="https://www.flywire.com/cdnimages/images/bg/_heroImage/header-icons-integrations-checkout.png" className='h-full w-full object-center ' />
            <img src="https://www.flywire.com/cdnimages/images/bg/_heroImage/header-icons-integrations-checkout.png" className='h-full w-full object-center ' />
            <img src="https://www.flywire.com/cdnimages/images/bg/_heroImage/header-icons-integrations-checkout.png" className='h-full w-full object-center ' />

        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
            <Address />
            <div className='flex flex-col gap-4'>
                {
                    cartItems && cartItems.items &&cartItems.items.length > 0 ? 
                        cartItems.items.map(item => <CartItemsContent key={item.id} cartItem = {item}/>)
                    : null
                }
                <div className="mt-8 space-y-4">
                        <div className="flex justify-between ">
                            <span className="font-bold ">Total</span>
                            <span className="font-bold ">${totalCartAmount}$</span>
                        </div>
                </div>
                <div className='mt-4 w-full'>
                    <Button className="w-full">Check Out with Paypal</Button>
                </div>
            </div>
        </div>
    </div>
}

export default ShoppingCheckOut