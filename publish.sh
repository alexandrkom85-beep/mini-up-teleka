#!/bin/bash
# Публикация витрины в Yandex Object Storage (бакет bustool-showcase).
# Запуск: bash publish.sh   — загружает содержимое папки prototype/.
# Доступ: профиль yc «showcase-sa» (сервисный аккаунт, ключ в .env → YC_SA_KEY_JSON).
set -e
cd "$(dirname "$0")"
YC="$HOME/yandex-cloud/bin/yc"
B=bustool-showcase
P="--profile showcase-sa"

# Если профиля нет (новый компьютер) — создать из ключа в .env
if ! "$YC" config profile list 2>/dev/null | grep -q '^showcase-sa'; then
  set -a; . ./.env; set +a
  K=$(mktemp); chmod 600 "$K"; printf '%s' "$YC_SA_KEY_JSON" > "$K"
  "$YC" config profile create showcase-sa >/dev/null
  "$YC" config set service-account-key "$K" $P
  "$YC" config set folder-id "$YC_FOLDER_ID" $P
  rm -P "$K"
fi

# Страница и данные — без кэша (чтобы правки были видны сразу), значки — кэш на сутки
"$YC" storage s3 cp prototype/index.html "s3://$B/index.html" --content-type "text/html; charset=utf-8" --cache-control "no-cache" --only-show-errors $P
"$YC" storage s3 cp prototype/data.js    "s3://$B/data.js"    --content-type "application/javascript; charset=utf-8" --cache-control "no-cache" --only-show-errors $P
"$YC" storage s3 cp prototype/icons/     "s3://$B/icons/" --recursive --exclude "*.txt" --cache-control "max-age=86400" --only-show-errors $P

echo "Опубликовано: https://$B.website.yandexcloud.net/"
