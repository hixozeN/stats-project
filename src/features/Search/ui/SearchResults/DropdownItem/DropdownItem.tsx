import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DeviceContext } from '../../Search/Search';
import { MobileContext } from '../../SearchMobile/SearchMobile';
import { DesktopContext } from '../../SearchDesktop/SearchDesktop';
import cls from './DropdownItem.module.scss';

interface IDropdownItem {
  className?: string,
  link: string,
  icon: React.ReactElement,
  name: string,
  tag: string,
}
export const DropdownItem = memo((props: IDropdownItem) => {
  const {
    className,
    link,
    icon,
    name,
    tag,
  } = props;

  const isMobile = useContext(DeviceContext);
  const { setIsOpenPopup } = useContext(MobileContext);
  const { setIsOpen } = useContext(DesktopContext);

  const handleClose = () => {
    if (isMobile) {
      setIsOpenPopup(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <li
      className={classNames(cls.item, {}, [className])}
      onClick={handleClose}
    >
      <Link className={cls.link} to={link}>
        {icon}
        {tag && <span>{`[${tag}]`}</span>}
        <span className={cls.name}>{name}</span>
      </Link>
    </li>
  );
});
