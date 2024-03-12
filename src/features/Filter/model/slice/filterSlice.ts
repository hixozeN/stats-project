import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { FilterSchema } from 'features/Filter/types/filter';

const initialState: FilterSchema = {
  data: null,
  params: null,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<TUserTanks>) => {
      state.data = action.payload;
    },
    setFilterParams: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.params = action.payload;
    },
    clearFilter: (state) => {
      localStorage.clear();
    },
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;
