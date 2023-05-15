import webpack from "webpack";
import { BuildOptions } from "./types/config";
import buildLoaders from "./buildLoaders";
import buildResolvers from "./buildResolvers";
import buildPlugins from "./buildPlugins";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode } = options;
  return {
    mode: mode,
    entry: paths.entry, // точка входа
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    output: {
      // точка выхода
      filename: "[main].[contenthash].js",
      path: paths.build, // папка с билдом
      clean: true,
    },
    plugins: buildPlugins(options),
  };
}