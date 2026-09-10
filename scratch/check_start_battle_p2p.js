const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('function startBattleP2P');
console.log('startBattleP2P index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx, idx + 3500));
}
