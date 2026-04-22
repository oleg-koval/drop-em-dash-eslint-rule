'use strict';

const dropEmDashRule = require('./rules/drop-em-dash.js');
const { name, version } = require('../package.json');

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: { name, version },
  rules: {
    'drop-em-dash': dropEmDashRule,
  },
};

plugin.configs = {
  recommended: {
    plugins: ['drop-em-dash'],
    rules: {
      'drop-em-dash/drop-em-dash': 'error',
    },
  },
  'flat/recommended': [
    {
      name: 'drop-em-dash/recommended',
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: {
        'drop-em-dash': plugin,
      },
      rules: {
        'drop-em-dash/drop-em-dash': 'error',
      },
    },
  ],
};

module.exports = plugin;
