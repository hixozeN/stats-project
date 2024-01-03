import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchTournamentsData,
} from 'entities/Tournament/model/services/fetchTournamentsData/fetchTournamentsData';
import { TournamentData, TournamentSchema } from '../types/tournament';

const initialState: TournamentSchema = {
  tournaments: [],
  ladders: [],
  finished: [],
  isLoading: false,
  error: '',
};

export const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    addTournament: (state, action: PayloadAction<TournamentData>) => {
      state.tournaments = [...state.tournaments, action.payload];
    },
    addTournaments: (state, action: PayloadAction<TournamentData[]>) => {
      state.tournaments = [...state.tournaments, ...action.payload];
    },
    addLadder: (state, action: PayloadAction<TournamentData>) => {
      state.ladders = [...state.ladders, action.payload];
    },
    addLadders: (state, action: PayloadAction<TournamentData[]>) => {
      state.ladders = [...state.ladders, ...action.payload];
    },
    addFinishedTournaments: (state, action: PayloadAction<TournamentData[]>) => {
      state.finished = [...state.finished, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournamentsData.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchTournamentsData.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchTournamentsData.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: tournamentActions, reducer: tournamentReducer } = tournamentSlice;
