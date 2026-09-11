const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const lines = s.split(/\r?\n/);

console.log('=== SEARCHING KEY LOCATIONS IN INDEX.HTML ===');
lines.forEach((l, i) => {
  const lt = l.trim();
  if (lt.includes('autoComplete') || lt.includes('auto-fill') || lt.includes('autofill') || lt.includes('autoFill') || lt.includes('completa') || lt.includes('Autocompleta') || lt.includes('Riempi')) {
    if (lt.includes('function') || lt.includes('button') || lt.includes('btn')) console.log('Deckbuilder:', i + 1, lt);
  }
  if (lt.includes('checkWin()') || lt.includes('function checkWin')) {
    console.log('checkWin:', i + 1, lt);
  }
  if (lt.includes('executeRiteAction') || lt.includes('useRite') || lt.includes('castRite')) {
    console.log('Rites:', i + 1, lt);
  }
  if (lt.includes('id="pane-menu"') || lt.includes('id="pane-battle"')) {
    console.log('Panes:', i + 1, lt);
  }
  if (lt.includes('btn-surrender') || lt.includes('arrenditi') || lt.includes('Arrenditi') || lt.includes('Resa')) {
    console.log('Surrender:', i + 1, lt);
  }
});
