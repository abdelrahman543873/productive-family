FROM node:15

WORKDIR /app

COPY ./ /app

RUN yarn

ENV MONGO_DB=mongodb://productivefamilies-backendservices-db:27017/productive

CMD [ "yarn", "start" ]
