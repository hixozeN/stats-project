import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

require('dotenv').config();

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  };

  const mode = env.mode || 'development';
  const PORT = env.port || 3000;
  const apiUrl = env.mode === 'development' ? 'http://localhost:8000' : env.apiUrl;
  const analyze = env.analyze ?? 0;

  const isDev = mode === 'development';

  const royalArenaApiUrl = process.env.ROYAL_API_URL;

  const lestaApiUrl = 'https://papi.tanksblitz.ru/wotb';
  const lestaAuthApiUrl = 'https://api.tanki.su/wot/auth';
  const lestaAppId = process.env.LESTA_APP_ID;

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    analyze,
    isDev,
    port: PORT,
    apiUrl,
    royalArenaApiUrl,
    lestaApiUrl,
    lestaAuthApiUrl,
    lestaAppId,
  });

  return config;
};
