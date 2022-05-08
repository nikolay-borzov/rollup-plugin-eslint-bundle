import * as diff from 'diff'
import { ESLint } from 'eslint'
import MagicString from 'magic-string'

/**
 * @typedef {import('rollup').SourceMapInput} SourceMapInput
 * @typedef {import('./index').Options} Options
 */

class RollupPluginESLintBundle {
  /**
   * @param {Options} [options]
   */
  constructor(options) {
    this.name = 'rollup-plugin-eslint-bundle'
    this.options = { eslintOptions: {}, ...options }
    this.eslintOptions = this.options.eslintOptions || {}

    this.eslint = new ESLint(this.eslintOptions)
  }

  /**
   * @param {string} source
   * @param {string} modifiedSource
   * @returns {{ code: string; map: SourceMapInput }}
   */
  regenerateSourcemap(source, modifiedSource) {
    const magicString = new MagicString(source)
    const changes = diff.diffChars(source, modifiedSource)

    if (changes && changes.length > 0) {
      let index = 0

      for (const part of changes) {
        const count = part.count ?? 0

        if (part.added) {
          magicString.prependLeft(index, part.value)
          index -= count
        } else if (part.removed) {
          magicString.remove(index, index + count)
        }

        index += count
      }
    }

    return {
      code: magicString.toString(),
      map: magicString.generateMap({
        hires: true,
      }),
    }
  }

  /**
   * @param {string} source
   * @param {boolean | 'inline' | 'hidden'} sourcemap
   * @returns {Promise< { code: string; map?: SourceMapInput } | undefined>}
   */
  async lint(source, sourcemap) {
    const results = await this.eslint.lintText(source)

    const result = results[0]

    const hasWarnings = result.warningCount > 0
    const hasErrors = result.errorCount > 0

    // Output linting results
    if (hasWarnings || hasErrors) {
      const formatter = await this.eslint.loadFormatter(this.options.formatter)

      const formattedResults = formatter.format(results)

      if (formattedResults) {
        console.log(formattedResults)
      }
    }

    // Throw on warning/error if enabled
    const throwOnWarning = hasWarnings && this.options.throwOnWarning
    const throwOnError = hasErrors && this.options.throwOnError

    if (throwOnWarning && throwOnError) {
      throw new Error('Warnings or errors were found')
    } else if (throwOnWarning) {
      throw new Error('Warnings were found')
    } else if (throwOnError) {
      throw new Error('Errors were found')
    }

    const formattedSource = result.output

    if (!formattedSource) {
      // eslint-disable-next-line unicorn/no-null -- must be null according to rollup typings
      return null
    }

    // Return fixed code
    if (!sourcemap) {
      return { code: formattedSource }
    }

    // Return fixed code and updated sourcemap
    return this.regenerateSourcemap(source, formattedSource)
  }
}

/**
 * Runs ESLint on bundled code.
 *
 * @param {Options} [options]
 * @returns {import('rollup').OutputPlugin}
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

// eslint-disable-next-line import/no-default-export -- Let's consumer decide which type of import to use
export default eslintBundle
