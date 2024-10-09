

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import accImg from '../../assets/account.jpg'
import Orders from '@/components/shopping-view/Orders'
import Address from '@/components/shopping-view/Address'
function ShoppingAccount() {
    return <div className="flex flex-col ">
        <div className="relative h-[300px] w-full overflow-hidden">
            <img
                alt='Account'
                src={'https://st4.depositphotos.com/24244980/26780/i/450/depositphotos_267805462-stock-photo-account-modern-flat-design-blue.jpg'}
                className='h-full w-full object-cover overflow-hidden'
            />
        </div>
        <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
            <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                <Tabs defaultValue='order'>
                    <TabsList>
                        <TabsTrigger value = "orders">Orders</TabsTrigger>
                        <TabsTrigger value = "address">Address</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders">
                        <Orders/>
                    </TabsContent>
                    <TabsContent value="address">
                        <Address/>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    </div>
}

export default ShoppingAccount