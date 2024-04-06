import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { SearchMobile } from '../SearchMobile/SearchMobile';
import { SearchDesktop } from '../SearchDesktop/SearchDesktop';
import cls from './Search.module.scss';

interface ISearch {
  className?: string,
}

export const Search = ({ className } :ISearch) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useSizeScreen();

  useEffect(() => {
    if (width > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [isMobile, width]);

  const clickSearch = () => {
    if (isMobile) {
      setIsOpenPopup(!isOpenPopup);
    }
  };

  return (
    <div className={classNames(cls.Search, {}, [className])}>
      <Button
        type="button"
        theme="icon"
        variant="magnifier"
        className={cls.button}
        onClick={clickSearch}
      />
      {isMobile
        ? (<SearchMobile isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup} isMobile={isMobile} />)
        : (<SearchDesktop isMobile={isMobile} />)}
    </div>
  );
};
