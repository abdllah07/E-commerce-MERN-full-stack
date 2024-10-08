import ImageUpload from "@/components/admin-view/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/commonSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile , setImageFile] = useState(null);
    const[uploadedImageUrl , setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const dispatch = useDispatch();

    const {featureImageList } = useSelector(state => state.commonFeature)


    function handleUploadFeatureImage(){
        dispatch(addFeatureImages(uploadedImageUrl)).then((data) => 
            {
                if(data?.payload?.success) {
                    dispatch(getFeatureImages());
                    setImageFile(null);
                    setUploadedImageUrl('')
                }
            }
        );

    }

    useEffect(() => {
        dispatch(getFeatureImages());
    } ,[dispatch])
    

    return (
        <div className="w-full">
            
            <ImageUpload  
                imageFile={imageFile} 
                setImageFile = {setImageFile} 
                uploadedImageUrl = { uploadedImageUrl} 
                setUploadedImageUrl = {setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isCustomStyling = {true}
                // isEditMode={currentEditId !== null}

                />
                <Button className="mt-5 w-full" onClick= {handleUploadFeatureImage}>Upload</Button>
                <div className="w-full">
                    {
                        featureImageList.length > 0 && featureImageList.map((image, index) => 
                                <div className="relative mt-5 gap-4" key={index}>
                                    <img 
                                    src={image.image}
                                    alt={image.image}
                                    className="w-full h-[500px] object-cover rounded-t-lg"
                                />
                            </div>
                        )
                    }
                </div>
        </div>
    )
}

export default AdminDashboard