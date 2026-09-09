const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('copyHostRoomCode');
console.log('copyHostRoomCode index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 50, idx + 400));
}
