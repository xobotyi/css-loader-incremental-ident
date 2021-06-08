const PRINT_WIDTH = 100;

module.exports = {
  root: true,

  ignorePatterns: ['node_modules', 'coverage', 'dist', '.github/workflows', 'CHANGELOG.md'],

  plugins: ['prettier'],

  rules: {
    'max-len': [
      'error',
      {
        code: PRINT_WIDTH,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        PRINT_WIDTH,
        singleQuote: true,
        jsxBracketSameLine: true,
        trailingComma: 'es5',
        endOfLine: 'lf',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.ts'],
      extends: [
        'eslint-config-airbnb-base',
        'eslint-config-airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
      ],
      plugins: ['import'],
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',

        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['interface', 'typeAlias'],
            format: ['PascalCase'],
          },
          {
            selector: 'function',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
    {
      files: ['src/*.__test__.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.md'],
      extends: ['plugin:mdx/recommended', 'prettier'],
      rules: {
        'prettier/prettier': [
          2,
          {
            parser: 'markdown',
          },
        ],
      },
    },
  ],
};
