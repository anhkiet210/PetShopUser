import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        listProducts: [],
        category: []
    }, 
    reducers: {
        getlistProducts: (state, action) => {
            state.listProducts = action.payload
        },
        getCategory: (state,action) => {
            state.category = action.payload
        }
    }
})

export default ProductSlice;