import { ResolveOptions } from "webpack";

export default function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js", ".scss"],
  }
}