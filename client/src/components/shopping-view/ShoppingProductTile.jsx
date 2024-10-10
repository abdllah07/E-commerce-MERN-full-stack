import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge"
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card"

import PropTypes from "prop-types";
import {  CircleDollarSign, CirclePlus, Heart, Link, Zap } from "lucide-react";

function ShoppingProductTile({product , handleGetProductDetails , handleAddToCart}) {

    return (
        <Card className="w-full max-w-sm mx-auto  duration-500 hover:bg-gray-100  shadow-lg hover:-translate-y-3 cursor-pointer">

            <div className="" onClick ={()=> handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />
                    {
                        product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Sale

                        </Badge> : null
                    }
                        <Badge className="absolute top-2 right-2 bg-white group">
                            <Link className="text-gray-500 group-hover:text-white"/>
                        </Badge>
                        <Badge className="absolute bottom-2 right-2 bg-white  flex gap-3 group">
                            <Zap className="text-orange-500 w-3 h-3 group-hover:text-white"/>
                            <h2 className="text-orange-500 group-hover:text-white">Faster Shipping</h2>
                        </Badge>
                        <Badge className="absolute bottom-2 left-2 bg-white  flex gap-3 group">
                            <Heart className="text-orange-500 w-5 h-5 group-hover:text-white"/>
                        </Badge>
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground ">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-sm text-muted-foreground ">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={` ${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ?  <span className="text-lg font-semibold text-primary">${product?.salePrice}</span> : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter className="flex gap-5">
                    <Button className="w-full hover:bg-blue-950 duration-500" onClick = {() => handleAddToCart(product?._id)}>
                            Add To Cart
                            <CirclePlus className="ml-4 text-white " />
                    </Button>
                    <Button className="w-full hover:bg-blue-950 duration-500" onClick = {() => handleAddToCart(product?._id)}>
                            Buy Now
                            <CircleDollarSign className="ml-4 text-white " />
                    </Button>
                </CardFooter>
                
        </Card>
    )
}

ShoppingProductTile.propTypes = {
    product: PropTypes.object,
    handleGetProductDetails : PropTypes.func,
    handleAddToCart : PropTypes.func
}

export default ShoppingProductTile