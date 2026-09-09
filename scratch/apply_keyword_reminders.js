const fs = require('fs');

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

function formatRawDesc(desc) {
  if (!desc) return '';
  let res = desc;

  // 1. SLANCIO
  const slancioRem = KEYWORD_REMINDERS.slancio;
  if (!res.includes('muoversi e attaccare')) {
    res = res.replace(/\bSlancio\s*&\s*Balzo a L\s*:/gi, `Slancio ${slancioRem} & Balzo a L ${KEYWORD_REMINDERS.balzo}:`);
    res = res.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:/gi, `Slancio ${slancioRem} ($1):`);
    res = res.replace(/\bSlancio\s+e\s+volo\s*:/gi, `Slancio ${slancioRem} & Volo *(scavalca pedine e ostacoli)*:`);
    res = res.replace(/\bSlancio\s*:(?!\s*\*)/gi, `Slancio ${slancioRem}:`);
    res = res.replace(/\(\s*1\/1\s+Slancio\s*\)/gi, `(1/1 con Slancio ${slancioRem})`);
    res = res.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*\*)/gi, `$1 Slancio ${slancioRem}`);
  }

  // 2. BALZO A L
  const balzoRem = KEYWORD_REMINDERS.balzo;
  if (!res.includes('traiettoria a L')) {
    res = res.replace(/\bBalzo a L\s*:(?!\s*\*)/gi, `Balzo a L ${balzoRem}:`);
    res = res.replace(/\bBalzo a L\s*&(?!\s*\*)/gi, `Balzo a L ${balzoRem} &`);
    res = res.replace(/\bcon\s+Balzo a L\b(?!\s*\*)/gi, `con Balzo a L ${balzoRem}`);
    res = res.replace(/;\s*Balzo a L\b(?!\s*\*)/gi, `; Balzo a L ${balzoRem}`);
  }

  // 3. ALLUNGO
  const allungoRem = KEYWORD_REMINDERS.allungo;
  if (!res.includes('2 caselle in linea retta senza')) {
    res = res.replace(/\bAllungo\s*:(?!\s*\*)/gi, `Allungo ${allungoRem}:`);
    res = res.replace(/\bAllungo\s*&(?!\s*\*)/gi, `Allungo ${allungoRem} &`);
    res = res.replace(/\bAllungo\s+economico\s*:/gi, `Allungo ${allungoRem}:`);
  }

  // 4. FLANKING
  const flankingRem = KEYWORD_REMINDERS.flanking;
  if (!res.includes('bersaglio è ingaggiato anche')) {
    res = res.replace(/\bFlanking\s*:(?!\s*\*)/gi, `Flanking ${flankingRem}:`);
    res = res.replace(/\bFlanking\s*(?!\s*\*|\s*<)(?=\s*[.,;:]|\s+infligge|\s*\(accerchiamento\))/gi, `Flanking ${flankingRem}`);
  }

  // 5. PRESIDIO
  const presidioRem = KEYWORD_REMINDERS.presidio;
  if (!res.includes('non compie attacchi attivi')) {
    res = res.replace(/\bPresidio(\s+solido)?\s*:(?!\s*\*)/gi, `Presidio ${presidioRem}:`);
  }

  // 6. SFONDAMENTO
  const sfondamentoRem = KEYWORD_REMINDERS.sfondamento;
  if (!res.includes('danni massicci ad Altari')) {
    res = res.replace(/\bSfondamento(\s+devastante)?\s*:(?!\s*\*)/gi, `Sfondamento ${sfondamentoRem}:`);
  }

  // 7. INAMOVIBILE / MASSICCIO
  const inamovibileRem = KEYWORD_REMINDERS.inamovibile;
  if (!res.includes('immune a spinte, urti')) {
    res = res.replace(/\bInamovibile\s*:(?!\s*\*)/gi, `Inamovibile ${inamovibileRem}:`);
  }
  const massiccioRem = KEYWORD_REMINDERS.massiccio;
  if (!res.includes('immune a spinte e urti')) {
    res = res.replace(/\bMassiccio\s*:(?!\s*\*)/gi, `Massiccio ${massiccioRem}:`);
  }

  // 8. TRAVOLGERE
  const travolgereRem = KEYWORD_REMINDERS.travolgere;
  if (!res.includes('spinge indietro il difensore')) {
    res = res.replace(/\bTravolgere\s*:(?!\s*\*)/gi, `Travolgere ${travolgereRem}:`);
  }

  // 9. INTERPOSIZIONE
  const interposizioneRem = KEYWORD_REMINDERS.interposizione;
  if (!res.includes('deviano su questa unità')) {
    res = res.replace(/\bInterposizione\s*:(?!\s*\*)/gi, `Interposizione ${interposizioneRem}:`);
  }

  return res;
}

// Function to update a cards file (cards_alpha.js or cards_beta.js)
function updateCardsFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match `desc: "..."` or `desc: '...'`
  const updated = content.replace(/desc:\s*("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, (match, p1) => {
    const quote = p1[0];
    const rawVal = p1.slice(1, -1);
    const unescaped = quote === '"' ? rawVal.replace(/\\"/g, '"') : rawVal.replace(/\\'/g, "'");
    const formatted = formatRawDesc(unescaped);
    const reEscaped = quote === '"' ? formatted.replace(/"/g, '\\"') : formatted.replace(/'/g, "\\'");
    return `desc: ${quote}${reEscaped}${quote}`;
  });

  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateCardsFile('cards_alpha.js');
updateCardsFile('cards_beta.js');
