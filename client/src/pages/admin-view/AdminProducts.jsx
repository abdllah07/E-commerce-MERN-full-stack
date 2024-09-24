import ImageUpload from "@/components/admin-view/ImageUpload"
import ProductTile from "@/components/admin-view/ProductTile"
import Form from "@/components/common/Form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/productSlice"
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
    const {productList} = useSelector(state=> state.adminProducts);

    const [currentEditId, setCurrentEditId] = useState(null);


    const dispatch = useDispatch();
    const {toast} = useToast();



    useEffect(() => {
        dispatch(fetchAllProducts())
    } , [dispatch])


    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    function handleDeleteProduct(getCurrentProductId){
        dispatch(deleteProduct(getCurrentProductId)).then(data => {
        if(data?.payload?.success){
            dispatch(fetchAllProducts());

            toast({
                title : "Product deleted successfully",
                variant :'success'
            })
        }});


    }



    function onSubmit(event) {
        event.preventDefault();
        currentEditId !== null
            ? dispatch(
                editProduct({
                    id: currentEditId,
                    formData,
                })
                ).then((data) => {
                console.log(data, "edit");
        
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    toast({
                        title: "Product edit successfully",
                        });
                }
                })
            : dispatch(
                addNewProduct({
                    ...formData,
                    image: uploadedImageUrl,
                })
                ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                    title: "Product add successfully",
                    });
                }
                });
        }

    return  <Fragment >

            <div className="mb-5 flex justify-end w-full">
                <Button onClick= {() => setOpenCreateProductDialog(true)}>Add New Product </Button>
            </div>
            

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 ? 
                    productList.map(item => <ProductTile 
                        key={item._id} 
                        product={item}
                        setCurrentEditId={setCurrentEditId}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setFormData={setFormData}
                        handleDeleteProduct = {handleDeleteProduct}
                        />) : null
                }
            </div>



                {/* the nav bar  */}

            <Sheet
                open = {openCreateProductDialog}
                onOpenChange={() => { 
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side= "right" className="overflow-auto ">

                        <SheetHeader>
                            <SheetTitle>
                                {
                                    currentEditId !== null ? "Edit Product" : "Add New Product"
                                }
                            </SheetTitle>
                        </SheetHeader>

                        <ImageUpload  
                        imageFile={imageFile} 
                        setImageFile = {setImageFile} 
                        uploadedImageUrl = { uploadedImageUrl} 
                        setUploadedImageUrl = {setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditId !== null}

                        />

                        <div className="py-6">
                            <Form 
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={currentEditId !== null ? "Edit" : "Add"}
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                                />
                        </div>

                </SheetContent>
            </Sheet>


        </Fragment>
    
}

export default AdminProducts