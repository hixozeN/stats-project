import { LINKS } from 'shared/consts/socialLinks';
import ChatIcon from 'shared/assets/icons/chat-circle.svg';
import TelegramIcon from 'shared/assets/icons/tg-circle.svg';
import DiscordIcon from 'shared/assets/icons/ds-circle.svg';
import VKIcon from 'shared/assets/icons/vk-circle.svg';
import cls from '../ui/Maintenance.module.scss';

export const links = [
  {
    link: LINKS.TELEGRAM_CHAT,
    label: 'TG_CHAT_LABEL',
    icon: <ChatIcon className={cls.icon} />,
    text: 'TELEGRAM_CHAT',
  },
  {
    link: LINKS.TELEGRAM,
    label: 'TG_LABEL',
    icon: <TelegramIcon />,
    text: 'TELEGRAM',
  },
  {
    link: LINKS.DISCORD,
    label: 'DISCORD_LABEL',
    icon: <DiscordIcon />,
    text: 'DISCORD',
  },
  {
    link: LINKS.VK,
    label: 'VK_LABEL',
    icon: <VKIcon />,
    text: 'VK',
  },
];
