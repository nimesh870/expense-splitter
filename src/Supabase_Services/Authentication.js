import { supabase } from './supabase'

// signUp
export const signup = async ({email , password , name}) => {
    const { data , error } = await supabase.auth.signUp({
        email,
        password,
        options : {
            data : {name}
        }
    })

    if (error) throw error;
    return data;
}

// login
export const login = async ({email , password}) => {
    const data = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw error;
    return data
}

// logout
export const logout = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) throw error;
}

// Get Current User
export const getCurrentUser = async () => {
    const {data : {user} , error} = await supabase.auth.getUser();

    if (error) throw error;
    return user;
}

// Get Current Session
export const getCurrentSession = async () => {
    const {data : {session} , error} = await supabase.auth.getSession();

    if (error) throw error;
    return session;
}

// Listen to auth state changes

export const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange((_event , session) => {
        callback(session)
    })
}