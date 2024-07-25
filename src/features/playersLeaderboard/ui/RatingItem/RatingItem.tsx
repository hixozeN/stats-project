import { memo, SyntheticEvent, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import vehiclePlugImage from 'shared/assets/images/plug_tank_200x200.png';
import rewardPlugImage from 'shared/assets/images/reward.webp';
import {
  RatingItemFromLesta, RewardData,
} from '../../model/types/ratingLeaderboard';
import cls from './RatingItem.module.scss';

interface RatingItemProps {
  player: RatingItemFromLesta;
  reward?: RewardData;
  className?: string;
  isCurrentUser?: boolean;
}

export const RatingItem = memo((props: RatingItemProps) => {
  const {
    className, player, reward, isCurrentUser,
  } = props;
  const { t } = useTranslation('rating');
  const [isRewardError, setIsImageError] = useState(false);

  const itemMods = {
    [cls.currentUser]: isCurrentUser,
    [cls.withRewardColumn]: !!reward,
  };

  const rewardMods = {
    // прописать вычисление доступности награды от SeasonInfo и места игрока в ЛБ\
    [cls.vehicle]: reward?.type === 'vehicle',
    [cls.stuff]: reward?.type === 'stuff',
  };

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsImageError(true);
    if (reward?.type === 'vehicle') {
      e.currentTarget.src = vehiclePlugImage;
    } else {
      e.currentTarget.src = rewardPlugImage;
    }
  };

  return (
    <li className={classNames(cls.listItem, { [cls.currentUser]: isCurrentUser })}>
      {/* {isCurrentUser && <span className={cls.columnName}>{t('CURRENT_USER_POSITION')}</span>} */}
      <Link
        className={classNames(cls.RatingItem, itemMods, [className])}
        to={`/user/${player.spa_id}`}
      >
        <span className={cls.place}>{player.number ?? '👀'}</span>
        <div className={cls.player}>
          <span
            className={cls.nickname}
          >
            {player.nickname}
            {player.clan_tag && (
            <span className={cls.tag}>
              [
              {player.clan_tag}
              ]
            </span>
            )}
          </span>
        </div>
        {
        reward && (
          <div className={classNames(cls.rewardWrapper, rewardMods)}>
            <img
              className={classNames(cls.rewardImage, { [cls.rewardImageError]: isRewardError })}
              src={reward.image}
              alt={reward.title}
              onError={onImageError}
            />
            {reward?.type === 'stuff' && <span className={cls.columnValue}>{`x${reward.count}`}</span>}
          </div>
        )
      }
        <div className={cls.cellWrapper}>
          <span className={cls.columnName}>
            {
            player.calibrationBattlesLeft === 0
              ? t('SCORE')
              : t('CALIBRATION')
          }
          </span>
          <span className={cls.columnValue}>
            {
            player.calibrationBattlesLeft === 0
              ? player.score
              : `${10 - player.calibrationBattlesLeft}/10`
          }
          </span>
        </div>
      </Link>
    </li>
  );
});
