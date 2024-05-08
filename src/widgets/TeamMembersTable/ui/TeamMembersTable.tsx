import React, {
  memo, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getClanMembers } from 'entities/Lesta';
import { usersClan } from 'widgets/TeamMembersTable/lib/usersClan';
import { SortClanListPlayers } from 'features/SortClanListPlayers';
import { getSortListData } from 'features/SortClanListPlayers/model/selectors';
import { sortListPlayersActions } from 'features/SortClanListPlayers/model/slice/SortListPlayerSlice';
import { TeamMembersItem } from './TeamMembersItem/TeamMembersItem';
import cls from './TeamMembersTable.module.scss';

export const TeamMembersTable = memo(() => {
  const { t } = useTranslation('teamPage');
  const members = useSelector(getClanMembers);
  const dataSort = useSelector(getSortListData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortListPlayersActions.setSortListPLayers({
      data: usersClan(members),
    }));
  }, [members, dispatch]);

  if (!members) return null;

  return (
    <section className={cls.TeamMembersTable} aria-label={t('ARIA_LABEL_SECTION_PLAYERS')}>
      <div className={cls.wrapper}>
        <SortClanListPlayers />
      </div>
      <ul className={cls.list}>
        {dataSort.map((player) => (
          <TeamMembersItem
            key={player.account_id}
            idAccount={player.account_id}
            joinedAt={player.joined_at}
            name={player.nickname}
            role={player.role}
            damage={player.statistics.avgDamage}
            battles={player.statistics.battles}
            lastBattleTime={player.statistics.last_battle_time}
            winRate={player.statistics.winRate}
            wn8={player.statistics.wn8}
          />
        ))}
      </ul>
    </section>
  );
});
