import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamData, TeamsSchema } from '../types/team';
import { fetchTeamsData } from '../services/fetchTeamsData/fetchTeamsData';

const initialState: TeamsSchema = {
  myTeams: [],
  openedTeams: [],
  topTeams: [],
  isLoading: false,
  error: '',
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addMyTeams: (state, action: PayloadAction<TeamData[]>) => {
      state.myTeams = [...state.myTeams, ...action.payload];
    },
    addOpenedTeams: (state, action: PayloadAction<TeamData[]>) => {
      state.openedTeams = [...state.openedTeams, ...action.payload];
    },
    addTopTeams: (state, action: PayloadAction<TeamData[]>) => {
      state.topTeams = [...state.topTeams, ...action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsData.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchTeamsData.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchTeamsData.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: teamActions, reducer: teamReducer } = teamSlice;
