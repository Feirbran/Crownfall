const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('function initLobby');
console.log('initLobby index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 50, idx + 1000));
}
