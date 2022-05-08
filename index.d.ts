import type { ESLint } from "eslint"
import type { OutputPlugin } from "rollup"

export type Options = {
  eslintOptions?: ESLint.Options;
  /**
   * If `true`, will throw an error if any warnings were found.
   */
  throwOnWarning?: boolean;
  /**
   * If `true`, will throw an error if any errors were found.
   */
  throwOnError?: boolean;
  /**
   * Formatter name or path to be passed to `eslint.loadFormatter()`.
   */
  formatter?: string;
}

/**
 * Runs ESLint on bundled code.
 */
export function eslintBundle(options?: Options): OutputPlugin
