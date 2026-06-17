import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import expenseReducer from '../features/expenseSlice'
import groupReducer from '../features/groupSlice'
import transactionReducer from '../features/transactionSlice'
import toastReducer from '../features/toastSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        expenses : expenseReducer,
        groups : groupReducer,
        transactions : transactionReducer,
        toast : toastReducer
    }
})