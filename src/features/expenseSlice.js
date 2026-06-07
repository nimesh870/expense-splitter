import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { addExpense , getAllExpenses , getSingleExpenseById , deleteExpense} from "../Supabase_Services/expenseService";

// async thunks
export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async (groupId , thunkAPI) => {
        try {
            const data = await getAllExpenses(groupId)
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchExpenseById = createAsyncThunk(
    'expenses/fetchExpenseById',
    async (expenseId , thunkAPI) => {
        try {
            const data = await getSingleExpenseById(expenseId)
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addNewExpense = createAsyncThunk(
    'expenses/addNewExpense' , 
    async ({groupId, description, amount, paidBy, splitType, splits} , thunkAPI) => {
        try {
            const data = await addExpense({groupId, description, amount, paidBy, splitType, splits})
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteExistingExpense = createAsyncThunk(
    'expenses/deleteExistingExpense',
    async (expenseId , thunkAPI) => {
        try {
            await deleteExpense(expenseId);
            return expenseId

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// slice
const expenseSlice = createSlice({
    name : 'expenses',

    initialState : {
        loading : false,
        error : null,
        expenses : [], // list of all users expenses
        currentExpense : null // expense currently being viewed
    },

    reducers : {
        setExpense : (state , action) => {
            state.currentExpense = action.payload
        }
    },

    extraReducers : (builder) => {
        builder 

        //fetchExpenses
        .addCase(fetchExpenses.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchExpenses.fulfilled , (state , action) => {
            state.loading = false
            state.expenses = action.payload
        })
        .addCase(fetchExpenses.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //fetchExpenseById
        .addCase(fetchExpenseById.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchExpenseById.fulfilled , (state , action) => {
            state.loading = false
            state.currentExpense = action.payload
        })
        .addCase(fetchExpenseById.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //addNewExpense
        .addCase(addNewExpense.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addNewExpense.fulfilled , (state , action) => {
            state.loading = false
            state.expenses.push(action.payload)
        })
        .addCase(addNewExpense.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //deleteExistingExpense
        .addCase(deleteExistingExpense.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteExistingExpense.fulfilled , (state , action) => {
            state.loading = false
            state.expenses = state.expenses.filter( expense => expense.id !== action.payload )
            state.currentExpense = null
        })
        .addCase(deleteExistingExpense.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export const { setExpense } = expenseSlice.actions;
export default expenseSlice.reducer;