import React, { createContext, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';
import cls from './SearchDesktop.module.scss';

interface ISearchDesktop {
  className?: string,
}

type DesktopContextType = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const initialDesktopContextValue: DesktopContextType = {
  isOpen: false,
  setIsOpen: () => {},
};

export const DesktopContext = createContext<DesktopContextType>(initialDesktopContextValue);

export const SearchDesktop = (props: ISearchDesktop) => {
  const {
    className,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const desktopContextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  const resultsRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={classNames(cls.SearchDesktop, {}, [className])}>
      <DesktopContext.Provider value={desktopContextValue}>
        <SearchForm resultsRef={resultsRef} />
        <SearchResults resultsRef={resultsRef} />
      </DesktopContext.Provider>
    </div>
  );
};
