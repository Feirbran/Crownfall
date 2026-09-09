const fs = require('fs');
const evalAlpha = new Function(fs.readFileSync('cards_alpha.js', 'utf8') + '; return CARDS_ALPHA;')();
const evalBeta = new Function(fs.readFileSync('cards_beta.js', 'utf8') + '; return CARDS_BETA;')();
const all = { ...evalAlpha, ...evalBeta };

const kwList = [
  { name: 'Slancio', regex: /\bSlancio\b/i },
  { name: 'Allungo', regex: /\bAllungo\b/i },
  { name: 'Balzo a L', regex: /Balzo a L/i },
  { name: 'Flanking', regex: /\bFlanking\b/i },
  { name: 'Presidio', regex: /\bPresidio\b/i },
  { name: 'Sfondamento', regex: /\bSfondamento\b/i },
  { name: 'Inamovibile', regex: /\bInamovibile\b/i },
  { name: 'Massiccio', regex: /\bMassiccio\b/i },
  { name: 'Travolgere', regex: /\bTravolgere\b/i },
  { name: 'Interposizione', regex: /\bInterposizione\b/i }
];

kwList.forEach(kw => {
  const cards = Object.entries(all).filter(([k, v]) => kw.regex.test(v.desc || ''));
  console.log(kw.name + ': ' + cards.length + ' cards');
});
