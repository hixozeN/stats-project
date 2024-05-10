declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.webp';
declare module '*.jpeg';
declare module '*.gif';

declare const IS_DEV: boolean;
declare const API_URL: string;
declare const ROYAL_ARENA_API_URL: string;
declare const LESTA_API_URL: string;
declare const LESTA_AUTH_API_URL: string;
declare const LESTA_APP_ID: string;
declare const BUILD_HASH: string;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
