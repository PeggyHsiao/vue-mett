module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'linebreak-style': ["error", "windows"],
    'import/extensions': ["error", "always", { js: "never", vue: "never", json: "never" }]
  },
};
