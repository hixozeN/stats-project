export enum BattleType {
  RANDOM = 'statistics',
  RATING = 'rating',
}

export enum WidgetElements {
  BATTLES = 'battles',
  RATING_BATTLES = 'ratingBattles',
  AVG_DMG = 'avgDmg',
  WIN_RATE = 'winRate',
  WN8 = 'wn8',
  RATING_VALUE = 'ratingValue',
  CURRENT_RATING = 'currentRating',
  RATING_WR = 'ratingWinrate',
  RATING_DMG = 'ratingDamage',
}

export enum WidgetTheme {
  TILE_ROW = 'tileRow',
  TILE_COLUMN = 'tileColumn',
  ROW = 'row',
  COLUMN = 'column',
}

export enum WidgetParams {
  ACCOUNT_ID = 'accountId',
  SESSION_ID = 'sessionId',
  BATTLE_TYPE = 'type',
  ELEMENTS = 'elements',
  THEME = 'theme',
  FONT_COLOR = 'fontColor',
  TITLE_COLOR = 'titleColor',
  BG = 'bg',
  ELEMENT_BG = 'elementBg',
  OUTLINE_COLOR = 'outline',
}

export interface WidgetSessionData {
  battles?: number;
  winRate?: number;
  avgDamage?: number;
  wn8?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  session_start_time?: number;
  ratingValue?: number;
  currentRating?: number;
  currentWinRate?: number;
  currentDamage?: number;
}

export interface SessionWidgetSchema {
  accountId?: number;
  sessionId?: string;
  battleType?: BattleType;
  elements?: WidgetElements[];
  titleColor?: string;
  fontColor?: string;
  bg?: string;
  elementBg?: string;
  outlineColor?: string;
  theme?: WidgetTheme;
  isLoading?: boolean;
  error?: string;
  data?: {
    delta?: WidgetSessionData;
    statistics?: WidgetSessionData;
    rating?: WidgetSessionData;
  };
}
