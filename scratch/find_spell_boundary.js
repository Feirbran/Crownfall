const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8').replace(/\r?\n/g, '\n');

const sIdx = s.indexOf('function castSpell(targetIdx)');
const endIdx = s.indexOf('    function executeAttackAction(', sIdx);

console.log('sIdx:', sIdx, 'endIdx:', endIdx);
if (sIdx !== -1 && endIdx !== -1) {
  const slice = s.substring(sIdx, endIdx);
  fs.writeFileSync('scratch/actual_spell_action.txt', slice);
  console.log('Saved to scratch/actual_spell_action.txt. Length:', slice.length);
  console.log(slice.substring(slice.length - 200));
}
