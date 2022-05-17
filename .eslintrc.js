// 此配置文件仅为临时版本

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'eol-last': 0,
    'import/prefer-default-export': 0,
    'import/extension': 0,
    // 'semi': '0',
    'indent': ['error', 4], // 4格缩进
    'linebreak-style': ['error', 'unix'], // unix换行
    'quotes': ['error', 'single'], // 字符串使用单引号
    'semi': ['error', 'never'], // 句末不使用分号
    'dot-notation': 0, // 点表达式
    'no-return-assign': 0, // 箭头函数可以省略大括号
    'vue/no-unused-vars': 0, // 变量定义未使用
    'no-unused-vars': 0, // 变量定义未使用
    'no-empty': 0, // 空代码块
    'no-undef': 0, // 未定义变量
    'no-prototype-builtins': 0, // 禁止直接使用 Object.prototypes 的内置属性
    'vue/no-side-effects-in-computed-properties': 0, // 计算属性里直接修改data里面的值 =====1
    'vue/no-parsing-error': 0, // iview 组件标签
    'vue/require-prop-type-constructor': 0, // 会修改代码，不能使用
    'vue/no-use-v-if-with-v-for': 0, // v-if v-for同时使用
    'vue/require-v-for-key': 1, // v-for的时候给个key
    'no-constant-condition': 1, // if的条件里面不直接使用常量
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5, //标签超出5个属性就会换行
      },
    ],
    'eqeqeq': 'error', // 要求使用 === 和 !==
  },
}
//
// 		'no-extra-semi': 1, // 禁止多余的分号
// 		'for-direction': 2, // for 循环死了
// 		'no-cond-assign': 2, // 防止 if 写成赋值
// 		'no-dupe-args': 2, // 禁止参数重名
// 		'no-dupe-keys': 2, // 禁止 key 重名
// 		'no-duplicate-case': 2, // 禁止 case 重复
// 		'no-func-assign': 2, // 禁止覆盖函数字面量
// 		'no-inner-declarations': [2, 'both'], // 禁止在 if 中 var
// 		'no-irregular-whitespace': 2, // 禁止非常规空白
// 		'no-prototype-builtins': 2, // 禁止直接调用 obj 上的 proto 方法
// 		'no-sparse-arrays': 2, // 防止数组中多余的逗号
// 		'no-template-curly-in-string': 2, // 禁止字符串中出现 ${}
// 		'no-unreachable': 2, // 禁止出现无法执行到的语句
// 		'no-unsafe-finally': 2, // 禁止 finally 出现控制语句
// 		'no-unsafe-negation': 2, // 禁止有歧义、不安全的 ! 号
// 		'use-isnan': 2, // 强制 isNaN()
// 		'valid-typeof': 2, // 防止 typeof 类型的字符写错
// 		// "valid-jsdoc": 2, // 如果有的话，校验 jsdoc

// 		// 小括号中的空格
// 		'space-in-parens': [1, 'never'],
