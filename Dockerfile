FROM arm64v8/node:17-bullseye
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get upgrade -y

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --only=prod

EXPOSE 80

CMD npm start