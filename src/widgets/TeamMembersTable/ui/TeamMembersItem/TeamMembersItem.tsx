import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  calculatingStatistics,
  getDamage,
} from '../../lib/calculatingStatistics';
import { convertTimestamp } from '../../lib/convertTimestamp';
import cls from './TeamMembersItem.module.scss';

interface ITeamMembersItem {
  idAccount: number,
  role: string,
  name: string,
  battles: number,
  wins: number,
  damage: number,
  wn8: number,
  lastBattleTime: number,
  joinedAt: number,
}

export const TeamMembersItem = (props: ITeamMembersItem) => {
  const {
    idAccount,
    role,
    name,
    battles,
    wins,
    damage,
    wn8,
    lastBattleTime,
    joinedAt,
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
        {role === 'Командир' ? '👑' : ''}
        {role === 'Зам' ? '👮' : ''}
        <span className={cls.playerName}>{name}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Боёв')}</span>
        <span className={cls.value}>{battles}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Винрейт')}</span>
        <span className={cls.value}>{`${calculatingStatistics(wins, battles)}%`}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('Урон')}</span>
        <span className={cls.value}>{getDamage(battles, damage)}</span>
      </div>
      <div className={cls.container}>
        <span className={cls.columnName}>{t('WN8')}</span>
        <span className={cls.value}>{wn8}</span>
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
