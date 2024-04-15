import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import VkIcon from 'shared/assets/icons/vk-circle.svg';
import TgIcon from 'shared/assets/icons/tg-circle.svg';
import DiscordIcon from 'shared/assets/icons/ds-circle.svg';
import YouTubeIcon from 'shared/assets/icons/youtube-circle.svg';
import { useSelector } from 'react-redux';
import { getUserDataLoadingStatus, getUserSocialLinks } from 'entities/Lesta/index';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './UserSocialLinks.module.scss';

interface UserSocialLinksProps {
  className?: string;
}

interface SocialLinkItem {
  link: string,
  icon: ReactNode,
}

enum Links {
  vk = 'vk',
  telegram = 'telegram',
  discord = 'discord',
  youtube = 'youtube',
}

interface SocialLinks {
  [Links.vk]?: SocialLinkItem,
  [Links.telegram]?: SocialLinkItem,
  [Links.youtube]?: SocialLinkItem,
  [Links.discord]?: SocialLinkItem,
  [key: string]: SocialLinkItem,
}

const socialIcons: SocialLinks = {
  vk: {
    link: 'https://vk.com/',
    icon: <VkIcon className={classNames(cls.socialIcon, {}, [cls.vk])} />,
  },
  telegram: {
    link: 'https://t.me/',
    icon: <TgIcon className={classNames(cls.socialIcon, {}, [cls.tg])} />,
  },
  discord: {
    link: 'https://discordapp.com/users/',
    icon: <DiscordIcon className={classNames(cls.socialIcon, {}, [cls.discord])} />,
  },
  youtube: {
    link: 'https://youtube.com/',
    icon: <YouTubeIcon className={classNames(cls.socialIcon, {}, [cls.yt])} />,
  },
};

export const UserSocialLinks = memo((props: UserSocialLinksProps) => {
  const { className } = props;
  const userSocialLinks = useSelector(getUserSocialLinks);
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);

  const renderLinks = useCallback(() => Object.entries(userSocialLinks).map(([key, value]: [string, string]) => {
    if (value) {
      return (
        <li key={value} className={cls.socialElement}>
          <a
            className={classNames(cls.socialLink)}
            href={`${socialIcons[key].link}${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialIcons[key].icon}
          </a>
        </li>
      );
    }
    return null;
  }), [userSocialLinks]);

  if (isUserDataLoading) {
    return (
      <ul className={classNames(cls.socials, {}, [className])}>
        {[...new Array(2)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className={cls.socialElement}>
            <Skeleton width={40} height={40} borderRadius="50%" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={classNames(cls.socials, {}, [className])}>
      {renderLinks()}
    </ul>
  );
});
