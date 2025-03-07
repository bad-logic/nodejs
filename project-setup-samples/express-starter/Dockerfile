FROM node:22 AS builderstage

WORKDIR /usr/app
COPY ["package.json","package-lock.json", "./"]
RUN npm ci
COPY . .

FROM node:22-alpine3.20

USER node

COPY --from=builderstage /usr/app/package.json /usr/app/package.json
COPY --from=builderstage /usr/app/node_modules /usr/app/node_modules

WORKDIR /usr/app
COPY nodemon.json nodemon.json
COPY tsconfig.json tsconfig.json
COPY ./src /usr/app/src

CMD ["npm" , "run" , "dev"]
