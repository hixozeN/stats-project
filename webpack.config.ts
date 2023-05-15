import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildPaths } from "./config/build/types/config";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
}

const mode = "development"; // хардкод, перенести в .env
const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfig({
  mode: isDev ? "development" : "production",
  paths,
  isDev
});

export default config;
