import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ILeaderboardItem } from 'features/playersLeaderboard';
import { ColoredStat } from 'shared/ui/ColoredStat/ColoredStat';
import { WN8InfoTooltip } from 'shared/ui/WN8InfoTooltip';
import { TWRInfoTooltip } from 'shared/ui/TWRInfoTooltip';
import cls from './LeaderboardItemMobile.module.scss';

interface LeaderboardItemMobileProps {
  player?: ILeaderboardItem;
  index?: number;
  className?: string;
}

export const LeaderboardItemMobile = memo((props: LeaderboardItemMobileProps) => {
  const {
    player,
    index,
    className,
  } = props;
  const { t } = useTranslation('main');
  const {
    nickname,
    account_id,
    battles,
    winRate,
    avgDamage,
    wn8,
    clan,
    tournamentWeight,
  } = player;

  return (
    <li
      className={classNames(cls.card, {}, [className])}
      aria-label={t('ITEM_ARIA_LABEL')}
    >
      <div className={cls.playerWrapper}>
        <div
          className={classNames(cls.position)}
          data-position={index + 1}
        />
        <div>
          <div className={cls.nicknameWrapper}>
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
                  >
                    {`[${clan.tag}]`}
                  </Link>
                )
              }
          </div>
          <div className={classNames(cls.wn8Wrapper)}>
            <span className={cls.label}>
              {t('WN8')}
              :
            </span>
            <ColoredStat className={cls.counterValue} value={wn8} type="wn8" />
            <WN8InfoTooltip />
          </div>
        </div>
      </div>
      <div className={cls.counters}>
        <div className={cls.counter}>
          <span className={cls.label}>{t('BATTLES')}</span>
          <span className={cls.counterValue}>{battles}</span>
        </div>
        <div className={cls.counter}>
          <span className={cls.label}>{t('WINRATE')}</span>
          <ColoredStat className={cls.counterValue} value={winRate} type="winrate" />
        </div>
        <div className={cls.counter}>
          <span className={cls.label}>
            {t('TOURNAMENT_WEIGHT')}
            {' '}
            <TWRInfoTooltip />
          </span>
          <ColoredStat className={cls.counterValue} value={tournamentWeight} text={tournamentWeight ? `${tournamentWeight}%` : t('TWR_UNKNOWN')} type="winrate" />
        </div>
        <div className={cls.counter}>
          <span className={cls.label}>{t('DAMAGE_SHORT')}</span>
          <span className={cls.counterValue}>{avgDamage}</span>
        </div>
      </div>
    </li>
  );
});
