import React, { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { classNames } from 'shared/lib/classNames/classNames';
import { DeviceContext, SearchModalsContext } from '../Search/Search';
import { Dropdown } from './Dropdown/Dropdown';
import cls from './SearchResults.module.scss';

interface ISearchResults {
  className?: string;
  resultsRef?: React.MutableRefObject<HTMLInputElement>;
}
export const SearchResults = memo(({
  className, resultsRef,
}: ISearchResults) => {
  const { t } = useTranslation('search');
  const tabList = [t('Игроки'), t('Кланы')];
  const [tab, setTab] = useState(0);
  const { isMobile } = useContext(DeviceContext);
  const { isPopoverOpen, searchType } = useContext(SearchModalsContext);

  return (
    <div
      className={
        classNames(
          cls.SearchResults,
          {
            [cls.opened]: isPopoverOpen,
            [cls.visible]: isMobile,
            [cls.favoriteList]: searchType === 'favorites',
          },
          [className],
        )
      }
      ref={resultsRef}
    >
      <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
      <Dropdown tab={tab} />
    </div>
  );
});
