const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

lines.forEach((l, i) => {
  if (l.includes('.collision-popup') || l.includes('bump-impact')) {
    console.log(i + 1, l.trim());
  }
});
