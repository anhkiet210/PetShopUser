import {createSlice} from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItem: [],
    },
    reducers: {
        addToCart: (state, action) => {

            const isExitProduct = state.cartItem.filter(item => item._id === action.payload._id)
            if(isExitProduct){
                isExitProduct.quantityPurchased += 1
            }else{
                state.cartItem.push(action.payload)
            }
            // const isExitIndex = state.cartItem.findIndex(
            //     (item) => item._id === action.payload._id
            // )
            // if(isExitIndex >= 0 ){
            //     // state.cartItem[isExitIndex].quantityPurchased = action.payload.cartQuantity
            //     state.cartItem[isExitIndex].quantityPurchased += 1
            //     // alert("Sản phẩm đã có trong giỏ hàng!")
            //     // return 0
            // }
            // else{
            //     state.cartItem.push(action.payload)
            // }
        }, 
        removeFromCart: (state, action) => {
            const isExitIndex = state.cartItem.findIndex(
                (item) => item._id === action.payload._id
            )
            if(isExitIndex >= 0 ){
                state.cartItem.splice(isExitIndex, 1)
            }
        },
        updateQuantity: (state, action) => {
            const isExitIndex = state.cartItem.findIndex(
                (item) => item._id === action.payload._id
            )
            if(isExitIndex >= 0 ){
                state.cartItem[isExitIndex].quantityPurchased += action.payload.quantityPurchased
            }
        },
    }
})

export default CartSlice;