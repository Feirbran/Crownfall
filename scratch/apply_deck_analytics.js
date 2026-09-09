const fs = require('fs');

const analyticsCss = `
    /* --- TRAY DECK ANALYTICS, MANA CURVE & ARCHETYPES --- */
    .tray-analytics-box {
      background: #0d1017;
      border-bottom: 1px solid var(--border-frame);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex-shrink: 0;
    }
    .tray-type-counters {
      display: flex;
      justify-content: space-between;
      gap: 4px;
    }
    .ttc-pill {
      background: #141724;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      padding: 3px 6px;
      font-size: 0.66rem;
      color: #cfd4e8;
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      justify-content: center;
      white-space: nowrap;
    }
    .ttc-pill strong {
      color: #fff;
      font-size: 0.72rem;
      font-weight: 800;
    }
    .ttc-pill.altar strong { color: var(--gold-primary); }
    .ttc-pill.unit strong { color: #9ec5fe; }
    .ttc-pill.spell strong { color: #d8b4fe; }

    /* MANA CURVE MINI HISTOGRAM */
    .tray-mana-curve-wrap {
      background: #11141e;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      padding: 4px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .tmc-header {
      font-size: 0.60rem;
      font-weight: 800;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tmc-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 4px;
      height: 38px;
      padding-top: 2px;
    }
    .tmc-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
      cursor: default;
    }
    .tmc-bar-wrap {
      width: 100%;
      height: 24px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .tmc-bar {
      width: 80%;
      background: linear-gradient(180deg, var(--mana-cyan) 0%, rgba(0, 229, 255, 0.35) 100%);
      border-radius: 2px 2px 0 0;
      min-height: 2px;
      transition: height 0.2s ease;
    }
    .tmc-count {
      font-size: 0.56rem;
      font-weight: 900;
      color: #fff;
      line-height: 1;
      margin-bottom: 2px;
    }
    .tmc-label {
      font-size: 0.58rem;
      font-weight: 700;
      color: #8b93b0;
      line-height: 1;
      margin-top: 2px;
    }

    /* ARCHETYPES WRAP */
    .tray-archetypes-wrap {
      background: #11141e;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 4px;
      padding: 4px 8px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .arch-chip {
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.25);
      color: #f1f2f6;
      font-size: 0.60rem;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      white-space: nowrap;
    }
    .arch-chip strong {
      color: var(--gold-primary);
    }
`;

const analyticsHtml = `
          <!-- BOX ANALISI MAZZO: CONTATORI TIPI, CURVA DI MANA & ARCHETIPI -->
          <div class="tray-analytics-box" id="tray-analytics-box">
            <!-- Ripartizione Tipi -->
            <div class="tray-type-counters">
              <span class="ttc-pill altar" title="Altari e Strutture nel Mazzo"><span class="ttc-icon">🏛️</span> <strong id="ttc-altari-count">0</strong> Altari</span>
              <span class="ttc-pill unit" title="Creature e Miniature nel Mazzo"><span class="ttc-icon">⚔️</span> <strong id="ttc-creature-count">0</strong> Creature</span>
              <span class="ttc-pill spell" title="Sortilegi e Reazioni nel Mazzo"><span class="ttc-icon">✨</span> <strong id="ttc-sortilegi-count">0</strong> Magie</span>
            </div>

            <!-- Curva di Mana -->
            <div class="tray-mana-curve-wrap">
              <div class="tmc-header">
                <span>Curva di Mana 💧</span>
                <span id="tmc-cost-avg" style="color: #a4b0be; font-size: 0.58rem;">Medio: 0.0💧</span>
              </div>
              <div class="tmc-chart" id="tmc-chart">
                <div class="tmc-col" id="tmc-col-0">
                  <span class="tmc-count" id="tmc-count-0">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-0"></div></div>
                  <span class="tmc-label">0</span>
                </div>
                <div class="tmc-col" id="tmc-col-1">
                  <span class="tmc-count" id="tmc-count-1">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-1"></div></div>
                  <span class="tmc-label">1</span>
                </div>
                <div class="tmc-col" id="tmc-col-2">
                  <span class="tmc-count" id="tmc-count-2">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-2"></div></div>
                  <span class="tmc-label">2</span>
                </div>
                <div class="tmc-col" id="tmc-col-3">
                  <span class="tmc-count" id="tmc-count-3">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-3"></div></div>
                  <span class="tmc-label">3</span>
                </div>
                <div class="tmc-col" id="tmc-col-4">
                  <span class="tmc-count" id="tmc-count-4">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-4"></div></div>
                  <span class="tmc-label">4</span>
                </div>
                <div class="tmc-col" id="tmc-col-5">
                  <span class="tmc-count" id="tmc-count-5">0</span>
                  <div class="tmc-bar-wrap"><div class="tmc-bar" id="tmc-bar-5"></div></div>
                  <span class="tmc-label">5+</span>
                </div>
              </div>
            </div>

            <!-- Archetipi e Sinergie -->
            <div class="tray-archetypes-wrap">
              <div class="tmc-header">
                <span>🎯 Sinergie & Archetipi</span>
              </div>
              <div id="tray-archetypes-list" style="display: flex; flex-wrap: wrap; gap: 4px; min-height: 18px;"></div>
            </div>
          </div>
`;

function applyAnalyticsFeature(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\r?\n/g, '\n');

  // 1. Add CSS before </style>
  const sStyle = content.indexOf('</style>');
  if (sStyle === -1) throw new Error('Could not find </style> in ' + filePath);
  content = content.substring(0, sStyle) + analyticsCss + '\n  ' + content.substring(sStyle);

  // 2. Add analyticsHtml inside <aside class="arena-deck-tray"> between </div> of tray-header and <div class="tray-cards-stack"
  const oldAsideSplit = `          </div>

          <div class="tray-cards-stack" id="tray-cards-stack"></div>`;

  const newAsideSplit = `          </div>\n` + analyticsHtml.trim() + `\n\n          <div class="tray-cards-stack" id="tray-cards-stack"></div>`;

  if (!content.includes(oldAsideSplit)) throw new Error('Could not find oldAsideSplit in ' + filePath);
  content = content.replace(oldAsideSplit, newAsideSplit);

  // 3. Update renderTray to attach hover cards and calculate type counts, mana curve, archetypes
  const oldRenderTray = `    function renderTray() {
      const deck = userState.decks[userState.activeDeckName];
      document.getElementById('tray-deck-name').textContent = userState.activeDeckName;
      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';

      // Controllo carte non conformi
      const illegalCards = deck.cards.filter(cId => {
        const c = CARDS_DB[cId];
        return c && c.faction !== commFaction && c.faction !== 'Neutral';
      });
      const hasIllegal = illegalCards.length > 0;
      const isValidLength = deck.cards.length >= 30 && deck.cards.length <= 40;
      const isValid = isValidLength && !hasIllegal;

      const count = document.getElementById('tray-counter-badge');
      if (hasIllegal) {
        count.textContent = \`\${deck.cards.length}/40 (Fazione Errata!)\`;
        count.className = 'tray-card-counter invalid';
      } else {
        count.textContent = \`\${deck.cards.length}/40 (min 30)\`;
        count.className = \`tray-card-counter \${isValid ? 'valid' : 'invalid'}\`;
      }
      document.getElementById('tray-comm-name').textContent = \`\${comm.name} (\${commFaction})\`;

      const stack = document.getElementById('tray-cards-stack');
      stack.innerHTML = '';
      const grouped = {};
      deck.cards.forEach(id => grouped[id] = (grouped[id] || 0) + 1);

      Object.keys(grouped).forEach(id => {
        const card = CARDS_DB[id] || { name: id, faction: 'Neutral' };
        const isCardIllegal = card.faction !== commFaction && card.faction !== 'Neutral';
        const row = document.createElement('div');
        row.className = 'arena-tray-row';
        if (isCardIllegal) {
          row.style.background = 'rgba(199, 0, 57, 0.2)';
          row.style.border = '1px solid #ff7675';
        }
        row.innerHTML = \`
          <div class="tray-row-left">
            <span class="tray-qty-pill">\${grouped[id]}x</span>
            <span class="tray-card-name" title="\${card.name}">\${card.name}</span>
            \${isCardIllegal ? \`<span style="color:#ff7675; font-size:0.6rem; font-weight:800; margin-left:4px;">[NON CONFORME]</span>\` : ''}
          </div>
          <button class="btn-tray-minus" onclick="removeCard('\${id}')">−</button>
        \`;
        stack.appendChild(row);
      });
    }`;

  const newRenderTray = `    function renderTray() {
      const deck = userState.decks[userState.activeDeckName];
      document.getElementById('tray-deck-name').textContent = userState.activeDeckName;
      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';

      // Controllo carte non conformi
      const illegalCards = deck.cards.filter(cId => {
        const c = CARDS_DB[cId];
        return c && c.faction !== commFaction && c.faction !== 'Neutral';
      });
      const hasIllegal = illegalCards.length > 0;
      const isValidLength = deck.cards.length >= 30 && deck.cards.length <= 40;
      const isValid = isValidLength && !hasIllegal;

      const count = document.getElementById('tray-counter-badge');
      if (hasIllegal) {
        count.textContent = \`\${deck.cards.length}/40 (Fazione Errata!)\`;
        count.className = 'tray-card-counter invalid';
      } else {
        count.textContent = \`\${deck.cards.length}/40 (min 30)\`;
        count.className = \`tray-card-counter \${isValid ? 'valid' : 'invalid'}\`;
      }
      document.getElementById('tray-comm-name').textContent = \`\${comm.name} (\${commFaction})\`;

      // 1. Calcolo Analisi Mazzo: Tipi, Curva di Mana e Archetipi/Sinergie
      let altarCount = 0, unitCount = 0, spellCount = 0;
      let totalCostSum = 0;
      const manaCurve = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const archetypeScores = {
        slancio: { label: 'Slancio', icon: '🏃', count: 0 },
        balzo: { label: 'Balzo a L', icon: '♞', count: 0 },
        difesa: { label: 'Bastione/Armatura', icon: '🛡️', count: 0 },
        gittata: { label: 'Gittata/Allungo', icon: '🏹', count: 0 },
        urto: { label: 'Spinta & Urto', icon: '💥', count: 0 },
        sangue: { label: 'Sangue & Sacrificio', icon: '🩸', count: 0 },
        altari: { label: 'Dominio Altari', icon: '🏛️', count: 0 }
      };

      deck.cards.forEach(id => {
        const c = CARDS_DB[id];
        if (!c) return;
        if (c.type === 'altar') {
          altarCount++;
          archetypeScores.altari.count++;
        } else if (c.type === 'unit') {
          unitCount++;
        } else if (c.type === 'spell' || c.type === 'reaction') {
          spellCount++;
        }

        const cost = Math.min(5, Math.max(0, c.cost !== undefined ? c.cost : 0));
        manaCurve[cost]++;
        totalCostSum += (c.cost || 0);

        const desc = c.desc || '';
        if (c.slancio || desc.includes('Slancio')) archetypeScores.slancio.count++;
        if (c.move === 'knight' || desc.includes('Balzo a L')) archetypeScores.balzo.count++;
        if (desc.includes('Presidio') || desc.includes('Armatura') || desc.includes('Muro') || desc.includes('Copertura')) archetypeScores.difesa.count++;
        if ((c.gittata && c.gittata > 1) || desc.includes('Allungo') || desc.includes('Gittata') || desc.includes('Tiro')) archetypeScores.gittata.count++;
        if (desc.includes('spinge') || desc.includes('spinta') || desc.includes('urto') || desc.includes('Sfondamento') || desc.includes('Frantuma') || desc.includes('Voragine')) archetypeScores.urto.count++;
        if ((c.bloodCost && c.bloodCost > 0) || desc.includes('Sangue') || desc.includes('Cimitero') || desc.includes('sacrifica')) archetypeScores.sangue.count++;
      });

      // Aggiorna contatori per tipo
      const elAltari = document.getElementById('ttc-altari-count'); if (elAltari) elAltari.textContent = altarCount;
      const elCreature = document.getElementById('ttc-creature-count'); if (elCreature) elCreature.textContent = unitCount;
      const elSortilegi = document.getElementById('ttc-sortilegi-count'); if (elSortilegi) elSortilegi.textContent = spellCount;

      // Aggiorna istogramma Curva di Mana
      const maxInCurve = Math.max(1, ...Object.values(manaCurve));
      for (let c = 0; c <= 5; c++) {
        const countEl = document.getElementById('tmc-count-' + c);
        const barEl = document.getElementById('tmc-bar-' + c);
        const colEl = document.getElementById('tmc-col-' + c);
        if (countEl) countEl.textContent = manaCurve[c];
        if (barEl) {
          const barHeight = manaCurve[c] > 0 ? Math.max(4, Math.round((manaCurve[c] / maxInCurve) * 22)) : 2;
          barEl.style.height = \`\${barHeight}px\`;
          barEl.style.opacity = manaCurve[c] > 0 ? '1' : '0.25';
        }
        if (colEl) colEl.title = \`Costo \${c === 5 ? '5+' : c}💧: \${manaCurve[c]} carte nel mazzo\`;
      }
      const elAvg = document.getElementById('tmc-cost-avg');
      if (elAvg) {
        const avg = deck.cards.length > 0 ? (totalCostSum / deck.cards.length).toFixed(1) : '0.0';
        elAvg.textContent = \`Medio: \${avg}💧\`;
      }

      // Aggiorna badge archetipi e sinergie
      const archListEl = document.getElementById('tray-archetypes-list');
      if (archListEl) {
        const activeArchs = Object.values(archetypeScores).filter(a => a.count > 0).sort((a, b) => b.count - a.count);
        if (activeArchs.length === 0) {
          archListEl.innerHTML = '<span style="font-size:0.6rem; color:#8b93b0; font-style:italic;">Nessuna carta ancora inserita</span>';
        } else {
          archListEl.innerHTML = activeArchs.slice(0, 4).map(a => \`
            <span class="arch-chip" title="\${a.count} carte con sinergia \${a.label}">
              <span>\${a.icon}</span> \${a.label} <strong>\${a.count}</strong>
            </span>
          \`).join('');
        }
      }

      // 2. Popolamento lista carte con ANTEPRIMA HOVER IN SOVRAIMPRESSIONE
      const stack = document.getElementById('tray-cards-stack');
      stack.innerHTML = '';
      const grouped = {};
      deck.cards.forEach(id => grouped[id] = (grouped[id] || 0) + 1);

      Object.keys(grouped).forEach(id => {
        const card = CARDS_DB[id] || { name: id, faction: 'Neutral' };
        const isCardIllegal = card.faction !== commFaction && card.faction !== 'Neutral';
        const row = document.createElement('div');
        row.className = 'arena-tray-row';
        if (isCardIllegal) {
          row.style.background = 'rgba(199, 0, 57, 0.2)';
          row.style.border = '1px solid #ff7675';
        }

        // ANTEPRIMA IN SOVRAIMPRESSIONE AL PASSAGGIO DEL MOUSE
        row.onmouseenter = (e) => showHoverCard(card, e);
        row.onmousemove = (e) => updateHoverCardPos(e);
        row.onmouseleave = () => hideHoverCard();

        const costDisplay = (card.bloodCost && card.bloodCost > 0)
          ? \`\${card.cost ? card.cost + ' ' : ''}<span style="color:#ff7675; font-size:0.65rem;">\${card.bloodCost}🩸</span>\`
          : \`<span style="color:var(--mana-cyan); font-weight:800; font-size:0.7rem;">\${card.cost !== undefined ? card.cost : 0}💧</span>\`;

        row.innerHTML = \`
          <div class="tray-row-left">
            <span style="min-width: 24px;">\${costDisplay}</span>
            <span class="tray-qty-pill">\${grouped[id]}x</span>
            <span class="tray-card-name" title="\${card.name}">\${card.name}</span>
            \${isCardIllegal ? \`<span style="color:#ff7675; font-size:0.6rem; font-weight:800; margin-left:4px;">[NON CONFORME]</span>\` : ''}
          </div>
          <button class="btn-tray-minus" onclick="event.stopPropagation(); removeCard('\${id}')" title="Rimuovi 1 copia">−</button>
        \`;
        stack.appendChild(row);
      });
    }`;

  if (!content.includes(oldRenderTray)) throw new Error('Could not find oldRenderTray in ' + filePath);
  content = content.replace(oldRenderTray, newRenderTray);

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated', filePath, 'with Deck Analytics and Hover previews.');
}

applyAnalyticsFeature('index.html');
applyAnalyticsFeature('crownfall.html');

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality index.html === crownfall.html:', f1 === f2);
console.log('File size:', f1.length);
