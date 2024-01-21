import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { PaginationItem } from 'widgets/Pagination/ui/PaginationItem/PaginationItem';
import { ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Pagination.module.scss';

export type PaginationItemTheme = 'dots' | 'numbers';

interface IPaginationProps {
  className?: string;
  slideNumber: number;
  slides: any[];
  theme: ButtonTheme;
  // eslint-disable-next-line no-unused-vars
  changeSlide: (num: number) => void;
}

export const Pagination = memo(
  ({
    className,
    slides,
    slideNumber,
    theme,
    changeSlide,
  }: IPaginationProps) => {
    const renderItem = useCallback(
      () => slides.map((item, i) => (
        <PaginationItem
          theme={theme}
          key={item._id}
          index={i}
          slideNumber={slideNumber}
          changeSlide={changeSlide}
          className="cdp_i"
        />
      )),
      [slides, theme, slideNumber, changeSlide],
    );

    return (
      <ul className={classNames(cls[theme], {}, [className])}>
        {renderItem()}
      </ul>
    );
  },
);
