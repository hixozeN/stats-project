import React, {
  memo, useEffect, useState,
} from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { TournamentsSlider } from 'widgets/TournamentsSlider/index';
import { TournamentsNav } from 'widgets/TournamentsNav/ui/TournamentsNav';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/ui/Loader/Loader';
import {
  getTournamentsLoadingStatus,
  fetchTournamentsData,
  TournamentList,
} from 'entities/Tournament';
import { Background } from 'shared/ui/Background/Background';
import { tabs } from '../utils/tabsConfig';
import cls from './TournamentsPage.module.scss';

const TournamentsPage = () => {
  const isLoading = useSelector(getTournamentsLoadingStatus);
  const [tab, setTab] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTournamentsData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <ErrorBoundary>
        <Background />
        <div className={cls.tournaments}>
          <div className={cls.wrapper}>
            <Loader />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Background />
      <div className={cls.tournaments}>
        <div className={cls.wrapper}>
          <TournamentsSlider />
          <TournamentsNav tab={tab} tabList={tabs} handleChangeTab={setTab} />
          <TournamentList activeTab={tab} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(TournamentsPage);
