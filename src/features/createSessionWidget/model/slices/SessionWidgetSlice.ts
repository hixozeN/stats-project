import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BattleType,
  SessionWidgetSchema,
  WidgetElements,
  WidgetTheme,
} from '../types/SessionWidgetSchema';

const initialState: SessionWidgetSchema = {
  accountId: null,
  battleType: BattleType.RANDOM,
  sessionId: null,
  elements: [
    WidgetElements.BATTLES,
    WidgetElements.WIN_RATE,
    WidgetElements.AVG_DMG,
    WidgetElements.WN8,
  ],
  fontColor: '#f8f8f8',
  titleColor: '#989898',
  bg: 'transparent',
  elementBg: '#0c0c0ecd',
  outlineColor: 'rgba(178 162 162 / 10%)',
  theme: WidgetTheme.TILE_ROW,
  isLoading: false,
  error: null,
  data: null,
};

export const SessionWidgetSlice = createSlice({
  name: 'SessionWidget',
  initialState,
  reducers: {
    setAccountId: (state: SessionWidgetSchema, action: PayloadAction<number>) => {
      state.accountId = action.payload;
    },
    setBattleType: (state: SessionWidgetSchema, action: PayloadAction<BattleType>) => {
      state.battleType = action.payload;
    },
    setSessionId: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setElements: (state: SessionWidgetSchema, action: PayloadAction<WidgetElements[]>) => {
      state.elements = action.payload;
    },
    setFontColor: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.fontColor = action.payload;
    },
    setTitleColor: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.titleColor = action.payload;
    },
    setBgColor: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.bg = action.payload;
    },
    setElementBgColor: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.elementBg = action.payload;
    },
    setOutlineColor: (state: SessionWidgetSchema, action: PayloadAction<string>) => {
      state.outlineColor = action.payload;
    },
    setWidgetTheme: (state: SessionWidgetSchema, action: PayloadAction<WidgetTheme>) => {
      state.theme = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { actions: SessionWidgetActions } = SessionWidgetSlice;
export const { reducer: SessionWidgetReducer } = SessionWidgetSlice;
