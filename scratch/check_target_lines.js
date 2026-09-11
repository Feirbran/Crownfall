const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

console.log('=== TARGET LINES IN INDEX.HTML ===');
lines.forEach((l, i) => {
  if (l.includes('id="pane-home"')) console.log('pane-home:', i + 1);
  if (l.includes('id="btn-end-turn"')) console.log('btn-end-turn:', i + 1);
  if (l.includes('autoCompleteDeck()')) console.log('autoCompleteDeck call:', i + 1);
  if (l.includes('function autoCompleteDeck')) console.log('autoCompleteDeck def:', i + 1);
  if (l.includes('const COMMANDERS_POOL')) console.log('COMMANDERS_POOL:', i + 1);
  if (l.includes('function executeAttackAction')) console.log('executeAttackAction:', i + 1);
  if (l.includes('function renderPieces')) console.log('renderPieces:', i + 1);
  if (l.includes('function checkWin')) console.log('checkWin:', i + 1);
  if (l.includes('function executeRiteAction')) console.log('executeRiteAction:', i + 1);
  if (l.includes('function handleNetMsg')) console.log('handleNetMsg:', i + 1);
});
