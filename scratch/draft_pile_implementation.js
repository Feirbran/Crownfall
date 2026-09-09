const fs = require('fs');

// Test the deck & graveyard aggregation and filter logic
const mockCardsDb = {
  'Segugio Randagio': { id: 'Segugio Randagio', name: 'Segugio Randagio', cost: 1, type: 'unit', rarity: 'common', glyph: '🐺' },
  'Altare': { id: 'Altare', name: 'Altare', cost: 0, type: 'altar', rarity: 'common', glyph: '🏛️' },
  'Frantumare la Pietra': { id: 'Frantumare la Pietra', name: 'Frantumare la Pietra', cost: 2, type: 'spell', rarity: 'common', glyph: '🔨' }
};

const mockDeck = ['Segugio Randagio', 'Segugio Randagio', 'Altare', 'Frantumare la Pietra'];
const mockGraveyard = ['Altare', 'Segugio Randagio'];

function getGroupedPile(cardIds) {
  const counts = {};
  cardIds.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });
  return Object.entries(counts).map(([id, count]) => {
    const card = mockCardsDb[id] || { id, name: id, cost: 0, type: 'unit', rarity: 'common', glyph: '⚔️' };
    return { id, card, count };
  }).sort((a, b) => (a.card.cost - b.card.cost) || a.card.name.localeCompare(b.card.name));
}

console.log('Deck grouped:', getGroupedPile(mockDeck));
console.log('Graveyard grouped:', getGroupedPile(mockGraveyard));
