const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('lobby-deck-select-p2p');
console.log('lobby-deck-select-p2p index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 400, idx + 1600));
}
