import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch , useSelector } from "react-redux"
import { fetchGroupById, fetchGroups } from "../features/groupSlice"
import { addNewExpense } from "../features/expenseSlice"

export default function AddExpense() {
  const [split, setSplit] = useState("equal")
  const { register , handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { groups , currentGroup } = useSelector(state => state.groups)

  useEffect( () => {
    dispatch(fetchGroups())
  }, [dispatch])

  const handleSelect = (event) => {
    const groupId = event.target.value 

    if (groupId) {
      dispatch(fetchGroupById(groupId))
    }
  }

  const addExpense = async (data) => {
    try {
      const expense = await dispatch(addNewExpense({
      description : data.description,
      group_id : data.groupId,
      amount : Number(data.amount),
      paid_by : data.paidBy,
      split_type : split
      }))
    } catch (error) {
      console.log("Error while adding expense : ",error)
    }
  }


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
          <form className="space-y-6" onSubmit={handleSubmit(addExpense)}>

            {/* Group selector */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Group</label>
              <select 
              className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border
               border-white/10 text-[#F8FAFC] text-sm focus:outline-none
                focus:border-white/20 transition-colors appearance-none"
                
                {
                  ...register('groupId' , {
                    required : "Please select an option",
                    onChange : handleSelect
                  })
                }
                >
                  <option value="">Select group</option>
                  {
                    groups?.map( (group) => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))
                  }
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Description</label>
              <input
                type="text"
                placeholder="e.g. Groceries, Dinner, Gas"
                className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border
                 border-white/10 text-[#F8FAFC]
                 text-sm placeholder:text-[#64748B] focus:outline-none
                  focus:border-white/20 transition-colors"
                  {
                    ...register('description' , {
                      required : "Description is required"
                    })
                  }
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
                  className="w-full h-10 pl-8 pr-3.5 rounded-xl bg-[#0F172A] border
                   border-white/10 text-[#F8FAFC] text-sm placeholder:text-[#64748B]
                    focus:outline-none focus:border-white/20 transition-colors"
                    {
                      ...register('amount' , {
                        required : "Amount is required"
                      })
                    }
                />
              </div>
            </div>

            {/* Paid by */}
            <div className="space-y-1.5">
              <label className="text-[#F8FAFC] text-sm font-medium">Paid by</label>
              <select className="w-full h-10 px-3.5 rounded-xl bg-[#0F172A] border
               border-white/10 text-[#F8FAFC] text-sm focus:outline-none
                focus:border-white/20 transition-colors appearance-none"
                {
                  ...register('paidBy' , {
                    required : "You must select who paid",
                  })
                }
                >
                  <option value="">Select who paid</option>
                  {
                    currentGroup?.group_members?.map( (member) => (
                      <option key={member.user_id} value={member.user_id}> {member.users?.name} </option>
                    ))
                  }
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
              <div className="bg-[#0F172A] border border-white/10 rounded-xl p-8 flex
               flex-col items-center justify-center text-center">
                <div className="text-[#94A3B8] text-sm">
                  {
                    split === 'equal'&& (
                      <div className="bg-[#0F172A] border border-white/10
                       rounded-xl p-4 flex flex-col gap-2">
                        {
                          currentGroup?.group_members.map( (member) => (
                            <div key={member.user_id} className="flex items-center justify-between py-2 
                              border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                  <input type="checkbox"
                                  id={member.user_id}
                                  value={member.user_id}
                                  defaultChecked
                                  {...register('splits')}
                                  className="h-4 w-4 rounded cursor-pointer"
                                  />
                                  <label htmlFor={member.user_id}
                                   className="text-[#F8FAFC] text-sm cursor-pointer">
                                    {member.users?.name}
                                   </label>
                                </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }

                  {
                    split === 'custom' && (
                      <div className="bg-[#0F172A] border border-white/10
                       rounded-xl p-4 flex flex-col gap-2">
                        {
                          currentGroup?.group_members.map( (member) => (
                            <div key={member.user_id} className="flex items-center justify-between py-2
                            border-b border-white/5 last:border-0">
                              <span className="text-[#F8FAFC] text-sm">{member.users?.name}</span>
                              <input
                              type="number"
                              placeholder="0.00"
                              className="w-24 h-8 px-3 rounded-xl bg-[#1E293B] border border-white/10
                                 text-[#F8FAFC] text-sm focus:outline-none"
                                 {...register(`customSplits.${member.user_id}`)}
                               />
                            </div>
                          ))
                        }
                      </div>
                    )
                  }

                </div>
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