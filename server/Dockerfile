FROM node:lts-stretch-slim as builder

ARG NODE_ENV="production"
ENV NODE_ENV=$NODE_ENV

RUN npm i -g typescript
RUN npm i -g ts-node

  # Creating the app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#  # Copy root package.json
COPY package*.json ./

  # install the specific service depenedcies
RUN mkdir -p server
COPY package*.json server
RUN yarn

# copy entrypoint
WORKDIR /usr/src/app
COPY entrypoint.sh entrypoint-dev.sh ./

# copy specific service source
WORKDIR /usr/src/app/server
COPY ./tsconfig.json ./
COPY ./ormconfig.js ./
COPY ./src src

  # Transpile speicifc service source
RUN NODE_ENV=$NODE_ENV yarn tsc

FROM node:lts-stretch-slim
ARG APP_ROOT_PATH="build"
ARG NODE_ENV="production"
RUN if [ $NODE_ENV = "development" ] ; then npm install -g typescript ts-node-dev ts-node ; else echo "skip" ; fi
COPY --from=builder /usr/src/app .
RUN echo "===> Running the module server..."
WORKDIR /server/$APP_ROOT_PATH
ENTRYPOINT [ "node", "index" ]
