const fs = require('fs');

let b = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA', 'global.CARDS_BETA');
let a = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA', 'global.CARDS_ALPHA');
eval(b); eval(a);

const allCards = { ...global.CARDS_ALPHA, ...global.CARDS_BETA };
const spells = Object.entries(allCards).filter(([k, v]) => v.type === 'spell' || v.type === 'reaction');

console.log('Total spells + reactions:', spells.length);
const detailedSpells = spells.map(([name, c]) => ({
  name,
  type: c.type,
  faction: c.faction,
  cost: c.cost,
  bloodCost: c.bloodCost || 0,
  desc: c.desc
}));

fs.writeFileSync('scratch/spells_detailed.json', JSON.stringify(detailedSpells, null, 2), 'utf8');
console.log('Saved scratch/spells_detailed.json');
