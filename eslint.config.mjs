import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import importEslint from 'eslint-plugin-import'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import oxlint from 'eslint-plugin-oxlint'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default defineConfig([
    globalIgnores([
        'node_modules/**/*',
        'dist/**/*',
        'build/**/*',
        'public/**/*',
        'generated/**/*',
    ]),
    {
        extends: compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'plugin:import/errors',
            'plugin:import/warnings',
            'plugin:import/typescript',
            'plugin:@typescript-eslint/recommended-type-checked'
        ),

        plugins: {
            import: importEslint,
            '@typescript-eslint': typescriptEslint,
            prettier,
            oxlint,
            'no-relative-import-paths': noRelativeImportPaths,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020,
            },

            parser: tsParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
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
            strict: 'off',
            'dot-notation': 'off',
            'one-var': 'off',
            'new-cap': 'off',

            'max-lines': [
                'warn',
                {
                    max: 310,
                },
            ],

            'consistent-return': 'off',

            '@typescript-eslint/no-empty-object-type': [
                'error',
                {
                    allowInterfaces: 'with-single-extends',
                },
            ],

            '@typescript-eslint/no-deprecated': 'off',

            '@typescript-eslint/naming-convention': [
                'off',
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

            '@typescript-eslint/return-await': ['off', 'always'],
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
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

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
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-implied-eval': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/require-await': 'warn',
            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn',
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            '@typescript-eslint/only-throw-error': 'warn',
            '@typescript-eslint/no-use-before-define': 'warn',
            '@typescript-eslint/consistent-return': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'warn',

            'import/order': [
                'error',
                {
                    alphabetize: {
                        caseInsensitive: true,
                        order: 'asc',
                    },

                    groups: ['builtin', 'external', 'object', 'parent', 'sibling', 'index', 'type'],
                    'newlines-between': 'always',

                    pathGroups: [
                        {
                            group: 'object',
                            pattern: '@rnw-community/*',
                            position: 'after',
                        },
                    ],

                    pathGroupsExcludedImportTypes: ['builtin', 'type'],
                },
            ],

            'sort-imports': [
                'error',
                {
                    allowSeparatedGroups: false,
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['all', 'multiple', 'none', 'single'],
                },
            ],

            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                {
                    allowSameFolder: true,
                    rootDir: 'src',
                    prefix: '@',
                },
            ],

            'no-undef': 'off',
            'no-array-constructor': 'off',
            'no-implied-eval': 'off',
            'no-loss-of-precision': 'off',
            'no-unused-vars': 'off',
            'require-await': 'off',
            'import/named': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
            'import/no-unresolved': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-deprecated': 'off',
            'import/no-unused-modules': 'off',
            'import/no-cycle': 'off',
            'import/no-named-as-default': 'off',
            'import/extensions': 'off',
        },
    },
])
