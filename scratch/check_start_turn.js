const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('function startTurnFor');
console.log('startTurnFor index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx, idx + 4000));
}
