import { supabase } from '../supabase'

// creating transaction
export const createTransaction = async ({groupId, fromUser, toUser, amount}) => {
    const {data , error} = await supabase
        .from('transactions')
        .insert({
            group_id : groupId,
            from_user : fromUser,
            to_user : toUser,
            amount,
            status : 'pending'
        })
        .select()
        .single()

        if (error) throw error;
        return data;
}

// get all transactions from a group
export const getAllTransactions = async (groupId) => {
    const {data , error} = await supabase
        .from('transactions')
        .select(`*,
                from_user_details:users!from_user(id , name , email),
                to_user_details:users!to_user(id , name , email)
        `)
        .eq('group_id' , groupId)
        .order('date' , { ascending : false } )

    if (error) throw error;
    return data;
}

// get all transactions of current user across all groups
export const getUserTransactions = async () => {
    const {data : {user} } = await supabase.auth.getUser()

    const { data , error } = await supabase
        .from('transactions')
        .select(`*,
                from_user_details:users!from_user(id , name , email),
                to_user_details:users!to_user(id , name , email)
        `)
        .or(`from_user.eq.${user.id},to_user.eq.${user.id}`)
        .order('date' , { ascending : false } )

    if (error) throw error;
    return data
}

// markdown transactions as settled
export const updateTransactions = async (transactionId) => {
    const {data , error} = await supabase
        .from('transactions')
        .update({ status : 'settled' })
        .eq('id' , transactionId)
        .select()
        .single()

    if (error) throw error;
    return data;
}