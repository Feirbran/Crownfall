const fs = require('fs');

let b = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA', 'global.CARDS_BETA');
let a = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA', 'global.CARDS_ALPHA');
eval(b); eval(a);

const allCards = { ...global.CARDS_ALPHA, ...global.CARDS_BETA };
const spells = Object.entries(allCards).filter(([k, v]) => v.type === 'spell');

console.log('Total spells:', spells.length);

const categorized = {};

spells.forEach(([name, c]) => {
  const desc = c.desc || '';
  let cat = 'Other';
  
  if (desc.includes('danni') || desc.includes('danno') || desc.includes('Distrugge') || desc.includes('Demolisce') || desc.includes('infligge')) {
    cat = 'Damage/Destruction';
  } else if (desc.includes('Cura') || desc.includes('Ripristina') || desc.includes('curare') || desc.includes('PV')) {
    cat = 'Healing/HP';
  } else if (desc.includes('Pesca') || desc.includes('pescare') || desc.includes('carte')) {
    cat = 'Card Draw/Discard';
  } else if (desc.includes('Trascina') || desc.includes('Spinge') || desc.includes('respinge') || desc.includes('muove') || desc.includes('passo') || desc.includes('scambia')) {
    cat = 'Movement/Displacement';
  } else if (desc.includes('Muro') || desc.includes('Voragine') || desc.includes('Cimiter') || desc.includes('blocco') || desc.includes('casella')) {
    cat = 'Terrain/Object Creation';
  } else if (desc.includes('Mana') || desc.includes('Sangue') || desc.includes('Azione')) {
    cat = 'Resource/Action Economy';
  } else if (desc.includes('armatura') || desc.includes('ATT') || desc.includes('Scudo') || desc.includes('immune')) {
    cat = 'Buff/Debuff/Protection';
  }

  if (!categorized[cat]) categorized[cat] = [];
  categorized[cat].push({ name, faction: c.faction, cost: c.cost, bloodCost: c.bloodCost || 0, desc });
});

for (const [cat, list] of Object.entries(categorized)) {
  console.log(`\n=== ${cat} (${list.length}) ===`);
  list.forEach(s => console.log(`- [${s.faction}] ${s.name} (Cost: ${s.cost}M, ${s.bloodCost}S): ${s.desc}`));
}
