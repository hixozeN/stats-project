import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { useTranslation } from 'react-i18next';
import cls from './TeamsPageNav.module.scss';

interface TeamsPageNavProps {
  className?: string;
  tab: number;
  tabList: string[];
  isUppercase: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChangeTab: (i: number) => void;
}

export const TeamsPageNav = memo((props: TeamsPageNavProps) => {
  const {
    className, tab, tabList, handleChangeTab, isUppercase,
  } = props;
  // const { width } = useSizeScreen();
  // const { t } = useTranslation();

  return (
    <nav className={classNames(cls.navigation, {}, [className])} id="teamsNav">
      <Tabs
        tab={tab}
        isUppercase={isUppercase}
        tabList={tabList}
        handleChangeTab={handleChangeTab}
      />
    </nav>
  );
});
