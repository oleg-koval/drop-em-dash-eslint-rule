'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { ESLint } = require('eslint');
const plugin = require('../lib/index.js');

const projectRoot = path.join(__dirname, '..');

function createEngine({ fix }) {
  return new ESLint({
    cwd: projectRoot,
    fix,
    ignore: false,
    overrideConfigFile: null,
    overrideConfig: [
      {
        files: ['tests/fixtures/**/*.cjs'],
        languageOptions: {
          ecmaVersion: 2024,
          sourceType: 'script',
        },
        plugins: {
          'drop-em-dash': plugin,
        },
        rules: {
          'drop-em-dash/drop-em-dash': 'error',
        },
      },
    ],
  });
}

test('ESLint API: reports em dash in fixture', async () => {
  const eslint = createEngine({ fix: false });
  const results = await eslint.lintFiles(['tests/fixtures/has-em-dash.cjs']);

  assert.equal(results.length, 1);
  assert.equal(results[0].errorCount, 1);
  assert.ok(
    results[0].messages.some((m) => m.ruleId === 'drop-em-dash/drop-em-dash'),
    'expected ruleId from eslint-plugin-drop-em-dash',
  );
});

test('ESLint API: autofix removes em dash from fixture output', async () => {
  const eslint = createEngine({ fix: true });
  const results = await eslint.lintFiles(['tests/fixtures/has-em-dash.cjs']);

  assert.equal(results.length, 1);
  assert.ok(results[0].output, 'expected ESLint to produce fixed output');
  assert.ok(
    !results[0].output.includes('\u2014'),
    'fixed output should not contain an em dash',
  );
  assert.match(results[0].output, /x-y/);
});

test('ESLint API: clean fixture has zero violations', async () => {
  const eslint = createEngine({ fix: false });
  const results = await eslint.lintFiles(['tests/fixtures/clean.cjs']);

  assert.equal(results.length, 1);
  assert.equal(results[0].errorCount, 0);
  assert.equal(results[0].warningCount, 0);
});

test('ESLint API: flat/recommended preset wires the rule', async () => {
  const [preset] = plugin.configs['flat/recommended'];
  const eslint = new ESLint({
    cwd: projectRoot,
    fix: false,
    ignore: false,
    overrideConfigFile: null,
    overrideConfig: [
      {
        ...preset,
        files: ['tests/fixtures/**/*.cjs'],
      },
    ],
  });

  const results = await eslint.lintFiles(['tests/fixtures/has-em-dash.cjs']);
  assert.equal(results[0].errorCount, 1);
});
