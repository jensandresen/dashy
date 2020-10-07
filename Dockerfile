FROM node:alpine as builder
WORKDIR /app-source
COPY ./package*.json ./
COPY ./jsconfig.json ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app-source/build /usr/share/nginx/html