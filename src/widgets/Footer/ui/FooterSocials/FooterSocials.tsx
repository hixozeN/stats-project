import { classNames } from 'shared/lib/classNames/classNames';
import DiscordIcon from 'shared/assets/icons/ds-circle.svg';
import TelegramIcon from 'shared/assets/icons/tg-circle.svg';
import VKIcon from 'shared/assets/icons/vk-circle.svg';
import { useTranslation } from 'react-i18next';
import cls from './FooterSocials.module.scss';

interface IFooterSocials {
  className?: string,
}

export const FooterSocials = (props: IFooterSocials) => {
  const { className } = props;
  const { t } = useTranslation('footer');

  return (
    <div className={classNames(cls.socials, {}, [className])}>
      <a
        className={classNames('', {}, ['link-hovered'])}
        href="https://discord.gg/uewK7jKqZa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('DISCORD_LABEL')}
      >
        <DiscordIcon />
      </a>
      <a
        className={classNames('', {}, ['link-hovered'])}
        href="https://t.me/blitzstats"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('TG_LABEL')}
      >
        <TelegramIcon />
      </a>
      <a
        className={classNames('', {}, ['link-hovered'])}
        href="https://vk.com/olrcyteam"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('VK_LABEL')}
      >
        <VKIcon />
      </a>
    </div>
  );
};
