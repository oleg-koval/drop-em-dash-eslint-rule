'use strict';

/** Unicode EM DASH (U+2014). */
const EM_DASH = '\u2014';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: `Disallow em dashes (${EM_DASH}); use hyphen (-) instead.`,
      recommended: false,
      url: 'https://github.com/oleg-koval/drop-em-dash-eslint-rule/blob/main/README.md#rules',
    },
    fixable: 'code',
    schema: [],
    defaultOptions: [],
    messages: {
      emDash: `Unexpected em dash (${EM_DASH}); replace with hyphen (-).`,
    },
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const text = sourceCode.text;

    return {
      Program() {
        let index = text.indexOf(EM_DASH);
        while (index !== -1) {
          const start = sourceCode.getLocFromIndex(index);
          const end = sourceCode.getLocFromIndex(index + 1);
          context.report({
            loc: { start, end },
            messageId: 'emDash',
            fix(fixer) {
              return fixer.replaceTextRange([index, index + 1], '-');
            },
          });
          index = text.indexOf(EM_DASH, index + 1);
        }
      },
    };
  },
};
