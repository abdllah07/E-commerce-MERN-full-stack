import { Dialog } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import OrderDetails from "./OrderDetails"
import { useState } from "react"

function    AdminOrders() {
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
                            <Button onClick = {()=> setOpenDetailsDialog(true)}>View Details</Button>
                            <OrderDetails/>
                        </Dialog>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    )
}

export default AdminOrders