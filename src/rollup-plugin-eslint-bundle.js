import MagicString from 'magic-string'
import * as diff from 'diff'
import { ESLint } from 'eslint'

/**
 * @typedef {object} Options
 * @property {import('../node_modules/@types/eslint/index').ESLint.Options} [eslintOptions={}] ESLint constructor options
 * @property {boolean} [throwOnWarning=false] If `true`, will throw an error if any warnings were found.
 * @property {boolean} [throwOnError=false] If `true`, will throw an error if any errors were found.
 * @property {string} [formatter] Formatter name or path to be passed to `eslint.loadFormatter()`
 */

/**
 * @typedef {import('../node_modules/rollup').SourceMapInput} SourceMapInput
 */

export class RollupPluginESLintBundle {
  /**
   * @param {Options} [options]
   */
  constructor(options = { eslintOptions: {} }) {
    this.name = 'rollup-plugin-eslint-bundle'
    this.options = options
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
      let idx = 0

      changes.forEach((part) => {
        const count = part.count ?? 0

        if (part.added) {
          magicString.prependLeft(idx, part.value)
          idx -= count
        } else if (part.removed) {
          magicString.remove(idx, idx + count)
        }

        idx += count
      })
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
   * @returns {Promise<{ code: string; map?: SourceMapInput } | null>}
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
      throw Error('Warnings or errors were found')
    } else if (throwOnWarning) {
      throw Error('Warnings were found')
    } else if (throwOnError) {
      throw Error('Errors were found')
    }

    const formattedSource = result.output

    if (!formattedSource) {
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
