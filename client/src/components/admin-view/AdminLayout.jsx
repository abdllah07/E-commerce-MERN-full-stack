import { Outlet } from "react-router-dom"
import AdminSideBar from "./AdminSideBar"
import AdminHeader from "./AdminHeader"
import { useState } from "react"

function AdminLayout() {

    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
                <AdminSideBar open= {openSideBar} setOpen={setOpenSideBar}/>
            <div className="flex flex-1 flex-col w-full">

                    {/* admin Header */}    

                        <AdminHeader setOpen={setOpenSideBar}/>

                    <main className="flex-col flex-1 bg-muted/40 p-4 md:p-6 w-full">
                        <Outlet/>
                    </main>

            </div>
        </div>
    )
}

export default AdminLayout