import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { fetchProductDetails } from "@/store/shop/productSlice";
import { getSearchResults, resetSearchResult } from "@/store/shop/SearchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShoppingSearch() {

    const [keyword , setKeyword] = useState('');
    const [searchParams , setSearchParams] = useSearchParams('');
    const {searchResult} = useSelector(state => state.shopSearch);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth) // Get logged-in user data
    const {toast} = useToast();
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);
    const { productDetails } = useSelector(state => state.shopProducts) // Get products and product details from store

    // Open the product details dialog when product details are fetched
    useEffect(() => {
        if (productDetails !== null) setOpenProductDetailsDialog(true); // Open dialog when product details are available
    }, [productDetails]);

    useEffect(() => {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword))
            } , 1000)
        }else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResult())
        }
    }, [dispatch, keyword, setSearchParams]);

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

    // Handle fetching product details when a product is clicked
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId)) // Fetch product details
    }


    return <div className="container mx-auto md:px-6 px-4 py-8">
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input
                    placeholder="Search Products..."
                    className="py-6"
                    value = {keyword}
                    name ="keyword"
                    onChange={(event)=> setKeyword(event.target.value)}
                />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-5">
            {
                searchResult && searchResult.length > 0? searchResult.map(item => <ShoppingProductTile 
                    key={item._id} product={item} 
                    handleAddToCart = {handleAddToCart}
                    handleGetProductDetails = {handleGetProductDetails}

                    />
                ) : <h1 className="text-3xl font-extrabold">No Results ... </h1>
            }
        </div>
          {/* Product details dialog */}
            <ProductDetailsDialog
                open={openProductDetailsDialog}
                setOpen={setOpenProductDetailsDialog}
                productDetails={productDetails}
            />
    </div>
}

export default ShoppingSearch