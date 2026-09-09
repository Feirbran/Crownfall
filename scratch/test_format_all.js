const fs = require('fs');

const vm = require('vm');
vm.runInThisContext(fs.readFileSync('cards_alpha.js', 'utf8'));
vm.runInThisContext(fs.readFileSync('cards_beta.js', 'utf8'));

const KEYWORD_REMINDERS_MAP = {
  'slancio': '*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*',
  'balzo': '*(muove e salta oltre pedine e ostacoli con traiettoria a L)*',
  'allungo': '*(può colpire a 2 caselle in linea retta senza subire contrattacco)*',
  'flanking': '*(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*',
  'presidio': '*(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*',
  'sfondamento': '*(infligge danni massicci ad Altari e Muri nemici)*',
  'inamovibile': '*(immune a spinte, urti e Voragini)*',
  'massiccio': '*(immune a spinte e urti)*',
  'travolgere': '*(spinge indietro il difensore e occupa la sua casella)*',
  'interposizione': '*(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*'
};

function formatCardDesc(desc) {
  if (!desc) return '';
  let res = desc;

  // 1. Converte eventuali markdown *(...)* in <em class="reminder-text">*(...)*</em>
  res = res.replace(/\*\(([^)]+)\)\*/g, '<em class="reminder-text">*($1)*</em>');

  // 2. Se una parola chiave è presente ma priva di testo esplicativo, lo inserisce automaticamente
  // SLANCIO
  if (!res.includes('muoversi e attaccare')) {
    const slancioRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.slancio}</em>`;
    res = res.replace(/\bSlancio\s*&\s*Balzo a L\s*:/gi, `Slancio ${slancioRem} & Balzo a L <em class="reminder-text">${KEYWORD_REMINDERS_MAP.balzo}</em>:`);
    res = res.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:/gi, `Slancio ${slancioRem} ($1):`);
    res = res.replace(/\bSlancio\s+e\s+volo\s*:/gi, `Slancio ${slancioRem} & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:`);
    res = res.replace(/\bSlancio\s*:(?!\s*<em)/gi, `Slancio ${slancioRem}:`);
    res = res.replace(/\(\s*1\/1\s+Slancio\s*\)/gi, `(1/1 con Slancio ${slancioRem})`);
    res = res.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*<em)/gi, `$1 Slancio ${slancioRem}`);
  }

  // BALZO A L
  if (!res.includes('traiettoria a L')) {
    const balzoRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.balzo}</em>`;
    res = res.replace(/\bBalzo a L\s*:(?!\s*<em)/gi, `Balzo a L ${balzoRem}:`);
    res = res.replace(/\bBalzo a L\s*(&|e)\s*(?!\s*<em)/gi, `Balzo a L ${balzoRem} $1 `);
    res = res.replace(/\bBalzo a L\s*([;.,])(?!\s*<em)/gi, `Balzo a L ${balzoRem}$1`);
    res = res.replace(/\b(con|a|da movimenti a)\s+Balzo a L\b(?!\s*<em)/gi, `$1 Balzo a L ${balzoRem}`);
    res = res.replace(/\bBalzo a L\b(?!\s*<em)/gi, `Balzo a L ${balzoRem}`);
  }

  // ALLUNGO
  if (!res.includes('2 caselle in linea retta senza')) {
    const allungoRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.allungo}</em>`;
    res = res.replace(/\bAllungo\s*:(?!\s*<em)/gi, `Allungo ${allungoRem}:`);
    res = res.replace(/\bAllungo\s*&(?!\s*<em)/gi, `Allungo ${allungoRem} &`);
    res = res.replace(/\bAllungo\s+economico\s*:/gi, `Allungo ${allungoRem}:`);
    res = res.replace(/\bAllungo\s*\(\s*Gittata\s+2\s*\)\s*:/gi, `Allungo ${allungoRem} (Gittata 2):`);
    res = res.replace(/\bAllungo\b(?!\s*<em)/gi, `Allungo ${allungoRem}`);
  }

  // FLANKING
  if (!res.includes('bersaglio è ingaggiato anche')) {
    const flankingRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.flanking}</em>`;
    res = res.replace(/\bFlanking\s*:(?!\s*<em)/gi, `Flanking ${flankingRem}:`);
    res = res.replace(/\b\(?\s*Flanking\s*\)?(?!\s*<em)/gi, `Flanking ${flankingRem}`);
    res = res.replace(/\bFlanking\b(?!\s*<em)/gi, `Flanking ${flankingRem}`);
  }

  // PRESIDIO
  if (!res.includes('non compie attacchi attivi')) {
    const presidioRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.presidio}</em>`;
    res = res.replace(/\bPresidio(\s+solido)?\s*:(?!\s*<em)/gi, `Presidio ${presidioRem}:`);
  }

  // SFONDAMENTO
  if (!res.includes('danni massicci ad Altari')) {
    const sfondamentoRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.sfondamento}</em>`;
    res = res.replace(/\bSfondamento(\s+devastante)?\s*:(?!\s*<em)/gi, `Sfondamento ${sfondamentoRem}:`);
  }

  // INAMOVIBILE / MASSICCIO
  if (!res.includes('immune a spinte, urti')) {
    const inamovibileRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.inamovibile}</em>`;
    res = res.replace(/\bInamovibile\s*:(?!\s*<em)/gi, `Inamovibile ${inamovibileRem}:`);
  }
  if (!res.includes('immune a spinte e urti')) {
    const massiccioRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.massiccio}</em>`;
    res = res.replace(/\bMassiccio\s*:(?!\s*<em)/gi, `Massiccio ${massiccioRem}:`);
  }

  // TRAVOLGERE
  if (!res.includes('spinge indietro il difensore')) {
    const travolgereRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.travolgere}</em>`;
    res = res.replace(/\bTravolgere\s*:(?!\s*<em)/gi, `Travolgere ${travolgereRem}:`);
  }

  // INTERPOSIZIONE
  if (!res.includes('deviano su questa unità')) {
    const interposizioneRem = `<em class="reminder-text">${KEYWORD_REMINDERS_MAP.interposizione}</em>`;
    res = res.replace(/\bInterposizione\s*:(?!\s*<em)/gi, `Interposizione ${interposizioneRem}:`);
  }

  return res;
}

const allCards = { ...CARDS_ALPHA, ...CARDS_BETA };
const keywords = [
  { name: 'Slancio', regex: /slancio/i, check: 'muoversi e attaccare' },
  { name: 'Balzo a L', regex: /balzo a l/i, check: 'traiettoria a L' },
  { name: 'Allungo', regex: /allungo/i, check: '2 caselle in linea retta senza' },
  { name: 'Flanking', regex: /flanking/i, check: 'bersaglio è ingaggiato anche' },
  { name: 'Presidio', regex: /presidio/i, check: 'non compie attacchi attivi' },
  { name: 'Sfondamento', regex: /sfondamento/i, check: 'danni massicci ad Altari' },
  { name: 'Inamovibile', regex: /inamovibile/i, check: 'immune a spinte, urti' },
  { name: 'Massiccio', regex: /massiccio/i, check: 'immune a spinte' },
  { name: 'Travolgere', regex: /travolgere/i, check: 'spinge indietro il difensore' },
  { name: 'Interposizione', regex: /interposizione/i, check: 'deviano su questa unità' }
];

keywords.forEach(kw => {
  let found = 0;
  let ok = 0;
  let missing = [];
  for (const [name, c] of Object.entries(allCards)) {
    const d = c.desc || '';
    if (kw.regex.test(d)) {
      found++;
      const formatted = formatCardDesc(d);
      if (formatted.includes(kw.check)) {
        ok++;
      } else {
        missing.push({ name, desc: d, formatted });
      }
    }
  }
  console.log(`Keyword [${kw.name}]: Found ${found}, Correctly formatted: ${ok}, Missing: ${missing.length}`);
  if (missing.length > 0) {
    missing.forEach(m => console.log(`   -> [${m.name}]: "${m.desc}"`));
  }
});

console.log('\nSample Segugio Randagio:');
console.log(formatCardDesc(allCards['Segugio Randagio'].desc));
