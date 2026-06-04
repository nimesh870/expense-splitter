import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Search,
} from "lucide-react"

const filters = ["All", "You paid", "You owe"]

export default function History() {
  const [activeFilter, setActiveFilter] = useState("All")

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              History
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">
              All your past expenses
            </p>
          </div>
          <Button
            variant="outline"
            className="border-white/10 text-black hover:text-[#F8FAFC] hover:bg-white/5 cursor-pointer rounded-xl gap-2 h-9 px-4 self-start"
          >
            <Filter className="size-4" />
            Filter
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-full h-10 pl-10 pr-3.5 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B] focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-[#F8FAFC] text-[#0F172A]"
                  : "bg-[#1E293B] text-[#94A3B8] border border-white/5 hover:text-[#F8FAFC]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Summary card */}
        <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ArrowDownLeft className="size-4 text-emerald-400" />
              <span className="text-[#94A3B8] text-sm">You paid</span>
              <span className="text-emerald-400 font-semibold text-sm">$0.00</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <ArrowUpRight className="size-4 text-rose-400" />
              <span className="text-[#94A3B8] text-sm">You owe</span>
              <span className="text-rose-400 font-semibold text-sm">$0.00</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-[#94A3B8]">Net: </span>
            <span className="text-[#F8FAFC] font-semibold">$0.00</span>
          </div>
        </div>

        {/* Expense list */}
        <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
          <Receipt className="size-10 text-[#334155] mb-3" />
          <p className="text-[#F8FAFC] font-medium">No expenses yet</p>
          <p className="text-[#94A3B8] text-sm mt-1">
            Your expense history will appear here
          </p>
        </div>
      </div>
    </div>
  )
}
