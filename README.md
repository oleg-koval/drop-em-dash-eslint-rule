# eslint-plugin-drop-em-dash

[![npm version](https://img.shields.io/npm/v/eslint-plugin-drop-em-dash.svg)](https://www.npmjs.com/package/eslint-plugin-drop-em-dash)
[![CI](https://github.com/oleg-koval/drop-em-dash-eslint-rule/actions/workflows/ci.yml/badge.svg)](https://github.com/oleg-koval/drop-em-dash-eslint-rule/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ESLint](https://img.shields.io/badge/ESLint-9%2B-4b32c3?logo=eslint&logoColor=white)](https://eslint.org)

ESLint plugin with a single rule: **disallow the Unicode em dash (`—`, U+2014)** in source text and **autofix** it to a regular **hyphen-minus (`-`, U+002D)**.

This is useful when you want ASCII-friendly copy in code, comments, and string literals, or when tooling or fonts make em dashes easy to paste by mistake.

**Docs site (GitHub Pages):** https://oleg-koval.github.io/drop-em-dash-eslint-rule/

### Enable GitHub Pages

In the GitHub repository: **Settings → Pages → Build and deployment → Source → GitHub Actions**. The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publishes the `docs/` folder on pushes to `main` (or `master`).

## Requirements

- Node.js `^18.18.0 || ^20.9.0 || >=21.1.0`
- ESLint `>=8.57.0` (flat config examples target ESLint 9)

## Installation

```bash
npm install --save-dev eslint eslint-plugin-drop-em-dash
```

```bash
pnpm add -D eslint eslint-plugin-drop-em-dash
```

```bash
yarn add -D eslint eslint-plugin-drop-em-dash
```

## Usage

### ESLint flat config (`eslint.config.js`, ESLint 8.21+ / 9+)

Import the plugin and enable the rule (or use the built-in recommended preset):

```js
import dropEmDash from 'eslint-plugin-drop-em-dash';

export default [
  ...dropEmDash.configs['flat/recommended'],
];
```

Manual wiring:

```js
import dropEmDash from 'eslint-plugin-drop-em-dash';

export default [
  {
    plugins: {
      'drop-em-dash': dropEmDash,
    },
    rules: {
      'drop-em-dash/drop-em-dash': 'error',
    },
  },
];
```

### Legacy `.eslintrc.*`

Add the plugin and rule:

```json
{
  "plugins": ["drop-em-dash"],
  "rules": {
    "drop-em-dash/drop-em-dash": "error"
  }
}
```

Or extend the shared preset:

```json
{
  "extends": ["plugin:drop-em-dash/recommended"]
}
```

## Rule

### `drop-em-dash/drop-em-dash`

- **Problems reported:** any literal em dash character (`—`, `\u2014`) anywhere in a file ESLint parses (code, comments, and string contents).
- **Autofix:** replaces each em dash with `-` (hyphen-minus).
- **Suggested command-line fix:** `eslint . --fix`

#### Why only the em dash?

The rule targets **U+2014 EM DASH** only. Other dash-like characters (for example the en dash **U+2013**) are intentionally not flagged so you can adopt a narrower policy first.

## Examples

```js
// Invalid — em dash in a comment
const title = 'Pricing — overview';
```

After `--fix`:

```js
// Invalid - em dash in a comment
const title = 'Pricing - overview';
```

## Testing

```bash
npm test
```

- **Unit tests** exercise the rule with ESLint `RuleTester`.
- **Integration tests** run the real `ESLint` API against `tests/fixtures/` (including a file that contains a literal em dash) and assert both diagnostics and autofix output.

## Releases (maintainers)

Pushes to **`main`** run [`.github/workflows/release.yml`](.github/workflows/release.yml), which executes [**semantic-release**](https://semantic-release.gitbook.io/) after tests pass.

- Version bumps, `CHANGELOG.md`, `package.json`, `package-lock.json`, Git tags, GitHub Releases, and **npm publish** are handled from commit messages using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:` → minor, `fix:` → patch, `BREAKING CHANGE` / `!` → major).
- Release commits include **`[skip ci]`** so the workflow does not recurse on its own changelog bump commit.

### Required GitHub secret

Add **`NPM_TOKEN`** in the repository **Settings → Secrets and variables → Actions**:

- npmjs.com → **Access Tokens** → create an **Automation** (classic) token, or a **granular** token with permission to publish `eslint-plugin-drop-em-dash`.
- Paste the token value into **`NPM_TOKEN`**.

`GITHUB_TOKEN` is provided automatically for GitHub Releases and for pushing the version bump commit back to `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## License

MIT — see [LICENSE](LICENSE).

## Related projects

Patterns for authoring ESLint plugins:

- [ESLint — Create Plugins](https://eslint.org/docs/latest/extend/plugins)
- Community examples: [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn), [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) (structure, CI, docs)
