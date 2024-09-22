import { Outlet } from "react-router-dom"
import ShoppingHeader from "./ShoppingHeader"

function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden justify-start items-start min-h-screen">

            {/* common Header */}
            <ShoppingHeader />
            <main className="flex -flex-col w-full">
                <Outlet/>
            </main>

        </div>
    )
}

export default ShoppingLayout