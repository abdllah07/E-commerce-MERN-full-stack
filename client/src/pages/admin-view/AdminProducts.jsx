import ImageUpload from "@/components/admin-view/ImageUpload"
import ProductTile from "@/components/admin-view/ProductTile"
import Form from "@/components/common/Form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addNewProduct, fetchAllProducts } from "@/store/admin/productSlice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const initialFormData = {
    image : null , 
    title : '',
    description : '',
    category : '' ,
    brand : '',
    price : '',
    salePrice : '',
    totalStook : '',

}

function AdminProducts() {

    const [formData, setFormData] = useState(initialFormData)
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)

    const [imageFile , setImageFile] = useState(null);

    const[uploadedImageUrl , setUploadedImageUrl] = useState("");

    const [imageLoadingState, setImageLoadingState] = useState(false)

    const {productList} = useSelector(state=> state.adminProducts)
    const dispatch = useDispatch();
    const {toast} = useToast()
    useEffect(() => {
        dispatch(fetchAllProducts())
    } , [dispatch])

    console.log(productList , "Products  fetched successfully ");
    

    function onSubmit(event) {
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl,
        })).then((data) => {
            console.log(data);
            if(data?.payload?.success) {
                dispatch(fetchAllProducts())
                setImageFile(null);
                setFormData(initialFormData)
                toast({
                    title : data?.payload?.message,
                    variant :'success'
                })
                setOpenCreateProductDialog(false);
                
            }
        })
    } 

    return  <Fragment >

            <div className="mb-5 flex justify-end w-full">
                <Button onClick= {() => setOpenCreateProductDialog(true)}>Add New Product </Button>
            </div>
            

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ? 
                    productList.map(item => <ProductTile key={item.id} product={item}/>) : null
                }
            </div>


            <Sheet
                open = {openCreateProductDialog}
                onOpenChange={() => { setOpenCreateProductDialog(false)}}
            >
                <SheetContent side= "right" className="overflow-auto ">

                        <SheetHeader>
                            <SheetTitle>
                                Add New Product
                            </SheetTitle>
                        </SheetHeader>

                        <ImageUpload  
                        imageFile={imageFile} 
                        setImageFile = {setImageFile} 
                        uploadedImageUrl = { uploadedImageUrl} 
                        setUploadedImageUrl = {setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}

                        />

                        <div className="py-6">
                            <Form 
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={"Add Product"}
                                onSubmit={onSubmit}
                            />
                        </div>

                </SheetContent>
            </Sheet>


        </Fragment>
    
}

export default AdminProducts