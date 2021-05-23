FROM node:15

WORKDIR /app

COPY ./ /app

RUN npm install --force

ARG MONGO_DB=mongodb://productivefamilies-backendservices-db:27017/productive

ENV MONGO_DB=${MONGO_DB}

CMD [ "npm", "run", "start" ]
