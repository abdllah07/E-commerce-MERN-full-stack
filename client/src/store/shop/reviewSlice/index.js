import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading : false,
    reviewResult : [],
}



export const getReviewResults = createAsyncThunk('/products/getReviewResults' ,async (productId) => {

    const result = await axios.get(`http://localhost:5000/api/shop/review/${productId}`);
    return result?.data;
})

export const addReview = createAsyncThunk('/products/addReview' ,async (data) => {
    const result = await axios.post(`http://localhost:5000/api/shop/review/add` , data);
    return result?.data;
})


const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState , 
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getReviewResults.pending , (state) => {
            state.isLoading = true;
        }).addCase(getReviewResults.fulfilled , (state , action) => {
            state.isLoading = false;
            state.reviewResult = action.payload.data;
        }).addCase(getReviewResults.rejected , (state) => {
            state.isLoading = false;
            state.reviewResult = [];
        })
    }
})

export default reviewSlice.reducer;