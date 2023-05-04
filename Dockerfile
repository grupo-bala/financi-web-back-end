FROM node:19

COPY . .

RUN npm i -D
RUN npm run build

CMD [ "npm", "start" ]