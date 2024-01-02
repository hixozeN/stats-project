import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TournamentData, TournamentSchema } from '../types/tournament';

const initialState: TournamentSchema = {
  tournaments: [],
  ladders: [],
  finished: [],
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
});

export const { actions: tournamentActions, reducer: tournamentReducer } = tournamentSlice;
