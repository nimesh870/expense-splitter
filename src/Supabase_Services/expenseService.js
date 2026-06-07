import { supabase } from "../supabase";

// creating and splitting expense together
export const addExpense = async ({groupId, description, amount, paidBy, splitType, splits}) => {
    // creating expense
    const {data : expense , error : expenseError} = await supabase
        .from('expenses')
        .insert({
            group_id : groupId,
            description,
            amount,
            paid_by : paidBy,
            split_type : splitType
        })
        .select()
        .single()

        if (expenseError) throw expenseError;

    // inserting splits
    const splitsData = splits.map(split => ({
        expense_id : expense.id,
        user_id : split.userId,
        amount : split.amount
    }))

    const {error : splitsError} = await supabase
        .from('expense_splits')
        .insert(splitsData)

    if (splitsError) throw splitsError;

    return expense;
}

// get all expenses of a group
export const getAllExpenses = async (groupId) => {
    const {data , error} = await supabase
        .from('expenses')
        .select(`*,
            users(id , name , email),
            expense_splits(
            user_id,
            amount,
            users(id , name , email)
            )
        `)
        .eq('group_id' , groupId)
        .order('created_at' , {ascending : false})

    if (error) throw error;
    return data;
}

// get single expense by id
export const getSingleExpenseById = async (expenseId) => {
    const {data , error} = await supabase
        .from('expenses')
        .select(`*, 
                users(id , name , email),
                expense_splits(
                    user_id,
                    amount,
                    users(id , name , email)
                )
            `)
        .eq('id' , expenseId)
        .single()

    if (error) throw error;
    return data
}

// delete expense 
export const deleteExpense = async (expenseId) => {
    const {error} = await supabase
        .from('expenses')
        .delete()
        .eq('id' , expenseId)

    if (error) throw error;
    return true;
}