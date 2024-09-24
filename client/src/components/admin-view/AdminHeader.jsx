import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"

function AdminHeader({setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b w-full">
      <Button className="lg:hidden sm:block" onClick= {()=> setOpen(true)}>
        <AlignJustify className=""/>
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end w-full">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium text-sm shadow">
          <LogOut />
          LogOut
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader