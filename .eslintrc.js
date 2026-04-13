module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
  },
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './apps/crops',
            from: './apps/livestock',
            message: 'Agro-Credit (Crops) cannot import from Bio-Trace (Livestock). Use shared packages.',
          },
          {
            target: './apps/crops',
            from: './apps/energy',
            message: 'Agro-Credit (Crops) cannot import from Petro-Yield (Energy). Use shared packages.',
          },
          {
            target: './apps/livestock',
            from: './apps/crops',
            message: 'Bio-Trace (Livestock) cannot import from Agro-Credit (Crops). Use shared packages.',
          },
          {
            target: './apps/livestock',
            from: './apps/energy',
            message: 'Bio-Trace (Livestock) cannot import from Petro-Yield (Energy). Use shared packages.',
          },
          {
            target: './apps/energy',
            from: './apps/crops',
            message: 'Petro-Yield (Energy) cannot import from Agro-Credit (Crops). Use shared packages.',
          },
          {
            target: './apps/energy',
            from: './apps/livestock',
            message: 'Petro-Yield (Energy) cannot import from Bio-Trace (Livestock). Use shared packages.',
          },
        ],
      },
    ],
  },
};
