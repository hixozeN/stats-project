module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb', 'plugin:i18next/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
  ],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'react/jsx-indent-props': [2, 2],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'to',
          'theme',
          'variant',
          'size',
          'fontSize',
          'value',
        ],
      },
    ],
    'max-len': ['error', { ignoreComments: true, code: 120 }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-param-reassign': 'off',
  },
  globals: {
    IS_DEV: true,
  },
};
