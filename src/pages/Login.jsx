import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-[#F8FAFC] text-2xl font-bold tracking-tight">
            SplitEase
          </Link>
          <p className="text-[#94A3B8] text-sm mt-2">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 sm:p-8">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button className="w-full bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] cursor-pointer rounded-xl h-10 gap-2 font-semibold">
              <LogIn className="size-4" />
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-[#94A3B8] text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#F8FAFC] hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
