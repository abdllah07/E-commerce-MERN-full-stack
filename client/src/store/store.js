import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/productSlice' 
import shopProductsSlice from './shop/productSlice'
import shopCartSlice from './shop/cartSlice'
import shopAddressSlice from './shop/addressSlice'
import shopSearchSlice from './shop/SearchSlice'
import shopReviewsSlice from './shop/reviewSlice'
import commonSlice from './commonSlice'

import adminClothesCategorySlice from './admin/clothesCategories'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopSearch :shopSearchSlice,
        shopReview : shopReviewsSlice,
        commonFeature : commonSlice,
        clothesCategory : adminClothesCategorySlice 
    }
});


export default store;