import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';

interface IDropdown {
  className?: string,
  isOpen?: boolean;
  children?: ReactNode,
  dropdownRef?: React.Ref<HTMLDivElement>,
}

export const Dropdown = (props: IDropdown) => {
  const {
    className, isOpen, dropdownRef, children,
  } = props;
  return (
    <div
      className={classNames(
        cls.notification,
        { [cls.notificationOpened]: isOpen },
        [className],
      )}
      ref={dropdownRef}
    >
      {children}
    </div>
  );
};
