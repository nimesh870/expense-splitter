import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

const LogoutBtn = () => {
    return (
        <Button 
        variant='ghost'
        className='text-red-400 hover:text-red-500 hover:bg-red-500/10 
        cursor-pointer rounded-xl gap-2 font-semibold transition-all duration-200'
        >
            <LogOut className='size-4' />
            Logout
        </Button>
    )
}

export default LogoutBtn
