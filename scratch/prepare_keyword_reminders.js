const fs = require('fs');

const alphaStr = fs.readFileSync('cards_alpha.js', 'utf8');
const betaStr = fs.readFileSync('cards_beta.js', 'utf8');

const evalAlpha = new Function(alphaStr + '; return CARDS_ALPHA;')();
const evalBeta = new Function(betaStr + '; return CARDS_BETA;')();

const KEYWORD_REMINDERS = {
  slancio: '*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*',
  balzo: '*(muove e salta oltre pedine e ostacoli con traiettoria a L)*',
  allungo: '*(può colpire a 2 caselle in linea retta senza subire contrattacco)*',
  flanking: '*(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*',
  presidio: '*(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*',
  sfondamento: '*(infligge danni massicci ad Altari e Muri nemici)*',
  inamovibile: '*(immune a spinte, urti e Voragini)*',
  massiccio: '*(immune a spinte e urti)*',
  travolgere: '*(spinge indietro il difensore e occupa la sua casella)*',
  interposizione: '*(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*'
};

function formatCardDesc(desc) {
  if (!desc) return '';
  let res = desc;

  // Convert markdown *(...)* to <em class="reminder-text">*(...)*</em>
  res = res.replace(/\*\(([^)]+)\)\*/g, '<em class="reminder-text">*($1)*</em>');

  // 1. SLANCIO
  const slancioRem = `<em class="reminder-text">${KEYWORD_REMINDERS.slancio}</em>`;
  if (!res.includes('muoversi e attaccare')) {
    res = res.replace(/\bSlancio\s*&\s*Balzo a L\s*:/gi, `Slancio ${slancioRem} & Balzo a L <em class="reminder-text">${KEYWORD_REMINDERS.balzo}</em>:`);
    res = res.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:/gi, `Slancio ${slancioRem} ($1):`);
    res = res.replace(/\bSlancio\s+e\s+volo\s*:/gi, `Slancio ${slancioRem} & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:`);
    res = res.replace(/\bSlancio\s*:(?!\s*<em)/gi, `Slancio ${slancioRem}:`);
    res = res.replace(/\(\s*1\/1\s+Slancio\s*\)/gi, `(1/1 con Slancio ${slancioRem})`);
    res = res.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*<em)/gi, `$1 Slancio ${slancioRem}`);
  }

  // 2. BALZO A L
  const balzoRem = `<em class="reminder-text">${KEYWORD_REMINDERS.balzo}</em>`;
  if (!res.includes('traiettoria a L')) {
    res = res.replace(/\bBalzo a L\s*:(?!\s*<em)/gi, `Balzo a L ${balzoRem}:`);
    res = res.replace(/\bBalzo a L\s*&(?!\s*<em)/gi, `Balzo a L ${balzoRem} &`);
    res = res.replace(/\bcon\s+Balzo a L\b(?!\s*<em)/gi, `con Balzo a L ${balzoRem}`);
    res = res.replace(/;\s*Balzo a L\b(?!\s*<em)/gi, `; Balzo a L ${balzoRem}`);
  }

  // 3. ALLUNGO
  const allungoRem = `<em class="reminder-text">${KEYWORD_REMINDERS.allungo}</em>`;
  if (!res.includes('2 caselle in linea retta senza')) {
    res = res.replace(/\bAllungo\s*:(?!\s*<em)/gi, `Allungo ${allungoRem}:`);
    res = res.replace(/\bAllungo\s*&(?!\s*<em)/gi, `Allungo ${allungoRem} &`);
    res = res.replace(/\bAllungo\s+economico\s*:/gi, `Allungo ${allungoRem}:`);
  }

  // 4. FLANKING
  const flankingRem = `<em class="reminder-text">${KEYWORD_REMINDERS.flanking}</em>`;
  if (!res.includes('bersaglio è ingaggiato anche')) {
    res = res.replace(/\bFlanking\s*:(?!\s*<em)/gi, `Flanking ${flankingRem}:`);
    res = res.replace(/\bFlanking\s*(?!\s*<em)(?=\s*[.,;:]|\s+infligge|\s*\(accerchiamento\))/gi, `Flanking ${flankingRem}`);
  }

  // 5. PRESIDIO
  const presidioRem = `<em class="reminder-text">${KEYWORD_REMINDERS.presidio}</em>`;
  if (!res.includes('non compie attacchi attivi')) {
    res = res.replace(/\bPresidio(\s+solido)?\s*:(?!\s*<em)/gi, `Presidio ${presidioRem}:`);
  }

  // 6. SFONDAMENTO
  const sfondamentoRem = `<em class="reminder-text">${KEYWORD_REMINDERS.sfondamento}</em>`;
  if (!res.includes('danni massicci ad Altari')) {
    res = res.replace(/\bSfondamento(\s+devastante)?\s*:(?!\s*<em)/gi, `Sfondamento ${sfondamentoRem}:`);
  }

  // 7. INAMOVIBILE / MASSICCIO
  const inamovibileRem = `<em class="reminder-text">${KEYWORD_REMINDERS.inamovibile}</em>`;
  if (!res.includes('immune a spinte, urti')) {
    res = res.replace(/\bInamovibile\s*:(?!\s*<em)/gi, `Inamovibile ${inamovibileRem}:`);
  }
  const massiccioRem = `<em class="reminder-text">${KEYWORD_REMINDERS.massiccio}</em>`;
  if (!res.includes('immune a spinte e urti')) {
    res = res.replace(/\bMassiccio\s*:(?!\s*<em)/gi, `Massiccio ${massiccioRem}:`);
  }

  // 8. TRAVOLGERE
  const travolgereRem = `<em class="reminder-text">${KEYWORD_REMINDERS.travolgere}</em>`;
  if (!res.includes('spinge indietro il difensore')) {
    res = res.replace(/\bTravolgere\s*:(?!\s*<em)/gi, `Travolgere ${travolgereRem}:`);
  }

  // 9. INTERPOSIZIONE
  const interposizioneRem = `<em class="reminder-text">${KEYWORD_REMINDERS.interposizione}</em>`;
  if (!res.includes('deviano su questa unità')) {
    res = res.replace(/\bInterposizione\s*:(?!\s*<em)/gi, `Interposizione ${interposizioneRem}:`);
  }

  return res;
}

console.log('Testing formatCardDesc logic...');
console.log('Sample output:');
console.log(formatCardDesc("Slancio: muove fino a 2 caselle ortogonali e attacca subito."));
console.log(formatCardDesc("Allungo & Flanking: infligge 3 danni anziché 2 se attacca con Aggiramento."));
console.log(formatCardDesc("Balzo a L: salta ostacoli; se atterra adiacente a un nemico lo spinge di 1 casella."));
