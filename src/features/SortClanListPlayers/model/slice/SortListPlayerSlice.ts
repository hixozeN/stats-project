import { createSlice } from '@reduxjs/toolkit';
import { SortListPlayersSchema } from '../../types/sortListPlayersType';

const initialState: SortListPlayersSchema = {
  data: null,
  param: null,
  isDESC: null,
};

export const SortListPlayersSlice = createSlice({
  name: 'sortListPlayers',
  initialState,
  reducers: {
    setSortListPLayers: (state, action) => {
      state.data = action.payload.data;
      state.param = action.payload.param;
      state.isDESC = action.payload.isDESC;

      if (action.payload.data) {
        state.data = [...state.data].sort((a, b) => {
          if (state.isDESC) {
            return b.statistics[state.param] - a.statistics[state.param];
          }
          return a.statistics[state.param] - b.statistics[state.param];
        });

        if (state.param === 'joined_at') {
          state.data = [...state.data].sort((a, b) => {
            if (state.isDESC) {
              return b[state.param] - a[state.param];
            }
            return a[state.param] - b[state.param];
          });
        }
      }
    },
  },
});

export const { actions: sortListPlayersActions, reducer: SortListPlayersReducer } = SortListPlayersSlice;
