FROM nginx:alpine

# 将 frontend 目录下的文件复制到 Nginx 的默认 HTML 目录
COPY ./frontend /usr/share/nginx/html

# 暴露端口
EXPOSE 80
