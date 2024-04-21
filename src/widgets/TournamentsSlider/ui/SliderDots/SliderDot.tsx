import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SliderDots.module.scss';

interface ISliderDotProps {
  className?: string;
  index: number;
  slideNumber: number;
  // eslint-disable-next-line no-unused-vars
  changeSlide: (num: number) => void;
}

export const SliderDot = memo(
  ({
    className, index, slideNumber, changeSlide,
  }: ISliderDotProps) => {
    const isActive = index === slideNumber;

    return (
      <li className={cls.dotItem} onClick={() => changeSlide(index)}>
        <div
          className={classNames(cls.dot, { [cls.active]: isActive }, [
            className,
          ])}
        />
      </li>
    );
  },
);
