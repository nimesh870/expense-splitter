import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus : false,
    userData : null,
    token : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state , action) => {
            state.authStatus = true
            state.userData = action.payload.userData
            state.token = action.payload.token
        },

        logout : (state) => {
            state.authStatus = false
            state.userData = null
            state.token = null
        }
    }
})

export const { login , logout } = authSlice.actions;
export default authSlice.reducer;