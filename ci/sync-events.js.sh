#!/bin/sh
# ci/sync-events.js.sh — перегенерация public/events.json из public/js/data.js
# Запуск: sh ci/sync-events.js.sh  (локально или в CI Amvera на этапе build)
set -e
cd "$(dirname "$0")/.."
node -e "
const fs=require('fs');
global.window={};
eval(fs.readFileSync('public/js/data.js','utf8'));
fs.writeFileSync('public/events.json', JSON.stringify(window.NAUKA_EVENTS,null,1));
console.log('events.json regenerated:', window.NAUKA_EVENTS.length, 'items');
"
