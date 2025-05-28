import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';
import oxlint from 'eslint-plugin-oxlint';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export const baseConfig = tseslint.config(
    {
        ignores: [
            "**/dist/**/*",
            "**/build/**/*",
            "**/.tsbuildinfo",
            "**/tsconfig.tsbuildinfo",
            
            "**/.cache/**/*",
            "**/tmp/**/*",
      
            "**/.env",
            "**/.env.*",
            "**/prisma/**/*",
        
            "**/generated/**/*",
            "commitlint.config.mjs",
            "eslint.config.mjs",
            "**/parser/**/*",
            "test/**/*"
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    ...oxlint.configs['flat/all'],
    {
        plugins: {
            'no-relative-import-paths': noRelativeImportPaths,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
            parserOptions: {
                ecmaVersion: 2020,
                projectService: true,
                sourceType: 'module',
            },
        },
      settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        'max-lines': [
            'warn',
            {
                max: 310,
            },
        ],
        "@typescript-eslint/restrict-template-expressions": "off",
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-empty-object-type': [
            'error',
            {
                allowInterfaces: 'with-single-extends',
            },
        ],

        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enumMember',
                format: ['UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'default',
                format: ['camelCase'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
            },
            {
                selector: 'import',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'property',
                format: null,
            },
            {
                selector: 'parameter',
                leadingUnderscore: 'allow',
                format: ['camelCase'],
            },
        ],

        '@typescript-eslint/return-await': ['error', 'always'],
        '@typescript-eslint/no-unsafe-type-assertion': 'warn',
        'no-empty': 'warn',
        'no-extra-semi': 'warn',
        'no-constant-condition': 'warn',
        'no-inner-declarations': 'warn',

        camelcase: [
            'error',
            {
                allow: ['[iI]d_*', '[a-z]{2}_[a-z]{2}'],
            },
        ],

        'no-void': [
            'error',
            {
                allowAsStatement: true,
            },
        ],

        'no-var': ['error'],
        'no-console': 'error',
        'no-unreachable': 'error',
        curly: 'error',
        eqeqeq: 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '(^_|Fields$)',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],

        '@typescript-eslint/no-floating-promises': [
            'error',
            {
                ignoreVoid: true,
            },
        ],

        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-base-to-string': 'warn',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
        '@typescript-eslint/prefer-promise-reject-errors': 'warn',
        '@typescript-eslint/only-throw-error': 'warn',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/consistent-return': 'warn',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'warn',
        'no-relative-import-paths/no-relative-import-paths': [
            'error',
            {
                allowSameFolder: true,
                rootDir: 'src',
                prefix: '@',
            },
        ],
    },
    },
)

export default baseConfig