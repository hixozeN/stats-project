import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useCallback, useRef } from 'react';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
import { ILeaderboardItem } from '../../model/types/ILeaderboardItem';
import cls from './LeaderboardItem.module.scss';

interface LeaderboardItemProps {
  player?: ILeaderboardItem;
  index?: number;
}

export const LeaderboardItem = ({ player, index }: LeaderboardItemProps) => {
  const { t } = useTranslation('main');
  const {
    nickname, account_id, battles, winRate, avgDamage, wn8, clan,
  } = player;
  const navigate = useNavigate();
  const playerClanRef = useRef(null);

  const handleClickOnItem = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== playerClanRef.current) {
      navigate(`/user/${account_id}`, { preventScrollReset: false });
    }
  }, [navigate, account_id, playerClanRef]);

  return (
    <li
      className={cls.tableRow}
      aria-label={t('ITEM_ARIA_LABEL')}
      data-position={index + 1}
    >
      <div className={cls.tableRowLink} onClick={handleClickOnItem} aria-roledescription="button">
        <div className={cls.player}>
          <Link
            className={classNames(cls.link, {}, [cls.player])}
            to={`/user/${account_id}`}
          >
            {nickname}
          </Link>
          {
            clan && (
              <Link
                className={classNames(cls.link, {}, [cls.clan])}
                to={`/team/${clan.clan_id}`}
                ref={playerClanRef}
              >
                {`[${clan.tag}]`}
              </Link>
            )
          }
        </div>
        <div className={classNames(cls.item, {}, [cls.battles])}>
          <span className={cls.columnName}>{t('BATTLES')}</span>
          <p className={cls.columnValue}>{battles}</p>
        </div>
        <div className={classNames(cls.item, {}, [cls.winrate])}>
          <span className={cls.columnName}>{t('WINRATE')}</span>
          <p className={cls.columnValue}>{`${winRate}%`}</p>
        </div>
        <div className={classNames(cls.item, {}, [cls.damage])}>
          <span className={cls.columnName}>{t('DAMAGE_SHORT')}</span>
          <p className={cls.columnValue}>{avgDamage}</p>
        </div>
        <div className={classNames(cls.item, {}, [cls.wn8])}>
          <span className={cls.columnName}>{t('WN8')}</span>
          <p className={cls.columnValue}>{wn8}</p>
        </div>
      </div>
       <FavoritesButton theme="leaderboard" id={account_id} tag={t('players')} />
    </li>
  );
};
