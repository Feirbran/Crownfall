const fs = require('fs');
let codeA = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA =', 'global.CARDS_ALPHA =');
let codeB = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA =', 'global.CARDS_BETA =');
eval(codeA);
eval(codeB);
const allCards = Object.assign({}, global.CARDS_ALPHA, global.CARDS_BETA);

const deathTriggers = [];
const combatKeywords = [];
const turnTriggers = [];

Object.entries(allCards).forEach(([name, c]) => {
  const desc = c.desc || '';
  const dLower = desc.toLowerCase();

  // Death triggers
  if (dLower.includes('alla morte') || dLower.includes('alla sua morte') || dLower.includes('quando muore') || dLower.includes('distruzione') || dLower.includes('distrutto')) {
    deathTriggers.push({ name, type: c.type, desc });
  }

  // Combat passives
  if (dLower.includes('armatura') || dLower.includes('presidio') || dLower.includes('allungo') || dLower.includes('flanking') || dLower.includes('aggiramento') || dLower.includes('contrattacca') || dLower.includes('sfondamento') || dLower.includes('doppio')) {
    combatKeywords.push({ name, type: c.type, desc });
  }

  // Turn triggers
  if (dLower.includes('inizio turno') || dLower.includes('fine turno') || dLower.includes('ogni round') || dLower.includes('a ogni round')) {
    turnTriggers.push({ name, type: c.type, desc });
  }
});

console.log('Death triggers count:', deathTriggers.length);
console.log('Combat keywords count:', combatKeywords.length);
console.log('Turn triggers count:', turnTriggers.length);

fs.writeFileSync('scratch/death_triggers.json', JSON.stringify(deathTriggers, null, 2), 'utf8');
fs.writeFileSync('scratch/combat_keywords.json', JSON.stringify(combatKeywords, null, 2), 'utf8');
fs.writeFileSync('scratch/turn_triggers.json', JSON.stringify(turnTriggers, null, 2), 'utf8');
console.log('Analysis saved to scratch json files.');
