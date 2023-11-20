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
  async ({ selectedUsers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/teams`, {
        selectedUsers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Getting a Team
export const getTeam = createAsyncThunk(
  'teams/getTeam',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/teams');
      const teamData = response.data.team;

      // Fetch user details for each member of the team
      const teamWithUserDetails = await Promise.all(
        teamData.map(async (userId) => {
          try {
            const userResponse = await axios.get(`/users/${userId}`);
            return userResponse.data.user;
          } catch (userError) {
            console.error(
              `Error fetching user details for user ID: ${userId}`,
              userError,
            );
            return { userId, error: userError.message };
          }
        }),
      );

      return teamWithUserDetails;
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
        const { team } = action.payload;
        state.teams.push(team);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
        state.error = null;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;

export const teamActions = {
  createTeam,
  getTeam,
};
