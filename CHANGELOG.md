# rollup-plugin-eslint-bundle changelog

## 7.0.0 - 2022-05-08
* Switch to ES modules. But still provide CJS bundle in `dist`
* Update dependencies
* Require Node.js version >= 14
* Update ESLint peer dependency to >=8.x

## 6.0.0 - 2021-01-24
* Rewrite from scratch for latest `rollup` and `ESLint`
* Replace `jest` with `ava`
* Require Node.js version >= 12
* Set `rollup` and `eslint` as peer dependencies
* Generate TypeScript declaration files.

## 5.0.2 - 2018-11-02
* Update dependencies

## 5.0.1 - 2018-07-15
* Fix for case when fix doesn't produce output
* Fixes for ESLint 5.x
* Disable tests for source mapping. For some reason rollup returns the same 'mappings' for fixed and not fixed code even though the plugin produces different source maps
* Update dependencies

## 5.0.0 - 2018-01-21
* Rewrite to verify and fix the bundle instead of imported files
