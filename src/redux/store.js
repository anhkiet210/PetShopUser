import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cartSlice";
import ProductSlice from "./productSlice";
import UserSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        cart: CartSlice.reducer,
        products: ProductSlice.reducer,
    }
})

export default store;