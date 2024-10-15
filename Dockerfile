# SudoR2spr By - WOODcraft 
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npm", "start" ]
