export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
  favicon: string;
  iconAndroidBigSize: string;
  iconAndroidSmallSize: string;
  iconAppleTouch: string;
  webManifest: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  analyze: number;
  apiUrl: string;
  lestaApiUrl: string;
  lestaAuthApiUrl: string;
  lestaAppId: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  analyze: number;
  isDev: boolean;
  port: number;
  apiUrl: string;
  royalArenaApiUrl: string;
  lestaApiUrl: string;
  lestaAuthApiUrl: string;
  lestaAppId: string;
  lestaDevAppId: string;
  buildHash: string;
}
