const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('VITTORIA');
console.log('VITTORIA index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 200, idx + 800));
}
