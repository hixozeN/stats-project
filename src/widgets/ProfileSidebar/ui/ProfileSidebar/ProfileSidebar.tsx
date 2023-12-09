import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  ProfileSidebarItem,
} from 'widgets/ProfileSidebar/ui/ProfileSidebarItem/ProfileSidebarItem';
import StatsIcon from 'shared/assets/icons/stats.svg';
import HistoryIcon from 'shared/assets/icons/history.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import BlacklistIcon from 'shared/assets/icons/blacklist.svg';
import cls from './ProfileSidebar.module.scss';

interface IProfileSidebarProps {
  className?: string;
}

export const ProfileSidebar = memo(({ className }: IProfileSidebarProps) => {
  const { t } = useTranslation('profile');

  return (
    <div className={classNames(cls.ProfileSidebar, {}, [className])}>
      <ul className={classNames(cls.list)}>
        <ProfileSidebarItem name={t('Статистика')} path={RoutePath.profile_stats} icon={<StatsIcon />} />
        <ProfileSidebarItem name={t('История матчей')} path={RoutePath.profile_history} icon={<HistoryIcon />} />
        <ProfileSidebarItem name={t('Личные данные')} path={RoutePath.profile_edit} icon={<ProfileIcon />} />
        <ProfileSidebarItem name={t('Параметры')} path={RoutePath.profile_settings} icon={<SettingsIcon />} />
        <ProfileSidebarItem name={t('Черный список')} path={RoutePath.profile_blacklist} icon={<BlacklistIcon />} />
      </ul>
    </div>
  );
});
