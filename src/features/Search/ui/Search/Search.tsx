import React, {
  createContext, memo, useEffect, useMemo, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { FavoriteSearch } from '../FavoriteSearch';
import { SearchMobile } from '../SearchMobile/SearchMobile';
import { SearchDesktop } from '../SearchDesktop/SearchDesktop';
import cls from './Search.module.scss';

type DeviceContextType = {
  isMobile: boolean,
};

const initialDeviceContextValue: DeviceContextType = {
  isMobile: false,
};

export type SearchType = 'all' | 'favorites';

type SearchModalsContextType = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenPopup: boolean;
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
};

const initialSearchModalsValue: SearchModalsContextType = {
  isPopoverOpen: false,
  isOpenPopup: false,
  searchType: 'all',
  setIsPopoverOpen: () => {
  },
  setIsOpenPopup: () => {
  },
  setSearchType: () => {
  },
};

export const DeviceContext = createContext<DeviceContextType>(initialDeviceContextValue);
export const SearchModalsContext = createContext<SearchModalsContextType>(initialSearchModalsValue);

interface ISearch {
  className?: string,
}

export const Search = memo((props: ISearch) => {
  const { className } = props;
  const [isMobile, setIsMobile] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const resultsRef = React.useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const desktopContextValue = useMemo(() => (
    {
      isPopoverOpen,
      setIsPopoverOpen,
      isOpenPopup,
      setIsOpenPopup,
      searchType,
      setSearchType,
    }
  ), [isPopoverOpen, setIsPopoverOpen, isOpenPopup, setIsOpenPopup, searchType, setSearchType]);

  const { width } = useSizeScreen();

  const deviceContextValue = useMemo(() => ({ isMobile }), [isMobile]);

  useEffect(() => {
    if (width > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [isMobile, width]);

  useClickOutside(resultsRef, (evt) => {
    if (isPopoverOpen
      && searchType === 'favorites'
      && evt.target !== btnRef?.current
      && evt.target !== inputRef?.current) {
      setIsPopoverOpen(false);
      setSearchType('all');
    }

    if (isPopoverOpen && searchType === 'favorites' && evt.target === inputRef?.current) {
      setSearchType('all');
    }
  }, isMobile);

  useClickOutside(resultsRef, (evt) => {
    if (isPopoverOpen
      && searchType === 'all'
      && evt.target !== inputRef?.current
      && evt.target !== btnRef?.current) {
      setIsPopoverOpen(false);
      setSearchType('all');
    }

    if (isPopoverOpen && searchType === 'all' && evt.target === btnRef?.current) {
      setSearchType('favorites');
    }
  }, isMobile);

  return (
    <div className={classNames(cls.Search, {}, [className])}>
      <DeviceContext.Provider value={deviceContextValue}>
        <SearchModalsContext.Provider value={desktopContextValue}>
          {isMobile
            ? <SearchMobile />
            : <SearchDesktop resultsRef={resultsRef} inputRef={inputRef} />}
          <FavoriteSearch btnRef={btnRef} />
        </SearchModalsContext.Provider>
      </DeviceContext.Provider>
    </div>
  );
});
