import { SliderSingleProps } from 'antd';
import { BattleType, WidgetElements, WidgetTheme } from '../types/SessionWidgetSchema';

export const battleTypeLabels: Record<BattleType, string> = {
  [BattleType.RANDOM]: 'Рандомные бои',
  [BattleType.RATING]: 'Рейтинговые бои',
};

export const elementLabels: OptionalRecord<WidgetElements, string> = {
  [WidgetElements.BATTLES]: 'Бои',
  [WidgetElements.WIN_RATE]: 'Винрейт',
  [WidgetElements.AVG_DMG]: 'Ср. урон',
  [WidgetElements.WN8]: 'WN8',
  [WidgetElements.CURRENT_RATING]: 'Рейтинг',
  [WidgetElements.RATING_WR]: 'Винрейт',
  [WidgetElements.RATING_DMG]: 'Ср. урон',
};

export const themeLabels: OptionalRecord<WidgetTheme, string> = {
  [WidgetTheme.TILE_ROW]: 'Плитка (строкой)',
  [WidgetTheme.TILE_COLUMN]: 'Плитка (колонкой)',
  [WidgetTheme.ROW]: 'Текст строкой',
  [WidgetTheme.COLUMN]: 'Текст колонкой',
};

export interface SelectOption<T> {
  value: T;
  label: string;
}

export const battleTypeOptions: SelectOption<BattleType>[] = [
  {
    value: BattleType.RANDOM,
    label: battleTypeLabels[BattleType.RANDOM],
  },
  {
    value: BattleType.RATING,
    label: battleTypeLabels[BattleType.RATING],
  },
];

export const randomBattlesOptions: SelectOption<WidgetElements>[] = [
  {
    value: WidgetElements.BATTLES,
    label: elementLabels[WidgetElements.BATTLES],
  },
  {
    value: WidgetElements.WIN_RATE,
    label: elementLabels[WidgetElements.WIN_RATE],
  },
  {
    value: WidgetElements.AVG_DMG,
    label: elementLabels[WidgetElements.AVG_DMG],
  },
  {
    value: WidgetElements.WN8,
    label: elementLabels[WidgetElements.WN8],
  },
];

export const ratingBattlesOptions: SelectOption<WidgetElements>[] = [
  {
    value: WidgetElements.BATTLES,
    label: elementLabels[WidgetElements.BATTLES],
  },
  {
    value: WidgetElements.CURRENT_RATING,
    label: elementLabels[WidgetElements.CURRENT_RATING],
  },
  {
    value: WidgetElements.RATING_WR,
    label: elementLabels[WidgetElements.RATING_WR],
  },
  {
    value: WidgetElements.RATING_DMG,
    label: elementLabels[WidgetElements.RATING_DMG],
  },
];

export const themeOptions: SelectOption<WidgetTheme>[] = [
  {
    value: WidgetTheme.TILE_ROW,
    label: themeLabels[WidgetTheme.TILE_ROW],
  },
  {
    value: WidgetTheme.TILE_COLUMN,
    label: themeLabels[WidgetTheme.TILE_COLUMN],
  },
  {
    value: WidgetTheme.ROW,
    label: themeLabels[WidgetTheme.ROW],
  },
  {
    value: WidgetTheme.COLUMN,
    label: themeLabels[WidgetTheme.COLUMN],
  },
];

export const defaultRandomBattlesElements: WidgetElements[] = [
  WidgetElements.BATTLES, WidgetElements.WIN_RATE, WidgetElements.AVG_DMG, WidgetElements.WN8,
];

export const defaultRatingBattlesElements: WidgetElements[] = [
  WidgetElements.RATING_BATTLES, WidgetElements.RATING_WR, WidgetElements.RATING_DMG, WidgetElements.CURRENT_RATING,
];

export const defaultBattleTypeElements: Record<BattleType, WidgetElements[]> = {
  [BattleType.RANDOM]: defaultRandomBattlesElements,
  [BattleType.RATING]: defaultRatingBattlesElements,
};

export const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => `${value}%`;
