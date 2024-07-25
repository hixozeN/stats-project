import {
  memo, useMemo, useState,
} from 'react';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RatingNavigation.module.scss';

interface RatingNavigationProps {
  className?: string;
}

const LEADERBOARD_PARAMS: Record<string, number> = {
  vehicles: 0,
  players: 1,
  mmr: 2,
  sessions: 4,
};

const navigation: Record<number, string> = {
  0: '/rating/?type=vehicles',
  1: '/rating/?type=players',
  2: '/rating/?type=mmr',
  3: '/rating/?type=sessions',
};

export const RatingNavigation = memo((props: RatingNavigationProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');
  const tabs = useMemo(() => (
    [t('TAB_TANKS'), t('TAB_PLAYERS'), t('TAB_RATING_BATTLES'), t('TAB_SESSIONS')]
  ), [t]);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(LEADERBOARD_PARAMS[params.get('type')]);

  const handleChangeTab = (n: number) => {
    setTab(n);
    navigate(navigation[n]);
  };

  return (
    <nav className={classNames(cls.nav, {}, [className])}>
      <Tabs tab={tab} tabList={tabs} handleChangeTab={handleChangeTab} />
    </nav>
  );
});
