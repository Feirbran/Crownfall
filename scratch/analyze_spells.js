const fs = require('fs');
const list = JSON.parse(fs.readFileSync('scratch/all_spells_reactions.json', 'utf8'));

const out = list.map((s, idx) => {
  return `${idx + 1}. [${s.type.toUpperCase()}] "${s.name}" (Cost: ${s.cost}M, Blood: ${s.bloodCost}B, Fac: ${s.faction})\n   Desc: ${s.desc}`;
}).join('\n\n');

fs.writeFileSync('scratch/spells_list.txt', out, 'utf8');
console.log('Saved UTF-8 scratch/spells_list.txt with', list.length, 'spells.');
