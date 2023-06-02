FROM node:latest

COPY . .

EXPOSE 8080
EXPOSE 5555

RUN npm i -D
RUN npm run build
RUN chmod +x docker/dev.sh

CMD [ "/bin/bash", "docker/dev.sh" ]