import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { createGroup , getGroupById , getGroups , addMember , removeMember , deleteGroup } from '../Supabase_Services/groupService'

// async thunks
export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async(_ , thunkAPI) => {
        try {
            const data = await getGroups()
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchGroupById = createAsyncThunk(
    'groups/fetchGroupById',
    async (groupId , thunkAPI) => {
        try {
            const data = await getGroupById(groupId);
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createNewGroup = createAsyncThunk(
    'groups/createNewGroup',
    async ({name , description} , thunkAPI) => {
        try {
            const data = await createGroup({name , description})
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addNewMember = createAsyncThunk(
    'groups/addNewMember',
    async ({groupId , email} , thunkAPI) => {
        try {
            const data = await addMember(groupId , email);
            if (data) return data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeGroupMember = createAsyncThunk(
    'groups/removeGroupMember',
    async ({groupId , userId} , thunkAPI) => {
        try {
            const data = await removeMember(groupId , userId);
            return {groupId , userId}

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteExistingGroup = createAsyncThunk(
    'groups/deleteExistingGroup',
    async (groupId , thunkAPI) => {
        try {
            await deleteGroup(groupId)
            return groupId;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// slice
const groupSlice = createSlice({
    name : 'groups',

    initialState : {
        groups : [],  // list of all user's groups
        currentGroup : null, // the group currently being viewed
        loading : false,
        error : null
    },

    reducers : {
        setCurrentGroup : (state , action) => {
            state.currentGroup = action.payload;
        }
    },

    extraReducers : (builder) => {
        builder

        //fetchGroups
        .addCase(fetchGroups.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchGroups.fulfilled , (state , action) => {
            state.loading = false
            state.groups = action.payload
        })
        .addCase(fetchGroups.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //fetchGroupById
        .addCase(fetchGroupById.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchGroupById.fulfilled , (state , action) => {
            state.loading = false
            state.currentGroup = action.payload
        })
        .addCase(fetchGroupById.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //createNewGroup
        .addCase(createNewGroup.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createNewGroup.fulfilled , (state , action) => {
            state.loading = false
            state.groups.push(action.payload)
        })
        .addCase(createNewGroup.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //addNewMember
        .addCase(addNewMember.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addNewMember.fulfilled , (state , action) => {
            state.loading = false
            if (state.currentGroup) {
                state.currentGroup.group_members.push(action.payload)
            }
        })
        .addCase(addNewMember.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //removeGroupMember
        .addCase(removeGroupMember.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(removeGroupMember.fulfilled , (state , action) => {
            state.loading = false
            if (state.currentGroup) {
                state.currentGroup.group_members = state.currentGroup.group_members.filter(
                    member => member.user_id !== action.payload.userId
                )
            }
        })
        .addCase(removeGroupMember.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

        //deleteExistingGroup
        .addCase(deleteExistingGroup.pending , (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteExistingGroup.fulfilled , (state , action) => {
            state.loading = false
            state.groups = state.groups.filter( group => group.id !== action.payload )
            state.currentGroup = null
        })
        .addCase(deleteExistingGroup.rejected , (state , action) => {
            state.loading = false
            state.error = action.payload
        })

    }

})

export const { setCurrentGroup } = groupSlice.actions;
export default groupSlice.reducer;