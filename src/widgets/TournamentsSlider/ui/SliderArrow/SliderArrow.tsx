import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Arrow from 'shared/assets/icons/slider/arrow.svg';
import cls from './SliderArrow.module.scss';

interface ISliderArrowsProps {
  className?: string;
  direction: 'right' | 'left';
  changeSlide?: () => void;
}

export const SliderArrow = memo(({ className, direction, changeSlide }: ISliderArrowsProps) => {
  if (direction === 'left') {
    return <Arrow className={classNames(cls.arrow, {}, [className, cls.left])} onClick={changeSlide} />;
  }

  return <Arrow className={classNames(cls.arrow, {}, [className, cls.right])} onClick={changeSlide} />;
});
