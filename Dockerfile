FROM node:alpine as frontend-builder
RUN apk add yarn
WORKDIR /app-source
COPY ./frontend/package*.json ./
COPY ./frontend/jsconfig.json ./
RUN yarn install
COPY frontend/public ./public
COPY frontend/src ./src
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/src ./src
COPY --from=frontend-builder /app-source/build /app/public
ARG build_number=unset
ENV APP_VERSION=${build_number}
ENTRYPOINT [ "npm", "start" ]