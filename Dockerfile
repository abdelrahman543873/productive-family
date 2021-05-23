FROM node:15

WORKDIR /app

COPY ./ /app

RUN npm install --force

ENV MONGO_DB=mongodb://productivefamilies-backendservices-db:27017/productive

CMD [ "npm", "run", "start" ]
