import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ProfileSidebarItem } from 'widgets/ProfileSidebar/ui/ProfileSidebarItem/ProfileSidebarItem';
import cls from './ProfileSidebar.module.scss';
import { MenuData, dataList } from '../../config/profileSidbarIData';

interface IProfileSidebarProps {
  isNavbar?: boolean;
}

export const ProfileSidebar = memo(({ isNavbar }: IProfileSidebarProps) => {
  const { t } = useTranslation();

  const dataListContent = isNavbar ? dataList : dataList.slice(0, -1);

  console.log(RoutePath[AppRoutes.NOT_FOUND]);
  return (
    <div
      className={classNames(cls.ProfileSidebar, { [cls.navbar]: isNavbar }, [])}
    >
      <ul className={classNames(cls.list, { [cls.navbar]: isNavbar }, [])}>
        {dataListContent.map(({id, path, name, icon}: MenuData) => (
          <ProfileSidebarItem
            key={id}
            name={t(`${name}`)}
            path={path}
            icon={icon}
            isNavbar
          />
        ))}
        {/* <ProfileSidebarItem
          name={t('История матчей')}
          path={RoutePath.profile_history}
          icon={<HistoryIcon />}
        />
        <ProfileSidebarItem
          name={t('Личные данные')}
          path={RoutePath.profile_edit}
          icon={<ProfileIcon />}
        />
        <ProfileSidebarItem
          name={t('Параметры')}
          path={RoutePath.profile_settings}
          icon={<SettingsIcon />}
        />
        <ProfileSidebarItem
          name={t('Черный список')}
          path={RoutePath.profile_blacklist}
          icon={<BlacklistIcon />}
        /> */}
      </ul>
    </div>
  );
});
