const pkg = require('./package');
const env = process.env.NODE_ENV || 'production';
let config = require(`./config/${env}.env`);
const bodyParser = require('body-parser');

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
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/reset.css'],

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
    [
      '@nuxtjs/proxy',
      {
        onProxyReq: (proxyReq, req, res) => {
          // ClientRequest, IncomingMessage, ServerResponse
          console.log('query---------->', req.query);
          console.log('body----------->', req.body);
        },
        onProxyRes: (proxyReq, req = {}, res = {}) => {
          let now = new Date();
          console.log(
            new Date().toString(),
            '[proxy]',
            `[${req.method}]`,
            `URL: ${req.url}`,
            `CODE: ${res.statusCode}`,
            `TIME: ${now.getTime() - req.__startTime || 0}ms`
          );
        },
      },
    ],
    // 配置选项
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 0.1, // 0.1分钟
      },
    ],
    '@nuxtjs/sitemap',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: config.baseURL,
    browserBaseURL: '/', // config.feServerBaseUrl
  },
  proxy: {
    // 替换/api
    // '/api/': { target: 'https://www.bitdeer.com', pathRewrite: { '^/api/': '' } },
    // 拼接/api
    '/api': config.baseURL,
  },
  serverMiddleware: [
    bodyParser.json(), //必须用此中间件，否则proxy拿不到body
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: env === 'production' ? 'http://lizhuang.static.com/static' : '/_nuxt/',
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash:8].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash:8].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[name].[contenthash:8].css'),
    },
    extend(config, ctx) {
      // console.log(config, '!!!!!!!!!!!!!!!!!!!', ctx)

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
  },

  sitemap: {
    hostname: 'https://www.bitdeer.com',
    gzip: true,
    exclude: [],
  },
};
