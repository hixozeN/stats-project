import { LestaUserStatistics } from 'entities/Lesta/model/types/users/PersonalUserData';
import { LestaUserRatingData, LestaUserSession } from 'entities/Lesta';
import { getWinRate } from 'shared/lib/statCounters/getWinRate';
import { getAvgDamage } from 'shared/lib/statCounters/getAvgDamage';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { getLastBattleTime } from 'shared/lib/statCounters/getLastBattleTime';
import { StatsListItem } from '../model/types';

export const generateStatsList = (
  currStatistics: Partial<LestaUserStatistics>,
  session: LestaUserSession,
  rating: LestaUserRatingData,
  lastBattleTime?: number,
) => {
  if (!currStatistics || !rating) return null;

  // текущий винрейт
  const winRateCurr = getWinRate(currStatistics?.wins, currStatistics?.battles);
  const winRateDiff = session ? currStatistics.wins - session.statistics.wins : 0;
  const battlesDiff = session ? currStatistics.battles - session.statistics.battles : 0;
  // винрейт от разницы текущей статы и сохраненной (винрейт сессии)
  const winRateSession = session
    ? Math.floor(((winRateDiff) / (battlesDiff)) * 10000) / 100
    : 0;
  // винрейт последней сохраненной сессии
  const winRateLastSession = session
    ? getWinRate(session?.statistics.wins, session?.statistics.battles)
    : 0;
  // винрейт рейтинговых боев
  const winRateRating = getWinRate(rating?.wins, rating?.battles);
  const avgDamageCurr = getAvgDamage(currStatistics?.damage_dealt, currStatistics?.battles);
  const avgDamageSession = session
    ? Math.round((
      currStatistics.damage_dealt - session.statistics.damage_dealt
    ) / (
      currStatistics.battles - session.statistics.battles
    ))
    : 0;
  const avgDamageLastSession = session
    ? getAvgDamage(session?.statistics?.damage_dealt, session?.statistics?.battles)
    : 0;
  const avgDamageRating = getAvgDamage(rating?.damage_dealt, rating?.battles);

  const drawsCurr = currStatistics.battles - (currStatistics.wins + currStatistics.losses) || 0;
  const drawsSession = session
    ? session.statistics.battles - (session.statistics.wins + session.statistics.losses)
    : 0;
  const drawsRating = rating.battles - (rating.wins + rating.losses);

  const result: StatsListItem[] = [
    {
      key: 'battles',
      value: currStatistics?.battles,
      label: 'Бои',
      delta: session ? currStatistics.battles - session.statistics.battles : 0 || 0,
      tab: 0,
    },
    {
      key: 'sessionBattles',
      value: session ? currStatistics.battles - session.statistics.battles : 0,
      label: 'Бои',
      tab: 1,
    },
    {
      key: 'ratingBattles',
      value: rating.battles,
      label: 'Бои',
      tab: 2,
    },
    {
      key: 'winRate',
      value: winRateCurr,
      label: 'Винрейт',
      delta: session ? parseFloat((winRateCurr - winRateLastSession).toFixed(2)) : 0,
      tab: 0,
    },
    {
      key: 'winRateSession',
      value: parseFloat(winRateSession.toFixed(2)) || 0,
      label: 'Винрейт',
      tab: 1,
    },
    {
      key: 'winRateRating',
      value: winRateRating || 0,
      label: 'Винрейт',
      tab: 2,
    },
    {
      key: 'avgDamage',
      value: avgDamageCurr || 0,
      label: 'С/У',
      delta: session ? (avgDamageCurr - avgDamageLastSession) : 0,
      tab: 0,
    },
    {
      key: 'avgDamageSession',
      value: avgDamageSession || 0,
      label: 'С/У',
      tab: 1,
    },
    {
      key: 'avgDamageRating',
      value: avgDamageRating || 0,
      label: 'С/У',
      tab: 2,
    },
    {
      key: 'wn8',
      value: 0,
      label: 'WN8',
      delta: 0,
      tab: 0,
    },
    {
      key: 'wn8',
      value: 0,
      label: 'WN8',
      delta: 0,
      tab: 1,
    },
    {
      key: 'wn8',
      value: 0,
      label: 'WN8',
      delta: 0,
      tab: 2,
    },
    {
      key: 'wins',
      value: currStatistics?.wins || 0,
      label: 'Победы',
      delta: session ? currStatistics.wins - session.statistics.wins : 0 || 0,
      tab: 0,
    },
    {
      key: 'wins',
      value: session ? currStatistics.wins - session.statistics.wins : 0 || 0,
      label: 'Победы',
      tab: 1,
    },
    {
      key: 'wins',
      value: rating.wins || 0,
      label: 'Победы',
      tab: 2,
    },
    {
      key: 'losses',
      value: currStatistics?.losses || 0,
      label: 'Поражения',
      delta: session ? currStatistics.losses - session.statistics.losses : 0 || 0,
      tab: 0,
    },
    {
      key: 'lossesSession',
      value: session ? currStatistics.losses - session.statistics.losses : 0 || 0,
      label: 'Поражения',
      tab: 1,
    },
    {
      key: 'lossesRating',
      value: rating.losses || 0,
      label: 'Поражения',
      tab: 2,
    },
    {
      key: 'draws',
      value: drawsCurr || 0,
      label: 'Ничьи',
      delta: session ? drawsCurr - drawsSession : 0,
      tab: 0,
    },
    {
      key: 'draws',
      value: session ? drawsCurr - drawsSession : 0 || 0,
      label: 'Ничьи',
      tab: 1,
    },
    {
      key: 'draws',
      value: drawsRating || 0,
      label: 'Ничьи',
      tab: 2,
    },
    {
      key: 'lastBattleTime',
      value: getLastBattleTime(lastBattleTime) || 'Никогда.',
      label: 'Посл. бой',
      delta: 0,
      tab: 0,
    },
    {
      key: 'sessionStartTime',
      value: formatDate(session?.session_date) || 'Никогда.',
      label: 'Старт сессии',
      delta: 0,
      tab: 1,
    },
    {
      key: 'lastBattleTime',
      value: getLastBattleTime(lastBattleTime) || 'Никогда.',
      label: 'Посл. бой',
      delta: 0,
      tab: 2,
    },
  ];

  return result;
};
