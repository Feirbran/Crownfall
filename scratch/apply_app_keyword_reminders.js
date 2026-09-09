const fs = require('fs');

function applyToApp(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const wasCRLF = content.includes('\r\n');
  let c = content.replace(/\r\n/g, '\n');

  // 1. Add CSS for .reminder-text and em in text boxes
  const oldCssAnchor = `.mtg-text-box { flex: 1; padding: 5px 6px 18px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; position: relative; }`;
  const newCssAnchor = `.mtg-text-box { flex: 1; padding: 5px 6px 18px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; position: relative; }
    .mtg-text-box em, .hcp-desc em, .reminder-text { font-style: italic; color: #9bb1cf; font-weight: normal; }`;

  if (c.includes(oldCssAnchor) && !c.includes('.reminder-text')) {
    c = c.replace(oldCssAnchor, newCssAnchor);
    console.log('Added CSS for reminder-text in', filePath);
  }

  // Update .hcp-desc to have overflow-y: auto and white-space: pre-line
  const oldHcpDesc = `.hcp-desc { flex: 1; padding: 8px 10px; font-size: 0.74rem; color: #cfd4e8; line-height: 1.35; background: #0f1118; }`;
  const newHcpDesc = `.hcp-desc { flex: 1; padding: 8px 10px; font-size: 0.74rem; color: #cfd4e8; line-height: 1.35; background: #0f1118; overflow-y: auto; white-space: pre-line; }`;
  if (c.includes(oldHcpDesc)) {
    c = c.replace(oldHcpDesc, newHcpDesc);
    console.log('Updated .hcp-desc CSS in', filePath);
  }

  // 2. Add formatCardDesc function after getCardCostPipsHtml
  const oldCostFunc = `    // Helper per renderizzare pips di costo (Mana blu + Sangue rosso)
    function getCardCostPipsHtml(card) {
      let html = '';
      if (card.cost > 0 || (!card.bloodCost && card.cost === 0)) {
        html += \`<span class="mtg-cost-pip mana">\${card.cost !== undefined ? card.cost : 0}</span>\`;
      }
      if (card.bloodCost && card.bloodCost > 0) {
        html += \`<span class="mtg-cost-pip blood">\${card.bloodCost}🩸</span>\`;
      }
      return \`<div class="mtg-cost-pips-wrap">\${html}</div>\`;
    }`;

  const newCostAndFormatFunc = `    // Helper per renderizzare pips di costo (Mana blu + Sangue rosso)
    function getCardCostPipsHtml(card) {
      let html = '';
      if (card.cost > 0 || (!card.bloodCost && card.cost === 0)) {
        html += \`<span class="mtg-cost-pip mana">\${card.cost !== undefined ? card.cost : 0}</span>\`;
      }
      if (card.bloodCost && card.bloodCost > 0) {
        html += \`<span class="mtg-cost-pip blood">\${card.bloodCost}🩸</span>\`;
      }
      return \`<div class="mtg-cost-pips-wrap">\${html}</div>\`;
    }

    // Helper per formattare descrizioni con testo esplicativo in corsivo per parole chiave (es. Slancio, Balzo a L) stile Magic
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
      res = res.replace(/\\*\\(([^)]+)\\)\\*/g, '<em class="reminder-text">*($1)*</em>');

      // 2. Se una parola chiave è presente ma priva di testo esplicativo, lo inserisce automaticamente
      // SLANCIO
      if (!res.includes('muoversi e attaccare')) {
        const slancioRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.slancio}</em>\`;
        res = res.replace(/\\bSlancio\\s*&\\s*Balzo a L\\s*:/gi, \`Slancio \${slancioRem} & Balzo a L <em class="reminder-text">\${KEYWORD_REMINDERS_MAP.balzo}</em>:\`);
        res = res.replace(/\\bSlancio\\s+(diagonale|omnidirezionale|lineare)\\s*:/gi, \`Slancio \${slancioRem} ($1):\`);
        res = res.replace(/\\bSlancio\\s+e\\s+volo\\s*:/gi, \`Slancio \${slancioRem} & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:\`);
        res = res.replace(/\\bSlancio\\s*:(?!\\s*<em)/gi, \`Slancio \${slancioRem}:\`);
        res = res.replace(/\\(\\s*1\\/1\\s+Slancio\\s*\\)/gi, \`(1/1 con Slancio \${slancioRem})\`);
        res = res.replace(/\\b(ottiene|conferendole|con|parola chiave)\\s+Slancio\\b(?!\\s*<em)/gi, \`$1 Slancio \${slancioRem}\`);
      }

      // BALZO A L
      if (!res.includes('traiettoria a L')) {
        const balzoRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.balzo}</em>\`;
        res = res.replace(/\\bBalzo a L\\s*:(?!\\s*<em)/gi, \`Balzo a L \${balzoRem}:\`);
        res = res.replace(/\\bBalzo a L\\s*&(?!\\s*<em)/gi, \`Balzo a L \${balzoRem} &\`);
        res = res.replace(/\\bcon\\s+Balzo a L\\b(?!\\s*<em)/gi, \`con Balzo a L \${balzoRem}\`);
        res = res.replace(/;\\s*Balzo a L\\b(?!\\s*<em)/gi, \`; Balzo a L \${balzoRem}\`);
      }

      // ALLUNGO
      if (!res.includes('2 caselle in linea retta senza')) {
        const allungoRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.allungo}</em>\`;
        res = res.replace(/\\bAllungo\\s*:(?!\\s*<em)/gi, \`Allungo \${allungoRem}:\`);
        res = res.replace(/\\bAllungo\\s*&(?!\\s*<em)/gi, \`Allungo \${allungoRem} &\`);
        res = res.replace(/\\bAllungo\\s+economico\\s*:/gi, \`Allungo \${allungoRem}:\`);
      }

      // FLANKING
      if (!res.includes('bersaglio è ingaggiato anche')) {
        const flankingRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.flanking}</em>\`;
        res = res.replace(/\\bFlanking\\s*:(?!\\s*<em)/gi, \`Flanking \${flankingRem}:\`);
        res = res.replace(/\\bFlanking\\s*(?!\\s*<em)(?=\\s*[.,;:]|\\s+infligge|\\s*\\(accerchiamento\\))/gi, \`Flanking \${flankingRem}\`);
      }

      // PRESIDIO
      if (!res.includes('non compie attacchi attivi')) {
        const presidioRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.presidio}</em>\`;
        res = res.replace(/\\bPresidio(\\s+solido)?\\s*:(?!\\s*<em)/gi, \`Presidio \${presidioRem}:\`);
      }

      // SFONDAMENTO
      if (!res.includes('danni massicci ad Altari')) {
        const sfondamentoRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.sfondamento}</em>\`;
        res = res.replace(/\\bSfondamento(\\s+devastante)?\\s*:(?!\\s*<em)/gi, \`Sfondamento \${sfondamentoRem}:\`);
      }

      // INAMOVIBILE / MASSICCIO
      if (!res.includes('immune a spinte, urti')) {
        const inamovibileRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.inamovibile}</em>\`;
        res = res.replace(/\\bInamovibile\\s*:(?!\\s*<em)/gi, \`Inamovibile \${inamovibileRem}:\`);
      }
      if (!res.includes('immune a spinte e urti')) {
        const massiccioRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.massiccio}</em>\`;
        res = res.replace(/\\bMassiccio\\s*:(?!\\s*<em)/gi, \`Massiccio \${massiccioRem}:\`);
      }

      // TRAVOLGERE
      if (!res.includes('spinge indietro il difensore')) {
        const travolgereRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.travolgere}</em>\`;
        res = res.replace(/\\bTravolgere\\s*:(?!\\s*<em)/gi, \`Travolgere \${travolgereRem}:\`);
      }

      // INTERPOSIZIONE
      if (!res.includes('deviano su questa unità')) {
        const interposizioneRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.interposizione}</em>\`;
        res = res.replace(/\\bInterposizione\\s*:(?!\\s*<em)/gi, \`Interposizione \${interposizioneRem}:\`);
      }

      return res;
    }`;

  if (c.includes(oldCostFunc)) {
    c = c.replace(oldCostFunc, newCostAndFormatFunc);
    console.log('Added formatCardDesc function in', filePath);
  }

  // 3. Apply formatCardDesc in CARDS_DB adapter
  c = c.replace(
    `desc: raw.desc,`,
    `desc: formatCardDesc(raw.desc),`
  );

  // 4. Update showHoverCard to use innerHTML
  c = c.replace(
    `document.getElementById('hcp-desc').textContent = card.desc || card.riteDesc || '';`,
    `document.getElementById('hcp-desc').innerHTML = formatCardDesc(card.desc || card.riteDesc || '');`
  );

  // 5. Update animateCardPlayed to use innerHTML
  c = c.replace(
    `document.getElementById('sc-desc').textContent = card.desc || '';`,
    `document.getElementById('sc-desc').innerHTML = formatCardDesc(card.desc || '');`
  );

  const finalContent = wasCRLF ? c.replace(/\n/g, '\r\n') : c;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log('Successfully updated', filePath);
}

applyToApp('crownfall.html');
applyToApp('index.html');
