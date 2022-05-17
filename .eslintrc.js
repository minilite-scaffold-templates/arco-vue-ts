// 此配置文件仅为临时版本

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'eol-last': 0,
    'import/prefer-default-export': 0,
    'import/extension': 0,
    'semi': '0',
  },
}
