'use strict';

const dropEmDash = require('./lib/index.js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['lib/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'commonjs',
    },
    plugins: {
      'drop-em-dash': dropEmDash,
    },
    rules: {
      'drop-em-dash/drop-em-dash': 'error',
    },
  },
  {
    ignores: ['docs/**'],
  },
];
