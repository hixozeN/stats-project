import React, { memo, useContext } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchModalsContext, DeviceContext } from '../Search/Search';
import { FavoriteButton } from './ui/FavoriteButton/FavoriteButton';
import cls from './FavoriteSearch.module.scss';

interface FavoriteSearchProps {
  className?: string;
  btnRef?: React.MutableRefObject<HTMLButtonElement>;
}

export const FavoriteSearch = memo((props: FavoriteSearchProps) => {
  const { className, btnRef } = props;

  const {
    isPopoverOpen, setIsPopoverOpen, isOpenPopup, setIsOpenPopup, searchType, setSearchType,
  } = useContext(SearchModalsContext);
  const { isMobile } = useContext(DeviceContext);

  const handleClick = () => {
    if (isMobile) {
      if (searchType === 'all' && isOpenPopup) return;

      setIsOpenPopup(!isOpenPopup);
    } else {
      if (searchType === 'all' && isPopoverOpen) return;

      setIsPopoverOpen(!isPopoverOpen);
    }
    setSearchType('favorites');
  };

  return (
    <div className={classNames(cls.root, {}, [className])}>
      <FavoriteButton onClick={handleClick} btnRef={btnRef} />
    </div>
  );
});
