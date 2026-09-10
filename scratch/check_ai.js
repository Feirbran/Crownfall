const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('function playAITurn');
console.log('playAITurn at:', idx);
if (idx !== -1) {
  console.log(s.substring(idx, idx + 3500));
} else {
  // search for ai turn
  const tIdx = s.indexOf('turn === \'p2\'');
  console.log('turn === p2 at:', tIdx);
  console.log(s.substring(tIdx - 100, tIdx + 1500));
}
