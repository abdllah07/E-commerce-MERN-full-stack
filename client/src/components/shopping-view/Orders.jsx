import { Dialog } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"
import OrderDetails from "../admin-view/OrderDetails"
import ShoppingOrderStatus from "./ShoppingOrderStatus"

function  Orders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    return (
    <Card className="">
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead ><span className="sr-only">Details</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>12346</TableCell>
                        <TableCell>27/08/2024</TableCell>
                        <TableCell>In Process</TableCell>
                        <TableCell>$59</TableCell>
                        <Dialog open = {openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                            <Button className="mt-2" onClick = {()=> setOpenDetailsDialog(true)}>View Details</Button>
                            <ShoppingOrderStatus/>
                        </Dialog>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    )
}

export default Orders