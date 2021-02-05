module.exports = {
  env: {
    amd: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
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
  plugins: ['@typescript-eslint', 'react', 'prettier', 'sort-keys-fix'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    // 'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'no-unused-vars': 'warn',
    // 'sort-keys': ['error', 'asc', {caseSensitive: true, natural: false, minKeys: 2}],
    'react/jsx-sort-props': [
      'error',
      {
        // callbacksLast: true,
        // shorthandFirst: true,
        // shorthandLast: false,
        ignoreCase: false
        // noSortAlphabetically: false,
        // reservedFirst: true
      }
    ],
    'react/prop-types': 'off',
    // 'react/jsx-uses-react': 'error',
    // 'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'sort-keys-fix/sort-keys-fix': 'warn'
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
