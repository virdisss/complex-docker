# Step 1: Build stage
FROM node:14.16.0-alpine3.13 as build-stage
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . . 
RUN npm run build

# Step 2: Production stage
FROM nginx:1.12-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build usr/share/nginx/html