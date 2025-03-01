# build
FROM node:23.9.0 AS development

WORKDIR /orxan/frontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild esbuild

RUN npm run build

EXPOSE 4200
