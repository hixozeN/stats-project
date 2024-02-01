import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'shared/ui/Loader/Loader';
import { TeamsPageNav } from 'widgets/TeamsPageNav';
import { Background } from 'shared/ui/Background/Background';
import { Pagination } from 'widgets/Pagination';
import { SliderArrow } from 'widgets/TournamentsSlider';
import {
  TeamsList,
  fetchTeamsData,
  getTeamsLoadingStatus,
} from 'entities/Team';
import cls from './TeamsPage.module.scss';
import { tabs, isUppercase, backgroundUrl } from '../utils/tabsConfig';

const TeamsPage = () => {
  const isLoading = useSelector(getTeamsLoadingStatus);
  const [tab, setTab] = useState(0);
  // const MAX_TEAMS_SLIDE = 10;
  const [items] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeamsData());
  }, [dispatch]);

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
      <Background url={backgroundUrl} theme="image" />
      <div className={cls.teams}>
        <div className={cls.wrapper}>
          <TeamsPageNav
            tab={tab}
            isUppercase={isUppercase}
            tabList={tabs}
            handleChangeTab={setTab}
          />
          <TeamsList activeTab={tab} />
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
