import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/productSlice' 
import shopProductsSlice from './shop/productSlice'
import shopCartSlice from './shop/cartSlice'
import shopAddressSlice from './shop/addressSlice'
import shopSearchSlice from './shop/SearchSlice'
import shopReviewsSlice from './shop/reviewSlice'
import commonSlice from './commonSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopSearch :shopSearchSlice,
        shopReview : shopReviewsSlice,
        commonFeature : commonSlice
    }
});


export default store;