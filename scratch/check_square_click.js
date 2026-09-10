const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('function onSquareClick');
console.log('onSquareClick at:', idx);
if (idx !== -1) {
  console.log(s.substring(idx, idx + 2500));
}
