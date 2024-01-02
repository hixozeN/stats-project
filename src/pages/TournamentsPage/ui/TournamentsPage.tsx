import React, {
  memo, useEffect, useState,
} from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { TournamentsSlider } from 'widgets/TournamentsSlider/index';
import { TournamentsNav } from 'widgets/TournamentsNav/ui/TournamentsNav';
import { TournamentData, TournamentList } from 'entities/Tournament/index';
import { $api } from 'shared/api/api';
import { useDispatch } from 'react-redux';
import {
  filterDataOnLadders,
  filterDataOnTournaments, filterFinishedTournaments,
} from 'entities/Tournament/lib/filterRecievedData';
import {
  tournamentActions,
  tournamentReducer,
} from 'entities/Tournament/model/slice/tournamentSlice';
import {
  ReducerList,
  useDynamicReducerLoader,
} from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import Loader from 'shared/ui/Loader/Loader';
import { tabs } from '../utils/tabsConfig';
import cls from './TournamentsPage.module.scss';

const initialReducers: ReducerList = { tournaments: tournamentReducer };

const TournamentsPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const dispatch = useDispatch();
  const { addTournaments, addLadders, addFinishedTournaments } = tournamentActions;
  // useDynamicReducerLoader({ reducers: initialReducers });

  useEffect(() => {
    $api.get<TournamentData[]>('/tournaments')
      .then(({ data }) => {
        const ladders = filterDataOnLadders(data);
        const tournaments = filterDataOnTournaments(data);
        const finished = filterFinishedTournaments(data);

        dispatch(addLadders(ladders));
        dispatch(addTournaments(tournaments));
        dispatch(addFinishedTournaments(finished));
      })
      .catch((e) => e)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <ErrorBoundary>
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
