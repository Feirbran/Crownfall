const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf("data.type === 'HELLO_JOIN'");
console.log('HELLO_JOIN index:', idx);
if (idx !== -1) {
  console.log(s.substring(idx - 50, idx + 4500));
}
