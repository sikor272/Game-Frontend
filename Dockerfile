# build environment
FROM node:13.12.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN apk add --no-cache bash
CMD ["nginx", "-g", "daemon off;"]
