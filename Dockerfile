FROM node:latest as build

WORKDIR /app

COPY package*.json .
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:latest

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
