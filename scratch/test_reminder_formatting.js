const fs = require('fs');
const evalAlpha = new Function(fs.readFileSync('cards_alpha.js', 'utf8') + '; return CARDS_ALPHA;')();
const evalBeta = new Function(fs.readFileSync('cards_beta.js', 'utf8') + '; return CARDS_BETA;')();
const all = { ...evalAlpha, ...evalBeta };

const KEYWORD_REMINDERS = {
  'Slancio': '*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*',
  'Balzo a L': '*(muove e salta oltre pedine e ostacoli con traiettoria a L)*',
  'Allungo': '*(può colpire a 2 caselle in linea retta senza subire contrattacco)*',
  'Flanking': '*(infligge danni bonus se il bersaglio è ingaggiato anche da un alleato)*',
  'Presidio': '*(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*',
  'Sfondamento': '*(infligge danni massicci ad Altari e Muri nemici)*',
  'Inamovibile': '*(immune a spinte, urti e Voragini)*',
  'Massiccio': '*(immune a spinte e urti)*',
  'Travolgere': '*(spinge indietro il difensore e occupa la sua casella)*',
  'Interposizione': '*(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*'
};

function formatDescWithReminders(desc) {
  if (!desc) return '';
  let res = desc;

  // For each keyword, if present and not already having reminder text
  Object.entries(KEYWORD_REMINDERS).forEach(([kw, reminder]) => {
    // Avoid double adding if already has reminder
    if (res.includes(reminder) || res.includes(reminder.replace(/\*/g, ''))) return;

    // Pattern 1: Keyword at start or after punctuation followed by colon or & or space
    // e.g. "Slancio:" -> "Slancio *(...)*:"
    // e.g. "Slancio & Balzo a L:" -> "Slancio *(...)* & Balzo a L *(...)*:"
    // e.g. "(1/1 Slancio)" -> "(1/1 con Slancio *(...)*)"
    const regexColon = new RegExp(`\\b(${kw})\\s*:`, 'gi');
    res = res.replace(regexColon, `$1 <em class="reminder-text">${reminder}</em>:`);

    const regexAmp = new RegExp(`\\b(${kw})\\s*&`, 'gi');
    res = res.replace(regexAmp, `$1 <em class="reminder-text">${reminder}</em> &`);

    const regexParens = new RegExp(`\\(\\s*1\\/1\\s+${kw}\\s*\\)`, 'gi');
    res = res.replace(regexParens, `(1/1 con ${kw} <em class="reminder-text">${reminder}</em>)`);

    const regexConferendole = new RegExp(`(conferendole|ottiene|ha|con)\\s+${kw}\\b(?!\\s*<em)`, 'gi');
    res = res.replace(regexConferendole, `$1 ${kw} <em class="reminder-text">${reminder}</em>`);
  });

  return res;
}

// Test on sample cards
console.log('=== TEST ON SAMPLE CARDS ===');
[
  'Spirito Vagante',
  'Ghoul Dissotterrato',
  'Ombra delle Fosse',
  'Rianimazione Veloce',
  'Ragno Meccanico',
  'Segugio Randagio',
  'Picchiere di Presidio',
  'Cavaliere Corazzato',
  'Alabardiere da Trincea',
  'Nido della Nutrice',
  'Ghoul Vorace',
  'Fante con Scudo a Torre',
  'Ariete da Breccia',
  'Titano di Basalto',
  'Juggernaut di Rifiuti'
].forEach(name => {
  const c = all[name];
  if (c) {
    console.log(`[${name}]`);
    console.log('  ORIG:', c.desc);
    console.log('  NEW: ', formatDescWithReminders(c.desc));
  }
});
