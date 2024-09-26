import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/productSlice' 
import shopProductsSlice from './shop/productSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice,
    }
});


export default store;