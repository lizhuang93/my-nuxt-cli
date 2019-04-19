#!/bin/sh
#npm config set registry https://registry.npm.taobao.org
node -v
# pm2 startOrRestart ecosystem.product.config.js --env production
pm2-runtime start ecosystem.product.config.js --env production