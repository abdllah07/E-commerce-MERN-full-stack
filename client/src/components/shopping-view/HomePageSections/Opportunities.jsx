
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ShoppingBagIcon } from "lucide-react"

const OpportunitiesItems = [
    {id : "1" , image : 'https://images.hepsiburada.net/banners/s/1/819-357/gra-178804-appbanner133726361582466992133730189136530590.jpg/format:webp'},
    {id : "2" , image : 'https://images.hepsiburada.net/banners/s/1/819-357/gra-179147-appbanner_(1)133729415707429378.jpg/format:webp'},
    {id : "3" , image : 'https://images.hepsiburada.net/banners/s/1/819-357/gra-178765-appbanner_(2)133729422030888100.jpg/format:webp'},
    {id : "4" , image : 'https://images.hepsiburada.net/banners/s/1/819-357/gra-179217-appbanner133728629451781455.jpg/format:webp'},

]

export function Opportunities() {
    return (
        <div className="container flex flex-wrap justify-center items-center ">
        <Carousel className="max-w-3xl  mx-auto rounded-lg">
            <CarouselContent className="-ml-1 relative rounded-lg">
                {OpportunitiesItems.map((product) => (
                    <CarouselItem key={product.id} className="pl-1 md:basis-1/1 lg:basis-1/1 h-full ">
                    <div className="p-1">
                        <Card className="shadow-xl relative ">
                        
                    
                        <CardHeader className="p-0 rounded-lg">
                            <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                            
                        </CardHeader>
                        </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />


        </Carousel>
        <Carousel className="max-w-lg mx-auto">
        <CarouselContent className="-ml-1 relative">
            {OpportunitiesItems.map((product) => (
                <CarouselItem key={product.id} className="pl-1 md:basis-1/0 lg:basis-1/0 h-full">
                <div className="p-1">
                    <Card className=" relative rounded-lg">

                
                    <CardHeader className="p-0">
                        <img className="w-full h-full object-center rounded-t-lg" src={product.image} alt={product.name} />
                    </CardHeader>
                    <CardContent>
                    <div className="mt-1 flex justify-between items-center p-2">
                        <h2 className="font-bold line-clamp-2 m-0 p-0 text-orange-400"> Discover Great Deals</h2>
                        <ShoppingBagIcon className="text-orange-400"/>
                    </div>
                    <div className="w-full h-full flex justify-center flex-wrap items-center gap-2">
                        <img className="w-[120px] h-[100px] object-center" src="https://productimages.hepsiburada.net/s/109/200-200/110000055807872.jpg/format:webp" alt="" />
                        <img className="w-[120px] h-[100px] object-center" src="https://productimages.hepsiburada.net/s/404/200-200/110000429711421.jpg/format:webp" alt="" />
                        <img className="w-[120px] h-[100px] object-center" src="https://productimages.hepsiburada.net/s/33/200-200/10417703649330.jpg/format:webp" alt="" />
                    </div>
                    </CardContent>
                    </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
      
        </Carousel>
        
        </div>
        
    )
}
