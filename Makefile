
test1:
	yarn build
	pm2 startOrRestart ecosystem.config.js --env test1