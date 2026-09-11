const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

console.log('=== userState.gold occurrences ===');
lines.forEach((l, i) => {
  if (l.includes('userState.gold')) {
    console.log(i + 1, l.trim());
  }
});
