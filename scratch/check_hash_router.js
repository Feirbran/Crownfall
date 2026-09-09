const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const idx = s.indexOf('window.addEventListener(\'hashchange\'');
if (idx !== -1) {
  console.log(s.substring(idx - 200, idx + 600));
} else {
  console.log('hashchange listener index:', s.indexOf('hashchange'));
}
