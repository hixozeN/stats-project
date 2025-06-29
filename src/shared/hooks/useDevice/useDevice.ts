import useMedia from 'shared/hooks/useMedia/useMedia';

export enum DEVICE {
  MOBILE = 768,
  TABLET = 1024,
  DESKTOP = 1280,
}

export const useDevice = (maxWidth: DEVICE) => useMedia(`(max-width: ${maxWidth}px)`);
