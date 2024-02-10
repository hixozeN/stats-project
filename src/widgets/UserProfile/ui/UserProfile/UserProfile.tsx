import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import img from 'shared/assets/images/userStats/rating_gold.png';
import defaultAvatar from 'shared/assets/images/default_avatar2.jpg';
import VkIcon from 'shared/assets/icons/vk-circle.svg';
import TgIcon from 'shared/assets/icons/tg-circle.svg';
import YouTubeIcon from 'shared/assets/icons/youtube-circle.svg';
import DiscordIcon from 'shared/assets/icons/ds-circle.svg';
import InfoIcon from 'shared/assets/icons/info.svg';
import img2 from 'shared/assets/images/userStats/rating_calibration.webp';
import { LestaUserData } from 'entities/User/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getLestaUserClanData,
  getLestaUserRatingData,
  getIsRegisteredStatus, getLestaUserAvatar, getUserSocialLinks,
} from 'entities/Lesta';
import { UserRating } from 'widgets/UserProfile/ui/UserRating/UserRating';
import { UserPrivateDataList } from '../../ui/UserPrivateDataList/UserPrivateDataList';
import { UserPrivateDataItem } from '../../ui/UserPrivateDataItem/UserPrivateDataItem';
import cls from './UserProfile.module.scss';

interface IUserStatsProfileProps {
  className?: string;
  user?: LestaUserData;
}

const socialIcons = {
  vk: {
    link: 'https://vk.com/',
    icon: <VkIcon className={classNames(cls.socialIcon)} />,
  },
  telegram: {
    link: 'https://t.me/',
    icon: <TgIcon className={classNames(cls.socialIcon)} />,
  },
  discord: {
    link: 'https://discordapp.com/users/',
    icon: <DiscordIcon className={classNames(cls.socialIcon)} />,
  },
  youtube: {
    link: '',
    icon: <YouTubeIcon className={classNames(cls.socialIcon)} />,
  },
};

export const UserProfile = memo((props: IUserStatsProfileProps) => {
  const { className, user } = props;
  const clanData = useSelector(getLestaUserClanData);
  const ratingData = useSelector(getLestaUserRatingData);
  const userAvatar = useSelector(getLestaUserAvatar);
  const isRegistered = useSelector(getIsRegisteredStatus);
  const userSocialLinks = useSelector(getUserSocialLinks);

  const unregisteredUserMessage = 'Игрок не является зарегистрированным участником :( \n'
            + 'Просмотр подробной статистики для него недоступен.';

  const userBioMessage = 'Feugiat netus pulvinar et arcu suscipiantur moderatius nec. \n'
    + 'Efficiantur primis molestiae ceteros feugait sem.';

  const renderLinks = () => {
    for (const [key, value] of Object.entries(userSocialLinks)) {
      if (value) {
        return (
          <li className={cls.socialElement}>
            <a className={cls.socialLink} href="https://vk.com" target="_blank" rel="noopener noreferrer">
              <VkIcon className={classNames(cls.socialIcon)} />
            </a>
          </li>
        );
      }
    }
  };

  return (
    <section className={classNames(cls.UserStatsProfile, {}, [className])}>
      <div className={cls.avatarWrapper}>
        <img
          className={cls.avatar}
          src={userAvatar ?? defaultAvatar}
          alt={`Аватар пользователя ${user?.nickname}`}
          loading="lazy"
        />
      </div>
      <UserPrivateDataList>
        <UserPrivateDataItem variant="premium" value={1759449529} />
        <UserPrivateDataItem variant="gold" value={3530} />
        <UserPrivateDataItem variant="credits" value={259449529} />
        <UserPrivateDataItem variant="freeExp" value={543192} />
      </UserPrivateDataList>
      <div className={cls.primaryUserData}>
        <h3 className={cls.username}>
          {user?.nickname}
          <InfoIcon className={cls.info} />
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
              ? userBioMessage
              : unregisteredUserMessage
          }
        </p>
      </div>
      <ul className={cls.socials}>
        <li className={cls.socialElement}>
          <a className={cls.socialLink} href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <VkIcon className={classNames(cls.socialIcon)} />
          </a>
        </li>
        <li className={cls.socialElement}>
          <a className={cls.socialLink} href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <TgIcon className={classNames(cls.socialIcon)} />
          </a>
        </li>
        <li className={cls.socialElement}>
          <a className={cls.socialLink} href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon className={classNames(cls.socialIcon)} />
          </a>
        </li>
        <li className={cls.socialElement}>
          <a className={cls.socialLink} href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <DiscordIcon className={classNames(cls.socialIcon)} />
          </a>
        </li>
      </ul>
      <UserRating ratingData={ratingData} />
    </section>
  );
});
