FROM node:12.14-alpine

RUN apk update && \
  apk add --no-cache --virtual --update-cache \
    bash \
    zlib-dev \
    lcms2-dev \
    libpng-dev \
    gcc \
    python \
    make \
    autoconf \
    automake \
    g++ \
  && mkdir -p /usr/src/app \
  && mkdir /temp \
  && rm -rf /var/cache/apk/* \
  && rm -rf /var/lib/apt/lists/*

RUN rm /usr/local/bin/yarn

RUN rm /usr/local/bin/yarnpkg

RUN npm config set unsafe-perm true

RUN npm install -g yarn

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
