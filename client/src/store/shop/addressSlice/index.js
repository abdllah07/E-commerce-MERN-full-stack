import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isLoading: false, 
    AddressList : [],
}



// Add a new address
const addAddress = createAsyncThunk('address/addAddress', async (formData, { rejectWithValue }) => {
    try {
        console.log(formData)
        const response = await axios.post(
            'http://localhost:5000/api/shop/Address/add',
            formData,
        );

        return response.data;
    } catch (error) {
        // Return the error message as the rejection value
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Fetch all addresses for a user
const fetchAllAddress = createAsyncThunk('address/fetchAllAddress', async ({ userId }, { rejectWithValue }) => {
    try {
        console.log(userId)
        const response = await axios.get(`http://localhost:5000/api/shop/Address/get/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Edit an existing address
const editAddress = createAsyncThunk('address/editAddress', async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/shop/Address/update-Address/${userId}/${addressId}`,
            formData,
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Delete an address
const deleteAddress = createAsyncThunk('address/deleteAddress', async ({ userId, addressId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/shop/Address/${userId}/${addressId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export { addAddress, fetchAllAddress, editAddress, deleteAddress };




const AddressSlice = createSlice({
    name : 'AddressSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(addAddress.pending , (state) => {
            state.isLoading = true;
        }).addCase(addAddress.fulfilled , (state , action) => {
            state.isLoading = false;
            state.AddressList = action.payload.data;
        }).addCase(addAddress.rejected , (state) => {
            state.isLoading = false;
            state.AddressList = [];
        }).addCase(fetchAllAddress.pending , (state) => {
            state.isLoading = true;
        }).addCase(fetchAllAddress.fulfilled , (state , action) => {
            state.isLoading = false;
            state.AddressList = action.payload.data;
        }).addCase(fetchAllAddress.rejected , (state) => {
            state.isLoading = false;
            state.AddressList = [];
        }).addCase(deleteAddress.pending , (state) => {
            state.isLoading = true;
        }).addCase(deleteAddress.fulfilled , (state , action) => {
            state.isLoading = false;
            state.AddressList = action.payload.data;
        }).addCase(deleteAddress.rejected , (state) => {
            state.isLoading = false;
            state.AddressList = [];
        }).addCase(editAddress.pending , (state) => {
            state.isLoading = true;
        }).addCase(editAddress.fulfilled , (state , action) => {
            state.isLoading = false;
            state.AddressList = action.payload.data;
        }).addCase(editAddress.rejected , (state) => {
            state.isLoading = false;
            state.AddressList = [];
        })
    }
})


export default AddressSlice.reducer;

