import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Menu } from 'shared/ui/Menu';
import cls from './ProfileSidebar.module.scss';

interface IProfileSidebarProps {
  className?: string;
}

export const ProfileSidebar = memo(({ className }: IProfileSidebarProps) => (
  <div className={classNames(cls.ProfileSidebar, {}, [className])}>
    <Menu theme="profileSidebar" />
  </div>
));
