const fs = require('fs');

let b = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA', 'global.CARDS_BETA');
let a = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA', 'global.CARDS_ALPHA');
eval(b); eval(a);

const allCards = { ...global.CARDS_ALPHA, ...global.CARDS_BETA };
const indexHtml = fs.readFileSync('index.html', 'utf8');

const spellCategories = {
  directDamage: [],
  healing: [],
  buffDebuff: [],
  cardDraw: [],
  movementPullPush: [],
  boardCreationWallVortexTrap: [],
  disruptionManaBlood: [],
  sacrificeResurrection: [],
  complexSpecial: []
};

const unitPassives = {
  armatura: [],
  presidio: [],
  flanking: [],
  counterBonus: [],
  onDeath: [],
  movementSpecial: [],
  activeAbility: [],
  aura: [],
  immunity: []
};

const altarMechanics = {
  passiveBonus: [],
  onDeathOrDamaged: [],
  turnTrigger: [],
  endTurnTrigger: [],
  standardMana: []
};

Object.entries(allCards).forEach(([name, c]) => {
  const desc = c.desc || '';
  
  if (c.type === 'spell') {
    if (desc.includes('Pesca') || desc.includes('pescare')) spellCategories.cardDraw.push(name);
    else if (desc.includes('Trascina') || desc.includes('Spinge') || desc.includes('respinge') || desc.includes('muove')) spellCategories.movementPullPush.push(name);
    else if (desc.includes('Muro') || desc.includes('Voragine') || desc.includes('Cimiter') || desc.includes('Trappola') || desc.includes('casella')) spellCategories.boardCreationWallVortexTrap.push(name);
    else if (desc.includes('Cura') || desc.includes('Ripristina') || desc.includes('curare')) spellCategories.healing.push(name);
    else if (desc.includes('Sacrifica') || desc.includes('Rianima')) spellCategories.sacrificeResurrection.push(name);
    else if (desc.includes('Sangue') || desc.includes('Mana') || desc.includes('Azione')) spellCategories.disruptionManaBlood.push(name);
    else if (desc.includes('danni') || desc.includes('danno') || desc.includes('Distrugge')) spellCategories.directDamage.push(name);
    else spellCategories.buffDebuff.push(name);
  }
  
  if (c.type === 'unit') {
    if (desc.includes('Armatura') || desc.includes('riduce') || desc.includes('-1 danno')) unitPassives.armatura.push(name);
    if (desc.includes('Presidio')) unitPassives.presidio.push(name);
    if (desc.includes('Flanking') || desc.includes('Aggiramento')) unitPassives.flanking.push(name);
    if (desc.includes('contrattacco') || desc.includes('Contrattacco')) unitPassives.counterBonus.push(name);
    if (desc.includes('morte') || desc.includes('distrutto') || desc.includes('caduto')) unitPassives.onDeath.push(name);
    if (desc.includes('Aura') || desc.includes('adiacenti')) unitPassives.aura.push(name);
    if (desc.includes('immune') || desc.includes('Inamovibile') || desc.includes('Ancorato')) unitPassives.immunity.push(name);
    if (desc.includes('[1') || desc.includes('[1⚡]')) unitPassives.activeAbility.push(name);
  }

  if (c.type === 'altar') {
    if (desc.includes('inizio turno') || desc.includes('a inizio turno')) altarMechanics.turnTrigger.push(name);
    else if (desc.includes('fine turno') || desc.includes('a fine turno')) altarMechanics.endTurnTrigger.push(name);
    else if (desc.includes('distrutto') || desc.includes('subisce danno')) altarMechanics.onDeathOrDamaged.push(name);
    else if (desc.includes('adiacenti') || desc.includes('copertura') || desc.includes('difensiva')) altarMechanics.passiveBonus.push(name);
    else altarMechanics.standardMana.push(name);
  }
});

console.log('--- SPELL BREAKDOWN ---');
for (const [cat, list] of Object.entries(spellCategories)) {
  console.log(`${cat}: ${list.length} spells`);
}

console.log('\n--- UNIT PASSIVES BREAKDOWN ---');
for (const [cat, list] of Object.entries(unitPassives)) {
  console.log(`${cat}: ${list.length} units`);
}

console.log('\n--- ALTAR MECHANICS BREAKDOWN ---');
for (const [cat, list] of Object.entries(altarMechanics)) {
  console.log(`${cat}: ${list.length} altars`);
}
