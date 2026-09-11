const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

const targets = [
  'battleState[nextTurn].altarDeployedThisTurn = false;',
  'function useWeaponRiteP1() {',
  'function startKaelenRiteSelection(role) {',
  'battleState[player].blood -= comm.riteCost;',
  'function executeRiteAction(player',
  'function updateHUD() {',
  'addLog(`${att.name} attacca ${def.name} infliggendo ${damage} danni`, player);',
  'el.innerHTML = `<span>${p.type === \'commander\''
];

targets.forEach(t => {
  const idx = s.indexOf(t);
  console.log(t, '=>', idx !== -1 ? 'FOUND at ' + idx : 'NOT FOUND');
  if (idx !== -1) {
    const lineStart = s.lastIndexOf('\n', idx) + 1;
    const lineEnd = s.indexOf('\n', idx);
    console.log('   Exact line:', JSON.stringify(s.substring(lineStart, lineEnd)));
  }
});
