import React, { SetStateAction } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import cls from './SearchMobile.module.scss';

interface ISearchMobile {
  className?: string,
  isOpenPopup: boolean,
  setIsOpenPopup: React.Dispatch<SetStateAction<boolean>>;
  isMobile: boolean,
}
export const SearchMobile = (props: ISearchMobile) => {
  const {
    className,
    isOpenPopup,
    setIsOpenPopup,
    isMobile,
  } = props;

  const handleClose = () => {
    setIsOpenPopup(false);
  };

  return (
    <Modal isOpen={isOpenPopup} onClose={handleClose}>
      <div className={classNames(cls.container, {}, [className])}>
        <SearchForm isOpenPopup={isOpenPopup} isMobile={isMobile} />
        <SearchResults setIsOpenPopup={setIsOpenPopup} isMobile={isMobile} />
      </div>
    </Modal>
  );
};
