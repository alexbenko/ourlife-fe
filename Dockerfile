FROM arm64v8/node:17-bullseye
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update
RUN apt-get upgrade -y

COPY ./ ./app
RUN npm install --only=prod

EXPOSE 80

CMD npm start