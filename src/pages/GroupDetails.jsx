import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Users,
  Plus,
  DollarSign,
  MoreHorizontal,
  Trash2
} from "lucide-react"
import { useSelector } from "react-redux"
import { useParams , Link , useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addNewMember, deleteExistingGroup, fetchGroupById, removeGroupMember } from "../features/groupSlice"
import { useForm } from "react-hook-form"
import { fetchExpenses , deleteExistingExpense } from "../features/expenseSlice"
import { createNewTransaction } from '../features/transactionSlice'


const calculateBalances = (expenses , currentUserId) => {
  const owes = {}

  expenses.forEach(expense => {
    const paidBy = expense.paid_by

    expense.expense_splits.forEach( (split) => {
      const userId = split.user_id // who this split belongs to
      const amount = split.amount

      if (userId === paidBy) return

      if (paidBy === currentUserId) {
        owes[userId] = (owes[userId] || 0) + amount
      } else if (userId === currentUserId) {
        owes[paidBy] = (owes[paidBy] || 0) - amount
      }

    })
  });

  return owes;
}

export default function GroupDetails() {
  const currentGroupDetails = useSelector(state => state.groups.currentGroup)
  const user = useSelector(state => state.auth.userData)
  const { expenses } = useSelector(state => state.expenses)
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const { register , handleSubmit , reset } = useForm()
  const balances = calculateBalances(expenses , user?.id)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(fetchGroupById(id))
      dispatch(fetchExpenses(id))
    }
  }, [id, dispatch])

  if (!currentGroupDetails) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <p className="text-[#94A3B8]">Loading...</p>
      </div>
    )
  }

  // add member
  const addMember = async (data) => {
     if (user.email === data.email) {
      console.log("You can't add yourself")
      return
      }

      const result = await dispatch(addNewMember({
        groupId : currentGroupDetails.id,
        email : data.email // from form name email(register)
      }))

      if (result.meta.requestStatus === 'rejected') {
        console.log(result.payload)
        return
    }
    reset()
    setShowForm(false)
  }

  // remove member
  const removeMember = async (userId) => {
    await dispatch(removeGroupMember({
      groupId : currentGroupDetails.id,
      userId
    }))
  }

  // delete group
  const deleteGroup = async (groupId) => {
    const result = await dispatch(deleteExistingGroup(groupId))

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/')
    }
  }

  // delete expense 
  const handleDeleteCurrentExpense = async (expenseId) => {
    const result = await dispatch(deleteExistingExpense(expenseId))

    if (result.meta.requestStatus === "rejected") {
      console.log("Error while deleting expense")
    }
  }

  const handleCancel = () => {
    reset()
    setShowForm(false)
  }

  const getMemberName = (userId) => {
    const member = currentGroupDetails?.group_members?.find(
      member => member.user_id === userId
    )
    return member?.users?.name || 'Unknown'
  }

  const handleSettleUp = async (toUserId, amount) => {
    const result = await dispatch(createNewTransaction({
        groupId: currentGroupDetails.id,
        fromUser: user.id,
        toUser: toUserId,
        amount
    }))

    if (result.meta.requestStatus === 'fulfilled') {
        console.log('Transaction created successfully')
        // TODO: toast.success('Settled up successfully')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Back + Header */}
        <div className="flex items-center gap-4 mb-6 justify-between">
          <div className="flex items-center gap-4">
          <Link to="/" className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              {currentGroupDetails?.name}
            </h1>
            <p className="text-[#94A3B8] text-sm mt-1">{ currentGroupDetails?.group_members?.length || 0 } member &middot; ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)} total </p>
          </div>
         </div>
          {/* Delete group button */}
          <Button
            onClick = { () => deleteGroup(currentGroupDetails.id) }
            variant="outline"
            className="bg-red-500 border-0 hover:bg-red-500/10
           text-white hover:text-red-500 cursor-pointer mb-2 rounded-xl gap-2 h-10 px-5"
            >
              Delete Group
          </Button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button className="bg-[#F8FAFC] text-[#0F172A] hover:bg-white/5
           hover:text-white cursor-pointer rounded-xl gap-2 h-10 px-5 font-semibold"
           onClick = { () => navigate(`/add-expense?groupId=${id}`) }
           >
            <Plus className="size-4" />
            Add Expense
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
            <div className="bg-[#1E293B] border border-white/5
              rounded-2xl p-10 flex flex-col 
              items-center justify-center text-center">
              <Users className="size-10 text-[#334155] mb-3" />
              {
                currentGroupDetails.group_members?.length > 0 ? (
                  <div>
                    {
                      currentGroupDetails.group_members.map( (member) => (
                        <div key={member.user_id} className="flex items-center justify-between py-3 border-b
                         border-white/5 last:border-0">
                          <div>
                            <p className="text-[#F8FAFC] font-medium"> {member.users?.name} </p>
                            <p className="text-[#F8FAFC] font-medium"> {member.users?.email} </p>
                          </div>
                            <Button
                            onClick = { () => removeMember(member.user_id) }
                            variant="outline"
                            className="bg-red-500 border-0 hover:bg-red-500/10 text-white
                             hover:text-red-500 mx-5 cursor-pointer rounded-xl gap-2 h-10 px-5"
                            >
                              <Trash2 className="size-6" />
                            </Button>
                        </div>
                        
                      ))
                    }
                  </div>
                ) : (
                  <div>
                    <p className="text-[#F8FAFC] font-medium"> No members yet </p>
                    <p className="text-[#94A3B8] text-sm mt-1"> Add members to start splitting </p>
                  </div>
                )
              }
                <Button className="bg-[#F8FAFC] text-[#0F172A] hover:bg-white/5
                 hover:text-white cursor-pointer rounded-xl gap-2 h-10 px-5 font-semibold mt-2"
                 onClick = { () => setShowForm(true) }
                 >
                <Plus className="size-4" />
                   Add Member
                </Button>
            </div>
            
            {
              showForm && (
                  <form 
                  onSubmit={handleSubmit(addMember)} 
                  className="bg-[#1E293B] mt-2 border border-white/5 rounded-2xl p-5 sm:p-6 w-full max-w-md"
              >
                <input
                  type="text"
                  placeholder="member@member.com"
                  className="w-full h-11 px-4 rounded-xl bg-[#0F172A] border border-white/10 
                  text-[#F8FAFC] text-sm placeholder:text-[#64748B]
                  focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500
                  transition-all duration-200 mb-4"
                  {...register('email', {
                    required: 'Member email is required',
                    validate : {
                      matchPattern : (value) =>  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(value)
                      || "Enter valid email address"
                    }
                  })}
                />

                <div className="flex gap-3 mt-2">
                <Button
                    type="submit"
                    className="flex-1 h-10 bg-[#F8FAFC] text-[#0F172A] 
                   hover:bg-white/90 hover:scale-[1.02] 
                    transition-all duration-200 rounded-xl font-semibold"
                >
                  Add
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

          </div>

          {/* Expenses list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#F8FAFC]">Expenses</h2>
              <Button
                variant="ghost"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 
                cursor-pointer rounded-xl text-sm h-8 px-3"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
            {
              expenses.length > 0 ? (
                <div className="bg-[#1E293B] border border-white/5
                 rounded-2xl divide-y divide-white/5">
                  {
                    expenses.map( (expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="text-[#F8FAFC] font-medium">Paid For {expense.description}</p>
                          <p className="text-[#94A3B8] text-sm mt-0.5">Paid By {expense.users?.name}  &middot; At {expense.date} </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[#F8FAFC] font-semibold">${expense.amount}</p>
                          <p className="text-[#94A3B8] text-sm mt-0.5">{expense.split_type}</p>
                          <Button
                            onClick = { () => handleDeleteCurrentExpense(expense.id) }
                            variant="outline"
                            className="bg-red-500 border-0 hover:bg-red-500/10 text-white
                             hover:text-red-500 my-2 cursor-pointer rounded-xl gap-2 h-10 px-5"
                          >
                              <Trash2 className="size-6" />
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                    <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-10 flex flex-col
                     items-center justify-center text-center">
                      <Plus className="size-10 text-[#334155] mb-3" />
                      <p className="text-[#F8FAFC] font-medium">No expenses yet</p>
                      <p className="text-[#94A3B8] text-sm mt-1">
                        Add your first expense to get started
                      </p>
                  </div>
              )
            }
          </div>
        </div>
        {/* balances */}
          {
            Object.keys(balances).length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-[#F8FAFC] mb-4">Balances</h2>
                <div className="bg-[#1E293B] border border-white/5
                 rounded-2xl divide-y divide-white/5">
                  {
                    Object.entries(balances).map( ([userId , amount]) => (
                      amount !== 0 && (
                        <div key={userId} className="flex items-center justify-between p-4">
                          <div>
                            <p className="text-[#F8FAFC] font-medium">
                              {
                                amount > 0 
                                ? `${getMemberName(userId)} owes you`
                                : `You owe ${getMemberName(userId)}`
                              }
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p 
                            className={`font-semibold ${amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}> 
                              ${Math.abs(amount).toFixed(2)} 
                            </p>
                            {
                              amount < 0 && (
                                <Button
                                  type="button"
                                  className="bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0]
                                  cursor-pointer rounded-xl h-8 px-3 text-sm font-semibold"
                                  onClick={ () => handleSettleUp(userId , Math.abs(amount)) }
                                >
                                    Settle Up
                                </Button>
                              )
                            }
                          </div>
                        </div>
                      )
                    ))
                  }
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}
