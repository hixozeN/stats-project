import {
  memo,
  useCallback,
  useEffect,
  useState,
  TouchEvent,
  useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import {
  TournamentData,
  getLadders,
  getTournaments,
} from 'entities/Tournament';
import { Pagination } from 'widgets/Pagination';
import cls from './TournamentsSlider.module.scss';
import { Slide } from '../Slide/Slide';
import { SliderArrow } from '../SliderArrow/SliderArrow';

interface ITournamentsSliderProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayTime?: number;
}

export const TournamentsSlider = memo((props: ITournamentsSliderProps) => {
  const { className, autoPlay = true, autoPlayTime = 5000 } = props;

  const tournamentList = useSelector(getTournaments);
  const ladderList = useSelector(getLadders);
  // const [items, setItems] = useState<TournamentData[]>();
  const items: TournamentData[] = useMemo(
    () => [...tournamentList, ...ladderList],
    [tournamentList, ladderList],
  );
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const changeSlideRight = useCallback(() => {
    if (slide === items.length - 1) {
      return setSlide(0);
    }
    return setSlide(slide + 1);
  }, [setSlide, slide, items]);

  const changeSlideLeft = useCallback(() => {
    if (slide === 0) {
      return setSlide(items.length - 1);
    }
    return setSlide(slide - 1);
  }, [setSlide, slide, items]);

  const changeSlide = useCallback((num: number) => setSlide(num), [setSlide]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touchDown = e.touches[0].clientX;

      setTouchPosition(touchDown);
    },
    [setTouchPosition],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchPosition === null) return;

      const currentPosition = e.touches[0].clientX;
      const direction = touchPosition - currentPosition;

      if (direction > 3) changeSlideRight();
      if (direction < -3) changeSlideLeft();

      setTouchPosition(null);
    },
    [touchPosition, changeSlideRight, changeSlideLeft],
  );

  useEffect(() => {
    if (!autoPlay) return;
    const slideshow = setInterval(() => changeSlideRight(), autoPlayTime);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(slideshow);
  }, [changeSlideRight, autoPlayTime, autoPlay]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className={classNames(cls.slider, {}, [className])}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SliderArrow
        direction="left"
        size="big"
        isSlider
        changeSlide={changeSlideLeft}
      />
      <div className={classNames(cls.slidesWrapper)}>
        <ul
          className={classNames(cls.slideList)}
          style={{ transform: `translate(-${slide * 100}%)` }}
        >
          {items.map((item: TournamentData) => (
            <Slide key={item._id} tournamentData={item} />
          ))}
        </ul>
      </div>
      <SliderArrow
        direction="right"
        size="big"
        isSlider
        changeSlide={changeSlideRight}
      />

      <Pagination
        theme="dots"
        slides={items}
        slideNumber={slide}
        changeSlide={changeSlide}
      />
    </section>
  );
});
