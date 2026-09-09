const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const sIdx = content.indexOf('class="arena-deck-tray"');
console.log('aside found at pos:', sIdx);
if (sIdx !== -1) {
  console.log('aside context:\n', content.substring(sIdx - 30, sIdx + 600));
}

const rTrayIdx = content.indexOf('function renderTray()');
console.log('renderTray found at pos:', rTrayIdx);
if (rTrayIdx !== -1) {
  console.log('renderTray context:\n', content.substring(rTrayIdx, rTrayIdx + 1200));
}
