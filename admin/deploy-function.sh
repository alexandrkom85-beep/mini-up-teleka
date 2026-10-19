#!/bin/bash
# Развёртывание Cloud Function «showcase-admin» (проверка владельца + сохранение data.json).
# Запуск: bash admin/deploy-function.sh   — нужен вход владельца в yc (профиль showcase, `yc init`).
# Секреты берутся из .env и передаются в переменные окружения функции; в Git не попадают.
set -e
cd "$(dirname "$0")/.."
YC="$HOME/yandex-cloud/bin/yc"; P="--profile showcase"
FN=showcase-admin; SA_NAME=showcase-admin-fn; BUCKET=bustool-showcase
ORIGIN=https://bustool-showcase.website.yandexcloud.net
set -a; . ./.env; set +a
FOLDER="$YC_FOLDER_ID"

if ! [[ "$OWNER_TELEGRAM_ID" =~ ^[0-9]+$ ]]; then
  echo "⚠️  OWNER_TELEGRAM_ID в .env — не числовой ID. Функция будет отказывать всем, пока его не исправить."
fi

# Сервисный аккаунт функции: только запись в хранилище
SA=$("$YC" iam service-account get --name $SA_NAME --format json $P 2>/dev/null | python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])' 2>/dev/null || true)
if [ -z "$SA" ]; then
  SA=$("$YC" iam service-account create --name $SA_NAME --description "Витрина: функция админки пишет data.json" --format json $P | python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])')
  "$YC" resource-manager folder add-access-binding "$FOLDER" --role storage.editor --subject serviceAccount:$SA $P >/dev/null
fi

"$YC" serverless function get --name $FN $P >/dev/null 2>&1 || "$YC" serverless function create --name $FN --description "Админка витрины" $P >/dev/null

ZIP=$(mktemp -d)/fn.zip
(cd admin/function && zip -q "$ZIP" index.js)
"$YC" serverless function version create --function-name $FN \
  --runtime nodejs22 --entrypoint index.handler --memory 128m --execution-timeout 10s \
  --source-path "$ZIP" --service-account-id "$SA" \
  --environment "BOT_TOKEN=$BOT_TOKEN,OWNER_ID=$OWNER_TELEGRAM_ID,BUCKET=$BUCKET,ALLOW_ORIGIN=$ORIGIN" $P >/dev/null
"$YC" serverless function allow-unauthenticated-invoke --name $FN $P >/dev/null
rm -f "$ZIP"

ID=$("$YC" serverless function get --name $FN --format json $P | python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])')
echo "Функция обновлена: https://functions.yandexcloud.net/$ID"
