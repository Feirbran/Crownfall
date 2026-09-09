const fs = require('fs');

const html = fs.readFileSync('crownfall.html', 'utf8');

// Let's verify each target section exists in crownfall.html
const checks = [
  '.mtg-card-header {',
  '.mtg-cost-pip {',
  '.mtg-type-banner {',
  '.mtg-pt-box {',
  '#hover-card-preview {',
  'function showHoverCard',
  'const CARDS_DB = {};',
  'function renderDeckBuilder',
  'function renderHand',
  'packCards.forEach((item, idx) => {'
];

checks.forEach(c => {
  console.log(c, 'found:', html.indexOf(c) !== -1);
});
