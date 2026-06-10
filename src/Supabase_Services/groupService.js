import { supabase } from '../supabase'

// create a new group
export const createGroup = async ({name , description}) => {
    const { data : {user} } = await supabase.auth.getUser()

    // create the group
    const { data : group , error : groupError} = await supabase
        .from('groups')
        .insert({
            name,
            description,
            created_by : user.id
        })
        .select() // fetches data and returns it after inserting
        .single(); // returns one object instead of array

    if (groupError) throw groupError;

    // add creator as first member automatically
    const {error : memberError} = await supabase
        .from('group_members')
        .insert({
            group_id : group.id,
            user_id : user.id
        })

    if (memberError) throw memberError;

    return group;
}

// get single group by id
export const getGroupById = async (groupId) => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      *,
      group_members!inner(
        user_id,
        users(id, name, email)
      )
    `)
    .eq('id', groupId)
    .single()

  if (error) throw error
  return data
}

// get all groups of current user
export const getGroups = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('group_members')
        .select(`
            groups(
                *,
                group_members(
                    user_id,
                    users(id, name, email)
                )
            )
        `)
        .eq('user_id', user.id)

    if (error) throw error
    return data.map(item => item.groups)
}

// add member to group by email
 export const addMember = async (groupId , email) => {
    // find user by email
    const {data : user , error : userError} = await supabase
        .from('users')
        .select('id , name , email')
        .eq('email' , email)
        .single();

        if (userError) throw new Error("User not found with this email")

    // check if already a member
    const {data : Existing} = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id' , groupId)
        .eq('user_id' , user.id)
        .single()

        if (Existing) throw new Error("User is already a member of this group")

    // add members
    const {data , error} = await supabase
        .from('group_members')
        .insert({
            group_id : groupId,
            user_id : userId
        })
        .select()
        .single()

    if (error) throw error;
    return {...data , user}
}

// remove member from group
export const removeMember = async (groupId , userId) => {
    const {error} = await supabase
        .from('group_members')
        .delete()
        .eq('group_id' , groupId)
        .eq('user_id' , userId)

    if (error) throw error;
    return true
}

// delete group
export const deleteGroup = async (groupId) => {
    const {error} = await supabase
        .from('groups')
        .delete()
        .eq('id' , groupId)

    if (error) throw error;
    return true
}