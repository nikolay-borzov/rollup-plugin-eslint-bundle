import test from 'ava'
import { rollup } from 'rollup'

import { eslintBundle } from '../index.js'

/**
 * @param {import('rollup').InputOptions} inputOptions
 * @param {boolean | 'inline' | 'hidden'} [sourcemap]
 * @returns {Promise<import('rollup').RollupOutput>}
 */
async function generateBundle(inputOptions, sourcemap) {
  const bundle = await rollup(inputOptions)

  return bundle.generate({ format: 'es', sourcemap })
}

/**
 * @param {import('../src/rollup-plugin-eslint-bundle').Options} options
 * @returns {Array<import('rollup').OutputPlugin>}
 */
function getPlugins(options) {
  options = { eslintOptions: {}, ...options }

  return [
    eslintBundle({
      formatter: './eslint-formatter.cjs',
      ...options,
      eslintOptions: {
        overrideConfigFile: 'fixtures/.test-eslintrc.yml',
        useEslintrc: false,
        ...options.eslintOptions,
      },
    }),
  ]
}

test.before((t) => {
  process.chdir('tests')
})

test('Lint » Should not fail with default options', async (t) => {
  const buildPromise = rollup({
    input: 'fixtures/undeclared.js',
    plugins: [eslintBundle()],
  })

  await t.notThrowsAsync(buildPromise)
})

test('Lint » Should lint files', async (t) => {
  await generateBundle({
    input: 'fixtures/undeclared.js',
    plugins: getPlugins(),
  })

  /**
   * @type {import('eslint').ESLint.LintResult[]}
   */
  // @ts-ignore
  const results = global.testEslintResults

  t.assert(
    results.some((result) =>
      result.messages.some(({ message }) => message === "'x' is not defined.")
    )
  )
})

test('Lint » Should fail with enabled throwOnWarning and throwOnError options', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/with-error-and-warning.js',
    plugins: getPlugins({
      throwOnWarning: true,
      throwOnError: true,
    }),
  })

  await t.throwsAsync(buildPromise, {
    message: 'Warnings or errors were found',
  })
})

test('Lint » Should not fail with enabled throwOnWarning and throwOnError options when no warnings/errors', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/fixed.js',
    plugins: getPlugins({
      throwOnWarning: true,
      throwOnError: true,
    }),
  })

  await t.notThrowsAsync(buildPromise)
})

test('Lint » Should fail with enabled throwOnError option', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/with-error-and-warning.js',
    plugins: getPlugins({
      throwOnError: true,
    }),
  })

  await t.throwsAsync(buildPromise, {
    message: 'Errors were found',
  })
})

test('Lint » Should fail with enabled throwOnWarning option', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/with-error-and-warning.js',
    plugins: getPlugins({
      throwOnWarning: true,
    }),
  })

  await t.throwsAsync(buildPromise, {
    message: 'Warnings were found',
  })
})

test('Lint » Should not fail with throwOnError and throwOnWarning disabled', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/with-error-and-warning.js',
    plugins: getPlugins({
      throwOnWarning: false,
      throwOnError: false,
    }),
  })

  await t.notThrowsAsync(buildPromise)
})

test('Formatter » Should fail with not found formatter', async (t) => {
  const buildPromise = generateBundle({
    input: 'fixtures/with-error-and-warning.js',
    plugins: getPlugins({
      formatter: 'not-found-formatter',
    }),
  })

  await t.throwsAsync(buildPromise, {
    message: /^There was a problem loading formatter/,
  })
})

test('Fix » Should fix if enabled', async (t) => {
  const {
    output: [{ code }],
  } = await generateBundle({
    input: 'fixtures/fixable.js',
    plugins: getPlugins({
      eslintOptions: {
        fix: true,
      },
    }),
  })

  t.assert(code.includes('[1984 ]'))
})

test('Fix » Should not fix by default', async (t) => {
  const {
    output: [{ code }],
  } = await generateBundle({
    input: 'fixtures/fixable.js',
    plugins: getPlugins(),
  })

  t.assert(code.includes('[1984, ]'))
})

test('Sourcemap » Should generate source map for fixed code', async (t) => {
  const {
    output: [{ map }],
  } = await generateBundle(
    {
      input: 'fixtures/fixable.js',
      plugins: getPlugins({
        eslintOptions: {
          fix: true,
        },
      }),
    },
    true
  )

  t.snapshot(map)
})

test('Sourcemap » Should preserve existing source map by default', async (t) => {
  const {
    output: [{ map }],
  } = await generateBundle(
    {
      input: 'fixtures/fixable.js',
      plugins: getPlugins({
        eslintOptions: {
          fix: false,
        },
      }),
    },
    true
  )

  t.snapshot(map)
})

test('Sourcemap » Should not generate source map if sourcemap is false', async (t) => {
  const {
    output: [{ map }],
  } = await generateBundle(
    {
      input: 'fixtures/fixable.js',
      plugins: getPlugins({
        eslintOptions: {
          fix: true,
        },
      }),
    },
    false
  )

  // eslint-disable-next-line unicorn/no-null
  t.is(map, null)
})
