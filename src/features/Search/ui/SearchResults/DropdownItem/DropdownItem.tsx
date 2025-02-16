import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { searchActions } from 'features/Search';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { FavoritesButton } from 'shared/ui/FavoritesButton/FavoritesButton';
import { FavoriteClan } from 'entities/Favorites';
import { DeviceContext, SearchModalsContext } from '../../Search/Search';
import cls from './DropdownItem.module.scss';

interface IDropdownItem {
  className?: string;
  link: string;
  icon: React.ReactElement;
  name: string;
  tag: string;
  id: number;
  type: 'player' | 'clan';
}
export const DropdownItem = memo((props: IDropdownItem) => {
  const {
    className,
    link,
    icon,
    name,
    tag,
    id,
    type,
  } = props;

  const { isMobile } = useContext(DeviceContext);
  const { setIsPopoverOpen, setIsOpenPopup } = useContext(SearchModalsContext);
  const dispatch = useAppDispatch();

  const clanData: FavoriteClan = {
    clan_id: id,
    tag,
    name,
  };

  const handleClose = () => {
    dispatch(searchActions.setSearch(''));
    if (isMobile) {
      setIsOpenPopup(false);
    } else {
      setIsPopoverOpen(false);
    }
  };

  return (
    <li
      className={classNames(cls.item, {}, [className])}
    >
      <FavoritesButton theme="search" id={id} type={type} clan={clanData} />
      <Link className={cls.link} to={link} onClick={handleClose}>
        {icon}
        {tag && <span>{`[${tag}]`}</span>}
        <span className={cls.name}>{name}</span>
      </Link>
    </li>
  );
});
