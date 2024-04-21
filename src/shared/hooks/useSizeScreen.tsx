import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { DEVICE_SETTING, DeviceList } from 'widgets/Tanks/config/deviceData';

export const useSizeScreen = (): { width: number; height: number; device: keyof DeviceList} => {
  const getWindowWidth = useCallback(() => window.innerWidth, []);
  const getWindowHeight = useCallback(() => window.innerHeight, []);
  const debouncer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [width, setScreenWidth] = useState<number>(getWindowWidth());
  const [height, setScreenHeight] = useState<number>(getWindowHeight());
  const [device, setDevice] = useState<keyof DeviceList>(DEVICE_SETTING.desktop.device);

  useEffect(() => {
    const handleResize = () => {
      if (debouncer.current) {
        clearTimeout(debouncer.current);
      }

      debouncer.current = setTimeout(() => {
        setScreenWidth(getWindowWidth);
        setScreenHeight(getWindowHeight);
        if (getWindowWidth() <= DEVICE_SETTING.mobile.maxSize) {
          setDevice(DEVICE_SETTING.mobile.device);
        } else if (window.innerWidth <= DEVICE_SETTING.tablet.maxSize) {
          setDevice(DEVICE_SETTING.tablet.device);
        } else if (window.innerWidth <= DEVICE_SETTING.smallDesktop.maxSize) {
          setDevice(DEVICE_SETTING.smallDesktop.device);
        } else {
          setDevice(DEVICE_SETTING.desktop.device);
        }
      }, 300);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      if (debouncer.current) {
        clearTimeout(debouncer.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [getWindowHeight, getWindowWidth]);

  return { width, height, device };
};
