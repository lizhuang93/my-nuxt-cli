module.exports = {
  apps : [{
    name: 'nuxt-cli',
    script: './server/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },

    env_test1: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: '8080',
      ENABLE_NODE_LOG: 'YES',
      // API_SERVER_URL: 'http://test-api-yuan_gao.frp.bitfunc.com:9080/'
    },

    env_production: {
      NODE_ENV: 'production'
    }

  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
