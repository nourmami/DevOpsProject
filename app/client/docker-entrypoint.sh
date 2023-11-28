#!/usr/bin/env sh

set -eu


envsubst '${API_HOST}:${API_PORT}' < /etc/nginx/conf.d/nginx.conf.tmp > /etc/nginx/conf.d/nginx.conf

nginx -g 'daemon off;'
