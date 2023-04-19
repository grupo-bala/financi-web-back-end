FROM node:19

COPY . .

RUN npm i -D
RUN npx tsc

CMD [ "npm", "start" ]