import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import VkIcon from 'shared/assets/icons/vk-circle.svg';
import TgIcon from 'shared/assets/icons/tg-circle.svg';
import DiscordIcon from 'shared/assets/icons/ds-circle.svg';
import YouTubeIcon from 'shared/assets/icons/youtube-circle.svg';
import { useSelector } from 'react-redux';
import { getUserSocialLinks } from 'entities/Lesta/index';
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
    link: 'https://youtube.com/@',
    icon: <YouTubeIcon className={classNames(cls.socialIcon, {}, [cls.yt])} />,
  },
};

export const UserSocialLinks = memo((props: UserSocialLinksProps) => {
  const { className } = props;
  const userSocialLinks = useSelector(getUserSocialLinks);

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

  return (
    <ul className={classNames(cls.socials, {}, [className])}>
      {renderLinks()}
    </ul>
  );
});
