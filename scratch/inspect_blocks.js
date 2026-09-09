const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function printBlock(title, startStr, endStr) {
  const start = html.indexOf(startStr);
  const end = html.indexOf(endStr, start);
  console.log('=== ' + title + ' ===');
  if (start !== -1 && end !== -1) {
    console.log(html.substring(start, end + endStr.length));
  } else {
    console.log('Not found: ' + start + ', ' + end);
  }
}

printBlock('Hover & Summon', '<div id="hover-card-preview">', '<div id="app-toast">');
printBlock('showHoverCard', 'function showHoverCard(card, e) {', 'function updateHoverCardPos(e) {');
printBlock('animateCardPlayed', 'function animateCardPlayed(card, onComplete) {', 'function onArenaFilterChanged() {');
printBlock('setTypeFilter', 'function setTypeFilter(val) {', 'function resetAllFilters() {');
printBlock('renderHand', 'function renderHand() {', 'function highlightDeploy() {');
printBlock('filterGroup', '<div class="type-pill-btn active" id="filter-type-all"', '<select id="arena-deck-selector"');
