# Specify Node Version and Image
FROM node:23.9.0 AS development

# Specify the working dir
WORKDIR /orxan/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

FROM node:23.9.0 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /orxan/src/app

COPY --from=development /orxan/src/app .

EXPOSE 3000

CMD ["node", "dist/main" ]