import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BadgePercent, CirclePercent, Heart, LinkIcon, StarIcon } from "lucide-react";
import { Link } from "react-router-dom";



function BestSellingProducts({BestSellingProductsItems , advanced = false}) {
  return (
    <Carousel className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center text-xl font-bold p-3">
        <h1></h1>
        <Link to="/all-products" className="text-yellow-500">
          All Products
        </Link>
      </div>
      <CarouselContent className="-ml-1 relative">
        {BestSellingProductsItems.map((product) => (
          <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/5 h-[580px]">
            <div className="p-1">
              <Card className="shadow-xl relative rounded-lg">
                {/* Link icon in the top-right corner */}
                <Link to={`/product/${product.id}`} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
                  <LinkIcon className="w-5 h-5 text-gray-500" />
                </Link>
                <Link to={`/product/${product.id}`} className="absolute top-2 left-2 bg-orange-100 p-1 rounded-full shadow-md hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-orange-800" />
                </Link>
                {
                  advanced && (<>
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
                      <CirclePercent
                        className="w-5 h-5 text-orange-500"
                        value={product.salePercentage}
                        size={16}
                        background="transparent"
                        color="currentColor"
                        progressColor="gradient(to right, #FFC000, #FFA500)"
                      /> 
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="absolute top-[35%] left-2 bg-orange-100 p-1 rounded-sm shadow-md hover:bg-gray-100"
                    >
                      <h2 className="font-semibold text-xs text-orange-800">Advanced</h2>
                    </Link>
                    <Link
                      to={`/product/${product.id}`}
                      className="absolute top-[35%] right-2 bg-orange-100 p-1 rounded-sm shadow-md hover:bg-gray-100"
                    >
                      <h2 className=" font-semibold text-xs text-orange-800">Git Now</h2>
                    </Link>
                  </>
                    
                  )
                }
                <CardHeader className="p-0">
                  <img className="w-full h-[200px] object-cover rounded-t-lg" src={product.image} alt={product.name} />
                  
                </CardHeader>
                
                <CardContent className="flex flex-col gap-3 p-0">
                  <div className="mt-1 flex justify-between items-center p-2">
                    <h2 className="font-bold line-clamp-2 m-0 p-0">{product.name}</h2>
                  </div>
                  <p className="text-gray-500 px-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} className={`w-5 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                    <span>({product.rating})</span>
                  </div>
                  <div className="flex gap-3 pl-2">
                    <span className="text-orange-500">${product.price.toFixed(2)}</span>
                    <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="pl-2 flex gap-3">
                    <span className="bg-orange-100 rounded-lg p-2 font-bold text-xs flex gap-1 items-center justify-center">
                      <BadgePercent className="w-3" />
                      {product.badge}
                    </span>
                    <span className="bg-orange-100 p-2 rounded-lg font-bold text-xs flex gap-1 items-center justify-center">
                      <CirclePercent className="w-3" />
                      {product.offer}
                    </span>
                  </div>
                  <div className="flex gap-5 p-3">
                    <button className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary-dark">
                      Add To Cart
                    </button>
                    <button className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-primary-dark">
                      Buy Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default BestSellingProducts;
