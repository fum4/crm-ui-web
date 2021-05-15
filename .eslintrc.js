module.exports = {
  env: {
    amd: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
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
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks', 'sort-keys-fix'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-shadow': 'warn',
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-fragments': ['warn', 'syntax'],
    'react/jsx-key': ['warn', { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': ['error', { ignoreCase: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src']
      }
    },
    react: {
      version: 'detect'
    }
  }
};
