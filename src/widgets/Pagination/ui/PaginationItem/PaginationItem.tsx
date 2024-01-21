import { memo } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PaginationItem.module.scss';

interface ISliderDotProps {
  className?: string;
  index: number;
  slideNumber: number;
  theme: ButtonTheme;
  // eslint-disable-next-line no-unused-vars
  changeSlide: (num: number) => void;
}

export const PaginationItem = memo(
  ({
    className, index, slideNumber, theme, changeSlide,
  }: ISliderDotProps) => {
    const isActive = index === slideNumber;

    return (
      <li className={classNames(cls.PaginationItem, {}, [className])}>
        <Button
          isActive={isActive}
          type="button"
          theme={theme}
          onClick={() => changeSlide(index)}
        >
          {theme !== 'dots' && index + 1}
        </Button>
      </li>
    );
  },
);
