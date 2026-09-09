const fs = require('fs');
const evalAlpha = new Function(fs.readFileSync('cards_alpha.js', 'utf8') + '; return CARDS_ALPHA;')();
const evalBeta = new Function(fs.readFileSync('cards_beta.js', 'utf8') + '; return CARDS_BETA;')();
const all = { ...evalAlpha, ...evalBeta };

function formatDescWithReminders(desc) {
  if (!desc) return '';
  let res = desc;

  // 1. SLANCIO
  const slancioReminder = '<em class="reminder-text">*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*</em>';
  if (!res.includes('reminder-text') || !res.includes('muoversi e attaccare')) {
    // Slancio & Balzo a L:
    res = res.replace(/\bSlancio\s*&\s*Balzo a L\s*:/gi, `Slancio ${slancioReminder} & Balzo a L <em class="reminder-text">*(muove e salta oltre pedine e ostacoli con traiettoria a L)*</em>:`);
    // Slancio Diagonale: or Slancio omnidirezionale: or Slancio lineare:
    res = res.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:/gi, `Slancio ${slancioReminder} ($1):`);
    // Slancio e volo:
    res = res.replace(/\bSlancio\s+e\s+volo\s*:/gi, `Slancio ${slancioReminder} & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:`);
    // Slancio:
    res = res.replace(/\bSlancio\s*:(?!\s*<em)/gi, `Slancio ${slancioReminder}:`);
    // (1/1 Slancio)
    res = res.replace(/\(\s*1\/1\s+Slancio\s*\)/gi, `(1/1 con Slancio ${slancioReminder})`);
    // ottiene / conferendole / con Slancio
    res = res.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*<em)/gi, `$1 Slancio ${slancioReminder}`);
  }

  // 2. BALZO A L (if not already formatted)
  const balzoReminder = '<em class="reminder-text">*(muove e salta oltre pedine e ostacoli con traiettoria a L)*</em>';
  if (!res.includes(balzoReminder)) {
    res = res.replace(/\bBalzo a L\s*:(?!\s*<em)/gi, `Balzo a L ${balzoReminder}:`);
    res = res.replace(/\bBalzo a L\s*&(?!\s*<em)/gi, `Balzo a L ${balzoReminder} &`);
    res = res.replace(/\bcon\s+Balzo a L\b(?!\s*<em)/gi, `con Balzo a L ${balzoReminder}`);
  }

  // 3. ALLUNGO
  const allungoReminder = '<em class="reminder-text">*(può colpire a 2 caselle in linea retta senza subire contrattacco)*</em>';
  if (!res.includes(allungoReminder)) {
    res = res.replace(/\bAllungo\s*:(?!\s*<em)/gi, `Allungo ${allungoReminder}:`);
    res = res.replace(/\bAllungo\s*&(?!\s*<em)/gi, `Allungo ${allungoReminder} &`);
    res = res.replace(/\bAllungo\s+economico\s*:/gi, `Allungo ${allungoReminder}:`);
  }

  // 4. FLANKING / AGGIRAMENTO
  const flankingReminder = '<em class="reminder-text">*(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*</em>';
  if (!res.includes(flankingReminder)) {
    res = res.replace(/\bFlanking\s*:(?!\s*<em)/gi, `Flanking ${flankingReminder}:`);
    res = res.replace(/\bFlanking\s*(?!\s*<em)(?=\s*[.,;:]|\s+infligge|\s*\(accerchiamento\))/gi, `Flanking ${flankingReminder}`);
  }

  // 5. PRESIDIO
  const presidioReminder = '<em class="reminder-text">*(non può compiere attacchi attivi; contrattacca solo se ingaggiata in mischia)*</em>';
  if (!res.includes(presidioReminder)) {
    res = res.replace(/\bPresidio(\s+solido)?\s*:(?!\s*<em)/gi, `Presidio ${presidioReminder}:`);
  }

  // 6. SFONDAMENTO
  const sfondamentoReminder = '<em class="reminder-text">*(infligge danni massicci ad Altari e Muri nemici)*</em>';
  if (!res.includes(sfondamentoReminder)) {
    res = res.replace(/\bSfondamento(\s+devastante)?\s*:(?!\s*<em)/gi, `Sfondamento ${sfondamentoReminder}:`);
  }

  // 7. INAMOVIBILE / MASSICCIO
  const inamovibileReminder = '<em class="reminder-text">*(immune a spinte, urti e Voragini)*</em>';
  if (!res.includes(inamovibileReminder)) {
    res = res.replace(/\bInamovibile\s*:(?!\s*<em)/gi, `Inamovibile ${inamovibileReminder}:`);
    res = res.replace(/\bMassiccio\s*:(?!\s*<em)/gi, `Massiccio <em class="reminder-text">*(immune a spinte e urti)*</em>:`);
  }

  // 8. TRAVOLGERE
  const travolgereReminder = '<em class="reminder-text">*(spinge indietro il difensore e avanza occupando la sua casella)*</em>';
  if (!res.includes(travolgereReminder)) {
    res = res.replace(/\bTravolgere\s*:(?!\s*<em)/gi, `Travolgere ${travolgereReminder}:`);
  }

  // 9. INTERPOSIZIONE
  const interposizioneReminder = '<em class="reminder-text">*(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*</em>';
  if (!res.includes(interposizioneReminder)) {
    res = res.replace(/\bInterposizione\s*:(?!\s*<em)/gi, `Interposizione ${interposizioneReminder}:`);
  }

  return res;
}

// Test on ALL 25 slancio cards
console.log('=== ALL 25 SLANCIO CARDS ===');
Object.entries(all).forEach(([name, c]) => {
  if ((c.desc && c.desc.toLowerCase().includes('slancio')) || c.slancio) {
    console.log(`[${name}]`);
    console.log('  ' + formatDescWithReminders(c.desc));
  }
});
