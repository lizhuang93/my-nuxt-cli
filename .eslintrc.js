module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  extends: ['prettier', 'plugin:vue/essential'], // prettier 和 eslint-plugin-vue
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-param-reassign': ['off'], // 禁止对 function 的参数进行重新赋值
    "no-unused-vars": "warn", // 禁止未使用变量
  },
};