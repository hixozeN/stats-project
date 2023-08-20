import path from 'path';
import webpack, { RuleSetRule } from 'webpack';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    src: path.resolve(__dirname, '..', '..', 'src'),
    build: '',
    html: '',
    entry: '',
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  config.resolve.modules.push(paths.src);
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

  return config;
};
