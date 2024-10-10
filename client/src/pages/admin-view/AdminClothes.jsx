import AdminClothesCategories from "@/components/admin-view/AdminClothesCategories";
import ImageUpload from "@/components/admin-view/ImageUpload";
import Form from "@/components/common/Form";
import PopularCategories from "@/components/shopping-view/HomePageSections/PopularCategories";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addClothesCategoryFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewCategory, deleteCategory, editCategory, fetchAllCategory } from "@/store/admin/clothesCategories";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";


const initialFormData = {
    image : null , 
    title : '',

}


function AdminClothes() {
    const [formData, setFormData] = useState(initialFormData)

    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
    const [imageFile , setImageFile] = useState(null);
    const[uploadedImageUrl , setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const [currentEditId, setCurrentEditId] = useState(null);
    const dispatch = useDispatch();
    const {toast} = useToast();
    const {clothesCategory} = useSelector(state=> state.clothesCategory);

    
    useEffect(() => {
        dispatch(fetchAllCategory())
    } , [dispatch])

    function handleDeleteProduct(getCurrentProductId){
        dispatch(deleteCategory(getCurrentProductId)).then(data => {
        if(data?.payload?.success){
            dispatch(fetchAllCategory());

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
                editCategory({
                    id: currentEditId,
                    formData,
                })
                ).then((data) => {        
                if (data?.payload?.success) {
                    dispatch(fetchAllCategory());
                    setFormData(initialFormData);
                    setOpenCreateProductDialog(false);
                    setCurrentEditId(null);
                    toast({
                        title: "Category edit successfully",
                        });
                }
                })
            : dispatch(
                addNewCategory({
                    ...formData,
                    image: uploadedImageUrl,
                })
                ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllCategory());
                    setOpenCreateProductDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast({
                    title: "Category add successfully",
                    });
                }
                });
    }

    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }


    return (

        <div>
            
            <div className="mb-5 flex justify-end w-full">
                <Button onClick= {() => setOpenCreateProductDialog(true)}>Add New Category </Button>
            </div>
            <section className='py-12 bg-white'>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                        <div className="flex flex-wrap justify-evenly items-center gap-5">
                        {
                    clothesCategory && clothesCategory.length > 0 ? 
                    clothesCategory.map(item => <AdminClothesCategories 
                        key={item._id} 
                        category={item}
                        setCurrentEditId={setCurrentEditId}
                        setOpenCreateProductDialog={setOpenCreateProductDialog}
                        setFormData={setFormData}
                        handleDeleteProduct = {handleDeleteProduct}
                        />) : null
                }      
                            </div>          
                </div>
            </section>
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
                                formControls={addClothesCategoryFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={currentEditId !== null ? "Edit" : "Add"}
                                onSubmit={onSubmit}
                                isBtnDisabled={!isFormValid()}
                                />
                        </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AdminClothes