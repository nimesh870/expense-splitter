import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { signup as signupService } from "../Supabase_Services/Authentication"
import { useDispatch } from "react-redux"
import { login } from '../features/authSlice'
import { showToast } from "../features/toastSlice"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { register , handleSubmit , formState : {errors} , getValues } = useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signupHandler = async (data) => {
    setLoading(true)
    try {
      const result = await signupService({
        name : data.name,
        email : data.email,
        password : data.password
      })

      if (result) {
        dispatch(login({
          userData : result.data,
          token : result.session.access_token
        }))

        dispatch(showToast({
          message : "Account successfully created",
        }))
        navigate('/')
      }
      
    } catch (error) {
      console.log("Error while signing in : " , error)
      dispatch(showToast({
        message : "User already exists",
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-[#F8FAFC] text-2xl font-bold tracking-tight">
            SplitEase
          </Link>
          <p className="text-[#94A3B8] text-sm mt-2">Create your free account</p>
        </div>

        {/* form Card */}
        <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit(signupHandler)}>

            {/* name */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm
                 placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
                 {
                  ...register('name' , {
                    required : "Name is required"
                  })
                 }
              />
            </div>

            {/* email */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] 
                text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
                {
                  ...register('email' , {
                    required : "Email is required",
                    validate : {
                      matchPattern : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(value)
                      || "Enter valid email address"
                    }
                  })
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#0F172A] border
                   border-white/10 text-[#F8FAFC] text-sm
                   placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
                   {
                    ...register('password' , {
                      required : 'Password is required',
                      minLength : 8
                    })
                   }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm
                   placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
                   {
                    ...register('confirmPassword' , {
                      required : 'Confirm your password',
                      validate : (value) => value === getValues('password') || "Password do not match"
                    })
                   }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button 
            disabled = {loading}
            type = "submit"
            className="w-full bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0]
             cursor-pointer rounded-xl h-10 gap-2 font-semibold">
              <UserPlus className="size-4" />
              { loading ? 'creating account...' : 'Create Account' }
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[#94A3B8] text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F8FAFC] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
