# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
### BREAKING CHANGES
-->

## [Unreleased]

### Changed

- Update dependencies

### BREAKING CHANGES

- Require Node.js version >= 20

## 8.0.0 - 2023-02-25

### Changed

- Update dependencies

### BREAKING CHANGES

- Require Node.js version >= 18
- Update `rollup` to 3.x

## 7.0.0 - 2022-05-08

### Changed

- Update dependencies

### BREAKING CHANGES

- Switch to ES modules. But still provide CJS bundle in `dist`
- Require Node.js version >= 14
- Update `eslint` peer dependency to >=8.x

## 6.0.0 - 2021-01-24

### Added

- Generate TypeScript declaration files.

### Changed

- Replace `jest` with `ava`
- Set `rollup` and `eslint` as peer dependencies

### BREAKING CHANGES

- Rewrite from scratch for latest `rollup` and `ESLint`
- Require Node.js version >= 12

## 5.0.2 - 2018-11-02

### Changed

- Update dependencies

## 5.0.1 - 2018-07-15

### Changed

- Disable tests for source mapping. For some reason rollup returns the same 'mappings' for fixed and not fixed code even though the plugin produces different source maps
- Update dependencies

### Fixed

- Fix for case when fix doesn't produce output
- Fixes for ESLint 5.x

## 5.0.0 - 2018-01-21

### BREAKING CHANGES

- Rewrite to verify and fix the bundle instead of imported files
