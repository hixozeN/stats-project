import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getUserBio, getUserClanData, getUserClanLoadingStatus, getUserDataLoadingStatus, getUserNickname,
} from 'entities/Lesta';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
import { getUserData } from 'entities/User';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { getRandomEmptyProfileMessage } from 'widgets/UserProfile/utils/getRandomBioText';
import cls from './UserPrimaryData.module.scss';

interface UserPrimaryDataProps {
  className?: string;
}

export const UserPrimaryData = memo((props: UserPrimaryDataProps) => {
  const { className } = props;

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

  const { device } = useSizeScreen();
  const isMobile = device === 'mobile';

  if (isUserDataLoading) {
    return (
      <div className={classNames(cls.primaryUserData, {}, [cls.skeleton])}>
        <Skeleton width={200} height={30} borderRadius="5px" />
        <Skeleton width={100} height={20} borderRadius="5px" />
        <Skeleton width={250} height={50} borderRadius="5px" />
      </div>
    );
  }

  return (
    <div className={classNames(cls.primaryUserData, {}, [className])}>
      <h3 className={cls.username}>
        {userNickname}
        {/* <InfoIcon className={cls.info}/> */}
        {!isProfileOwner && !isMobile
          && <FavoritesButton theme="profile" id={Number(id)} type="player" />}
      </h3>
      {
        isClanLoading ? <Skeleton width={120} height={24} borderRadius="5px" /> : clanData && (
          <Link className={cls.clan} to={`/team/${clanData.clan_id}`}>
            {`[${clanData.tag}] ${clanData.name}`}
          </Link>
        )
      }
      {!isProfileOwner && isMobile
        && <FavoritesButton theme="profile" id={Number(id)} type="player" />}
      <p className={cls.userBio}>
        {profileDescription}
      </p>
    </div>
  );
});
