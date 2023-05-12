FROM node:19

COPY . .

EXPOSE 8080

RUN npm i -D
RUN npm run build

CMD [ "npm", "start" ]