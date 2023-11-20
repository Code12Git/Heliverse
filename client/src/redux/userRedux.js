import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../helpers/axios';
import toast from 'react-hot-toast';
//create action
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id) => {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (page = 1) => {
    try {
      const response = await axios.get(`/users?page=${page}`);
      if (response.data.success === true) {
        return response.data;
      } else {
        console.error('Request was not successful');
        throw new Error('Request was not successful');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users');
      throw error;
    }
  },
);

// Remove a new user
export const deleteUser = createAsyncThunk(
  'user/removeUser',
  async (userId, { dispatch }) => {
    try {
      const response = await axios.delete(`/users/${userId}`);
      if (response.status === 200) {
        toast.success('User deleted successfully!');
        dispatch(fetchAllUsers());
        return response.data;
      } else {
        throw new Error('User deletion failed');
      }
    } catch (error) {
      throw error;
    }
  },
);

// Filtering Users
export const filterUsers = createAsyncThunk(
  'user/filterUsers',
  async ({ page = 1, filters }) => {
    try {
      const response = await axios.get(`/users?page=${page}`, {
        params: filters,
      });
      if (response.data.success === true) {
        return response.data;
      } else {
        console.error('Request was not successful');
        throw new Error('Request was not successful');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch filtered users');
      throw error;
    }
  },
);

export const userDetail = createSlice({
  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [filterUsers.pending]: (state) => {
      state.loading = true;
    },
    [filterUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [filterUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [filterUsers.pending]: (state) => {
      state.loading = true;
    },
    [filterUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [filterUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
