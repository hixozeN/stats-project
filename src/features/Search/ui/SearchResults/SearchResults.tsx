import React, { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { useTranslation } from 'react-i18next';
import { Dropdown } from './Dropdown/Dropdown';
import cls from './SearchResults.module.scss';

interface ISearchResults {
  className?: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpenPopup?: React.Dispatch<React.SetStateAction<boolean>>,
  isMobile?: boolean;
  resultsRef?: React.MutableRefObject<HTMLInputElement>;
}
export const SearchResults = memo(({
  className, isOpen, setIsOpen, setIsOpenPopup, isMobile, resultsRef,
}: ISearchResults) => {
  const { t } = useTranslation('search');
  const tabList = [t('Игроки'), t('Кланы')];
  const [tab, setTab] = useState(0);

  return (
    <div
      className={
        classNames(
          cls.SearchResults,
          {
            [cls.opened]: isOpen,
            [cls.visible]: isMobile,
          },
          [className],
        )
      }
      ref={resultsRef}
    >
      <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
      <Dropdown tab={tab} setIsOpen={setIsOpen} setIsOpenPopup={setIsOpenPopup} isMobile={isMobile} />
    </div>
  );
});
