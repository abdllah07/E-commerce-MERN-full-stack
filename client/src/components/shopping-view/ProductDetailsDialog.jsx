import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog"; // Assuming these come from Radix UI
import PropTypes from "prop-types";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth) // Get logged-in user data
    const {toast} = useToast();

        // Handle adding product to the cart
        function handleAddToCart(getCurrentProductId) {
            dispatch(addToCart({userId : user.id , productId : getCurrentProductId , quantity : 1 }))
            .then((data) => {
                if(data?.payload?.success){ // If product is added successfully
                    dispatch(fetchCartItems({userId : user?.id})) // Fetch updated cart items
                    toast({
                        title : "Product added to cart successfully",
                        variant :'success'
                    })
                }
            })
        }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover"
                />
            </div>

            {/* Product Information */}
            <div className="">
                {/* product title and description and price   */}
                <div>
                    <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : '' }`}>{productDetails?.price}</p>
                    {
                        productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null 
                    }

                </div>
                {/* rating of product  */}
                <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5 ">
                    <StarIcon className="w-5 h-5 fill-primary"/>
                    <StarIcon className="w-5 h-5 fill-primary"/>
                    <StarIcon className="w-5 h-5 fill-primary"/>
                    <StarIcon className="w-5 h-5 fill-primary"/>
                    <StarIcon className="w-5 h-5 fill-primary"/>
                </div>
                    <span className="text-muted-foreground">(4.5)</span>
                </div>
                {/* add to cart button */}
                <div className="mt-5 mb-5">
                    <Button className="w-full" onClick = {() => handleAddToCart(productDetails?._id)}>Add To Cart</Button>

                </div>
                <Separator/>
                {/* the rating and comments reviews */}
                <div className="max-h-[300px] overflow-auto ">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 ">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">Abdullah Alhasan</h3>
                                </div>
                                <div className="flex items-center gap-0.5 ">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </div>
                                <p className="text-muted-foreground">This is an awesome product</p>
                            </div>
                        </div> 
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 ">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">Abdullah Alhasan</h3>
                                </div>
                                <div className="flex items-center gap-0.5 ">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </div>
                                <p className="text-muted-foreground">This is an awesome product</p>
                            </div>
                        </div> 
                        <div className="flex gap-4">
                            <Avatar className="w-10 h-10 border">
                                <AvatarFallback>AA</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 ">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">Abdullah Alhasan</h3>
                                </div>
                                <div className="flex items-center gap-0.5 ">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                </div>
                                <p className="text-muted-foreground">This is an awesome product</p>
                            </div>
                        </div> 
                    </div>
                    {/* writing a review  */}
                    <div className="mt-6 flex gap-2">
                        <Input placeholder = "write a review "/>
                        <Button className="">Submit</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    );
}

ProductDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    productDetails: PropTypes.object
};

export default ProductDetailsDialog;
