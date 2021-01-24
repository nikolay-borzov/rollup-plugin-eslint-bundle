import { RollupPluginESLintBundle } from './rollup-plugin-eslint-bundle'

/**
 * Runs ESLint on bundled code
 *
 * @param {import('./rollup-plugin-eslint-bundle').Options} [options]
 * @returns {import('../node_modules/rollup/dist/rollup').OutputPlugin}
 */
export function eslintBundle(options) {
  const plugin = new RollupPluginESLintBundle(options)

  return {
    name: plugin.name,

    renderChunk(source, chunkInfo, outputOptions) {
      return plugin.lint(source, outputOptions.sourcemap)
    },
  }
}
