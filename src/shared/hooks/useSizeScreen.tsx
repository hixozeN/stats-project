import {
  useCallback, useEffect, useRef, useState,
} from 'react';

export const useSizeScreen = (): { width: number; height: number } => {
  const getWindowWidth = useCallback(() => window.innerWidth, []);
  const getWindowHeight = useCallback(() => window.innerHeight, []);
  const debouncer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [width, setScreenWidth] = useState<number>(getWindowWidth());
  const [height, setScreenHeight] = useState<number>(getWindowHeight());

  useEffect(() => {
    const handleResize = () => {
      if (debouncer.current) {
        clearTimeout(debouncer.current);
      }

      debouncer.current = setTimeout(() => {
        setScreenWidth(getWindowWidth);
        setScreenHeight(getWindowHeight);
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

  return { width, height };
};
