#!/bin/bash
# Публикация витрины в Yandex Object Storage (бакет bustool-showcase).
# Запуск: bash publish.sh          — страница, значки (данные из админки не трогает)
#         bash publish.sh --data   — плюс заменить данные на prototype/data.js
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
# data.json — «живые» данные, их меняет админка. Загружаем из data.js только при первом запуске
# или по флагу --data (перезапишет правки из админки; прежняя версия уйдёт в backup/).
if [ "$1" = "--data" ] || [ "$(curl -s -o /dev/null -w '%{http_code}' "https://$B.website.yandexcloud.net/data.json")" != "200" ]; then
  J=$(mktemp); node -e 'global.window={};require(require("path").resolve(process.argv[1]));process.stdout.write(JSON.stringify(window.SHOWCASE,null,1))' prototype/data.js > "$J"
  "$YC" storage s3 cp "s3://$B/data.json" "s3://$B/backup/data-$(date +%Y-%m-%dT%H-%M-%S)-before-publish.json" --only-show-errors $P 2>/dev/null || true
  "$YC" storage s3 cp "$J" "s3://$B/data.json" --content-type "application/json; charset=utf-8" --cache-control "no-cache" --only-show-errors $P
  rm -f "$J"; echo "data.json обновлён из prototype/data.js"
fi
"$YC" storage s3 cp prototype/icons/     "s3://$B/icons/" --recursive --exclude "*.txt" --cache-control "max-age=86400" --only-show-errors $P

echo "Опубликовано: https://$B.website.yandexcloud.net/"
