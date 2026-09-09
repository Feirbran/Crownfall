const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('arena-deck-tray"');
console.log('HTML position:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 10, idx + 2500));
}
