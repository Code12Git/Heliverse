import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../helpers/axios';

const initialState = {
  loading: false,
  teams: [],
  error: null,
};
// Creating a Team
export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async ({ selectedUserIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/teams`, {
        selectedUserIds,
      });
      console.log(selectedUserIds);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;

        const newTeamWithUsers = action.payload;

        state.teams = state.teams.concat(newTeamWithUsers);
      })

      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;

export const teamActions = {
  createTeam,
};
