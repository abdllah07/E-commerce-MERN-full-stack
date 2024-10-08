import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog"
import ProductFilter from "@/components/shopping-view/ProductFilter"
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/productSlice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

// Helper function to create a query string from filter parameters
function createSearchParamsHelper(filtersParams) {
    const queryParams = [];
    // Iterate over filter parameters and build query string
    for(const [key , value]  of Object.entries(filtersParams)){
        if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(",");
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join('&');
}

function ShoppingListing() {

    // State for filters, sorting, search params, and dialog visibility
    const [filters, setFilters] = useState({})   
    const [sort, setSort] = useState(null);
    const [searchParams , setSearchParams] = useSearchParams();
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);
    const {toast} = useToast();
    const categorySearchParam = searchParams.get('category');

    // Redux store data
    const {user} = useSelector(state => state.auth) // Get logged-in user data
    const dispatch = useDispatch();
    const { productList , productDetails } = useSelector(state => state.shopProducts) // Get products and product details from store

    // Fetch filtered products when filters or sort options change
    useEffect(() => {
        if(filters !== null && sort !== null){
            dispatch(
                fetchAllFilteredProducts({filterParams : filters , sortParams : sort})
            )
        }
    }, [dispatch , sort , filters]);

    // Handle fetching product details when a product is clicked
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId)) // Fetch product details
    }

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

    // Handle sorting by different options
    function handleSort(value){
        setSort(value); // Update sort state
    }

    // Handle filtering products by section and option
    function handleFilter(getSectionId, getCurrentOption){
        let cpyFilters = {...filters}; 
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        // Add or remove filter options based on user selection
        if(indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
    
        setFilters(cpyFilters); // Update filters state
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters)); // Save filters in sessionStorage
    }

    // Initialize sorting and filters from sessionStorage on component mount
    useEffect(() => {
        setSort('price-lowtohigh'); // Set default sort option
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {}); // Get filters from sessionStorage
    }, [categorySearchParam]);

    // Update searchParams in the URL whenever filters change
    useEffect(() => {
        if(filters && Object.keys(filters).length > 0){
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString)); // Set URL search params
        }
    }, [filters, setSearchParams]);

    // Open the product details dialog when product details are fetched
    useEffect(() => {
        if (productDetails !== null) setOpenProductDetailsDialog(true); // Open dialog when product details are available
    }, [productDetails]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 w-full">

            {/* Product filter section */}
            <ProductFilter filters={filters} handleFilter={handleFilter} />

            {/* Main product listing section */}
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productList?.length}</span>
                        
                        {/* Sort by dropdown menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="w-4 h-6" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map(sortItem => 
                                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    )}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Grid of product tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 lg:grid-cols-4">
                    {productList && productList.length > 0 ? productList.map(productItems => 
                        <ShoppingProductTile 
                            key={productItems._id} 
                            product={productItems} 
                            handleGetProductDetails={handleGetProductDetails} 
                            handleAddToCart={handleAddToCart} 
                        />
                    ) : null}
                </div>
            </div>

            {/* Product details dialog */}
            <ProductDetailsDialog
                open={openProductDetailsDialog}
                setOpen={setOpenProductDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    )
}

export default ShoppingListing;
