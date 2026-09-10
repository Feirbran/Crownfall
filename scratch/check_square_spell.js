const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('highlight-spell-target', 320000);
console.log('highlight-spell-target inside onSquareClick at:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 300, idx + 1500));
} else {
  console.log(s.substring(327000, 332000));
}
