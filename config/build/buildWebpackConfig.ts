import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types/config';
import buildLoaders from './buildLoaders';
import buildResolvers from './buildResolvers';
import buildPlugins from './buildPlugins';
import buildDevServer from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  const plugins = buildPlugins(options);

  // Добавляем полный хотрелоуд в дев-режиме
  // Стандартно хотрелоуд в вебпак5 неполноценный
  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    // plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    mode,
    entry: paths.entry, // точка входа
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      // точка выхода
      filename: '[main].[contenthash].js',
      path: paths.build, // папка с билдом
      clean: true,
    },
    plugins,
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
