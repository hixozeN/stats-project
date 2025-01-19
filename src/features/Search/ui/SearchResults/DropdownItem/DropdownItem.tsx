import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { searchActions } from 'features/Search';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
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
  id: number,
}
export const DropdownItem = memo((props: IDropdownItem) => {
  const {
    className,
    link,
    icon,
    name,
    tag,
    id,
  } = props;

  const { isMobile } = useContext(DeviceContext);
  const { setIsOpenPopup } = useContext(MobileContext);
  const { setIsOpen } = useContext(DesktopContext);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(searchActions.setSearch(''));
    if (isMobile) {
      setIsOpenPopup(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <li
      className={classNames(cls.item, {}, [className])}
    >
      <FavoritesButton theme="search" id={id} tag={tag} />
      <Link className={cls.link} to={link} onClick={handleClose}>
        {icon}
        {tag && <span>{`[${tag}]`}</span>}
        <span className={cls.name}>{name}</span>
      </Link>
    </li>
  );
});
