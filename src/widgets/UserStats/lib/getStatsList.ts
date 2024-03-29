import { ParamData } from 'entities/Lesta';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { StatsListItem } from 'widgets/UserStats/model/types/index';

export const getStatsList = (obj: ParamData, delta?: ParamData): StatsListItem[] => {
  if (!obj) return [];

  const compareObj: Record<string, number | string> = { ...delta };
  const result: StatsListItem[] = [];

  Object.entries(obj).map(([key, value]: [string, number]) => result.push({
    label: key,
    value: ['last_battle_time', 'session_start_time'].includes(key)
      ? formatDate(new Date(value * 1000), true)
      : value,
    delta: compareObj[`${key}`],
  }));

  return result;
};
