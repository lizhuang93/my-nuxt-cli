## 前提
安装node环境

## 1. 安装create-nuxt-app
[nuxt中文官网](https://zh.nuxtjs.org/guide/installation)，跟着官网一步一步来。
```
// yarn create nuxt-app <项目名>
$ yarn create nuxt-app nuxt-cli
$ cd nuxt-cli
$ yarn run dev
```
然后浏览器输入[localhost:3000](localhost:3000)，就会看到初始化页面，此时我们项目脚手架完成。
## 2. 直接部署
```
$ yarn build
$ yarn start
```
## 3. 使用pm2进程管理部署
[pm2中文官网](https://pm2.io/doc/zh/runtime/quick-start/)

```
// 安装pm2
$ yarn global add pm2
// 初始化生态系统文件
$ pm2 init
```

然后会生成ecosystem.config.js文件，[ecosystem文件](https://pm2.io/doc/zh/runtime/reference/ecosystem-file/)参考。
```
module.exports = {
  apps : [{
    name: 'nuxt-cli', // pm2管理进程的名字
    script: './server/index.js',   // node服务入口文件

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },

    // 传递给node的参数
    env_test1: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: '8080',
      ENABLE_NODE_LOG: 'YES',
    },

  }],
};
```
启动test1（你会发现8080端口无效，看第4步）
```
$ yarn build
// 
$ pm2 startOrRestart ecosystem.config.js --env test1
```
使用Makefile文件，一键部署,执行 make test1
```
test1:
  yarn build
  pm2 startOrRestart ecosystem.config.js --env test1
```

## 4. 更改server/index.js
```
  // const {
  //   host = process.env.HOST || '127.0.0.1',
  //   port = process.env.PORT || 4000
  // } = nuxt.options.server
  // console.log('nuxt --> ', nuxt.options.server)

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 4000
```

## 5. 动静分离更改nuxt.config.js
```
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    publicPath: env === 'production' ? 'http://lizhuang.static.com/static' : '/_nuxt/',
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash:8].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[contenthash:8].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[name].[contenthash:8].css',
    },
    extend(config, ctx) {
      console.log(config, '!!!!!!!!!!!!!!!!!!!', ctx)
    }
  }
```

## 6. 添加axios Module, 集成代理
> 以modules的形式引入，服务端和客户端都可以使用，自动挂在到客户端vue原型上，服务端context上。
[https://axios.nuxtjs.org/extend](https://axios.nuxtjs.org/extend)
1. 集成module
```
$ yarn add @nuxtjs/axios

module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
```
2. 添加请求响应拦截、baseURL(server side)、browserBaseURL(client side)，代理（axios自带）
```
{
  modules: [
    '@nuxtjs/axios',
  ],

  plugins: [
    // axios请求响应拦截
    '~/plugins/axios'
  ],
  axios: {
    proxy: true,
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: config.baseURL,
    browserBaseURL: '/'
  },
  // 自动携带客户端cookie
  proxy: {
    '/api/': 'http://api.example.com',
    '/api2/': 'http://api.another-website.com'
  }
}
```

## 7. 添加组件缓存
nuxt.config.js中添加modules
```
  modules: [
    // 配置选项
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 0.1 // 0.1分钟 (这里方便测试)
    }],
  ],
```
组件中使用：[https://ssr.vuejs.org/zh/guide/caching.html#%E7%BB%84%E4%BB%B6%E7%BA%A7%E5%88%AB%E7%BC%93%E5%AD%98-component-level-caching](https://ssr.vuejs.org/zh/guide/caching.html#%E7%BB%84%E4%BB%B6%E7%BA%A7%E5%88%AB%E7%BC%93%E5%AD%98-component-level-caching)
```
  name: 'item', // 必填选项
  props: ['item'],
  serverCacheKey: props => props.item.id,
```
## 8. 集成scss/less
```
yarn add node-sass sass-loader -D
yarn add less less-loader -D
```
得益于 vue-loader, 直接使用scss/less：
```
<style scoped lang="scss">
.red {
  color: red
}
</style>

<style scoped lang="less">
.red {
  color: red
}
</style>
```
## 9. 集成eslint、prettier and Pre-commit Hook 约束代码提交
```
yarn add babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node -D
yarn add prettier -D --exact
yarn add eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue -D
```
添加.eslintrc.js文件
```
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
```
添加.prettierrc文件
```
{
 "tabWidth": 2,
 "printWidth": 120,
 "trailingComma": "es5",
 "semi": true,
 "singleQuote": true
}
```
pageage.json中添加
```
// script
scprit: {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "format": "prettier --write '{components,config,layouts,pages,plugins,store,utils}/**/*.{js,json,vue,less}'"
}

// commit 约束代码提交
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
"lint-staged": {
    "*.{js,json,css,md}": ["prettier --write", "git add"]
  }
```
vscode 保存自动修复
```
{
    "editor.snippetSuggestions": "top",
    // Controls whether format on paste is on or off
    "editor.formatOnPaste": true,
    "editor.tabSize": 2,
    "eslint.autoFixOnSave": true, //  启用保存时自动修复,默认只支持.js文件
    "eslint.validate": [
        "javascript", //  用eslint的规则检测js文件
        {
            "language": "vue", // 检测vue文件
            "autoFix": true //  为vue文件开启保存自动修复的功能
        },
        {
            "language": "html",
            "autoFix": true
        },
    ],
    "javascript.updateImportsOnFileMove.enabled": "always",
    "sync.gist": "b2bb58bfee03a56d46e0de798ca8ec9f",
    "editor.fontSize": 16,
    "window.zoomLevel": 0,
    "commentTranslate.targetLanguage": "zh-CN"
}
```

