FROM mhart/alpine-node:14

RUN yarn global add serve

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD serve -s /app/build
