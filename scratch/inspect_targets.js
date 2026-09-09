const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function showAround(target, len = 300) {
  const idx = html.indexOf(target);
  console.log('=== Target: [' + target + '] Index: ' + idx);
  if (idx !== -1) {
    console.log(html.substring(idx, idx + len));
  }
}

showAround('<div class="arena-filter-group">');
showAround('<div id="hover-card-preview">');
showAround('function showHoverCard(card, e)');
showAround('function animateCardPlayed');
showAround('function setTypeFilter');
showAround('function renderHand()');
