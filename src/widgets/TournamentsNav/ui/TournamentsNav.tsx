import {
  memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { useTranslation } from 'react-i18next';
import cls from './TournamentsNav.module.scss';

interface ITournamentsNavProps {
  className?: string;
  tab: number;
  tabList: string[];
  // eslint-disable-next-line no-unused-vars
  handleChangeTab: (i: number) => void;
}

export const TournamentsNav = memo((props: ITournamentsNavProps) => {
  const {
    className, tab, tabList, handleChangeTab,
  } = props;
  const { width } = useSizeScreen();
  const { t } = useTranslation();

  const renderCreateTournamentBtn = useCallback(() => (width > 1024
    ? <Button variant="create" size="size_m">{t('Создать')}</Button>
    : <Button variant="create" />), [width, t]);

  return (
    <nav className={classNames(cls.navigation, {}, [className])} id="tournamentsNav">
      <Tabs tab={tab} tabList={tabList} handleChangeTab={handleChangeTab} />
      {renderCreateTournamentBtn()}
    </nav>
  );
});
