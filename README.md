## 前提
node环境

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
    extend(config, ctx) {
      config.output.filename = '[name].[contenthash:8].js'
      config.output.chunkFilename = '[name].[contenthash:8].js'
      config.output.publicPath = 'http://other.domain.com/static'
      console.log(config, '!!!!!!!!!!!!!!!!!!!', ctx)
    }
  }
```

## 6. 添加axios

## 7. 代理配置