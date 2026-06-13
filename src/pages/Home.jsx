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
import { useSelector } from "react-redux"
import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useEffect , useState } from "react"
import { fetchGroups } from "../features/groupSlice"
import { createNewGroup } from '../features/groupSlice'
import { useForm } from "react-hook-form"
import { setCurrentGroup } from "../features/groupSlice"
import { useNavigate } from "react-router-dom"

function Home() {

  const authStatus = useSelector(state => state.auth.status)
  const { groups , loading , error } = useSelector(state => state.groups)
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false)
  const { register , handleSubmit , reset } = useForm()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userData)

  useEffect( () => {
    dispatch(fetchGroups())
  }, [dispatch])

  const handleCreateGroup = async (data) => {
    await dispatch(createNewGroup({ name : data.groupName , description : '' }))
    reset()
    setShowForm(false)
  }

  const handleCancel = () => {
    reset()
    setShowForm(false)
  }

  if (authStatus === false) {
    return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col items-center text-center max-w-sm w-full">

        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
          <Lock className="size-8 text-[#94A3B8]" />
        </div>

        <h2 className="text-[#F8FAFC] text-xl font-bold mb-2">
          Login Required
        </h2>
        <p className="text-[#94A3B8] text-sm mb-8">
          You need to be logged in to view this page
        </p>

        <div className="flex flex-col gap-3 w-full">
          <Link to="/login" className="w-full">
            <Button className="w-full bg-[#F8FAFC] text-[#0F172A] hover:bg-white/5 hover:text-white rounded-xl font-semibold h-10">
              Login
            </Button>
          </Link>

          <Link to="/signup" className="w-full">
            <Button variant="outline" className="w-full border-white/10 text-black hover:bg-white/5 hover:text-white rounded-xl h-10">
              Create Account
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
  }
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Greeting + Balance */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Welcome Back, {user?.user_metadata?.name}
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

        {/* stats cards */}
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

        {/* quick actions */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
            <Button className="bg-[#F8FAFC] text-[#0F172A] hover:bg-white/5
             hover:text-white cursor-pointer
            rounded-xl gap-2 h-10 px-5 font-semibold"
            onClick = { () => navigate('/add-expense') }
            >
              <Plus className="size-4" />
               Add Expense
            </Button>
          
          <Button
            variant="outline"
            onClick = { () => setShowForm(true) }
            className="border-white/10 text-black hover:bg-white/5
             hover:text-[#F8FAFC] cursor-pointer rounded-xl gap-2 h-10 px-5"
          >
          <Users className="size-4" />
            Create Group
          </Button>

          {
            showForm && (
              <form 
                  onSubmit={handleSubmit(handleCreateGroup)} 
                  className="bg-[#1E293B] border border-white/5 rounded-2xl p-5 sm:p-6 w-full max-w-md"
              >
                <input
                  type="text"
                  placeholder="Enter group name..."
                  className="w-full h-11 px-4 rounded-xl bg-[#0F172A] border border-white/10 
                  text-[#F8FAFC] text-sm placeholder:text-[#64748B]
                  focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500
                  transition-all duration-200 mb-4"
                  {...register('groupName', {
                    required: 'Group name is required'
                  })}
                />

                <div className="flex gap-3 mt-2">
                <Button
                    type="submit"
                    className="flex-1 h-10 bg-[#F8FAFC] text-[#0F172A] 
                   hover:bg-white/90 hover:scale-[1.02] 
                    transition-all duration-200 rounded-xl font-semibold"
                >
                  Create
                 </Button>

                <Button
                  variant="outline"
                  type = 'button'
                  onClick={handleCancel}
                  className="flex-1 h-10 border-white/10 text-black 
                 hover:bg-white/5 hover:text-white 
                  transition-all duration-200 rounded-xl"
                >
                  Cancel
                </Button>
                </div>
              </form>
          )
        }

          <Button
            variant="outline"
            className="border-white/10 text-black hover:bg-white/5 
            hover:text-[#F8FAFC] cursor-pointer rounded-xl gap-2 h-10 px-5"
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
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5
                 cursor-pointer rounded-xl text-sm gap-1.5 h-8 px-3"
              >
                View All
                <ArrowUpRight className="size-3.5" />
              </Button>
            </div>

            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10
             flex flex-col items-center justify-center text-center">
              <Users className="size-10 text-[#334155] mb-3" />
              {
                groups.length === 0 ? (
                  <>
                    <p className="text-[#F8FAFC] font-medium">No groups yet</p>
                    <p className="text-[#94A3B8] text-sm mt-1">
                         Create a group to start splitting expenses
                    </p>
                  </>
                ) : (
                  groups.map( (group) => (
                    <div key={group.id}
                       className="flex items-center justify-between p-4 bg-[#0F172A] 
                        border border-white/5 rounded-xl mb-2 cursor-pointer hover:border-white/20 
                        transition-all"
                        onClick={ () => {
                          dispatch(setCurrentGroup(group)) // user's current group
                          navigate(`/groups/${group.id}`)
                        }}
                        >
                          <div>
                            <p className="text-[#F8FAFC] font-medium">{group.name}</p>
                          </div>
                          <ArrowUpRight className="size-4 text-[#94A3B8]" />
                     </div>
                  ))
                )
              }
            </div>
          </div>

          {/* recent activity section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Recent Activity</h2>
              <Button
                variant="ghost"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 
                cursor-pointer rounded-xl text-sm gap-1.5 h-8 px-3"
              >
                <Receipt className="size-3.5" />
                All
              </Button>
            </div>

            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex 
            flex-col items-center justify-center text-center">
              <Receipt className="size-10 text-[#334155] mb-3" />
              <p className="text-[#F8FAFC] font-medium">No activity yet</p>
              <p className="text-[#94A3B8] text-sm mt-1">
                Your recent expenses will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
