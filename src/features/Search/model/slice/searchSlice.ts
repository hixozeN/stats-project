import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchSchema {
  search: string
}
const initialState: SearchSchema = {
  search: '',
};
export const searchSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { actions: searchActions, reducer: searchReducer } = searchSlice;
