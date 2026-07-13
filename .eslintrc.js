module.exports = {
  root: true,
  env: {
    node: true,
    es2024: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
  extends: ['eslint:recommended'],
  rules: {
    // Basic root rules; package-specific rules go in packages/config
  },
};
