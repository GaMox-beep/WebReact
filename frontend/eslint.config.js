import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'import': importX,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            { target: './src/features/novels', from: './src/features', except: ['./novels'] },
            { target: './src/features/chapters', from: './src/features', except: ['./chapters'] },
            { target: './src/features/auth', from: './src/features', except: ['./auth'] },
            { target: './src/features/payments', from: './src/features', except: ['./payments'] },
            { target: './src/features/users', from: './src/features', except: ['./users'] },
            { target: './src/features', from: './src/routes' },
            {
              target: [
                './src/context',
                './src/components',
                './src/hooks',
                './src/lib',
                './src/config',
                './src/types',
                './src/layout',
              ],
              from: ['./src/features', './src/routes'],
            },
          ],
        },
      ],
    },
  },
])
