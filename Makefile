tag := $(shell git describe --always --tags | grep -Eo "[0-9]+\.[0-9]+[\.[0-9]+]*")

test1:
	yarn build
	pm2 startOrRestart ecosystem.config.js --env test1

product:
	docker image build -t nuxt-cli:${tag} .
	docker container run -d -p 8000:3000 -it nuxt-cli:${tag}