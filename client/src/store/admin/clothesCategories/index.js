
// admin
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";



const initialState = {
    clothesCategory : [],
    isLoading : false,
}


export const addNewCategory = createAsyncThunk('/products/addNewCategory' ,async (formData) => {
    const result = await axios.post('http://localhost:5000/api/admin/clothesCategories/add', formData ,
        {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            }
        }
    );
    return result?.data;
})

export const fetchAllCategory = createAsyncThunk('/products/fetchAllCategory' ,async () => {
    const result = await axios.get('http://localhost:5000/api/admin/clothesCategories/get');
    return result?.data;
})

export const editCategory = createAsyncThunk('/products/editCategory' ,async ({id , formData}) => {
    const result = await axios.put(`http://localhost:5000/api/admin/clothesCategories/edit/${id}`, formData ,
        {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            }
        }
    );
    return result?.data;
})


export const deleteCategory = createAsyncThunk('/products/deleteCategory' ,async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/clothesCategories/delete/${id}`);
    return result?.data;
})


const adminClothesCategorySlice = createSlice(
    {
        name : 'adminClothesCategorySlice',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder.addCase(fetchAllCategory.pending , (state) => {
                state.isLoading = true;
            }).addCase(fetchAllCategory.fulfilled , (state , action) => {
                state.fetchAllCategory = false;
                state.clothesCategory = action.payload.data;
            }).addCase(fetchAllCategory.rejected , (state) => {
                state.isLoading = false;
                state.clothesCategory = [];
            })
        }

    }
)


export default adminClothesCategorySlice.reducer;