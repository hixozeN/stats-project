export interface StatsListItem {
  key: string;
  value: number | string;
  label: 'Бои' | 'Винрейт' | 'С/У' | 'WN8' | 'Победы' | 'Поражения' | 'Ничьи' | 'Посл. бой' | 'Начало сессии';
  delta?: number;
  tab: 0 | 1 | 2;
}
