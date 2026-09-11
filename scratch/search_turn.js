const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

lines.forEach((l, i) => {
  if (l.includes('function startTurnFor')) {
    console.log(i + 1, l);
    for (let j = 0; j < 40; j++) {
      console.log('  ', lines[i + j]);
    }
  }
});
