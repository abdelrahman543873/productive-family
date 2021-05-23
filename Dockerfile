FROM node:15

WORKDIR /app

COPY ./ /app

RUN npm install --force

ENV RUN_INSIDE_DOCKER=true

CMD [ "npm", "run", "start" ]
