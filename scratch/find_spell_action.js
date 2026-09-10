const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8').replace(/\r?\n/g, '\n');

const sIdx = s.indexOf('function castSpell(targetIdx)');
const eIdx = s.indexOf('function executeMoveAction(');

console.log('sIdx:', sIdx, 'eIdx:', eIdx);
if (sIdx !== -1 && eIdx !== -1) {
  const slice = s.substring(sIdx, eIdx);
  fs.writeFileSync('scratch/actual_spell_action.txt', slice);
  console.log('Saved to scratch/actual_spell_action.txt. Length:', slice.length);
}
