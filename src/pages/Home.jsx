import { Button } from "@/components/ui/button"
import {
  Plus,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  TrendingUp,
} from "lucide-react"

function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Greeting + Balance */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Welcome back
            </h1>
            <p className="text-[#94A3B8] text-sm sm:text-base mt-1">
              Here&apos;s your expense summary
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[#94A3B8] text-xs sm:text-sm font-medium uppercase tracking-wider">
              Total Balance
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              $0.00
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0 size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ArrowDownLeft className="size-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider">
                You are owed
              </p>
              <p className="text-lg font-bold text-emerald-400">$0.00</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0 size-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <ArrowUpRight className="size-5 text-rose-400" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider">
                You owe
              </p>
              <p className="text-lg font-bold text-rose-400">$0.00</p>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0 size-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
              <TrendingUp className="size-5 text-sky-400" />
            </div>
            <div>
              <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider">Net</p>
              <p className="text-lg font-bold text-[#F8FAFC]">$0.00</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Button className="bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] cursor-pointer rounded-xl gap-2 h-10 px-5 font-semibold">
            <Plus className="size-4" />
            Add Expense
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-[#F8FAFC] hover:bg-white/5 hover:text-[#F8FAFC] cursor-pointer rounded-xl gap-2 h-10 px-5"
          >
            <Users className="size-4" />
            Create Group
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-[#F8FAFC] hover:bg-white/5 hover:text-[#F8FAFC] cursor-pointer rounded-xl gap-2 h-10 px-5"
          >
            <Wallet className="size-4" />
            Settle Up
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Groups Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Your Groups</h2>
              <Button
                variant="ghost"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 cursor-pointer rounded-xl text-sm gap-1.5 h-8 px-3"
              >
                View All
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>

            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Users className="size-10 text-[#334155] mb-3" />
              <p className="text-[#F8FAFC] font-medium">No groups yet</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Create a group to start splitting expenses
              </p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Recent Activity</h2>
              <Button
                variant="ghost"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 cursor-pointer rounded-xl text-sm gap-1.5 h-8 px-3"
              >
                <Receipt className="size-3.5" />
                All
              </Button>
            </div>

            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Receipt className="size-10 text-[#334155] mb-3" />
              <p className="text-[#F8FAFC] font-medium">No activity yet</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Your recent expenses will appear here
              </p>
            </div>

            {/* Quick Tip */}
            <div className="mt-6 bg-[#1E293B] border border-white/5 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="shrink-0 size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="size-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-[#F8FAFC] text-sm font-semibold">Quick Tip</p>
                  <p className="text-[#94A3B8] text-xs mt-1 leading-relaxed">
                    You can settle debts directly from the group page. No more awkward
                    money conversations!
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
