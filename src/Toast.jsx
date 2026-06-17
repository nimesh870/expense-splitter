import React , { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideToast } from './features/toastSlice'

const Toast = ({message , duration = 3000}) => {
    const dispatch = useDispatch()

    useEffect( () =>  {
        const timer = setTimeout( () => dispatch(hideToast()), duration)
        return () => clearTimeout(timer)
    }, [dispatch , duration])

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-slate-500 text-white px-6 py-3
    rounded-xl shadow-lg flex items-center gap-3 animate-fade-in`}>
        <p className='text-sm font-medium'>{message}</p>
    </div>
  )
}

export default Toast
