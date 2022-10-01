FROM node:15.7.0-alpine3.10
WORKDIR /usr/local/src
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD yarn serve
