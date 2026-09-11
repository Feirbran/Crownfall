const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

lines.forEach((l, i) => {
  if (l.includes('COMMANDERS =') || l.includes('const COMMANDERS') || l.includes('let COMMANDERS') || l.includes('var COMMANDERS')) {
    console.log(i + 1, l.trim());
  }
});
