import { memo, SyntheticEvent } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { useTranslation } from 'react-i18next';
import vehiclePlugImage from 'shared/assets/images/plug_tank_200x200.png';
import rewardPlugImage from 'shared/assets/images/reward.webp';
import { getSeasonInfo } from '../../model/selectors/ratingSelectors';
import cls from './RatingSeasonInformation.module.scss';

interface RatingSeasonInformationProps {
  className?: string;
}

let playersInLeagueCounter = 0;

export const RatingSeasonInformation = memo((props: RatingSeasonInformationProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');
  const seasonData = useSelector(getSeasonInfo);

  const startDate = formatDate(new Date(seasonData.start_at), true);
  const endDate = formatDate(new Date(seasonData.finish_at), true);

  const calculatePlayersInLeague = (percentile: number, index: number) => {
    if (index !== 4) {
      const counter = Math.floor(seasonData.count - (seasonData.count * percentile));
      playersInLeagueCounter = counter;
      return counter;
    }

    return Math.floor(seasonData.count - playersInLeagueCounter);
  };

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>, plug: string) => {
    e.currentTarget.src = plug;
  };

  return (
    <div className={classNames(cls.RatingSeasonInformation, {}, [className])}>
      <div className={cls.wrapper}>
        <h2 className={cls.title}>
          {t('Рейтинговые бои')}
        </h2>

        <section className={cls.section}>
          <h3 className={cls.sectionHeading}>{t('GENERAL_INFO')}</h3>
          <ul className={cls.list}>
            <li className={cls.item}>
              <span className={cls.key}>{t('START_DATE')}</span>
              <span className={cls.value}>{startDate}</span>
            </li>
            <li className={cls.item}>
              <span className={cls.key}>{t('END_DATE')}</span>
              <span className={cls.value}>{endDate}</span>
            </li>
            <li className={cls.item}>
              <span className={cls.key}>{t('TOTAL_PLAYERS')}</span>
              <span className={cls.value}>{seasonData.count}</span>
            </li>
            <li className={cls.item}>
              <span className={cls.key}>{t('CURRENT_SEASON_NO_VAR')}</span>
              <span className={cls.value}>{seasonData.current_season}</span>
            </li>
            <li className={classNames(cls.item, {}, [cls.itemMain])}>
              <span className={cls.key}>{t('MAIN_AWARD')}</span>
              <span className={cls.value}>{seasonData.rewards[0].vehicle.user_string}</span>
            </li>
          </ul>
        </section>

        <section className={cls.section}>
          <h3 className={cls.sectionHeading}>{t('AWARDS')}</h3>
          {seasonData.rewards.map((r) => {
            if (r.type === 'vehicle') {
              return (
                <div className={cls.rewardItem} key={r.from_position}>
                  <div className={cls.cell}>
                    <span className={cls.key}>{t('PLACES')}</span>
                    <span className={cls.value}>{`${r.from_position} - ${r.to_position}`}</span>
                  </div>

                  <div className={cls.cell}>
                    <span className={cls.key}>{t('COUNT')}</span>
                    <span className={cls.value}>{r.count}</span>
                  </div>

                  <img
                    className={cls.rewardImage}
                    src={r.vehicle.preview_image_url}
                    alt={r.vehicle.user_string}
                    onError={(e) => onImageError(e, vehiclePlugImage)}
                  />
                </div>
              );
            }

            return (
              <div className={cls.rewardItem} key={r.from_position}>
                <div className={cls.cell}>
                  <span className={cls.key}>{t('PLACES')}</span>
                  <span className={cls.value}>{`${r.from_position} - ${r.to_position}`}</span>
                </div>

                <div className={cls.cell}>
                  <span className={cls.key}>{t('COUNT')}</span>
                  <span className={cls.value}>{r.count}</span>
                </div>

                <img
                  className={cls.certImage}
                  src={r.stuff.image_url}
                  alt={r.stuff.name}
                  onError={(e) => onImageError(e, rewardPlugImage)}
                />
              </div>
            );
          })}
        </section>

        <section className={cls.section}>
          <h3 className={cls.sectionHeading}>{t('PLAYERS_DISTRIBUTION')}</h3>
          {seasonData.leagues.map((l) => (
            <div className={cls.league} key={l.title}>
              <div className={cls.leagueTitle}>
                <img
                  className={cls.leagueShield}
                  src={`https:${l.big_icon}`}
                  alt={l.title}
                />
                <span className={cls.value}>{l.title}</span>
              </div>

              <div className={cls.cell}>
                <span className={cls.key}>{t('PLAYERS_PER_LEAGUE')}</span>
                <span className={cls.value}>{calculatePlayersInLeague(l.percentile, l.index)}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
});
