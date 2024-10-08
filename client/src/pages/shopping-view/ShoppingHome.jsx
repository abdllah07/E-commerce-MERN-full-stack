import { AirplayIcon, ArchiveIcon, BabyIcon, BookDashed, BookImage, CameraIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, DiamondIcon, GlobeIcon, PackageCheck, ShieldIcon, ShirtIcon, ShoppingBagIcon, ShoppingCartIcon, SquareMenu, StarIcon, TagIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'; // Importing icons from lucide-react library
import { Button } from '@/components/ui/button'; // Importing Button component from the UI library
import { Card, CardContent } from '@/components/ui/card'; // Importing Card and CardContent components
import { useEffect, useState } from 'react'; // Importing React hooks
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/productSlice'; // Importing action to fetch filtered products from Redux store
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks for dispatching actions and selecting state
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'; // Importing the ShoppingProductTile component
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog';
import { getFeatureImages } from '@/store/commonSlice';

// Array of categories with corresponding icons
const categoriesWithIcons = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

// Array of brands with corresponding icons
const brandWithIcons = [
    { id: "nike", label: "Nike", icon: AirplayIcon },
    { id: "adidas", label: "Adidas", icon: ArchiveIcon },
    { id: "puma", label: "Puma", icon: BookDashed },
    { id: "levi", label: "Levi's", icon: BookImage },
    { id: "zara", label: "Zara", icon: PackageCheck },
    { id: "h&m", label: "H&M", icon: SquareMenu },
    { id: "gucci", label: "Gucci", icon: CameraIcon },
    { id: "prada", label: "Prada", icon: DiamondIcon },
    { id: "versace", label: "Versace", icon: GlobeIcon },
    { id: "ralph-lauren", label: "Ralph Lauren", icon: ShoppingBagIcon },
    { id: "uniqlo", label: "Uniqlo", icon: ShoppingCartIcon },
    { id: "under-armour", label: "Under Armour", icon: ShieldIcon },
    { id: "new-balance", label: "New Balance", icon: StarIcon },
    { id: "tommy-hilfiger", label: "Tommy Hilfiger", icon: CameraIcon },
    { id: "burberry", label: "Burberry", icon: TagIcon },
    { id: "calvin-klein", label: "Calvin Klein", icon: WatchIcon }
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0); // State for managing the current slide in the banner
    const { productList , productDetails } = useSelector(state => state.shopProducts); // Retrieve product list from the Redux store
    const dispatch = useDispatch(); // Dispatch function from Redux
    const navigate = useNavigate(); 
    const {toast} = useToast();
    const {user} = useSelector(state => state.auth) // Get logged-in user data
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);
    const {featureImageList } = useSelector(state => state.commonFeature)

   // Open the product details dialog when product details are fetched
    useEffect(() => {
        if (productDetails !== null) setOpenProductDetailsDialog(true); // Open dialog when product details are available
    }, [productDetails]);

    // useEffect to handle automatic slideshow functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % featureImageList.length); // Change the slide every 5 seconds
        }, 3000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, [featureImageList.length]);

    // useEffect to fetch products when the component mounts
    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' })); // Fetch products with no filters and sorted by price (low to high)
    }, [dispatch]);

    function handleNavigateToListingPage(getCurrentItem , section){
        sessionStorage.removeItem('filters');
        const currentFilters = {[section] : [getCurrentItem.id]};
        sessionStorage.setItem('filters', JSON.stringify(currentFilters)); // Store the current filters in session storage
        navigate(`/shopping/listing`)
    }
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

    
    useEffect(() => {
        dispatch(getFeatureImages());
    } ,[dispatch])
    
    

    return (
        <div className="flex flex-col min-h-screen">
            {/* Banner section with sliding images */}
            <div className="relative h-[600px] w-full overflow-hidden">
                {featureImageList && featureImageList.length > 0 ? featureImageList.map((slide, index) => (
                    <img 
                        src={slide.image} 
                        key={index} 
                        alt={`Banner ${index + 1}`} 
                        className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-[700px] object-cover transition-opacity duration-1000`} 
                    />
                ) ): null}
                {/* Left navigation button for banner slider */}
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
                >
                    <ChevronLeftIcon className='w-4 h-4' />
                </Button>
                {/* Right navigation button for banner slider */}
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
                >
                    <ChevronRightIcon className='w-4 h-4' />
                </Button>
            </div>

            {/* Shop by Category section */}
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Shop By Category</h2>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {categoriesWithIcons.map(category => (
                            <Card onClick= {() => handleNavigateToListingPage(category , 'category')} key={category.id} className='hover:-translate-y-3 duration-500 border-l-[#001F3F] cursor-pointer hover:shadow-slate-600  bg-[#F5F5F5] hover:bg-[#F5F7F8]'>
                                <CardContent className='flex flex-col items-center justify-center p-6  '>
                                    <category.icon className='w-12 h-12 mb-4 text-[#001F3F]' />
                                    <span className='font-bold'>{category.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Brand section */}
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4 animate-fade-in-right '>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Shop By Brand</h2>
                    </div>
                    <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 w-50 '>
                        {brandWithIcons.map(brandItem => (
                            <Card onClick= {() => handleNavigateToListingPage(brandItem , 'brand')} key={brandItem.id} className='border-b-[#1A3636] w-[130px] h-[110px] cursor-pointer hover:shadow-slate-600 hover:-translate-y-3 transition-all bg-[#F5F5F5] duration-300 hover:bg-[#F5F7F8]'>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                    <brandItem.icon className='w-6 h-6 mb-2 text-[#001F3F]' />
                                    <span className='font-bold text-center'>{brandItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products section */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Feature Products</h2>
                    </div>
                    <div className='grid grid-col-1 sm:grid-col-3 md:grid3 lg:grid-cols-4 gap-6 '>
                        {productList && productList.length > 0 ? (
                            productList.map(productItem => (
                                <ShoppingProductTile 
                                    key={productItem.id} 
                                    product={productItem} 
                                    handleGetProductDetails={handleGetProductDetails}
                                    handleAddToCart = {handleAddToCart}
                                />
                            ))
                        ) : null}
                    </div>
                </div>
            </section>
             {/* Product details dialog */}
                <ProductDetailsDialog
                    open={openProductDetailsDialog}
                    setOpen={setOpenProductDetailsDialog}
                    productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
