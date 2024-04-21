import React, { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { classNames } from 'shared/lib/classNames/classNames';
import { DeviceContext } from '../Search/Search';
import { DesktopContext } from '../SearchDesktop/SearchDesktop';
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
  const { isOpen } = useContext(DesktopContext);

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
      <Dropdown tab={tab} />
    </div>
  );
});
