export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'smallDesktop';

export interface DeviceData {
  device?: DeviceType;
  maxSize?: number;
  maxMovies: number;
  moreMovies: number;
}

export interface DeviceList {
  mobile: DeviceData;
  tablet: DeviceData;
  smallDesktop: DeviceData;
  desktop: DeviceData;
}

export const DEVICE_SETTING: DeviceList = {
  mobile: {
    device: 'mobile',
    maxSize: 768,
    maxMovies: 6,
    moreMovies: 6,
  },
  tablet: {
    device: 'tablet',
    maxSize: 1024,
    maxMovies: 12,
    moreMovies: 12,
  },
  smallDesktop: {
    device: 'smallDesktop',
    maxSize: 1280,
    maxMovies: 12,
    moreMovies: 12,
  },
  desktop: {
    device: 'desktop',
    maxMovies: 24,
    moreMovies: 24,
  },
};
