const { join } = require('path');

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
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: '3000',
        ENABLE_NODE_LOG: 'YES',
      },
    },
  ],
};
