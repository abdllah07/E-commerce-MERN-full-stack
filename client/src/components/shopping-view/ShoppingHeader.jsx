import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logoutUser } from "@/store/auth-slice"
import CartWrapper from "./CartWrapper"
import { useEffect, useState } from "react"
import { fetchCartItems } from "@/store/shop/cartSlice"


function MenuItems (){
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();


    function handleNavigateToListingPage(getCurrentMenuItem){
        sessionStorage.removeItem('filters');
        const currentFilter = getCurrentMenuItem.id !== 'home'  && getCurrentMenuItem.id !== 'products' && getCurrentMenuItem.id !== 'search'? {
            category: [getCurrentMenuItem.id], 
        } : null

        sessionStorage.setItem('filters' , JSON.stringify(currentFilter));
        location.pathname.includes('listing') && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) : 
        navigate(getCurrentMenuItem.path)
    }

    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(menuItem => <label className="text-sm font-medium cursor-pointer" onClick={() => handleNavigateToListingPage(menuItem) } key = {menuItem.id}>{menuItem.label}</label>)
        }
    </nav>
}


function HeaderRightContent(){

    const {  user} = useSelector(state=> state.auth);   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openCartSheet, setOpenCartSheet] = useState(false)
    const { cartItems } = useSelector(state => state.shopCart) // Get cart items from store

    useEffect(() => {
        dispatch(fetchCartItems({userId : user?.id}))
    } , [dispatch, user?.id])

    function handleLogout(){
        dispatch(logoutUser())
    }


    return <div className="sticky flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button variant="outline" size="icon" onClick={() => setOpenCartSheet(true)}
                className="relative w-[60px]">
                <ShoppingCart className="w-6 h-6 absolute left-3"/>
                <span className="absolute top-[-10px] mt-2 right-[0px] font-bold text-blue-900 h-6 w-6 rounded-lg text-lg">{cartItems?.items?.length}</span>
                <span className="sr-only ">User Cart</span>
            </Button>
            <CartWrapper setOpenCartSheet= {setOpenCartSheet}  cartItems = {cartItems && cartItems?.items?.length > 0 ? cartItems?.items : [] }/>

        </Sheet>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black ">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>
                    Logged in as {user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick = {() => navigate('/shopping/account')}>
                    <UserCog className="mr-2 w-4 h-4"/>
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 w-4 h-4"/>
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}
function ShoppingHeader() {

    return <header className="sticky top-0 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <Link to ="/shopping/home" className="flex items-center gap-2">
                <HousePlug className="h-6 w-6"/>
                <span className="font-bold">E-commerce</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant= "outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side= "left" className="w-full max-w-xs">

                <MenuItems/>
                <HeaderRightContent/>

                </SheetContent>
            </Sheet>
            <div className="hidden lg:block ">
                <MenuItems/>
                </div>
                    <div className="hidden lg:block">
                        <HeaderRightContent/>
                    </div>

        </div>
    </header>
}

export default ShoppingHeader