module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:jest/recommended'],
  rules: {
    'max-lines': [
      'error',
      {max: 400, skipBlankLines: true, skipComments: true},
    ],
    'max-lines-per-function': [
      'error',
      {max: 400, skipBlankLines: true, skipComments: true},
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/consistent-type-definitions': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  overrides: [{files: ['*.tsx', '*.ts'], rules: {'no-undef': 'off'}}],
};
