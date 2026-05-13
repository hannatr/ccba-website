import eslintConfigPrettier from 'eslint-config-prettier'
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      'node_modules/**',
      '.output/**',
      '.nitro/**',
      '.tanstack/**',
      '.vercel/**',
      'dist/**',
      'src/routeTree.gen.ts',
      // Not part of tsconfig `include`; TanStack config uses type-aware rules for `**/*.js`
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  ...tanstackConfig,
  eslintConfigPrettier,
]
