import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { convertTimestamp } from '../../lib/convertTimestamp';
import cls from './TeamMembersItem.module.scss';

interface ITeamMembersItem {
  idAccount: number,
  joinedAt: number,
  name: string,
  role: string,
  damage: number,
  battles: number,
  lastBattleTime: number,
  winRate: number,
  wn8: number,
}

export const TeamMembersItem = (props: ITeamMembersItem) => {
  const {
    idAccount,
    joinedAt,
    name,
    role,
    damage,
    battles,
    lastBattleTime,
    winRate,
    wn8,
  } = props;
  const { t } = useTranslation('teamPage');
  const navigate = useNavigate();

  const handleClickOnItem = useCallback((e: React.MouseEvent<HTMLLIElement>, id: number) => {
    navigate(`/user/${id}`, { preventScrollReset: false });
  }, [navigate]);

  return (
    <li
      className={cls.item}
      onClick={(evt) => handleClickOnItem(evt, idAccount)}
    >
      <div className={cls.player}>
        {role === 'commander' ? '👑' : ''}
        {role === 'executive_officer' ? '👮' : ''}
        <span className={cls.playerName}>{name}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Боёв')}</span>
        <span className={cls.value}>{battles}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Винрейт')}</span>
        <span className={cls.value}>{`${winRate}%`}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Урон')}</span>
        <span className={cls.value}>{damage}</span>
      </div>
      <div className={cls.container}>
        <div className={cls.wrapper}>
          <span className={cls.columnName}>{t('WN8')}</span>
        </div>
        <span className={cls.value}>{wn8 === 0 ? '-' : wn8}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('В бою')}</span>
        <span className={cls.value}>{convertTimestamp(lastBattleTime)}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('В клане')}</span>
        <span className={cls.value}>{convertTimestamp(joinedAt)}</span>
      </div>
    </li>
  );
};
