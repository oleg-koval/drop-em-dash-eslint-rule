'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { RuleTester } = require('eslint');
const rule = require('../lib/rules/drop-em-dash.js');

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
});

test('drop-em-dash rule', () => {
  assert.doesNotThrow(() => {
    ruleTester.run('drop-em-dash', rule, {
      valid: [
        'const ok = "plain hyphen - here";',
        'const en = "\u2013";',
        'const x = `template-${1}`;',
      ],
      invalid: [
        {
          code: 'const bad = "\u2014";',
          output: 'const bad = "-";',
          errors: [{ messageId: 'emDash' }],
        },
        {
          code: '// comment \u2014 here\nconst y = 1;',
          output: '// comment - here\nconst y = 1;',
          errors: [{ messageId: 'emDash' }],
        },
        {
          code: 'const z = `a\u2014b`;',
          output: 'const z = `a-b`;',
          errors: [{ messageId: 'emDash' }],
        },
      ],
    });
  });
});
