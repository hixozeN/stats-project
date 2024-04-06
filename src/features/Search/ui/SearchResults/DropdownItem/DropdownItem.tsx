import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DropdownItem.module.scss';

interface IDropdownItem {
  className?: string,
  link: string,
  icon: React.ReactElement,
  name: string,
  tag: string,
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpenPopup?: React.Dispatch<React.SetStateAction<boolean>>,
  isMobile: boolean,
}
export const DropdownItem = memo((props: IDropdownItem) => {
  const {
    className,
    link,
    icon,
    name,
    tag,
    setIsOpen,
    setIsOpenPopup,
    isMobile,
  } = props;

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
