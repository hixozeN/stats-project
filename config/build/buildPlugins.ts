import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

export default function buildPlugins(
  {
    paths, isDev, apiUrl, lestaApiUrl, lestaAuthApiUrl, lestaAppId, royalArenaApiUrl, analyze,
  }: BuildOptions,
): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(isDev),
      API_URL: JSON.stringify(apiUrl),
      ROYAL_ARENA_API_URL: JSON.stringify(royalArenaApiUrl),
      LESTA_API_URL: JSON.stringify(lestaApiUrl),
      LESTA_AUTH_API_URL: JSON.stringify(lestaAuthApiUrl),
      LESTA_APP_ID: JSON.stringify(lestaAppId),
    }),

  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (!isDev) {
    plugins.push(new CopyPlugin({
      patterns: [
        { from: paths.locales, to: paths.buildLocales },
        { from: paths.favicon, to: paths.build },
        { from: paths.iconAndroidSmallSize, to: paths.build },
        { from: paths.iconAndroidBigSize, to: paths.build },
        { from: paths.iconAppleTouch, to: paths.build },
        { from: paths.webManifest, to: paths.build },
      ],
    }));
  }

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }));
  }

  return plugins;
}
