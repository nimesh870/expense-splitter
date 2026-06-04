import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function AddExpense() {
  const [split, setSplit] = useState("equal")

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Back + Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            Add Expense
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 sm:p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* Group selector */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Group</label>
              <select className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none">
                <option>Select a group</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="e.g. Groceries, Dinner, Gas"
                className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Amount</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full h-10 pl-8 pr-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
            </div>

            {/* Paid by */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Paid by</label>
              <select className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none">
                <option>Select who paid</option>
              </select>
            </div>

            {/* Split type */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Split</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSplit("equal")}
                  className={`flex-1 h-9 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    split === "equal"
                      ? "bg-[#F8FAFC] text-[#0F172A]"
                      : "bg-[#0F172A] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC]"
                  }`}
                >
                  Equal
                </button>
                <button
                  type="button"
                  onClick={() => setSplit("custom")}
                  className={`flex-1 h-9 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    split === "custom"
                      ? "bg-[#F8FAFC] text-[#0F172A]"
                      : "bg-[#0F172A] text-[#94A3B8] border border-white/10 hover:text-[#F8FAFC]"
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Split between */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Split between</label>
              <div className="bg-[#0F172A] border border-white/10 rounded-xl p-10 flex flex-col items-center justify-center text-center">
                <p className="text-[#94A3B8] text-sm">
                  Group members will appear here
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] cursor-pointer rounded-xl h-10 gap-2 font-semibold">
              <Plus className="size-4" />
              Add Expense
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
