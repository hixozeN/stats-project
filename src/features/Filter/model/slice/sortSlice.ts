import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearSortData, NameSortItem } from '../../config/sortData';
import { SortScheme } from '../../types/sort';

const initialState: SortScheme = clearSortData;

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortData: (state: SortScheme, action: PayloadAction<NameSortItem>) => {
      if (action.payload) {
        if (state[`${action.payload}`].isDown) {
          state = {
            ...state,
            [`${action.payload}`]: {
              isActive: true,
              isUp: true,
              isDown: false,
            },
          };
        } else {
          state = {
            ...state,
            [`${action.payload}`]: {
              isActive: true,
              isUp: false,
              isDown: true,
            },
          };
        }
      }
      Object.keys(state).filter((item) => item !== action.payload).map((item: NameSortItem) => {
        state = {
          ...state,
          [item]: { isActive: false, isUp: false, isDown: false },
        };
        return state;
      });
      return state;
    },
    clearSort: () => initialState,
  },
});

export const { actions: sortActions, reducer: sortReducer } = sortSlice;
