FROM keymetrics/pm2:latest-alpine
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "sh", "./entrypoint.sh" ]

# CMD 