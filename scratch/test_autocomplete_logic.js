const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

// We extract CARDS_DB, COMMANDERS, and test the algorithm
const vm = require('vm');
const sandbox = {
  console: console,
  Math: Math,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null
  },
  window: {
    addEventListener: () => {},
    location: { hash: '' }
  }
};

// Evaluate the card databases and commanders from index.html
const alphaJs = fs.readFileSync('cards_alpha.js', 'utf8');
const betaJs = fs.readFileSync('cards_beta.js', 'utf8');
const scriptStart = s.indexOf('<script>');
const scriptEnd = s.lastIndexOf('</script>');
const jsCode = s.substring(scriptStart + 8, scriptEnd);

vm.createContext(sandbox);
vm.runInContext(alphaJs, sandbox);
vm.runInContext(betaJs, sandbox);
vm.runInContext(jsCode, sandbox);

const CARDS_DB = vm.runInContext('CARDS_DB', sandbox);
const COMMANDERS = vm.runInContext('COMMANDERS', sandbox);
console.log('CARDS_DB loaded with:', Object.keys(CARDS_DB).length, 'cards');
console.log('COMMANDERS loaded with:', Object.keys(COMMANDERS).length, 'commanders');

// Let's test the smart autocomplete algorithm!
function smartAutoComplete(deck, userState) {
  const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
  const commFaction = comm ? comm.faction : 'Neutral';

  const getAvailableCopies = (cardId) => {
    const c = CARDS_DB[cardId];
    if (!c) return 0;
    const isAlpha = (c.set === 0 || c.set === 'α');
    if (isAlpha) return 4;
    return Math.min(4, (userState.collection && userState.collection[cardId]) || 0);
  };

  // Card scoring function based on commander synergy, stats, and role
  const scoreCard = (card) => {
    let score = 10;
    // Faction affinity bonus
    if (card.faction === commFaction) score += 15;
    else if (card.faction === 'Neutral') score += 5;
    else return -999; // Illegal faction!

    // Rarity bonus
    if (card.rarity === 'mythic') score += 10;
    else if (card.rarity === 'rare') score += 7;
    else if (card.rarity === 'uncommon') score += 4;

    // Unit stat efficiency
    if (card.type === 'unit') {
      const att = card.att || 0;
      const hp = card.hp || 0;
      const cost = card.cost || 1;
      score += (att * 1.8 + hp * 1.2) - (cost * 1.8);
      if (card.slancio) score += 4;
      if (card.move === 'knight') score += 3;
      if (card.range && card.range > 1) score += 4;
    }

    // Archetype and Keyword synergies based on commander
    const desc = (card.desc || '').toLowerCase();
    const name = (card.name || '').toLowerCase();

    if (commFaction === 'Ferro') {
      if (desc.includes('armatura') || desc.includes('presidio') || desc.includes('muro') || desc.includes('difesa') || desc.includes('copertura') || desc.includes('scudo')) score += 8;
      if (card.type === 'altar' && (name.includes('ferro') || name.includes('fortezza') || name.includes('pietra'))) score += 12;
    } else if (commFaction === 'Ceneri') {
      if (desc.includes('sangue') || desc.includes('cimitero') || desc.includes('morte') || desc.includes('sacrifica') || desc.includes('spirito')) score += 8;
      if (card.bloodCost && card.bloodCost > 0) score += 5;
      if (card.type === 'altar' && (name.includes('sangue') || name.includes('cenere') || name.includes('ossario'))) score += 12;
    } else if (commFaction === 'Marea') {
      if (desc.includes('spinta') || desc.includes('spinge') || desc.includes('urto') || desc.includes('trascin') || desc.includes('attira') || desc.includes('marea') || desc.includes('balzo')) score += 8;
      if (card.type === 'altar' && (name.includes('marea') || name.includes('abissi') || name.includes('vortice'))) score += 12;
    } else if (commFaction === 'Silenzio') {
      if (desc.includes('tassa') || desc.includes('silenzio') || desc.includes('confisca') || desc.includes('scudo') || desc.includes('legge') || desc.includes('blocca')) score += 8;
      if (card.type === 'altar' && (name.includes('silenzio') || name.includes('legge') || name.includes('giudizio'))) score += 12;
    } else if (commFaction === 'Forgia') {
      if (desc.includes('automa') || desc.includes('forgia') || desc.includes('scoria') || desc.includes('metallo') || desc.includes('fuoco') || desc.includes('incendio')) score += 8;
      if (card.type === 'altar' && (name.includes('forgia') || name.includes('magma') || name.includes('fiamma'))) score += 12;
    }

    return score;
  };

  // Build eligible card pool
  const eligibleCards = Object.values(CARDS_DB).filter(c => {
    if (!c || !c.id) return false;
    if (c.faction !== commFaction && c.faction !== 'Neutral') return false;
    return getAvailableCopies(c.id) > 0;
  });

  eligibleCards.sort((a, b) => scoreCard(b) - scoreCard(a));

  const targetCount = 40;
  if (deck.cards.length >= targetCount) {
    return "already_full";
  }

  // Desired curve and role targets:
  // Altars: 4
  // 1-cost units: 10
  // 2-cost units: 13
  // 3+ cost units: 7
  // Spells/Reactions: 6
  const getCounts = (cards) => {
    let altars = 0, units1 = 0, units2 = 0, units3Plus = 0, spells = 0;
    cards.forEach(id => {
      const c = CARDS_DB[id];
      if (!c) return;
      if (c.type === 'altar') altars++;
      else if (c.type === 'unit') {
        if (c.cost <= 1) units1++;
        else if (c.cost === 2) units2++;
        else units3Plus++;
      } else if (c.type === 'spell' || c.type === 'reaction') {
        spells++;
      }
    });
    return { altars, units1, units2, units3Plus, spells };
  };

  // Helper to try add card by criteria (max 2 copies per standard card for competitive consistency)
  const tryAdd = (predicate, quota, maxCopiesPerCard = 2) => {
    for (const card of eligibleCards) {
      if (deck.cards.length >= targetCount) break;
      if (!predicate(card)) continue;
      const inDeck = deck.cards.filter(id => id === card.id).length;
      const available = getAvailableCopies(card.id);
      const cap = Math.min(maxCopiesPerCard, available);
      const canAdd = Math.min(quota, cap - inDeck);
      for (let k = 0; k < canAdd; k++) {
        deck.cards.push(card.id);
        quota--;
      }
      if (quota <= 0) break;
    }
  };

  let counts = getCounts(deck.cards);

  // 1. Ensure 4 altars
  if (counts.altars < 4) {
    tryAdd(c => c.type === 'altar', 4 - counts.altars);
  }

  // 2. Add 1-cost units
  counts = getCounts(deck.cards);
  if (counts.units1 < 10) {
    tryAdd(c => c.type === 'unit' && (c.cost <= 1), 10 - counts.units1);
  }

  // 3. Add 2-cost units
  counts = getCounts(deck.cards);
  if (counts.units2 < 13) {
    tryAdd(c => c.type === 'unit' && c.cost === 2, 13 - counts.units2);
  }

  // 4. Add 3+ cost heavy units
  counts = getCounts(deck.cards);
  if (counts.units3Plus < 7) {
    tryAdd(c => c.type === 'unit' && c.cost >= 3, 7 - counts.units3Plus);
  }

  // 5. Add Spells / Reactions
  counts = getCounts(deck.cards);
  if (counts.spells < 6) {
    tryAdd(c => (c.type === 'spell' || c.type === 'reaction'), 6 - counts.spells);
  }

  // 6. Fill any remaining slots to strictly reach 40 cards (first at 2x, then up to available limit)
  for (let maxCap of [2, 4]) {
    while (deck.cards.length < targetCount) {
      let added = false;
      for (const card of eligibleCards) {
        if (deck.cards.length >= targetCount) break;
        const inDeck = deck.cards.filter(id => id === card.id).length;
        const available = getAvailableCopies(card.id);
        const cap = Math.min(maxCap, available);
        if (inDeck < cap) {
          deck.cards.push(card.id);
          added = true;
          break;
        }
      }
      if (!added) break;
    }
  }

  return deck.cards.length;
}

// Test for all commanders
Object.keys(COMMANDERS).forEach(commId => {
  const comm = COMMANDERS[commId];
  const testDeck = { commanderId: commId, cards: [] };
  const count = smartAutoComplete(testDeck, { collection: {} });
  console.log(`Commander ${comm.name} (${comm.faction}): filled to ${count} cards. Deck length: ${testDeck.cards.length}`);
  if (commId === 'valeria' || commId === 'malakor') {
    const counts = {};
    testDeck.cards.forEach(id => counts[id] = (counts[id] || 0) + 1);
    let altars = 0, units = 0, spells = 0;
    testDeck.cards.forEach(id => {
      const c = CARDS_DB[id];
      if (c.type === 'altar') altars++;
      else if (c.type === 'unit') units++;
      else spells++;
    });
    console.log(`  -> Altars: ${altars}, Units: ${units}, Spells: ${spells}`);
    console.log(`  -> Unique cards: ${Object.keys(counts).length}, sample: ${Object.entries(counts).slice(0, 5).map(([k, v]) => `${k} x${v}`).join(', ')}`);
  }
});
