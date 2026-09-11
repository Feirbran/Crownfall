const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

console.log('=== PANES ===');
lines.forEach((l, i) => {
  if (l.includes('class="pane"') || l.includes("class='pane'")) {
    console.log(i + 1, l.trim());
  }
});

console.log('=== GOLD / STORE / PACK REFERENCES ===');
lines.forEach((l, i) => {
  if (l.toLowerCase().includes('bust') || l.toLowerCase().includes('negozio') || l.toLowerCase().includes('shop') || l.toLowerCase().includes('pack') || l.toLowerCase().includes('collection') || l.toLowerCase().includes('gold') || l.toLowerCase().includes('oro')) {
    if (l.includes('function') || l.includes('id=') || l.includes('btn') || l.includes('class=')) {
      console.log(i + 1, l.trim().substring(0, 100));
    }
  }
});
