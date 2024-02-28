import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import InfoIcon from 'shared/assets/icons/info.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getIsRegisteredStatus, getLestaUserBio,
  getLestaUserClanData,
  getLestaUserNickname,
} from 'entities/Lesta/index';
import cls from './UserPrimaryData.module.scss';

interface UserPrimaryDataProps {
  className?: string;
}

export const UserPrimaryData = memo((props: UserPrimaryDataProps) => {
  const { className } = props;

  const userNickname = useSelector(getLestaUserNickname);
  const userBio = useSelector(getLestaUserBio);
  const clanData = useSelector(getLestaUserClanData);
  const isRegistered = useSelector(getIsRegisteredStatus);

  const unregisteredUserMessage = 'Игрок не является зарегистрированным участником :( \n'
    + 'Просмотр подробной статистики для него недоступен.';

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
        {
          isRegistered
            ? userBio
            : unregisteredUserMessage
        }
      </p>
    </div>
  );
});
