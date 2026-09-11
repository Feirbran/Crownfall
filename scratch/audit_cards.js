const fs = require('fs');

let b = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA', 'global.CARDS_BETA');
let a = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA', 'global.CARDS_ALPHA');
eval(b);
eval(a);

const allCards = { ...global.CARDS_ALPHA, ...global.CARDS_BETA };
const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('=== AUDIT OF ALL CARDS AND EFFECTS ===');
console.log('Total unique cards in database:', Object.keys(allCards).length);

// 1. Spells audit
const spells = Object.entries(allCards).filter(([k, v]) => v.type === 'spell');
console.log('\n--- 1. SPELLS (Total: ' + spells.length + ') ---');

const implementedSpells = [];
const fallbackSpells = [];

spells.forEach(([name, card]) => {
  // Check if name is handled in executeSpellAction or highlightSpellTargets
  const inSpellAction = indexHtml.includes(`'${name}'`) || indexHtml.includes(`"${name}"`);
  // Look specifically inside executeSpellAction
  const execSection = indexHtml.substring(indexHtml.indexOf('function executeSpellAction'), indexHtml.indexOf('function deployCard'));
  if (execSection.includes(name)) {
    implementedSpells.push({ name, faction: card.faction, desc: card.desc });
  } else {
    fallbackSpells.push({ name, faction: card.faction, desc: card.desc });
  }
});

console.log(`Implemented in executeSpellAction: ${implementedSpells.length}`);
implementedSpells.forEach(s => console.log(`  [OK] ${s.name} (${s.faction})`));

console.log(`\nFalling back into generic 2 damage: ${fallbackSpells.length}`);
console.log('Sample fallback spells:');
fallbackSpells.slice(0, 15).forEach(s => console.log(`  [FALLBACK] ${s.name} (${s.faction}): ${s.desc}`));

// 2. Altars audit
const altars = Object.entries(allCards).filter(([k, v]) => v.type === 'altar');
console.log('\n--- 2. ALTARS (Total: ' + altars.length + ') ---');
console.log(`Altars count: ${altars.length}`);
const altarSpecial = [];
altars.forEach(([name, card]) => {
  if (card.desc && card.desc.length > 20) {
    altarSpecial.push({ name, desc: card.desc });
  }
});
console.log(`Altars with special rules: ${altarSpecial.length}`);

// 3. Units with special keywords / triggers
const units = Object.entries(allCards).filter(([k, v]) => v.type === 'unit');
console.log('\n--- 3. UNITS (Total: ' + units.length + ') ---');
console.log(`Units count: ${units.length}`);

// 4. Reactions audit
const reactions = Object.entries(allCards).filter(([k, v]) => v.type === 'reaction');
console.log('\n--- 4. REACTIONS (Total: ' + reactions.length + ') ---');
console.log(`Reactions count: ${reactions.length}`);
reactions.forEach(([name, card]) => console.log(`  [REACTION] ${name} (${card.faction}): ${card.desc}`));
