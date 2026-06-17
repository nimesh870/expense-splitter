import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { logout as logoutService } from '../../Supabase_Services/Authentication'
import { logout as logoutFeature } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../features/toastSlice'
import Toast from '../../Toast'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const userLogout = await logoutService();
            dispatch(logoutFeature())
            navigate('/login')
        } catch (error) {
            console.log("Logout error : " , error)
        }
    }

    return (
        <>
            <Button 
            onClick = { logoutHandler }
            variant='ghost'
            className='text-red-400 hover:text-red-500 hover:bg-red-500/10 
            cursor-pointer rounded-xl gap-2 font-semibold transition-all duration-200'
            >
                <LogOut className='size-4' />
                Logout
            </Button>
            <Toast />
        </>
    )
}

export default LogoutBtn
