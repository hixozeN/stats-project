import React, { useCallback, useEffect } from 'react';

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLInputElement>,
  callback: () => void,
  isMobile: boolean,
) => {
  const handleClick = useCallback((evt: MouseEvent) => {
    if (ref.current && !ref.current.contains(evt.target as Node)) {
      callback();
    }
  }, [ref, callback]);

  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event: MouseEvent) => handleClick(event);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return null;
  }, [handleClick, isMobile]);
};
