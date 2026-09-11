const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('onclick=') && i > 5246) {
    console.log((i+1) + ': ' + l.trim());
  }
});
