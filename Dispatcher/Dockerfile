FROM node:12

# ARG DOCKER_NODE_ENV="production"
# ENV NODE_ENV=${DOCKER_NODE_ENV}

WORKDIR /usr/cqrs-kubernetes-nodejs/Dispatcher
COPY ./package*.json ./
RUN npm install
COPY . .
RUN mv utils ..

EXPOSE ${PORT}
CMD [ "npm", "start" ]
