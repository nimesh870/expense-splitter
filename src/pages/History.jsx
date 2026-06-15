import { useState , useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  Search,
} from "lucide-react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { fetchAllTransactions } from "../features/transactionSlice"
import { useNavigate } from "react-router-dom"

const filters = ["All", "You paid", "You owe"]

export default function History() {

  const [activeFilter, setActiveFilter] = useState("All")
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userData)
  const { transactions , loading } = useSelector(state => state.transactions)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAllTransactions())
  },[dispatch])

  const filteredDetails = transactions
        .filter( (transaction) => {
          if (activeFilter === "You paid") return transaction.from_user === user?.id
          if (activeFilter === "You owe") return transaction.to_user === user?.id
          return true
        })
        .filter( (transaction) => {
          transaction.from_user_details?.name?.toLowerCase().includes(query.toLowerCase()) ||
          transaction.to_user_details?.name?.toLowerCase().includes(query.toLowerCase())
        })

  const totalPaid = transactions
        .filter( transaction => transaction.from_user === user?.id )
        .reduce( (sum , transaction) => sum + transaction.amount ,0)

  const totalOwed = transactions
        .filter( transaction  => transaction.to_user === user?.id )
        .reduce( (sum , transaction) => sum + transaction.amount , 0)

  const netAmount = totalPaid - totalOwed;

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <ArrowLeft className="size-8 flex text-white" 
          onClick={ () => navigate('/') }
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              History
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">
              All your past expenses
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748B]" />
          <input
            type="text"
            value={query}
            onChange={ (event) => setQuery(event.target.value) }
            placeholder="Search expenses..."
            className="w-full h-10 pl-10 pr-3.5 rounded-xl bg-[#1E293B] 
            border border-white/10 text-[#F8FAFC] text-sm
             placeholder:text-[#64748B] focus:outline-none
              focus:border-white/20 transition-colors"
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
              <span className="text-emerald-400 font-semibold text-sm">${totalPaid.toFixed(2)}</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <ArrowUpRight className="size-4 text-rose-400" />
              <span className="text-[#94A3B8] text-sm">You owe</span>
              <span className="text-rose-400 font-semibold text-sm">${totalOwed.toFixed(2)}</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-[#94A3B8]">Net: </span>
            <span className="text-[#F8FAFC] font-semibold">${netAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Expense list */}
        {
          filteredDetails.length > 0 ? (
            <div className="bg-[#1E293B] border border-white/5
             rounded-2xl divide-y divide-white/5">
              {
                filteredDetails.map( (transaction) => (
                  <div key={transaction.id}
                   className="flex justify-center items-center p-4">
                    <div>
                      <p className="text-[#F8FAFC] font-medium">
                        { transaction.id === user?.id 
                          ? `You paid ${transaction.to_user_details?.name}`
                          : `${transaction.to_user_details?.name} paid you`
                        }
                      </p>
                      <p className="text-[#94A3B8] text-sm mt-0.5">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className={`font-semibold ${
                          transaction.from_user === userData?.id
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }`}>
                        {transaction.from_user === user?.id ? "-" : '+'}
                        ${transaction.amount}
                      </p>
                      <p className="text-[#94A3B8] text-xs mt-0.5">{transaction.status}</p>
                    </div>
                   </div>
                ))
              }
            </div>
          ) : (
                <div className="bg-[#1E293B] border border-white/5 rounded-2xl
                  p-10 flex flex-col items-center justify-center text-center">
                  <Receipt className="size-10 text-[#334155] mb-3" />
                  <p className="text-[#F8FAFC] font-medium">No expenses yet</p>
                  <p className="text-[#94A3B8] text-sm mt-1">
                    Your expense history will appear here
                  </p>
                </div>
          )
        }
      </div>
    </div>
  )
}
