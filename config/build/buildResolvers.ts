import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export default function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
  }
}