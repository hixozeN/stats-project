import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'shared/ui/Logo/Logo';
import DiscordIcon from 'shared/assets/icons/discord.svg';
import YoutubeIcon from 'shared/assets/icons/youtube.svg';
import Crown from 'shared/assets/icons/crown.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { dataList } from 'widgets/Footer/config/dataList';
import cls from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation('footer');

  return (
    <footer className={classNames(cls.Footer, {}, [className])}>
      <Crown className={cls.crownBackground} />
      <div className={cls.wrapper}>
        <Logo theme="footer" />
        <nav>
          <ul className={cls.list}>
            {dataList.map(({ id, title, list }) => (
              <li className={cls.item} key={id}>
                <h2 className={cls.title}>{t(title)}</h2>
                <ul className={classNames(cls.list, {}, [cls.inner])}>
                  {list.map(({ name, link }) => (
                    <li className={classNames(cls.item, {}, [])} key={link}>
                      <AppLink
                        theme={AppLinkTheme.PRIMARY}
                        to={link}
                        className={cls.link}
                      >
                        {t(name)}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className={cls.socials}>
          <AppLink to="/" theme={AppLinkTheme.PRIMARY}>
            <DiscordIcon />
          </AppLink>
          <AppLink to="/" theme={AppLinkTheme.PRIMARY}>
            <YoutubeIcon />
          </AppLink>
        </div>
      </div>
      <p
        className={classNames(cls.copyright, {}, [cls.darkText])}
      >
        {t('Все права защищены. 2023')}
      </p>
    </footer>
  );
};
