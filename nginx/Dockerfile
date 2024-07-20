FROM nginx:latest

# デフォルトの設定の名称変更
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak

# 作成した設定ファイルをコピー
COPY conf/web.conf /etc/nginx/conf.d