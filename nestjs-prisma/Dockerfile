FROM node:22-alpine3.19 AS baseImage

WORKDIR /usr/app/ 

COPY package.json ./
COPY package-lock.json ./

RUN npm install



FROM node:22-alpine3.19 AS application
WORKDIR /usr/app/

COPY --from=baseImage /usr/app/node_modules ./node_modules
COPY prisma/ prisma/
COPY src/ src/
COPY package.json .
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
