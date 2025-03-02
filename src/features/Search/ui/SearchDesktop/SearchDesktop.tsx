import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import cls from './SearchDesktop.module.scss';

interface ISearchDesktop {
  className?: string,
  resultsRef?: React.MutableRefObject<HTMLInputElement>;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export const SearchDesktop = (props: ISearchDesktop) => {
  const {
    className,
    resultsRef,
    inputRef,
  } = props;

  return (
    <div className={classNames(cls.SearchDesktop, {}, [className])}>

      <SearchForm inputRef={inputRef} />
      <SearchResults resultsRef={resultsRef} />
    </div>
  );
};
