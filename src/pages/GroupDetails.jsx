import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Users,
  Plus,
  DollarSign,
  MoreHorizontal,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function GroupDetails() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Back + Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Group Name
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">0 members &middot; $0.00 total</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button className="bg-[#F8FAFC] text-[#0F172A] hover:bg-white/5
           hover:text-white cursor-pointer rounded-xl gap-2 h-10 px-5 font-semibold">
            <Plus className="size-4" />
            Add Expense
          </Button>

          <Button
            variant="outline"
            className="border-white/10 text-black hover:bg-white/5
             hover:text-white cursor-pointer rounded-xl gap-2 h-10 px-5"
          >
            <DollarSign className="size-4" />
            Settle Up
          </Button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Members sidebar */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4 flex items-center gap-2">
              <Users className="size-4" />
              Members
            </h2>
            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Users className="size-10 text-[#334155] mb-3" />
              <p className="text-[#F8FAFC] font-medium">No members yet</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Add members to start splitting
              </p>
            </div>
          </div>

          {/* Expenses list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Expenses</h2>
              <Button
                variant="ghost"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 cursor-pointer rounded-xl text-sm h-8 px-3"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>

            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Plus className="size-10 text-[#334155] mb-3" />
              <p className="text-[#F8FAFC] font-medium">No expenses yet</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Add your first expense to get started
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
