const fs = require('fs');

function updateHtml(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update formatCardDesc
  const oldFormatCardDescStart = '    function formatCardDesc(desc) {';
  const oldFormatCardDescEnd = '    const COMMANDER_SET_MAPPING = {';

  const newFormatCardDesc = `    function formatCardDesc(desc) {
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
        res = res.replace(/\\bBalzo a L\\s*(&|e)\\s*(?!\\s*<em)/gi, \`Balzo a L \${balzoRem} $1 \`);
        res = res.replace(/\\bBalzo a L\\s*([;.,])(?!\\s*<em)/gi, \`Balzo a L \${balzoRem}$1\`);
        res = res.replace(/\\b(con|a|da movimenti a)\\s+Balzo a L\\b(?!\\s*<em)/gi, \`$1 Balzo a L \${balzoRem}\`);
        res = res.replace(/\\bBalzo a L\\b(?!\\s*<em)/gi, \`Balzo a L \${balzoRem}\`);
      }

      // ALLUNGO
      if (!res.includes('2 caselle in linea retta senza')) {
        const allungoRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.allungo}</em>\`;
        res = res.replace(/\\bAllungo\\s*:(?!\\s*<em)/gi, \`Allungo \${allungoRem}:\`);
        res = res.replace(/\\bAllungo\\s*&(?!\\s*<em)/gi, \`Allungo \${allungoRem} &\`);
        res = res.replace(/\\bAllungo\\s+economico\\s*:(?!\\s*<em)/gi, \`Allungo \${allungoRem}:\`);
        res = res.replace(/\\bAllungo\\s*\\(\\s*Gittata\\s+2\\s*\\)\\s*:(?!\\s*<em)/gi, \`Allungo \${allungoRem} (Gittata 2):\`);
        res = res.replace(/\\bAllungo\\b(?!\\s*<em)/gi, \`Allungo \${allungoRem}\`);
      }

      // FLANKING
      if (!res.includes('bersaglio è ingaggiato anche')) {
        const flankingRem = \`<em class="reminder-text">\${KEYWORD_REMINDERS_MAP.flanking}</em>\`;
        res = res.replace(/\\bFlanking\\s*:(?!\\s*<em)/gi, \`Flanking \${flankingRem}:\`);
        res = res.replace(/\\b\\(?\\s*Flanking\\s*\\)?(?!\\s*<em)/gi, \`Flanking \${flankingRem}\`);
        res = res.replace(/\\bFlanking\\b(?!\\s*<em)/gi, \`Flanking \${flankingRem}\`);
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
    }

    const COMMANDER_SET_MAPPING = {`;

  const sIdx = content.indexOf(oldFormatCardDescStart);
  const eIdx = content.indexOf(oldFormatCardDescEnd);
  if (sIdx === -1 || eIdx === -1) {
    throw new Error('Could not find formatCardDesc in ' + filePath);
  }
  content = content.substring(0, sIdx) + newFormatCardDesc + content.substring(eIdx + oldFormatCardDescEnd.length);

  // 2. Update COMMANDERS riteDesc
  content = content.replace(
    'riteDesc: raw.desc,\n        desc: formatCardDesc(raw.desc),',
    'riteDesc: formatCardDesc(raw.desc),\n        desc: formatCardDesc(raw.desc),'
  );

  // 3. Update CARDS_DB desc
  content = content.replace(
    'isCenterOnly: !!raw.isCenterOnly,\n        desc: raw.desc,',
    'isCenterOnly: !!raw.isCenterOnly,\n        desc: formatCardDesc(raw.desc),'
  );

  // 4. Update comm.riteDesc in renderDeckBuilder
  content = content.replace(
    '<div class="mtg-text-box">${comm.riteDesc}</div>',
    '<div class="mtg-text-box">${comm.desc}</div>'
  );

  // 5. Update wonComm.riteDesc in reward card
  content = content.replace(
    '<div class="mtg-text-box">${wonComm.riteDesc}</div>',
    '<div class="mtg-text-box">${wonComm.desc}</div>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated', filePath);
}

updateHtml('index.html');
updateHtml('crownfall.html');

// Verify strict equality
const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('index.html and crownfall.html are identical:', f1 === f2);
