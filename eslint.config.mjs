import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginCypress from 'eslint-plugin-cypress'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'cypress/e2e/**/*.feature',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'cypress/no-force': 'off',
      'cypress/unsafe-to-chain-command': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
)
