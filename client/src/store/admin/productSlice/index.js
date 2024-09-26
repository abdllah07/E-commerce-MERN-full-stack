
// admin
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const initialState = {
    products : [],
    isLoading : false,
}


export const addNewProduct = createAsyncThunk('/products/addnewproduct' ,async (formData) => {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', formData ,
        {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            }
        }
    );
    return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts' ,async () => {
    const result = await axios.get('http://localhost:5000/api/admin/products/get');
    return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct' ,async ({id , formData}) => {
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData ,
        {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            }
        }
    );
    return result?.data;
})


export const deleteProduct = createAsyncThunk('/products/deleteProduct' ,async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
    return result?.data;
})


const adminProductsSlice = createSlice(
    {
        name : 'adminProducts',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder.addCase(fetchAllProducts.pending , (state) => {
                state.isLoading = true;
            }).addCase(fetchAllProducts.fulfilled , (state , action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
            }).addCase(fetchAllProducts.rejected , (state) => {
                state.isLoading = false;
                state.productList = [];
            })
        }

    }
)


export default adminProductsSlice.reducer;