const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('=== COMBAT & ABILITY ENGINE INSPECTION ===');

// Check triggers in executeAttackAction
const attackFunc = indexHtml.substring(indexHtml.indexOf('function executeAttackAction'), indexHtml.indexOf('function castSpell') || indexHtml.indexOf('function highlightSpellTargets'));
console.log('--- In executeAttackAction ---');
['hasIronAltarProtection', 'Colosso di Basalto', 'colossus', 'halberdier', 'Alabardiere', 'pushPiece', 'handlePieceDefeated', 'Armatura', 'Presidio', 'Flanking', 'Aggiramento', 'Slancio'].forEach(kw => {
  console.log(`Contains "${kw}":`, attackFunc.includes(kw));
});

// Check triggers in handlePieceDefeated
const defeatFunc = indexHtml.substring(indexHtml.indexOf('function handlePieceDefeated'), indexHtml.indexOf('function attack') || indexHtml.indexOf('function executeAttackAction'));
console.log('\n--- In handlePieceDefeated ---');
['altar_blood', 'Altare del Sangue', 'bloodReward', 'Cimitero', 'Alla morte', 'esplosivo', 'Guscio'].forEach(kw => {
  console.log(`Contains "${kw}":`, defeatFunc.includes(kw));
});

// Check startTurnFor
const turnFunc = indexHtml.substring(indexHtml.indexOf('function startTurnFor'), indexHtml.indexOf('function runAI'));
console.log('\n--- In startTurnFor ---');
['altar', 'drainKey', 'recalculatePlayerMaxMana', 'Aura', 'Inizio turno'].forEach(kw => {
  console.log(`Contains "${kw}":`, turnFunc.includes(kw));
});
