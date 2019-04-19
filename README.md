## 前提

安装 node 环境

## 1. 安装 create-nuxt-app

[nuxt 中文官网](https://zh.nuxtjs.org/guide/installation)，跟着官网一步一步来。

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

## 3. 使用 pm2 进程管理部署

[pm2 中文官网](https://pm2.io/doc/zh/runtime/quick-start/)

```
// 安装pm2
$ yarn global add pm2
// 初始化生态系统文件
$ pm2 init
```

然后会生成 ecosystem.config.js 文件，[ecosystem 文件](https://pm2.io/doc/zh/runtime/reference/ecosystem-file/)参考。

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

启动 test1（你会发现 8080 端口无效，看第 4 步）

```
$ yarn build
//
$ pm2 startOrRestart ecosystem.config.js --env test1
```

使用 Makefile 文件，一键部署,执行 make test1

```
test1:
  yarn build
  pm2 startOrRestart ecosystem.config.js --env test1
```

## 4. 更改 server/index.js

```
  // const {
  //   host = process.env.HOST || '127.0.0.1',
  //   port = process.env.PORT || 4000
  // } = nuxt.options.server
  // console.log('nuxt --> ', nuxt.options.server)

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 4000
```

## 5. 动静分离, 更改 nuxt.config.js

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

## 6. 添加 axios Module, 集成代理

> 以 modules 的形式引入，服务端和客户端都可以使用，自动挂在到客户端 vue 原型上，服务端 context 上。
> [https://axios.nuxtjs.org/extend](https://axios.nuxtjs.org/extend)

1. 集成 module

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

2. 添加请求响应拦截、baseURL(server side)、browserBaseURL(client side)，代理（axios 自带）

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

nuxt.config.js 中添加 modules, 调试效果请看 pages/componentCache.vue

```
$ yarn add @nuxtjs/component-cache

// nuxt.config.js
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

## 8. 集成 scss/less

```
yarn add node-sass sass-loader -D
yarn add less less-loader -D
```

得益于 vue-loader, 直接使用 scss/less：

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

## 9. 集成 eslint、prettier、Pre-commit Hook 约束代码提交

安装以下依赖：

```
$ yarn add babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node -D
$ yarn add eslint-loader -D
$ yarn add prettier -D --exact
$ yarn add eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue -D
// lint-staged、 husky插件，这样再每次 commit 代码的时候都会格式化一下。
$ yarn add lint-staged husky@next -D
```

添加.eslintrc.js 文件

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

在 nuxt.config.js 中添加 eslint-loader

```
build: {
  extend(config, ctx) {

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
}
```

添加.prettierrc 文件

```
{
 "tabWidth": 2,
 "printWidth": 120,
 "trailingComma": "es5",
 "semi": true,
 "singleQuote": true
}
```

pageage.json 中添加

```
// script
scprit: {
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
  "format": "prettier --write '{components,config,layouts,pages,plugins,store,utils}/**/*.{js,json,vue,less}'"
}

// pre-commit 约束代码提交
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
"lint-staged": {
    "*.{js,json,css,md,vue}": ["prettier --write", "git add"]
  }
```

**扩展**：vscode 保存自动修复, (前提 vscode 安装 eslint 插件)

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

## 10 docker 部署生产环境

安装 docker，注册账号，登录。[docker 教程-阮一峰](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

使用 Makefile 文件一键部署， make product 。

```
// 取git中最新的一个tag, eg: 0.0.1
$ make product

// Makefile
tag := $(shell git describe --always --tags | grep -Eo "[0-9]+\.[0-9]+[\.[0-9]+]*")

test1:
	yarn build
	pm2 startOrRestart ecosystem.config.js --env test1

product:
	docker image build -t nuxt-cli:${tag} .
	docker container run -d -p 8000:3000 -it nuxt-cli:${tag}
```

第一步： docker image build 命令会自动找 Dockerfile 文件

```
# keymetrics/pm2是一个依赖image，docker容器可以理解为微型虚拟机，运行nuxt需要node环境，这里用pm2做进程控制。
FROM keymetrics/pm2:latest-alpine
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
EXPOSE 3000
# 【区别】: 当执行 docker container run -p 8000:3000 -it koa-demo /bin/bash 启动了容易之后
# 【ENTRYPOINT】: 始终执行
# 【CMD】: 会被/bin/bash覆盖
ENTRYPOINT [ "sh", "./entrypoint.sh" ]
# CMD node demos/02.js
```

第二步：docker container run -d -p 8000:3000 -it nuxt-cli:\${tag}, 启动容器之后会自动运行 ./entrypoint.sh，使用 pm2 启动 nuxt。

```
#!/bin/sh
#npm config set registry https://registry.npm.taobao.org
node -v
# pm2 startOrRestart ecosystem.product.config.js --env production
pm2-runtime start ecosystem.product.config.js --env production
```

ecosystem.product.config.js

```
const { join } = require('path')

module.exports = {
  apps: [
    {
      name: 'NUXT-CLI',
      script: './server/index.js',
      instances: '4',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      merge_logs: true,
      log_type: 'raw',
      cwd: './',
      args: `-c ${join(__dirname, 'nuxt.config.js')}`,
      // 输出到标准日志
      output: '/dev/stdout',
      error: '/dev/stderr',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '3000',
        ENABLE_NODE_LOG: 'YES'
      }
    }
  ]
}
```

最后，localhost:8000 访问。
