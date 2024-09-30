import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/productSlice' 
import shopProductsSlice from './shop/productSlice'
import shopCartSlice from './shop/cartSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart : shopCartSlice
    }
});


export default store;