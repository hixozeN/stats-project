import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLestaClanMembers, getLestaClanPlayers } from 'entities/Lesta';
import { LestaClanUser } from 'entities/Lesta/model/types/clans';
import { usersClan } from 'widgets/TeamMembersTable/lib/usersClan';
import { TeamMembersItem } from './TeamMembersItem/TeamMembersItem';
import cls from './TeamMembersTable.module.scss';

export const TeamMembersTable = memo(() => {
  const { t } = useTranslation('teamPage');
  const playersSelector = useSelector(getLestaClanPlayers);
  const membersSelector = useSelector(getLestaClanMembers);
  const users: LestaClanUser[] = usersClan(playersSelector, membersSelector);

  if (!users) return null;

  return (
    <section aria-label={t('ARIA_LABEL_SECTION_PLAYERS')}>
      <ul className={cls.list}>
        {users.map((data) => (
          <TeamMembersItem
            key={data.account_id}
            idAccount={data.account_id}
            role={data.role}
            name={data.account_name}
            battles={data.statistics.battles}
            wins={data.statistics.wins}
            damage={data.statistics.damage_dealt}
            wn8={data.wn8}
            lastBattleTime={data.last_battle_time}
            joinedAt={data.joined_at}
          />
        ))}
      </ul>
    </section>
  );
});
