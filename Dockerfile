FROM node:alpine as builder
RUN apk add yarn
WORKDIR /app-source
COPY ./package*.json ./
COPY ./jsconfig.json ./
RUN yarn install
COPY public ./public
COPY src ./src
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app-source/build /usr/share/nginx/html