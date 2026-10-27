FROM nginx:1.27-alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 8080
# nginx на порту 8080
RUN sed -i 's/listen       80;/listen 8080;/' /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
