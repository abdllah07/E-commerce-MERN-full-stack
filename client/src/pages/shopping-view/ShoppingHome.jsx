import { AirplayIcon, ArchiveIcon, BabyIcon, Bike, BookDashed, BookImage, Cable, CameraIcon, ChartBarIncreasingIcon, ChevronLeftIcon, ChevronRightIcon, CirclePercent, CloudLightning, Component, CreditCard, DiamondIcon, GlobeIcon, HomeIcon, LaptopIcon, PackageCheck, ShieldIcon, ShirtIcon, ShoppingBag, ShoppingBagIcon, ShoppingBasket, ShoppingBasketIcon, ShoppingCart, ShoppingCartIcon, Smile, SquareMenu, SquarePlus, StarIcon, Store, TagIcon, ToyBrickIcon, UmbrellaIcon, WalletCards, WatchIcon } from 'lucide-react'; // Importing icons from lucide-react library
import { Button } from '@/components/ui/button'; // Importing Button component from the UI library
import { Card, CardContent } from '@/components/ui/card'; // Importing Card and CardContent components
import { useEffect, useState } from 'react'; // Importing React hooks
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/productSlice'; // Importing action to fetch filtered products from Redux store
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks for dispatching actions and selecting state
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'; // Importing the ShoppingProductTile component
import {  useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog';
import { getFeatureImages } from '@/store/commonSlice';
import FlashCategory from '@/components/shopping-view/HomePageSections/FlashCategory';
import PopularCategories from '@/components/shopping-view/HomePageSections/PopularCategories';
import BestSellingProducts from '@/components/shopping-view/HomePageSections/BestSellingProducts';
import { AdvantageousProductsItems, BestSellingProductsItems } from '@/config';
import AllCategory from '@/components/shopping-view/HomePageSections/AllCategory';
import ShoppingFooter from '@/components/shopping-view/HomePageSections/ShoppingFooter';
import { fetchAllCategory } from '@/store/admin/clothesCategories';
import { Opportunities } from '@/components/shopping-view/HomePageSections/Opportunities';

// Array of categories with corresponding icons
const categoriesWithIcons = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
    { id: "electronics", label: "Electronics", icon: LaptopIcon },
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "sports", label: "Sports", icon: Bike },
    { id: "furniture", label: "Furniture", icon: ChartBarIncreasingIcon },
    { id: "groceries", label: "Groceries", icon: ShoppingBasketIcon },
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

const flashCategoriesItems = [
    { label: 'Special for you', Icon: Store, link: '/special' },
    { label: 'You take it too', Icon: ShoppingBag, link: '/take-it' },
    { label: 'Advantageous products', Icon: ShoppingBasket, link: '/products' },
    { label: 'Discount coupons', Icon: CirclePercent, link: '/coupons' },
    { label: 'Credit Card', Icon: CreditCard, link: '/credit-card' },
    { label: 'Institutional', Icon: Component, link: '/institutional' },
    { label: 'Electric', Icon: Cable, link: '/electric' },
    { label: 'Digital cart', Icon: WalletCards, link: '/digital-cart' }
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

    const {clothesCategory} = useSelector(state => state.clothesCategory)

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
        dispatch(fetchAllCategory());
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

            <section className='py-12 bg-gray-100'>
                <div className="flex justify-center items-center mx-auto w-full mb-8">
                    <StarIcon className="text-yellow-600 mr-4" />
                    <h2 className="text-3xl font-bold text-center">Opportunities</h2>
                </div>
                <div className=' flex justify-center items-center gap-5 flex-wrap '>
                    <Opportunities/>

                </div>
            </section>   

            {/* Shop by Category section */}
            <section className="py-12 bg-gray-50">
                <div className="flex justify-center items-center mx-auto w-full mb-8">
                    <StarIcon className="text-yellow-600 mr-4" />
                    <h2 className="text-3xl font-bold text-center">Shop By Flash</h2>
                </div>

                {/* Category Items */}
                <div className="container flex flex-wrap justify-center mx-auto px-4 animate-fade-in-left">
                    {flashCategoriesItems.map((item, index) => (
                    <FlashCategory key={index} label={item.label} Icon={item.Icon} link={item.link} />
                    ))}
                </div>

                <div className="container flex flex-wrap justify-center gap-10 mx-auto px-4 animate-fade-in-left mt-8 mb-5">
                    <div className="flex justify-center gap-2 items-center bg-green-100 w-[400px] px-10 py-4 rounded-lg cursor-pointer hover:bg-green-200 duration-200 group">
                        <SquarePlus className="text-green-800 group-hover:animate-bounce duration-200"/>
                        <h2 className='font-bold text-green-800 text-xl group-hover:animate-bounce duration-200'>Most added to cart</h2>
                    </div>
                    <div className="flex justify-center gap-2 items-center bg-orange-100 w-[400px] px-10 py-4 rounded-lg cursor-pointer hover:bg-orange-200 duration-200 group">
                        <Store className="text-orange-500 group-hover:animate-bounce duration-200"/>
                        <h2 className='font-bold text-orange-500 text-xl group-hover:animate-bounce duration-200'>Most featured</h2>
                    </div>
                    <div className="flex justify-center gap-2 items-center bg-purple-100 w-[400px] px-10 py-4 rounded-lg cursor-pointer hover:bg-purple-200 duration-200 group">
                        <ShoppingCart className='text-purple-800 group-hover:animate-bounce duration-200'/>
                        <h2 className='font-bold text-purple-800 text-xl group-hover:animate-bounce duration-200'>Flash Products</h2>
                    </div>
                </div>
                
            </section>

            {/* Shop by Category section */}
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Shop By Category</h2>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4'>
                        {categoriesWithIcons.map(category => (
                            <Card onClick= {() => handleNavigateToListingPage(category , 'category')} key={category.id} className='hover:-translate-y-3 duration-500 border-b-[#001F3F] rounded-2xl h-[100px] w-[100px] cursor-pointer hover:shadow-slate-600  bg-[#15b39125] hover:bg-[#F5F7F8]'>
                                <CardContent className='flex flex-col items-center justify-center p-6  '>
                                    <category.icon className='w-6 h-6 mb-4 text-[#001F3F]' />
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
                    <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4 w-50 '>
                        {brandWithIcons.map(brandItem => (
                            <Card onClick= {() => handleNavigateToListingPage(brandItem , 'brand')} key={brandItem.id} className='border-b-[#1A3636] rounded-2xl h-[110px] w-[100px] cursor-pointer hover:shadow-slate-600 hover:-translate-y-3 transition-all bg-[#15b39125] duration-300 hover:bg-[#F5F7F8]'>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                    <brandItem.icon className='w-6 h-6 mb-2 text-[#0b1d2e]' />
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

            <section className='py-12 bg-white'>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                <div className='flex flex-wrap justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Popular Clothes Categories</h2>
                    </div>
                    <PopularCategories ListOfCategories={clothesCategory}/>
                </div>
            </section>

            <section className='py- 12 bg-gray-100'>
            <div className='container mx-auto px-4 animate-fade-in-left mb-8'>
                    <div className='flex flex-wrap justify-center items-center mx-auto w-full mb-8 mt-5'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Best Selling Products</h2>
                    </div>
                <BestSellingProducts BestSellingProductsItems = {BestSellingProductsItems}/>
            </div>
            </section>

            <section className='py- 12 bg-gray-100'>
            <div className='container mx-auto px-4 animate-fade-in-left mb-8'>
                    <div className='flex flex-wrap justify-center items-center mx-auto w-full mb-8 mt-5'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Advantageous Products</h2>
                    </div>
                <BestSellingProducts BestSellingProductsItems = {AdvantageousProductsItems} advanced = {true}/>
            </div>
            </section>

            <section className='py-12 bg-gray-100'>
            <div className='container mx-auto px-4 animate-fade-in-left mb-8'>
                    <div className='flex flex-wrap justify-center items-center mx-auto w-full mb-8 mt-5'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Shop Categories</h2>
                    </div>
                    <AllCategory/>
            </div>
            </section>

            <ShoppingFooter/>


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
