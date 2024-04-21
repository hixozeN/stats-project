import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
// import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  // const paths: BuildPaths = {
  //   src: path.resolve(__dirname, '..', '..', 'src'),
  //   build: '',
  //   html: '',
  //   entry: '',
  // };
  //
  // const svgLoader = {
  //   test: /\.svg$/,
  //   use: ['@svgr/webpack'],
  // };

  config.resolve.modules = [
    path.resolve(__dirname, '../../src'),
    'node_modules',
  ];
  config.resolve.extensions.push('.ts', '.tsx');

  /*
    Итерируемся по массиву правил и исключаем свг-лоудер,
    встроенный по умолчанию в storybook.
  */
  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });
  // и после исключения добавляем наш свгр лоудер
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config.module.rules.push(buildCssLoaders(true));

  config.plugins.push(new DefinePlugin({
    IS_DEV: true,
    API_URL: JSON.stringify(''),
    ROYAL_ARENA_API_URL: JSON.stringify(''),
    LESTA_API_URL: JSON.stringify(''),
    LESTA_AUTH_API_URL: JSON.stringify(''),
    LESTA_APP_ID: JSON.stringify(''),
  }));

  return config;
};
