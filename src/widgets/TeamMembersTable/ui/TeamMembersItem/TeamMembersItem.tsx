import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/index';
import { classNames } from 'shared/lib/classNames/classNames';
import { WN8InfoTooltip } from 'shared/ui/WN8InfoTooltip';
import { ColoredStat } from 'shared/ui/ColoredStat/ColoredStat';
import { convertTimestamp } from '../../lib/convertTimestamp';
import cls from './TeamMembersItem.module.scss';

export interface ITeamMembersItem {
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

  const currentUser = useSelector(getUserData);
  const isProfileOwner = currentUser?.lestaData?.account_id === Number(idAccount);

  return (
    <li
      className={cls.item}
    >
      <Link to={`/user/${idAccount}`} className={cls.link}>
        <div className={cls.player}>
          {role === 'commander' ? '👑' : ''}
          {role === 'executive_officer' ? '👮' : ''}
          <span className={classNames(cls.playerName, { [cls.profileOwner]: isProfileOwner })}>{name}</span>
        </div>
        <div className={cls.container}>
          <span className={cls.columnName}>{t('Боёв')}</span>
          <span className={cls.value}>{battles}</span>
        </div>
        <div className={cls.container}>
          <span className={cls.columnName}>{t('Винрейт')}</span>
          {/* <span className={cls.value}>{`${winRate}%`}</span> */}
          <ColoredStat
            value={winRate}
            type="winrate"
            className={cls.value}
            text={`${winRate.toString()}%`}
          />
        </div>
        <div className={cls.container}>
          <span className={cls.columnName}>{t('Урон')}</span>
          <span className={cls.value}>{damage}</span>
        </div>
        <div className={cls.container}>
          <div className={cls.wrapper}>
            <span className={cls.columnName}>
              {t('WN8')}
              <WN8InfoTooltip />
            </span>
          </div>
          <ColoredStat
            value={wn8}
            type="wn8"
            className={cls.value}
            text={wn8 === 0 ? '-' : wn8.toString()}
          />
        </div>
        <div className={cls.container}>
          <span className={cls.columnName}>{t('В бою')}</span>
          <span className={cls.value}>{convertTimestamp(lastBattleTime)}</span>
        </div>
        <div className={cls.container}>
          <span className={cls.columnName}>{t('В клане')}</span>
          <span className={cls.value}>{convertTimestamp(joinedAt)}</span>
        </div>
      </Link>
      {!isProfileOwner && <FavoritesButton theme="table" id={idAccount} type="player" />}
    </li>
  );
};
