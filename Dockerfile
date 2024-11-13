#  Node.js 
FROM node:22.8-alpine3.20 as buildstage
WORKDIR /myapp
COPY package.json ./
RUN npm install
COPY . .
ENV VITE_BASE_URL=/dp/portal/notification
RUN npm run build:dev

#  Nginx
FROM nginx:stable-alpine3.20
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=buildstage /myapp/dist ./dp-internal/portal/notification/
COPY --from=buildstage /myapp/public/health.html ./dp/portal/notification/health.html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]