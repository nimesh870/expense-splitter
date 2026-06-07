import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { createTransaction , getAllTransactions , getUserTransactions , updateTransactions } from '../Supabase_Services/transactionService'

// async thunks
export const fetchAllTransactions = createAsyncThunk(
    'transactions/fetchAllTransactions',
    async (groupId , thunkAPI) => {
        try {
            const data = await getAllTransactions(groupId)
            if (data)return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchUserTransaction = createAsyncThunk(
    'transactions/fetchUserTransaction',
    async (thunkAPI) => {
        try {
            const data = await getUserTransactions()
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createNewTransaction = createAsyncThunk(
    'transactions/createNewTransaction',
    async ({groupId, fromUser, toUser, amount} , thunkAPI) => {
        try {
            const data = await createTransaction({groupId, fromUser, toUser, amount})
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateExistingTransaction = createAsyncThunk(
    'transactions/updateExistingTransaction',
    async (transactionId , thunkAPI) => {
        try {
            const data = await updateTransactions(transactionId)
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// slice 
const transactionSlice = createSlice({
    name : 'transactions',

    initialState : {
        loading : false,
        transactions : [],
        currentTransaction : null,
        error : null
    },

    reducers : {
        setTransactions : (state , action) => {
            state.currentTransaction = action.payload
        }
    },

    extraReducers : (builder) => {
        builder

        //fetchAllTransactions
        .addCase(fetchAllTransactions.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAllTransactions.fulfilled , (state , action) => {
            state.loading = false
            state.transactions = action.payload
        })
        .addCase(fetchAllTransactions.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //fetchUserTransaction
        .addCase(fetchUserTransaction.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchUserTransaction.fulfilled , (state , action) => {
            state.loading = false
            state.currentTransaction = action.payload
        })
        .addCase(fetchUserTransaction.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //createNewTransaction
        .addCase(createNewTransaction.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createNewTransaction.fulfilled , (state , action) => {
            state.loading = false 
            state.transactions.push(action.payload)
        })
        .addCase(createNewTransaction.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //updateExistingTransaction
        .addCase(updateExistingTransaction.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateExistingTransaction.fulfilled , (state , action) => {
            state.loading = false
            state.transactions = state.transactions.map( transaction => transaction.id === action.payload.id ? action.payload : transaction )
        })
        .addCase(updateExistingTransaction.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;