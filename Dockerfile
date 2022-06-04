FROM node:14-alpine as dev

FROM dev as development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


RUN npm install nodemon -g

COPY package*.json ./
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
