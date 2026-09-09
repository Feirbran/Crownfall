const fs = require('fs');
const evalAlpha = new Function(fs.readFileSync('cards_alpha.js', 'utf8') + '; return CARDS_ALPHA;')();
const evalBeta = new Function(fs.readFileSync('cards_beta.js', 'utf8') + '; return CARDS_BETA;')();
const all = { ...evalAlpha, ...evalBeta };

const candidates = [
  'slancio', 'allungo', 'balzo a l', 'flanking', 'presidio', 'interposizione',
  'sfondamento', 'inamovibile', 'massiccio', 'travolgere', 'copertura',
  'tiro coperto', 'invisibile', 'furtivo', 'velenoso', 'avvelena', 'ferita'
];

candidates.forEach(term => {
  const matching = Object.entries(all).filter(([k, v]) => {
    return v.desc && v.desc.toLowerCase().includes(term);
  });
  console.log(`=== ${term.toUpperCase()} (${matching.length} cards) ===`);
  matching.slice(0, 5).forEach(([k, v]) => {
    console.log(`  - ${k}: "${v.desc}"`);
  });
});
