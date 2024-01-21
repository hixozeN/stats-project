import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Arrow from 'shared/assets/icons/slider/arrow.svg';
import cls from './SliderArrow.module.scss';

interface ISliderArrowsProps {
  className?: string;
  direction: 'right' | 'left';
  size: 'big' | 'small';
  isSlider?: boolean;
  changeSlide?: () => void;
}

export const SliderArrow = memo(
  ({
    className,
    direction,
    size,
    isSlider,
    changeSlide,
  }: ISliderArrowsProps) => (
    <Arrow
      className={classNames(cls.arrow, { [cls.slider]: isSlider }, [
        className,
        cls[direction],
        cls[size],
      ])}
      onClick={changeSlide}
    />
  ),
);
