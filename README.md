# eslint-plugin-drop-em-dash

> Catch the em dash. The one character that screams “this was written by an LLM” (or pasted from a doc editor). Autofix it to a plain hyphen, in CI, everywhere.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-drop-em-dash.svg)](https://www.npmjs.com/package/eslint-plugin-drop-em-dash)
[![CI](https://github.com/oleg-koval/drop-em-dash-eslint-rule/actions/workflows/ci.yml/badge.svg)](https://github.com/oleg-koval/drop-em-dash-eslint-rule/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ESLint](https://img.shields.io/badge/ESLint-9%2B-4b32c3?logo=eslint&logoColor=white)](https://eslint.org)

```bash
npm i -D eslint eslint-plugin-drop-em-dash
```

```js
// eslint.config.js
import dropEmDash from 'eslint-plugin-drop-em-dash';

export default [...dropEmDash.configs['flat/recommended']];
```

```bash
eslint . --fix
```

Done. No more `-` sneaking into your commits, comments, strings, or JSX copy.

This rule flags a **Unicode character (U+2014)** - it does not infer authorship. Plenty of humans use em dashes; the point here is **consistency and ASCII** in codebases that want it.

## Why you need this

The Unicode em dash (`-`, U+2014) is a known punctuation tell of AI-generated text. It also leaks in constantly from:

- ChatGPT / Claude / Gemini output pasted into code and docs
- Notion, Google Docs, Word, Slack (they auto-convert `--` to `-`)
- Designers pasting marketing copy into JSX
- macOS “smart punctuation” on by default

Once in your repo, it causes real problems:

- **Grep-unfriendly.** `grep --` patterns will not find `-`. Refactors can skip it.
- **Noisy diffs.** Mixed dash styles break reviewers’ flow.
- **Inconsistent rendering** across terminals, logs, emails, and error messages.
- **Copy drift.** Marketing and UI strings drift toward LLM-default punctuation.
- **Not ASCII.** Legacy tooling, logs, SMS, CSV, or email headers get weird.

This plugin is the smallest possible fix: **one rule, one character, autofix on save.** No config sprawl, no opinions about en dashes, no typography debate for your JS/TS tree - just ship ASCII where you lint.

## What it does

- Flags every literal `-` (U+2014) in files ESLint parses: code, comments, string literals, JSX text.
- Autofixes each one to `-` (U+002D, hyphen-minus).
- **Ignores the en dash** (U+2013) and other dash-like characters on purpose, so you can adopt it without a style war.

## Usage

### Flat config (ESLint 9+)

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

### Legacy `.eslintrc.*`

```json
{
  "extends": ["plugin:drop-em-dash/recommended"]
}
```

Or wire the rule explicitly:

```json
{
  "plugins": ["drop-em-dash"],
  "rules": {
    "drop-em-dash/drop-em-dash": "error"
  }
}
```

### Other package managers

```bash
pnpm add -D eslint eslint-plugin-drop-em-dash
```

```bash
yarn add -D eslint eslint-plugin-drop-em-dash
```

## Example

If a file contains a **literal em dash (U+2014)** between tokens (for example in a string or comment), `eslint . --fix` rewrites each occurrence to a hyphen-minus (`-`). See [`tests/fixtures/has-em-dash.cjs`](tests/fixtures/has-em-dash.cjs) for a minimal file used in integration tests.

Illustrative **after** state:

```js
const title = 'Pricing - overview'; // best plan - for teams
```

## Requirements

- Node.js `^18.18.0 || ^20.9.0 || >=21.1.0`
- ESLint `>=8.57.0`

## Cursor / AI agent skill

This repo ships a **Cursor skill** so coding agents auto-discover how to install and wire the plugin: [`.cursor/skills/drop-em-dash-eslint/SKILL.md`](.cursor/skills/drop-em-dash-eslint/SKILL.md). Copy that folder to `~/.cursor/skills/drop-em-dash-eslint` (or symlink) to enable globally - see root [`AGENTS.md`](AGENTS.md). Fitting, since agents and doc tools are a common source of stray em dashes in code.

## Docs

Full docs mirror: **https://oleg-koval.github.io/drop-em-dash-eslint-rule/**

The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) bootstraps Pages (`build_type: workflow`) if needed, then deploys `docs/`. If Pages was disabled or pointed at a branch, use **Settings → Pages → Source → GitHub Actions**, or push again after the bootstrap step runs.

## Testing

```bash
npm test
```

- **Unit tests** - ESLint `RuleTester` for the rule.
- **Integration tests** - real `ESLint` API over `tests/fixtures/` (literal em dash) for diagnostics and autofix.

## Releases (maintainers)

Pushes to **`main`** run [`.github/workflows/release.yml`](.github/workflows/release.yml) → [**semantic-release**](https://semantic-release.gitbook.io/) after tests pass (Conventional Commits; release commits use `[skip ci]`).

Add repository secret **`NPM_TOKEN`** (npm automation or granular publish token). `GITHUB_TOKEN` covers GitHub Releases and the version bump push.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

MIT - see [LICENSE](LICENSE).

## Related

- [ESLint - Create Plugins](https://eslint.org/docs/latest/extend/plugins)
- Community examples: [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn), [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)
