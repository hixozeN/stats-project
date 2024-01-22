import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import {
  TournamentData,
  getLadders,
  getTournaments,
} from 'entities/Tournament/index';
import { $api } from 'shared/api/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterDataOnLadders,
  filterDataOnTournaments,
  filterFinishedTournaments,
} from 'entities/Tournament/lib/filterRecievedData';
import {
  tournamentActions,
  tournamentReducer,
} from 'entities/Tournament/model/slice/tournamentSlice';
import { ReducerList } from 'shared/hooks/useDynamicReducerLoader/useDynamicReducerLoader';
import Loader from 'shared/ui/Loader/Loader';
import { TeamsPageNav } from 'widgets/TeamsPageNav/ui/TeamsPageNav';
import { Background } from 'shared/ui/Background/Background';
import { Pagination } from 'widgets/Pagination';
import { SliderArrow } from 'widgets/TournamentsSlider/ui/SliderArrow/SliderArrow';
import { tabs, isUppercase, backgraundUrl } from '../utils/tabsConfig';
import cls from './TeamsPage.module.scss';

const TeamsPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const dispatch = useDispatch();
  const { addTournaments, addLadders, addFinishedTournaments } = tournamentActions;
  // useDynamicReducerLoader({ reducers: initialReducers });

  useEffect(() => {
    $api
      .get<TournamentData[]>('/tournaments')
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

  // const items = memo(<TournamentItem />);
  const tournamentList = useSelector(getTournaments);
  const ladderList = useSelector(getLadders);
  const items: TournamentData[] = useMemo(
    () => [...tournamentList, ...ladderList],
    [tournamentList, ladderList],
  );
  const [slide, setSlide] = useState(0);

  const changeSlide = useCallback((num: number) => setSlide(num), [setSlide]);

  const changeSlideLeft = useCallback(() => {
    if (slide === 0) {
      return setSlide(items.length - 1);
    }
    return setSlide(slide - 1);
  }, [setSlide, slide, items]);

  const changeSlideRight = useCallback(() => {
    if (slide === items.length - 1) {
      return setSlide(0);
    }
    return setSlide(slide + 1);
  }, [setSlide, slide, items]);

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className={cls.teams}>
          <div className={cls.wrapper}>
            <Loader />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Background url={backgraundUrl} theme="image" />
      <div className={cls.teams}>
        <div className={cls.wrapper}>
          <TeamsPageNav
            tab={tab}
            isUppercase={isUppercase}
            tabList={tabs}
            handleChangeTab={setTab}
          />
        </div>
        {items.length > 1 && (
          <div className={cls.pagination}>
            <SliderArrow
              direction="left"
              size="small"
              changeSlide={changeSlideLeft}
            />
            <Pagination
              theme="numbers"
              slides={items}
              slideNumber={slide}
              changeSlide={changeSlide}
            />
            <SliderArrow
              direction="right"
              size="small"
              changeSlide={changeSlideRight}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default memo(TeamsPage);
