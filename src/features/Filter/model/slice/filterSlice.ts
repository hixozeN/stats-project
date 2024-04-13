import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { clearFiterData } from 'features/Filter/config/filterData';
import { FilterSchema } from 'features/Filter/types/filter';

const initialState: FilterSchema = {
  data: null,
  checkboxes: clearFiterData,
  isActiveFilter: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<TUserTanks[]>) => {
      state.data = action.payload;
    },
    setIsActiveFilter: (state) => {
      state.isActiveFilter = true;
    },
    setCheckbox: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.checkboxes = {
        ...state.checkboxes,
        [`${action.payload.param}`]: {
          ...state.checkboxes[`${action.payload.param}`],
          [`${action.payload.name}`]: action.payload.checked,
        },
      };
    },
    clearFilter: (state) => {
      state.checkboxes = clearFiterData;
      state.isActiveFilter = false;
    },
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;
