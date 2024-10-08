import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    featureImageList : [],
}



export const getFeatureImages = createAsyncThunk('/common/getFeatureImages' ,async () => {

    const result = await axios.get(`http://localhost:5000/api/common/feature/get`);


    return result?.data;
})
export const addFeatureImages = createAsyncThunk('/common/addFeatureImages' ,async (image) => {
    console.log(image);

    const result = await axios.post(`http://localhost:5000/api/common/feature/add` , {image});


    return result?.data;
})


const commonSlice = createSlice({
    name : 'commonSlice',
    initialState , 
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(getFeatureImages.pending , (state) => {
            state.isLoading = true;
        }).addCase(getFeatureImages.fulfilled , (state , action) => {
            state.isLoading = false;
            state.featureImageList = action.payload.data;
        }).addCase(getFeatureImages.rejected , (state) => {
            state.isLoading = false;
            state.featureImageList = [];
        })
    }
})


export default commonSlice.reducer;