module.exports = {
  env: {
    amd: true,
    browser: true,
    node: true
  },
  extends: [
    // 'eslint:all',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:react/all',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'sort-keys-fix', 'react-hooks'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    // 'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-fragments': ['warn', 'syntax'],
    'react/jsx-key': ['warn', {checkFragmentShorthand: true, checkKeyMustBeforeSpread: true}],
    'react/jsx-sort-props': [
      'error',
      {
        // callbacksLast: true,
        // shorthandFirst: true,
        // shorthandLast: false,
        ignoreCase: false
        // noSortAlphabetically: false,
        // ReservedFirst: true
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-array-index-key': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': [
      'error',
      {
        ignoreCase: true
      }
    ],
    'sort-keys-fix/sort-keys-fix': 'error'
    // 'sort-keys': ['error', 'asc', {caseSensitive: true, natural: false, minKeys: 2}],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src']
      }
    },
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  }
};
