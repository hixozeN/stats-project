import webpack from 'webpack';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { BuildOptions } from './types/config';

export default function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const babelLoader = {
    test: /\.(js|ts|tsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            {
              locales: ['ru', 'en'],
              keyAsDefaultValue: true,
            },
          ],
        ],
      },
    },
  };

  // если не используем тайпскрипт - нужен babel-loader
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = buildCssLoaders(options.isDev);

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    // use: [
    //   {
    //     loader: 'file-loader',
    //   },
    // ],
    type: 'asset/resource',
  };

  return [fileLoader, svgLoader, babelLoader, typeScriptLoader, cssLoader];
}
