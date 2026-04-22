---
name: drop-em-dash-eslint
description: >-
  Configures and applies eslint-plugin-drop-em-dash to forbid Unicode em dash
  (U+2014, —) in source and autofix to hyphen-minus (-). Use when the user
  mentions em dash, en dash vs em dash, typography in code, ASCII-friendly
  punctuation, eslint rule for dashes, or paste accidents with special dashes.
---

# Drop em dash (ESLint)

## What it does

- **Package:** [`eslint-plugin-drop-em-dash`](https://www.npmjs.com/package/eslint-plugin-drop-em-dash) ([repo](https://github.com/oleg-koval/drop-em-dash-eslint-rule))
- **Rule:** `drop-em-dash/drop-em-dash` — reports literal **U+2014** anywhere in a parsed file (code, comments, strings).
- **Autofix:** each `—` → `-` (hyphen-minus). Run `eslint . --fix` or fix in the editor.
- **Does not** flag en dash (U+2013), slashes, or existing ASCII hyphens.

## Install

```bash
npm install --save-dev eslint eslint-plugin-drop-em-dash
```

Peer: `eslint >= 8.57`.

## Flat config (ESLint 9)

```js
import dropEmDash from 'eslint-plugin-drop-em-dash';

export default [...dropEmDash.configs['flat/recommended']];
```

Manual:

```js
import dropEmDash from 'eslint-plugin-drop-em-dash';

export default [
  {
    plugins: { 'drop-em-dash': dropEmDash },
    rules: { 'drop-em-dash/drop-em-dash': 'error' },
  },
];
```

## Legacy `.eslintrc`

```json
{
  "extends": ["plugin:drop-em-dash/recommended"]
}
```

## Verify

```bash
npx eslint . --max-warnings 0
npx eslint . --fix
```

## When editing this plugin repo

- Rule implementation: `lib/rules/drop-em-dash.js`
- Plugin entry + presets: `lib/index.js`
- Tests: `tests/drop-em-dash.test.js`, `tests/integration-eslint.test.js`, fixtures under `tests/fixtures/`

## References

- Docs mirror: https://oleg-koval.github.io/drop-em-dash-eslint-rule/
- ESLint plugins: https://eslint.org/docs/latest/extend/plugins
