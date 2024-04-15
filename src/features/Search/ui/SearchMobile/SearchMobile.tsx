import React, {
  createContext, useMemo, useState,
} from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import cls from './SearchMobile.module.scss';

interface ISearchMobile {
  className?: string,
}

type MobileContextType = {
  isOpenPopup: boolean,
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
};

const initialMobileContextValue: MobileContextType = {
  isOpenPopup: false,
  setIsOpenPopup: () => {},
};

export const MobileContext = createContext<MobileContextType>(initialMobileContextValue);

export const SearchMobile = (props: ISearchMobile) => {
  const {
    className,
  } = props;

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const mobileContextValue = useMemo(() => ({
    isOpenPopup, setIsOpenPopup,
  }), [isOpenPopup, setIsOpenPopup]);

  const handleClick = () => {
    setIsOpenPopup(true);
  };

  const handleClose = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <Button
        type="button"
        theme="icon"
        variant="magnifier"
        className={cls.button}
        onClick={handleClick}
      />
      <Modal isOpen={isOpenPopup} onClose={handleClose}>
        <div className={classNames(cls.container, {}, [className])}>
          <MobileContext.Provider value={mobileContextValue}>
            <SearchForm />
            <SearchResults />
          </MobileContext.Provider>
        </div>
      </Modal>
    </>
  );
};
