module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': [0],
    'import/no-unresolved': [0],
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'res|next|^err|_'
      }
    ],
    'no-console': [0],
    'arrow-body-style': [0],
    'no-return-await': [0],
    'max-len': [0],
    'arrow-parens': [2, 'as-needed'],
    'no-param-reassign': [0],
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'react/jsx-filename-extension': [0],
    'react/prop-types': [0],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-space-before-closing': 'error',
    'react/self-closing-comp': ['error'],
    'react/jsx-curly-newline': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', {
      maximum: 1,
      when: 'multiline'
    }],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^r|next|^e|^_'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }
}
