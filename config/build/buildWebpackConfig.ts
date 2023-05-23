import webpack from "webpack";
import { BuildOptions } from "./types/config";
import buildLoaders from "./buildLoaders";
import buildResolvers from "./buildResolvers";
import buildPlugins from "./buildPlugins";
import buildDevServer from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;
  return {
    mode: mode,
    entry: paths.entry, // точка входа
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      // точка выхода
      filename: "[main].[contenthash].js",
      path: paths.build, // папка с билдом
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: isDev ? "inline-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}