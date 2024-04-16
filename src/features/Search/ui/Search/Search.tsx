import React, {
  createContext, memo, useEffect, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { SearchMobile } from '../SearchMobile/SearchMobile';
import { SearchDesktop } from '../SearchDesktop/SearchDesktop';
import cls from './Search.module.scss';

interface ISearch {
  className?: string,
}
type DeviceContextType = {
  isMobile: boolean,
};

const initialDeviceContextValue: DeviceContextType = {
  isMobile: false,
};

export const DeviceContext = createContext<DeviceContextType>(initialDeviceContextValue);

export const Search = memo((props: ISearch) => {
  const { className } = props;
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useSizeScreen();

  const deviceContextValue = useMemo(() => ({ isMobile }), [isMobile]);

  useEffect(() => {
    if (width > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [isMobile, width]);

  return (
    <div className={classNames(cls.Search, {}, [className])}>
      <DeviceContext.Provider value={deviceContextValue}>
        {isMobile
          ? <SearchMobile />
          : <SearchDesktop />}
      </DeviceContext.Provider>
    </div>
  );
});
