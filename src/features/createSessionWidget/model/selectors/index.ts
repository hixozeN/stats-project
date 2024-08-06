import { StateSchema } from 'app/providers/StoreProvider/index';
import { BattleType, WidgetElements, WidgetTheme } from '../types/SessionWidgetSchema';

export const getWidgetAccountId = (state: StateSchema) => state?.sessionWidget?.accountId || null;
export const getWidgetSessionId = (state: StateSchema) => state?.sessionWidget?.sessionId || null;
export const getWidgetBattleType = (state: StateSchema) => state?.sessionWidget?.battleType || BattleType.RANDOM;
export const getWidgetTheme = (state: StateSchema) => state?.sessionWidget?.theme || WidgetTheme.TILE_ROW;
export const getWidgetElements = (state: StateSchema) => state?.sessionWidget?.elements
  || [WidgetElements.BATTLES, WidgetElements.WIN_RATE, WidgetElements.AVG_DMG, WidgetElements.WN8];
export const getWidgetFontColor = (state: StateSchema) => state?.sessionWidget?.fontColor || '#f8f8f8';
export const getWidgetTitleColor = (state: StateSchema) => state?.sessionWidget?.titleColor || '#989898';
export const getWidgetBackground = (state: StateSchema) => state?.sessionWidget?.bg || 'transparent';
export const getWidgetElementBg = (state: StateSchema) => state?.sessionWidget?.elementBg || 'transparent';
export const getWidgetOutlineColor = (state: StateSchema) => state?.sessionWidget?.outlineColor
  || 'rgba(178 162 162 / 10%)';
