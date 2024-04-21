import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import InfoIcon from 'shared/assets/icons/info.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getUserBio, getUserClanData, getUserDataLoadingStatus, getUserNickname,
} from 'entities/Lesta/index';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
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
      </h3>
      {
        clanData && (
          <Link className={cls.clan} to={`/team/${clanData.clan_id}`}>
            {`[${clanData.tag}] ${clanData.name}`}
          </Link>
        )
      }
      <p className={cls.userBio}>
        {userBio}
      </p>
    </div>
  );
});
