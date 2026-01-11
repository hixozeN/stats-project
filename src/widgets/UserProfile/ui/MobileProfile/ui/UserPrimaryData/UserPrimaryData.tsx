import {
  memo, ReactElement, useCallback, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import {
  getUserBio, getUserClanData, getUserClanLoadingStatus, getUserDataLoadingStatus, getUserNickname, getUserRatingStats, getUserRatingValues,
} from 'entities/Lesta/index';
import { Link, useParams } from 'react-router-dom';
import { getUserData } from 'entities/User/index';
import { useTranslation } from 'react-i18next';
import cls from 'widgets/UserProfile/ui/UserPrimaryData/UserPrimaryData.module.scss';
import { UserAvatar } from 'widgets/UserProfile/ui/UserAvatar/UserAvatar';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
import platinumShield from 'shared/assets/images/userStats/rating_platinum.png';
import goldShield from 'shared/assets/images/userStats/rating_gold.png';
import silverShield from 'shared/assets/images/userStats/rating_silver.png';
import brilliantShield from 'shared/assets/images/userStats/rating_brilliant.png';
import bronzeShield from 'shared/assets/images/userStats/rating_bronze.png';
import { BTooltip } from 'shared/ui/BTooltip/BTooltip';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { getRandomEmptyProfileMessage } from 'widgets/UserProfile/utils/getRandomBioText';
import s from './UserPrimaryData.module.scss';

interface UserPrimaryDataProps {
  className?: string;
}

export const UserPrimaryData = memo((props: UserPrimaryDataProps) => {
  const { className } = props;
  const { t } = useTranslation(['main', 'userPage']);

  const userNickname = useSelector(getUserNickname);
  const userBio = useSelector(getUserBio);
  const clanData = useSelector(getUserClanData);
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);
  const isClanLoading = useSelector(getUserClanLoadingStatus);

  const { id } = useParams();
  const currentUser = useSelector(getUserData);
  const isProfileOwner = useMemo(() => currentUser?.lestaData?.account_id === Number(id), [currentUser, id]);

  const profileDescription = useMemo(() => {
    if (userBio) return userBio;

    return getRandomEmptyProfileMessage({ isAuthor: isProfileOwner });
  }, [userBio, isProfileOwner]);

  const ratingData = useSelector(getUserRatingStats);
  const ratingValues = useSelector(getUserRatingValues);
  const isCalibration = ratingData?.battles === 0 || ratingValues?.calibration_battles_left !== 0;

  const renderRatingShield = useCallback((rating: number) => {
    const shields: Record<number, ReactElement> = {
      4000: platinumShield,
      3000: goldShield,
      2000: silverShield,
    };

    if (rating >= 5000) return brilliantShield;

    const roundedRating = Math.floor(rating / 1000) * 1000;

    return roundedRating ? shields[roundedRating] : bronzeShield;
  }, []);

  return (
    <div className={classNames(s.UserPrimaryData, {}, [className])}>
      <div className={s.heading}>
        <div className={s.avatarWrapper}>
          <UserAvatar />
        </div>
        <div className={s.playerData}>

          <h3 className={s.nickname}>
            {isUserDataLoading ? <Skeleton width={180} height={52} borderRadius="5px" /> : `${userNickname} `}
            {!isCalibration && (
              <BTooltip title={`Рейтинг: ${ratingValues?.ratingValue}`}>
                <img
                  className={s.ratingImage}
                  src={renderRatingShield(ratingValues?.ratingValue)}
                  alt={t('Изображение лиги пользователя в виде цветного щита')}
                  loading="lazy"
                />
              </BTooltip>
            )}
          </h3>
          {
            isClanLoading ? <Skeleton width={120} height={24} borderRadius="5px" className={cls.clan} /> : clanData && (
              <Link className={cls.clan} to={`/team/${clanData.clan_id}`}>
                {`[${clanData.tag}] ${clanData.name}`}
              </Link>
            )
          }

          {!isProfileOwner
            && <FavoritesButton theme="profile" id={Number(id)} type="player" />}
        </div>
      </div>
      {
      isUserDataLoading
        ? <Skeleton width="80%" height={24} borderRadius="5px" className={s.bioSkeleton} />
        : (
          <p className={s.bio}>
            {profileDescription}
          </p>
        )
      }
    </div>
  );
});
