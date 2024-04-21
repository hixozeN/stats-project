import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SliderDot } from 'widgets/TournamentsSlider/ui/SliderDots/SliderDot';
import cls from './SliderDots.module.scss';

interface ISliderDotsProps {
  className?: string;
  slideNumber: number;
  slides: any[];
  // eslint-disable-next-line no-unused-vars
  changeSlide: (num: number) => void;
}

export const SliderDots = memo(({
  className, slides, slideNumber, changeSlide,
}: ISliderDotsProps) => {
  const renderDots = useCallback(() => slides.map((item, i) => (
    <SliderDot key={item._id} index={i} slideNumber={slideNumber} changeSlide={changeSlide} />
  )), [slides, slideNumber, changeSlide]);

  return (
    <ul className={classNames(cls.dots, {}, [className])}>
      {renderDots()}
    </ul>
  );
});
