FROM node:12

# ARG DOCKER_NODE_ENV="production"
# ENV NODE_ENV=${DOCKER_NODE_ENV}

WORKDIR /usr/cqrs-kubernetes-nodejs/stats-order-db
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
# Next line test with tekton, not working with script
COPY ../utils . 
# Next line working in local
#RUN mv utils ..

EXPOSE ${PORT}
CMD [ "npm", "start" ]

