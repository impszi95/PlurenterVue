# build stage
FROM node:12.18.3-alpine3.11 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
#COPY docker/nginx_config/nginx.conf /etc/nginx/nginx.conf
#COPY docker/nginx_config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]