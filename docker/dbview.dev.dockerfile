FROM node:latest

COPY . .

EXPOSE 5555

RUN npm i prisma

CMD [ "npm", "run", "db:view",  "--", "--browser", "none" ]