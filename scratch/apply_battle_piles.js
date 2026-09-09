const fs = require('fs');

const pileCss = fs.readFileSync('scratch/pile_styles.css', 'utf8').trim();
const pileModalHtml = fs.readFileSync('scratch/pile_modal.html', 'utf8').trim();

function applyPilesFeature(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Normalize newlines to \n during processing
  content = content.replace(/\r?\n/g, '\n');

  // 1. Add CSS before </style>
  const styleCloseTag = '</style>';
  const sStyle = content.indexOf(styleCloseTag);
  if (sStyle === -1) throw new Error('Could not find </style> in ' + filePath);
  content = content.substring(0, sStyle) + pileCss + '\n  ' + content.substring(sStyle);

  // 2. Add Buttons to .battle-hud (P1 and P2)
  const oldHudP1 = `<div class="player-hud-box">
          <span style="font-weight: 900; color: #9ec5fe;" id="hud-p1-name">P1</span>
          <span class="hud-stat mana">💧 <span id="hud-p1-mana">1</span>/4</span>
          <span class="hud-stat blood">🩸 <span id="hud-p1-blood">0</span></span>
          <span class="hud-stat actions">⚡ Azioni: <span id="hud-p1-actions">2</span></span>
        </div>`;

  const newHudP1 = `<div class="player-hud-box">
          <span style="font-weight: 900; color: #9ec5fe;" id="hud-p1-name">P1</span>
          <span class="hud-stat mana">💧 <span id="hud-p1-mana">1</span>/4</span>
          <span class="hud-stat blood">🩸 <span id="hud-p1-blood">0</span></span>
          <span class="hud-stat actions">⚡ Azioni: <span id="hud-p1-actions">2</span></span>
          <button class="btn-hud-pile" id="btn-hud-p1-deck" onclick="openDeckModal('p1')" title="Esamina carte rimaste nel tuo Grimorio">📚 <span id="hud-p1-deck-count">0</span></button>
          <button class="btn-hud-pile grave" id="btn-hud-p1-grave" onclick="openGraveyardModal('p1')" title="Esamina carte giocate e caduti nel tuo Cimitero">🪦 <span id="hud-p1-grave-count">0</span></button>
        </div>`;

  const oldHudP2 = `<div class="player-hud-box">
          <span class="hud-stat actions">P2 Azioni: <span id="hud-p2-actions">2</span></span>
          <span class="hud-stat blood">🩸 <span id="hud-p2-blood">0</span></span>
          <span class="hud-stat mana">💧 <span id="hud-p2-mana">1</span>/4</span>
          <span style="font-weight: 900; color: #f5a6b0;" id="hud-p2-name">P2</span>
        </div>`;

  const newHudP2 = `<div class="player-hud-box">
          <button class="btn-hud-pile grave" id="btn-hud-p2-grave" onclick="openGraveyardModal('p2')" title="Esamina Cimitero nemico">🪦 <span id="hud-p2-grave-count">0</span></button>
          <button class="btn-hud-pile" id="btn-hud-p2-deck" onclick="openDeckModal('p2')" title="Conteggio carte Grimorio nemico">📚 <span id="hud-p2-deck-count">0</span></button>
          <span class="hud-stat actions">P2 Azioni: <span id="hud-p2-actions">2</span></span>
          <span class="hud-stat blood">🩸 <span id="hud-p2-blood">0</span></span>
          <span class="hud-stat mana">💧 <span id="hud-p2-mana">1</span>/4</span>
          <span style="font-weight: 900; color: #f5a6b0;" id="hud-p2-name">P2</span>
        </div>`;

  if (!content.includes(oldHudP1)) throw new Error('Could not find oldHudP1 in ' + filePath);
  if (!content.includes(oldHudP2)) throw new Error('Could not find oldHudP2 in ' + filePath);

  content = content.replace(oldHudP1, newHudP1);
  content = content.replace(oldHudP2, newHudP2);

  // 3. Add modal before <!-- MERCATO BOX -->
  const oldMercato = '    <!-- MERCATO BOX -->';
  if (!content.includes(oldMercato)) throw new Error('Could not find <!-- MERCATO BOX --> in ' + filePath);
  content = content.replace(oldMercato, pileModalHtml + '\n\n    <!-- MERCATO BOX -->');

  // 4. Initialize graveyard in startBattle (AI battle)
  const oldAiP1Deck = `deck: shuffleDeck(deck.cards),\n          hand: []\n        },`;
  const newAiP1Deck = `deck: shuffleDeck(deck.cards),\n          initialDeck: [...deck.cards],\n          hand: [],\n          graveyard: []\n        },`;
  if (!content.includes(oldAiP1Deck)) throw new Error('Could not find oldAiP1Deck in ' + filePath);
  content = content.replace(oldAiP1Deck, newAiP1Deck);

  const oldAiP2Deck = `deck: shuffleDeck(defaultBaseDeck),\n          hand: []\n        },`;
  const newAiP2Deck = `deck: shuffleDeck(defaultBaseDeck),\n          initialDeck: [...defaultBaseDeck],\n          hand: [],\n          graveyard: []\n        },`;
  if (!content.includes(oldAiP2Deck)) throw new Error('Could not find oldAiP2Deck in ' + filePath);
  content = content.replace(oldAiP2Deck, newAiP2Deck);

  // 5. Initialize graveyard in startBattleP2P
  const oldP2pP1 = `deck: (hostData.shuffledDeck && hostData.shuffledDeck.length) ? [...hostData.shuffledDeck] : shuffleDeck(ensureDeck30Cards({ cards: hostData.cards })),\n          hand: []\n        },`;
  const newP2pP1 = `deck: (hostData.shuffledDeck && hostData.shuffledDeck.length) ? [...hostData.shuffledDeck] : shuffleDeck(ensureDeck30Cards({ cards: hostData.cards })),\n          initialDeck: (hostData.shuffledDeck && hostData.shuffledDeck.length) ? [...hostData.shuffledDeck] : (hostData.cards ? [...hostData.cards] : []),\n          hand: [],\n          graveyard: []\n        },`;
  if (!content.includes(oldP2pP1)) throw new Error('Could not find oldP2pP1 in ' + filePath);
  content = content.replace(oldP2pP1, newP2pP1);

  const oldP2pP2 = `deck: (guestData.shuffledDeck && guestData.shuffledDeck.length) ? [...guestData.shuffledDeck] : shuffleDeck(ensureDeck30Cards({ cards: guestData.cards })),\n          hand: []\n        },`;
  const newP2pP2 = `deck: (guestData.shuffledDeck && guestData.shuffledDeck.length) ? [...guestData.shuffledDeck] : shuffleDeck(ensureDeck30Cards({ cards: guestData.cards })),\n          initialDeck: (guestData.shuffledDeck && guestData.shuffledDeck.length) ? [...guestData.shuffledDeck] : (guestData.cards ? [...guestData.cards] : []),\n          hand: [],\n          graveyard: []\n        },`;
  if (!content.includes(oldP2pP2)) throw new Error('Could not find oldP2pP2 in ' + filePath);
  content = content.replace(oldP2pP2, newP2pP2);

  // 6. Push to graveyard in executeSpellAction
  const oldSpellSplice = `        battleState[player].hand.splice(battleState.selectedHandIndex, 1);
        battleState.selectedHandIndex = null;
      } else {
        battleState[player].mana -= card.cost;
        if (card.id === 'spell_bloodsurge') battleState[player].blood -= 2;
        const hIdx = battleState[player].hand.indexOf(cardId);
        if (hIdx !== -1) battleState[player].hand.splice(hIdx, 1);
      }`;
  const newSpellSplice = `        battleState[player].hand.splice(battleState.selectedHandIndex, 1);
        battleState.selectedHandIndex = null;
      } else {
        battleState[player].mana -= card.cost;
        if (card.id === 'spell_bloodsurge') battleState[player].blood -= 2;
        const hIdx = battleState[player].hand.indexOf(cardId);
        if (hIdx !== -1) battleState[player].hand.splice(hIdx, 1);
      }
      if (!battleState[player].graveyard) battleState[player].graveyard = [];
      battleState[player].graveyard.push(cardId);`;

  if (!content.includes(oldSpellSplice)) throw new Error('Could not find oldSpellSplice in ' + filePath);
  content = content.replace(oldSpellSplice, newSpellSplice);

  // 7. Push defeated unit to graveyard in handlePieceDefeated
  const oldPieceDefeated = `function handlePieceDefeated(idx, killerOwner) {
      const piece = battleState.grid[idx];
      if (!piece) return;

      battleState.grid[idx] = null;
      const isAltarBlood = piece.cardId === 'altar_blood' || piece.name === 'Altare del Sangue';
      const bloodReward = isAltarBlood ? 1 : 2;`;

  const newPieceDefeated = `function handlePieceDefeated(idx, killerOwner) {
      const piece = battleState.grid[idx];
      if (!piece) return;

      battleState.grid[idx] = null;
      const isAltarBlood = piece.cardId === 'altar_blood' || piece.name === 'Altare del Sangue';
      const bloodReward = isAltarBlood ? 1 : 2;

      // Inserisce il pezzo nel cimitero del suo proprietario
      if (piece.owner && piece.type !== 'commander') {
        const pOwner = piece.owner;
        if (!battleState[pOwner].graveyard) battleState[pOwner].graveyard = [];
        const deadCardId = piece.cardId || piece.name;
        if (deadCardId) battleState[pOwner].graveyard.push(deadCardId);
      }`;

  if (!content.includes(oldPieceDefeated)) throw new Error('Could not find oldPieceDefeated in ' + filePath);
  content = content.replace(oldPieceDefeated, newPieceDefeated);

  // 8. Update renderHand to include the deck and graveyard piles
  const oldRenderHand = `    function renderHand() {
      const bar = document.getElementById('battle-hand');
      if (!bar) return;
      bar.innerHTML = '';
      const role = getMyRole();
      if (!battleState || !battleState[role]) return;

      battleState[role].hand.forEach((id, i) => {`;

  const newRenderHand = `    function renderHand() {
      const bar = document.getElementById('battle-hand');
      if (!bar) return;
      bar.innerHTML = '';
      const role = getMyRole();
      if (!battleState || !battleState[role]) return;

      const myDeckCount = (battleState[role].deck) ? battleState[role].deck.length : 0;
      const myGraveCount = (battleState[role].graveyard) ? battleState[role].graveyard.length : 0;

      // Slot Grimorio & Cimitero al fianco della mano
      const pilesWrap = document.createElement('div');
      pilesWrap.className = 'battle-piles-wrap';
      pilesWrap.innerHTML = \`
        <div class="pile-slot deck-slot" onclick="openDeckModal('\${role}')" title="Visualizza Carte nel tuo Grimorio (\${myDeckCount} rimaste da pescare)">
          <div class="pile-card-back">
            <span class="pile-glyph">📚</span>
            <span class="pile-counter" id="hand-deck-count">\${myDeckCount}</span>
          </div>
          <span class="pile-label">MAZZO</span>
        </div>
        <div class="pile-slot grave-slot" onclick="openGraveyardModal('\${role}')" title="Visualizza Carte nel tuo Cimitero (\${myGraveCount} giocate e caduti)">
          <div class="pile-card-back grave">
            <span class="pile-glyph">🪦</span>
            <span class="pile-counter" id="hand-grave-count">\${myGraveCount}</span>
          </div>
          <span class="pile-label">CIMITERO</span>
        </div>
      \`;
      bar.appendChild(pilesWrap);

      const divider = document.createElement('div');
      divider.className = 'piles-divider';
      bar.appendChild(divider);

      const handList = document.createElement('div');
      handList.className = 'hand-cards-scroll';
      handList.id = 'hand-cards-scroll';

      battleState[role].hand.forEach((id, i) => {`;

  if (!content.includes(oldRenderHand)) throw new Error('Could not find oldRenderHand in ' + filePath);
  content = content.replace(oldRenderHand, newRenderHand);

  // In renderHand, change bar.appendChild(cardEl) to handList.appendChild(cardEl) and append handList to bar
  const oldHandAppend = `        bar.appendChild(cardEl);
      });
    }`;
  const newHandAppend = `        handList.appendChild(cardEl);
      });
      bar.appendChild(handList);
    }`;

  if (!content.includes(oldHandAppend)) throw new Error('Could not find oldHandAppend in ' + filePath);
  content = content.replace(oldHandAppend, newHandAppend);

  // 9. Update updateHUD to refresh pile counters
  const oldUpdateHudEnd = `      const endTurnBtn = document.getElementById('btn-end-turn');
      if (endTurnBtn) {
        if (battleState.turn === role) {
          endTurnBtn.style.opacity = '1';
          endTurnBtn.style.cursor = 'pointer';
        } else {
          endTurnBtn.style.opacity = '0.45';
          endTurnBtn.style.cursor = 'not-allowed';
        }
      }
    }`;

  const newUpdateHudEnd = `      const endTurnBtn = document.getElementById('btn-end-turn');
      if (endTurnBtn) {
        if (battleState.turn === role) {
          endTurnBtn.style.opacity = '1';
          endTurnBtn.style.cursor = 'pointer';
        } else {
          endTurnBtn.style.opacity = '0.45';
          endTurnBtn.style.cursor = 'not-allowed';
        }
      }

      // Aggiorna contatori Mazzo e Cimitero nell'HUD e nella barra inferiore
      const p1DeckCount = (battleState.p1 && battleState.p1.deck) ? battleState.p1.deck.length : 0;
      const p1GraveCount = (battleState.p1 && battleState.p1.graveyard) ? battleState.p1.graveyard.length : 0;
      const p2DeckCount = (battleState.p2 && battleState.p2.deck) ? battleState.p2.deck.length : 0;
      const p2GraveCount = (battleState.p2 && battleState.p2.graveyard) ? battleState.p2.graveyard.length : 0;

      const elP1Deck = document.getElementById('hud-p1-deck-count'); if (elP1Deck) elP1Deck.textContent = p1DeckCount;
      const elP1Grave = document.getElementById('hud-p1-grave-count'); if (elP1Grave) elP1Grave.textContent = p1GraveCount;
      const elP2Deck = document.getElementById('hud-p2-deck-count'); if (elP2Deck) elP2Deck.textContent = p2DeckCount;
      const elP2Grave = document.getElementById('hud-p2-grave-count'); if (elP2Grave) elP2Grave.textContent = p2GraveCount;

      const elHandDeck = document.getElementById('hand-deck-count'); if (elHandDeck) elHandDeck.textContent = (battleState[role] && battleState[role].deck) ? battleState[role].deck.length : 0;
      const elHandGrave = document.getElementById('hand-grave-count'); if (elHandGrave) elHandGrave.textContent = (battleState[role] && battleState[role].graveyard) ? battleState[role].graveyard.length : 0;
    }`;

  if (!content.includes(oldUpdateHudEnd)) throw new Error('Could not find oldUpdateHudEnd in ' + filePath);
  content = content.replace(oldUpdateHudEnd, newUpdateHudEnd);

  // 10. Add modal functions to the script
  const pileModalJs = `
    // --- GESTIONE MODAL GRIMORIO & CIMITERO IN BATTAGLIA ---
    let currentPileModalView = 'my-deck'; // 'my-deck' | 'my-grave' | 'opp-grave' | 'opp-deck'
    let currentPileTypeFilter = 'all';
    let currentPileSearchQuery = '';

    function openDeckModal(player = getMyRole()) {
      const role = getMyRole();
      currentPileModalView = (player === role) ? 'my-deck' : 'opp-deck';
      currentPileTypeFilter = 'all';
      currentPileSearchQuery = '';
      const sInput = document.getElementById('bpm-search');
      if (sInput) sInput.value = '';
      renderPileModal();
      const m = document.getElementById('battle-pile-modal');
      if (m) m.classList.add('active');
    }

    function openGraveyardModal(player = getMyRole()) {
      const role = getMyRole();
      currentPileModalView = (player === role) ? 'my-grave' : 'opp-grave';
      currentPileTypeFilter = 'all';
      currentPileSearchQuery = '';
      const sInput = document.getElementById('bpm-search');
      if (sInput) sInput.value = '';
      renderPileModal();
      const m = document.getElementById('battle-pile-modal');
      if (m) m.classList.add('active');
    }

    function closePileModal() {
      const m = document.getElementById('battle-pile-modal');
      if (m) m.classList.remove('active');
      hideHoverCard();
    }

    function onPileBackdropClick(e) {
      if (e.target.id === 'battle-pile-modal') {
        closePileModal();
      }
    }

    function setPileModalView(view) {
      currentPileModalView = view;
      renderPileModal();
    }

    function setPileTypeFilter(type) {
      currentPileTypeFilter = type;
      renderPileModal();
    }

    function onPileSearchInput(query) {
      currentPileSearchQuery = (query || '').toLowerCase().trim();
      renderPileModal();
    }

    function renderPileModal() {
      if (!battleState) return;
      const role = getMyRole();
      const oppRole = getOppRole();

      const myDeck = (battleState[role] && battleState[role].deck) ? battleState[role].deck : [];
      const myGrave = (battleState[role] && battleState[role].graveyard) ? battleState[role].graveyard : [];
      const oppDeck = (battleState[oppRole] && battleState[oppRole].deck) ? battleState[oppRole].deck : [];
      const oppGrave = (battleState[oppRole] && battleState[oppRole].graveyard) ? battleState[oppRole].graveyard : [];

      // Aggiorna badge nelle schede
      const bMyDeck = document.getElementById('bpm-badge-my-deck'); if (bMyDeck) bMyDeck.textContent = myDeck.length;
      const bMyGrave = document.getElementById('bpm-badge-my-grave'); if (bMyGrave) bMyGrave.textContent = myGrave.length;
      const bOppGrave = document.getElementById('bpm-badge-opp-grave'); if (bOppGrave) bOppGrave.textContent = oppGrave.length;
      const bOppDeck = document.getElementById('bpm-badge-opp-deck'); if (bOppDeck) bOppDeck.textContent = oppDeck.length;

      // Aggiorna bottoni di tab attivi
      ['my-deck', 'my-grave', 'opp-grave', 'opp-deck'].forEach(tab => {
        const btn = document.getElementById(\`bpm-tab-\${tab}\`);
        if (btn) btn.classList.toggle('active', currentPileModalView === tab);
      });

      // Aggiorna bottoni filtro tipo
      ['all', 'unit', 'altar', 'spell'].forEach(t => {
        const btn = document.getElementById(\`bpm-f-\${t}\`);
        if (btn) btn.classList.toggle('active', currentPileTypeFilter === t);
      });

      const iconEl = document.getElementById('bpm-icon');
      const titleEl = document.getElementById('bpm-title');
      const subEl = document.getElementById('bpm-subtitle');
      const summaryBar = document.getElementById('bpm-summary-bar');
      const body = document.getElementById('bpm-cards-body');
      const filterBar = document.querySelector('.bpm-filter-bar');

      if (currentPileModalView === 'my-deck') {
        if (iconEl) iconEl.textContent = '📚';
        if (titleEl) titleEl.textContent = 'ISPETTORE TATTICO: IL TUO GRIMORIO';
        if (subEl) subEl.textContent = \`\${myDeck.length} Carte Rimanenti da Pescare\`;
        if (filterBar) filterBar.style.display = 'flex';

        const inHandCount = (battleState[role].hand || []).length;
        const onBoardCount = battleState.grid.filter(p => p && p.owner === role && p.type !== 'commander').length;
        const inGraveCount = myGrave.length;
        const totalKnown = myDeck.length + inHandCount + onBoardCount + inGraveCount;

        let uCount = 0, aCount = 0, sCount = 0;
        myDeck.forEach(id => {
          const c = CARDS_DB[id];
          if (!c) return;
          if (c.type === 'unit') uCount++;
          else if (c.type === 'altar') aCount++;
          else sCount++;
        });

        if (summaryBar) {
          summaryBar.innerHTML = \`
            <div><strong>Rimanenti nel Mazzo:</strong> <span style="color:var(--gold-primary); font-weight:800;">\${myDeck.length} carte</span> | ⚔️ \${uCount} Miniature • 🏛️ \${aCount} Altari • ✨ \${sCount} Sortilegi</div>
            <div style="font-size:0.74rem; color:#a4b0be;">🖐️ In Mano: <strong>\${inHandCount}</strong> • 🛡️ In Campo: <strong>\${onBoardCount}</strong> • 🪦 Cimitero: <strong>\${inGraveCount}</strong> (Mazzo Totale: \${totalKnown})</div>
          \`;
        }

        renderGroupedCards(myDeck, body, false);

      } else if (currentPileModalView === 'my-grave') {
        if (iconEl) iconEl.textContent = '🪦';
        if (titleEl) titleEl.textContent = 'CIMITERO ALLEATO (CARTE GIOCATE & CADUTI)';
        if (subEl) subEl.textContent = \`\${myGrave.length} Carte Giocate o Distrutte in Battaglia\`;
        if (filterBar) filterBar.style.display = 'flex';

        let deadUnits = 0, spentSpells = 0;
        myGrave.forEach(id => {
          const c = CARDS_DB[id];
          if (c && c.type === 'unit') deadUnits++;
          else if (c && c.type === 'spell') spentSpells++;
        });

        if (summaryBar) {
          summaryBar.innerHTML = \`
            <div><strong>Scarti & Caduti:</strong> <span style="color:#ff7675; font-weight:800;">\${myGrave.length} carte totali</span> | ⚔️ \${deadUnits} Miniature perse • ✨ \${spentSpells} Sortilegi usati</div>
            <div style="font-size:0.74rem; color:#a4b0be;">Queste carte sono state consumate e non possono più essere pescate in questo scontro.</div>
          \`;
        }

        renderGroupedCards(myGrave, body, true);

      } else if (currentPileModalView === 'opp-grave') {
        if (iconEl) iconEl.textContent = '💀';
        if (titleEl) titleEl.textContent = 'CIMITERO AVVERSARIO (CADUTI & SORTILEGI NEMICI)';
        if (subEl) subEl.textContent = \`\${oppGrave.length} Carte Nemiche Giocate o Distrutte\`;
        if (filterBar) filterBar.style.display = 'flex';

        if (summaryBar) {
          summaryBar.innerHTML = \`
            <div><strong>Risorse Spese dall'Avversario:</strong> <span style="color:#ff7675; font-weight:800;">\${oppGrave.length} carte cadute/giocate</span></div>
            <div style="font-size:0.74rem; color:#a4b0be;">Consulta i sortilegi e le truppe già spesi dal nemico per anticipare le sue prossime mosse!</div>
          \`;
        }

        renderGroupedCards(oppGrave, body, true);

      } else if (currentPileModalView === 'opp-deck') {
        if (iconEl) iconEl.textContent = '👁️';
        if (titleEl) titleEl.textContent = 'GRIMORIO DELL\\'AVVERSARIO';
        if (subEl) subEl.textContent = \`\${oppDeck.length} Carte Rimanenti nel Mazzo Nemico\`;
        if (filterBar) filterBar.style.display = 'none';

        if (summaryBar) {
          summaryBar.innerHTML = \`
            <div><strong>Grimorio Nemico:</strong> <span style="color:var(--gold-primary); font-weight:800;">\${oppDeck.length} carte rimaste da pescare</span></div>
            <div style="font-size:0.74rem; color:#a4b0be;">Nei regolamenti di Veridia, la composizione del mazzo nemico non ancora pescato è protetta dalla nebbia di guerra.</div>
          \`;
        }

        body.innerHTML = \`
          <div class="bpm-empty-msg" style="padding: 48px 20px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">👁️‍🗨️</div>
            <div style="font-size: 1.1rem; color: #fff; font-weight: 800; margin-bottom: 6px;">L'Avversario ha ancora \${oppDeck.length} carte nel proprio Grimorio</div>
            <div style="max-width: 440px; margin: 0 auto; line-height: 1.5; color: #a4b0be;">
              Le carte che l'avversario deve ancora pescare sono segrete. Puoi tuttavia ispezionare liberamente il suo <strong>Cimitero</strong> per scoprire quali carte ha già utilizzato!
            </div>
            <button class="btn btn-gold" style="margin-top: 18px; padding: 6px 16px;" onclick="setPileModalView('opp-grave')">
              💀 Esamina Cimitero Nemico (\${oppGrave.length})
            </button>
          </div>
        \`;
      }
    }

    function renderGroupedCards(cardIds, containerEl, isGraveyard) {
      containerEl.innerHTML = '';
      if (!cardIds || cardIds.length === 0) {
        containerEl.innerHTML = \`
          <div class="bpm-empty-msg">
            \${isGraveyard ? '🪦 Nessuna carta ancora nel Cimitero. La polvere del conflitto deve ancora posarsi.' : '📚 Il Grimorio è completamente vuoto! Non ci sono più carte da pescare.'}
          </div>
        \`;
        return;
      }

      const counts = {};
      cardIds.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let items = Object.entries(counts).map(([id, count]) => {
        const c = CARDS_DB[id] || { id, name: id, cost: 0, type: 'unit', rarity: 'common', glyph: '⚔️', set: 'α' };
        return { id, card: c, count };
      });

      if (currentPileTypeFilter !== 'all') {
        items = items.filter(item => {
          if (currentPileTypeFilter === 'spell') {
            return item.card.type === 'spell' || item.card.type === 'reaction';
          }
          return item.card.type === currentPileTypeFilter;
        });
      }

      if (currentPileSearchQuery) {
        items = items.filter(item => item.card.name.toLowerCase().includes(currentPileSearchQuery));
      }

      if (items.length === 0) {
        containerEl.innerHTML = \`
          <div class="bpm-empty-msg">Nessuna carta corrisponde ai filtri selezionati.</div>
        \`;
        return;
      }

      items.sort((a, b) => (a.card.cost - b.card.cost) || a.card.name.localeCompare(b.card.name));

      items.forEach(item => {
        const c = item.card;
        const r = c.rarity || 'common';
        const typeLabel = c.type === 'unit' ? 'Miniatura' : (c.type === 'altar' ? 'Altare' : (c.type === 'reaction' ? 'Reazione' : 'Magia'));
        const ptStr = c.type === 'unit' ? \`\${c.att !== undefined ? c.att : 1}/\${c.hp !== undefined ? c.hp : 1}\` : (c.type === 'altar' ? \`\${c.hp || 5} PV\` : '');

        const chip = document.createElement('div');
        chip.className = \`bpm-card-chip rarity-\${r}\`;
        chip.style.borderLeft = \`4px solid var(--rarity-\${r})\`;

        chip.onmouseenter = (e) => showHoverCard(c, e);
        chip.onmousemove = (e) => updateHoverCardPos(e);
        chip.onmouseleave = () => hideHoverCard();

        const costDisplay = (c.bloodCost && c.bloodCost > 0)
          ? \`\${c.cost ? c.cost + ' ' : ''}<span style="color:#ff7675;">\${c.bloodCost}🩸</span>\`
          : \`<span style="color:var(--mana-cyan); font-weight:bold;">\${c.cost !== undefined ? c.cost : 0} 💧</span>\`;

        chip.innerHTML = \`
          <div class="bpm-chip-header">
            <span class="bpm-chip-cost">\${costDisplay}</span>
            <span class="bpm-chip-count-badge \${isGraveyard ? 'grave' : ''}">
              \${item.count}x \${isGraveyard ? 'cadute' : 'rimaste'}
            </span>
          </div>
          <div class="bpm-chip-title" title="\${c.name}">
            <span>\${c.glyph || '⚔️'}</span> \${c.name}
          </div>
          <div class="bpm-chip-footer">
            <span>\${typeLabel}</span>
            <div style="display:flex; gap:6px; align-items:center;">
              <span style="font-family:'Cinzel',serif; font-weight:800; color:var(--gold-primary); font-size:0.7rem;">\${c.set || 'α'}</span>
              \${ptStr ? \`<span style="font-weight:900; color:#fff;">\${ptStr}</span>\` : ''}
            </div>
          </div>
        \`;

        containerEl.appendChild(chip);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m = document.getElementById('battle-pile-modal');
        if (m && m.classList.contains('active')) {
          closePileModal();
        }
      }
    });
`;

  // Add pileModalJs right before the final closing script tag
  const sScript = content.lastIndexOf('</script>');
  if (sScript === -1) throw new Error('Could not find </script> in ' + filePath);
  content = content.substring(0, sScript) + '\n' + pileModalJs + '\n' + content.substring(sScript);

  // Restore CRLF
  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated', filePath);
}

applyPilesFeature('index.html');
applyPilesFeature('crownfall.html');

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality between index.html and crownfall.html:', f1 === f2);
console.log('File size:', f1.length);
