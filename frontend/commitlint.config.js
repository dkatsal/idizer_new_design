module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['PR-'],
    },
  },
  rules: {
    //'references-empty': [2, 'never'],
  },
};
