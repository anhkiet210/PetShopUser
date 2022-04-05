import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:'user',
    initialState: {
        currentUser: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        updateInfo: (state, action) => {},
        changePassword: (state, action) => {},
        logout: (state) => {
            state.currentUser = null
        }
    }
})

export default UserSlice;