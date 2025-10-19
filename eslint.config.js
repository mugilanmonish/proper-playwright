import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module'
            }
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            'no-undef': 'off',
            'no-unused-vars': ['error', { args: 'all' }],
            'no-console': 'warn',
            'prefer-const': 'error',
            'no-empty': ['error', { allowEmptyCatch: false }],

            // ✅ Additional recommended TypeScript rules
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true
                }
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'warn'
        }
    },
    {
        ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', 'vscode/', 'playwright-report/', 'test-results/', 'playwright.config.ts']
    }
];
