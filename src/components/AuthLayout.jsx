import React , { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthLayout = ({children , authentication = true}) => {

    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const authStatus = useSelector( state => state.auth.status )

    useEffect( () => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setIsLoading(false)

    }, [navigate , authentication , authStatus])

    return isLoading ? (
        <div className="min-h-screen bg-[#0F172A] flex flex-col">

            {/* Header skeleton */}
            <div className="bg-[#0F172A] border-b border-white/10 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="h-6 w-28 bg-white/10 rounded-xl animate-pulse" />
                    {/* Nav items */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-8 w-16 bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-8 w-16 bg-white/10 rounded-xl animate-pulse" />
                        <div className="h-8 w-20 bg-white/10 rounded-xl animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Page content skeleton */}
            <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">

                {/* Page title */}
                <div className="h-8 w-48 bg-white/10 rounded-xl animate-pulse mb-2" />
                <div className="h-4 w-32 bg-white/10 rounded-xl animate-pulse mb-8" />

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[#1E293B] border border-white/5 rounded-2xl p-5">
                            <div className="h-3 w-16 bg-white/10 rounded animate-pulse mb-3" />
                            <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
                        </div>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-[#1E293B] border border-white/5 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
                                <div className="h-5 w-16 bg-white/10 rounded-xl animate-pulse" />
                            </div>
                            <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-3" />
                            <div className="h-3 w-20 bg-white/10 rounded animate-pulse mb-4" />
                            <div className="h-px bg-white/5 mb-4" />
                            <div className="flex items-center justify-between">
                                <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
                                <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : <>{children}</>
}

export default AuthLayout
