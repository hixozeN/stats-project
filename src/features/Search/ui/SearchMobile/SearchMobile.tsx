import React, { useContext } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SearchModalsContext } from '../Search/Search';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import cls from './SearchMobile.module.scss';

interface ISearchMobile {
  className?: string,
}

export const SearchMobile = (props: ISearchMobile) => {
  const {
    className,
  } = props;

  const { t } = useTranslation('search');

  const { isOpenPopup, setIsOpenPopup, setSearchType } = useContext(SearchModalsContext);

  const handleClick = () => {
    setSearchType('all');
    setIsOpenPopup(true);
  };

  const handleClose = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <Button
        aria-label={t('Поиск')}
        type="button"
        theme="icon"
        variant="magnifier"
        className={cls.button}
        onClick={handleClick}
      />
      <Modal isOpen={isOpenPopup} onClose={handleClose}>
        <div className={classNames(cls.container, {}, [className])}>
          <SearchForm />
          <SearchResults />
        </div>
      </Modal>
    </>
  );
};
