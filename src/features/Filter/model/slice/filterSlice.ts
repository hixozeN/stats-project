import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { clearFiterData } from 'features/Filter/config/filterData';
import { FilterSchema } from 'features/Filter/types/filter';
import { LOCAL_STORAGE_CHECKBOXES, LOCAL_STORAGE_FILTER_DATA } from 'shared/consts/localstorage';

const initialState: FilterSchema = 'checkboxes' in localStorage
  ? {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTER_DATA)),
    params: null,
    checkboxes:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHECKBOXES)),
  }
  : {
    data: null,
    params: null,
    checkboxes: clearFiterData,
  };

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterData: (state, action: PayloadAction<TUserTanks[]>) => {
      state.data = action.payload;
    },
    // setFilterParams: (
    //   state,
    //   action: PayloadAction<Record<string, string[]>>,
    // ) => {
    //   state.params = action.payload;
    // },
    setCheckbox: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.checkboxes = {
        ...state.checkboxes,
        [`${action.payload.param}`]: {
          ...state.checkboxes[`${action.payload.param}`],
          [`${action.payload.name}`]: action.payload.checked,
        },
      };
      localStorage.setItem(
        LOCAL_STORAGE_CHECKBOXES,
        JSON.stringify(state.checkboxes),
      );
    },
    clearFilter: (state) => {
      localStorage.setItem(
        LOCAL_STORAGE_CHECKBOXES,
        JSON.stringify(clearFiterData),
      );
      state.checkboxes = clearFiterData;
    },
  },
});

export const { actions: filterActions, reducer: filterReducer } = filterSlice;
