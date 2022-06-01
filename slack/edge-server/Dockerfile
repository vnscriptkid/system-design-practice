FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git
RUN yarn install

COPY ./ ./

CMD ["yarn", "start"]