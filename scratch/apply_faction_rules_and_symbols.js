const fs = require('fs');

function updateCardsSymbols(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  let modifiedCount = 0;

  const newLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('"')) return line;

    let updatedLine = line;

    // 1. [1 Azione] -> [1⚡]
    if (updatedLine.includes('[1 Azione]')) {
      updatedLine = updatedLine.replace(/\[1 Azione\]/g, '[1⚡]');
      modifiedCount++;
    }

    // 2. consuma 1A -> consuma 1⚡
    if (/consuma\s+(\d+)A\b/i.test(updatedLine)) {
      updatedLine = updatedLine.replace(/consuma\s+(\d+)A\b/gi, 'consuma $1⚡');
      modifiedCount++;
    }

    // 3. consuma 3S -> consuma 3🩸
    if (/consuma\s+(\d+)S\b/i.test(updatedLine)) {
      updatedLine = updatedLine.replace(/consuma\s+(\d+)S\b/gi, 'consuma $1🩸');
      modifiedCount++;
    }

    // 4. (3S, 1Az) or (4S, 1Az) -> (3🩸, 1⚡) or (4🩸, 1⚡)
    if (/\((\d+)S,\s*(\d+)Az\)/i.test(updatedLine)) {
      updatedLine = updatedLine.replace(/\((\d+)S,\s*(\d+)Az\)/gi, '($1🩸, $2⚡)');
      modifiedCount++;
    }

    // 5. (cost 0 + 2S) -> (cost 0 + 2🩸)
    if (/\+(\s*)(\d+)S\b/.test(updatedLine)) {
      updatedLine = updatedLine.replace(/\+(\s*)(\d+)S\b/g, '+$1$2🩸');
      modifiedCount++;
    }

    return updatedLine;
  });

  fs.writeFileSync(filePath, newLines.join('\r\n'), 'utf8');
  console.log(`Updated symbols in ${filePath} (${modifiedCount} adjustments).`);
}

// 1. Update cards_alpha.js and cards_beta.js
updateCardsSymbols('cards_alpha.js');
updateCardsSymbols('cards_beta.js');

// 2. Update index.html and crownfall.html
function updateHtmlFiles() {
  ['index.html', 'crownfall.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\r?\n/g, '\n');

    // A. Update COMMANDERS_POOL Rito notations to 🩸 and ⚡
    const oldPool = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 3, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (3S, 1Az): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 3, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (3S, 1Az): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 4, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (4S, 1Az): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 4, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (4S, 1Az): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 3, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (3S, 1Az): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 3, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (3S, 1Az): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 4, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (4S, 1Az): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 4, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (4S, 1Az): Blocca abilità [1 Azione] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 3, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (3S, 1Az): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 3, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (3S, 1Az): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

    const newPool = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 3, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (3🩸, 1⚡): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 3, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (3🩸, 1⚡): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 4, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (4🩸, 1⚡): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 4, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (4🩸, 1⚡): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 3, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (3🩸, 1⚡): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 3, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (3🩸, 1⚡): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 4, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (4🩸, 1⚡): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 4, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (4🩸, 1⚡): Blocca abilità [1⚡] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 3, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (3🩸, 1⚡): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 3, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (3🩸, 1⚡): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

    if (!content.includes(oldPool)) throw new Error('Could not find oldPool in ' + file);
    content = content.replace(oldPool, newPool);

    // B. Update formatCardDesc to automatically format ⚡ and 🩸
    const oldFormatDesc = `function formatCardDesc(desc) {
      if (!desc) return '';
      let res = desc;

      // 1. Converte eventuali markdown *(...)* in <em class="reminder-text">*(...)*</em>
      res = res.replace(/\\*\\(([^)]+)\\)\\*/g, '<em class="reminder-text">*($1)*</em>');`;

    const newFormatDesc = `function formatCardDesc(desc) {
      if (!desc) return '';
      let res = desc;

      // Converte notazioni di Azione e Sangue in emoji ⚡ e 🩸
      res = res.replace(/\\[1\\s*Azione\\]/gi, '[1⚡]');
      res = res.replace(/\\bconsuma\\s+(\\d+)\\s*A\\b/gi, 'consuma $1⚡');
      res = res.replace(/\\bconsuma\\s+(\\d+)\\s*S\\b/gi, 'consuma $1🩸');
      res = res.replace(/\\b(\\d+)S,\\s*(\\d+)Az\\b/gi, '$1🩸, $2⚡');

      // 1. Converte eventuali markdown *(...)* in <em class="reminder-text">*(...)*</em>
      res = res.replace(/\\*\\(([^)]+)\\)\\*/g, '<em class="reminder-text">*($1)*</em>');`;

    if (!content.includes(oldFormatDesc)) throw new Error('Could not find oldFormatDesc in ' + file);
    content = content.replace(oldFormatDesc, newFormatDesc);

    // C. Update renderDeckBuilder() with Faction Filtering, Active Banner, and Leader Switch Check
    const oldRenderDeckBuilderCards = `        document.getElementById('arena-step-banner').innerHTML = \`
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span>Comandante Leader: <strong>\${COMMANDERS[deck.commanderId].name}</strong> (\${COMMANDERS[deck.commanderId].glyph} PV: \${COMMANDERS[deck.commanderId].hp}, ATT: \${COMMANDERS[deck.commanderId].att})</span>
            <button class="btn" style="padding: 3px 10px; font-size: 0.72rem; color: var(--gold-primary); border-color: var(--border-gold);" onclick="startCommanderSelectionMode()">👑 Cambia Comandante</button>
          </div>
        \`;

        Object.values(CARDS_DB).forEach(card => {
          if (deckFilters.type !== 'all') {
            if (deckFilters.type === 'spell') {
              if (card.type !== 'spell' && card.type !== 'reaction') return;
            } else if (card.type !== deckFilters.type) {
              return;
            }
          }
          if (deckFilters.mana !== 'all') {
            if (deckFilters.mana === '4' && card.cost < 4) return;
            if (deckFilters.mana !== '4' && card.cost !== parseInt(deckFilters.mana)) return;
          }
          if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;
          if (deckFilters.set && deckFilters.set !== 'all' && card.set !== deckFilters.set) return;`;

    const newRenderDeckBuilderCards = `        const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
        const commFaction = comm ? comm.faction : 'Neutral';
        const factionNames = {
          Ferro: 'Bastione di Ferro 🛡️',
          Ceneri: 'Ceneri del Giudizio 💀',
          Marea: 'Marea Abissale 🌊',
          Silenzio: 'Silenzio Eterno ⚖️',
          Forgia: 'Forgia del Magma 🌋'
        };
        const fName = factionNames[commFaction] || commFaction;

        document.getElementById('arena-step-banner').innerHTML = \`
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span>Comandante: <strong>\${comm.name}</strong> (\${comm.glyph} PV: \${comm.hp}, ATT: \${comm.att})</span>
              <span style="background: rgba(212, 175, 55, 0.15); border: 1px solid var(--border-gold); padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; color: var(--gold-primary);">
                Fazione: \${fName.toUpperCase()} + NEUTRALE ⚔️
              </span>
            </div>
            <button class="btn" style="padding: 3px 10px; font-size: 0.72rem; color: var(--gold-primary); border-color: var(--border-gold);" onclick="startCommanderSelectionMode()">👑 Cambia Comandante</button>
          </div>
        \`;

        Object.values(CARDS_DB).forEach(card => {
          // FILTRO FAZIONE RIGIDO: mostra solo carte della Fazione del Comandante + carte Neutrali
          const isLegalFaction = (card.faction === commFaction || card.faction === 'Neutral');
          if (!isLegalFaction) return;

          if (deckFilters.type !== 'all') {
            if (deckFilters.type === 'spell') {
              if (card.type !== 'spell' && card.type !== 'reaction') return;
            } else if (card.type !== deckFilters.type) {
              return;
            }
          }
          if (deckFilters.mana !== 'all') {
            if (deckFilters.mana === '4' && card.cost < 4) return;
            if (deckFilters.mana !== '4' && card.cost !== parseInt(deckFilters.mana)) return;
          }
          if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;
          if (deckFilters.set && deckFilters.set !== 'all' && card.set !== deckFilters.set) return;`;

    if (!content.includes(oldRenderDeckBuilderCards)) throw new Error('Could not find oldRenderDeckBuilderCards in ' + file);
    content = content.replace(oldRenderDeckBuilderCards, newRenderDeckBuilderCards);

    // D. Update Leader Switch to Remove & Alert Non-conforming cards
    const oldLeaderSelect = `          if (isUnlocked) {
            cardEl.onclick = () => {
              userState.decks[userState.activeDeckName].commanderId = comm.id;
              saveCloudState();
              deckFilters.mode = 'cards';
              renderDeckBuilder();
              showToast(\`👑 \${comm.name} impostato come leader del Grimorio!\`);
            };
          } else {`;

    const newLeaderSelect = `          if (isUnlocked) {
            cardEl.onclick = () => {
              const activeDeck = userState.decks[userState.activeDeckName];
              activeDeck.commanderId = comm.id;
              const newFaction = comm.faction;

              // Verifica e rimuove tutte le carte non più conformi alla nuova fazione
              const removedCards = [];
              activeDeck.cards = activeDeck.cards.filter(cId => {
                const c = CARDS_DB[cId];
                if (!c) return true;
                if (c.faction !== newFaction && c.faction !== 'Neutral') {
                  removedCards.push(c.name || cId);
                  return false;
                }
                return true;
              });

              saveCloudState();
              deckFilters.mode = 'cards';
              renderDeckBuilder();

              if (removedCards.length > 0) {
                const uniqueNames = [...new Set(removedCards)];
                const previewStr = uniqueNames.slice(0, 3).join(', ') + (uniqueNames.length > 3 ? '...' : '');
                showToast(\`👑 Nuovo Leader: \${comm.name} (\${newFaction})! Rimosse \${removedCards.length} carte non conformi: \${previewStr}\`);
              } else {
                showToast(\`👑 \${comm.name} (\${newFaction}) impostato come leader del Grimorio!\`);
              }
            };
          } else {`;

    if (!content.includes(oldLeaderSelect)) throw new Error('Could not find oldLeaderSelect in ' + file);
    content = content.replace(oldLeaderSelect, newLeaderSelect);

    // E. Update renderTray to validate faction conformity visually
    const oldRenderTray = `    function renderTray() {
      const deck = userState.decks[userState.activeDeckName];
      document.getElementById('tray-deck-name').textContent = userState.activeDeckName;
      const count = document.getElementById('tray-counter-badge');
      const isValid = deck.cards.length >= 30 && deck.cards.length <= 40;
      count.textContent = \`\${deck.cards.length}/40 (min 30)\`;
      count.className = \`tray-card-counter \${isValid ? 'valid' : 'invalid'}\`;
      document.getElementById('tray-comm-name').textContent = COMMANDERS[deck.commanderId].name;

      const stack = document.getElementById('tray-cards-stack');
      stack.innerHTML = '';
      const grouped = {};
      deck.cards.forEach(id => grouped[id] = (grouped[id] || 0) + 1);

      Object.keys(grouped).forEach(id => {
        const card = CARDS_DB[id];
        const row = document.createElement('div');
        row.className = 'arena-tray-row';
        row.innerHTML = \`
          <div class="tray-row-left"><span class="tray-qty-pill">\${grouped[id]}x</span><span class="tray-card-name">\${card.name}</span></div>
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

    if (!content.includes(oldRenderTray)) throw new Error('Could not find oldRenderTray in ' + file);
    content = content.replace(oldRenderTray, newRenderTray);

    // F. Update autoCompleteDeck() to only pick legal faction cards
    const oldAutoComplete = `    function autoCompleteDeck() {
      const deck = userState.decks[userState.activeDeckName];
      const baseCards = Object.keys(CARDS_DB).filter(k => CARDS_DB[k].set === 0 || CARDS_DB[k].set === 'α');

      if (deck.cards.length >= 30) {
        return showToast("Il mazzo ha già raggiunto la soglia minima legale (30 carte)!");
      }

      while (deck.cards.length < 30) {
        const eligible = baseCards.filter(id => deck.cards.filter(cId => cId === id).length < 4);
        if (eligible.length === 0) break;
        deck.cards.push(eligible[Math.floor(Math.random() * eligible.length)]);
      }
      renderDeckBuilder();
      saveCloudState();
    }`;

    const newAutoComplete = `    function autoCompleteDeck() {
      const deck = userState.decks[userState.activeDeckName];
      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';

      // Pescaggio consentito ESCLUSIVAMENTE da carte della Fazione del Comandante e Neutrali (Set α o sbloccate)
      const eligibleBase = Object.keys(CARDS_DB).filter(k => {
        const c = CARDS_DB[k];
        if (!c) return false;
        const isUnlocked = (c.set === 0 || c.set === 'α') || (userState.collection && (userState.collection[c.id] || 0) > 0);
        return isUnlocked && (c.faction === commFaction || c.faction === 'Neutral');
      });

      if (deck.cards.length >= 30) {
        return showToast("Il mazzo ha già raggiunto la soglia minima legale (30 carte)!");
      }

      while (deck.cards.length < 30) {
        const eligible = eligibleBase.filter(id => deck.cards.filter(cId => cId === id).length < 4);
        if (eligible.length === 0) break;
        deck.cards.push(eligible[Math.floor(Math.random() * eligible.length)]);
      }
      renderDeckBuilder();
      saveCloudState();
      showToast(\`Mazzo completato con carte conformi di \${commFaction} e Neutrali!\`);
    }`;

    if (!content.includes(oldAutoComplete)) throw new Error('Could not find oldAutoComplete in ' + file);
    content = content.replace(oldAutoComplete, newAutoComplete);

    // G. Update finishDeckBuilding() to enforce faction legality
    const oldFinishDeck = `    function finishDeckBuilding() {
      const deck = userState.decks[userState.activeDeckName];
      if (deck.cards.length < 30 || deck.cards.length > 40) return showToast("Il mazzo deve avere tra 30 e 40 carte per il formato Standard!");
      saveCloudState();
      showPane('battle-lobby');
    }`;

    const newFinishDeck = `    function finishDeckBuilding() {
      const deck = userState.decks[userState.activeDeckName];
      if (deck.cards.length < 30 || deck.cards.length > 40) return showToast("Il mazzo deve avere tra 30 e 40 carte per il formato Standard!");

      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';
      const illegalCards = deck.cards.filter(cId => {
        const c = CARDS_DB[cId];
        return c && c.faction !== commFaction && c.faction !== 'Neutral';
      });

      if (illegalCards.length > 0) {
        const uniqueIllegal = [...new Set(illegalCards)].map(id => {
          const c = CARDS_DB[id];
          return c ? \`\${c.name} (\${c.faction})\` : id;
        }).join(', ');
        return showToast(\`Mazzo non valido! Contiene carte di fazioni nemiche per \${comm.name}: \${uniqueIllegal}\`);
      }

      saveCloudState();
      showPane('battle-lobby');
    }`;

    if (!content.includes(oldFinishDeck)) throw new Error('Could not find oldFinishDeck in ' + file);
    content = content.replace(oldFinishDeck, newFinishDeck);

    content = content.replace(/\n/g, '\r\n');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} with faction rules, symbol formatting, and validation.`);
  });
}

updateHtmlFiles();

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality index.html === crownfall.html:', f1 === f2);
