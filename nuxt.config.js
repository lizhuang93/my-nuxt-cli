const pkg = require('./package')
const env = process.env.NODE_ENV || 'production'
let config = require(`./config/${env}.env`)

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/reset.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios', // 扩展axios请求方法
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    // 配置选项
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 0.1 // 0.1分钟 
    }],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: config.baseURL,
    browserBaseURL: '/' //config.feServerBaseUrl
  },
  proxy: {
    // 替换/api
    // '/api/': { target: 'https://www.bitdeer.com', pathRewrite: { '^/api/': '' } },
    // 拼接/api
    '/api': config.baseURL
  },
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
      // console.log(config, '!!!!!!!!!!!!!!!!!!!', ctx)
    }
  }
}
