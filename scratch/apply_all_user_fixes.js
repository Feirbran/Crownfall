const fs = require('fs');

const exactSpellBlock = fs.readFileSync('scratch/exact_cast_and_execute_spell.txt', 'utf8').replace(/\r?\n/g, '\n');

const newSpellBlock = `function castSpell(targetIdx) {
      const role = getMyRole();
      if (battleState.selectedHandIndex === null) return;
      const cardId = battleState[role].hand[battleState.selectedHandIndex];
      const card = CARDS_DB[cardId];
      if (!card) return;
      const name = card.name || card.id;

      // Gestione a 2 fasi specifica per MARCIA FORZATA:
      // Fase 1: Clicco sulla truppa alleata da muovere
      // Fase 2: Clicco su una casella ortogonale libera adiacente
      if (name === 'Marcia Forzata' || card.id === 'spell_heal') {
        const sq = document.querySelector(\`.square[data-index="\${targetIdx}"]\`);
        if (!sq || !sq.classList.contains('highlight-spell-target')) return;

        if (battleState.marciaSelectedUnit === null || battleState.marciaSelectedUnit === undefined) {
          const unit = battleState.grid[targetIdx];
          if (unit && unit.owner === role && (unit.type === 'unit' || unit.type === 'commander')) {
            battleState.marciaSelectedUnit = targetIdx;
            clearHighlights();

            // Calcola e illumina solo le caselle ortogonali adiacenti libere (distanza Manhattan 1)
            const r1 = Math.floor(targetIdx / 8), c1 = targetIdx % 8;
            const orthoDests = [targetIdx - 8, targetIdx + 8, targetIdx - 1, targetIdx + 1].filter(dest => {
              if (dest < 0 || dest > 63) return false;
              const r2 = Math.floor(dest / 8), c2 = dest % 8;
              if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return false;
              return !battleState.grid[dest];
            });

            if (orthoDests.length === 0) {
              battleState.marciaSelectedUnit = null;
              showToast("Nessuna casella adiacente libera attorno a questa unità!");
              highlightSpellTargets(card);
              return;
            }

            orthoDests.forEach(dest => {
              document.querySelector(\`.square[data-index="\${dest}"]\`)?.classList.add('highlight-spell-target');
            });
            showToast(\`Seleziona dove muovere \${unit.name} a costo 0⚡!\`);
            return;
          }
        } else {
          // Fase 2: Spostamento dell'unità selezionata sulla destinazione
          const fromIdx = battleState.marciaSelectedUnit;
          battleState.marciaSelectedUnit = null;
          const unit = battleState.grid[fromIdx];
          if (!unit || battleState.grid[targetIdx]) {
            clearHighlights();
            return;
          }

          if (battleState[role].mana < card.cost) return showToast("Mana insufficiente!");
          battleState[role].mana -= card.cost;
          battleState[role].hand.splice(battleState.selectedHandIndex, 1);
          battleState.selectedHandIndex = null;
          if (!battleState[role].graveyard) battleState[role].graveyard = [];
          battleState[role].graveyard.push(cardId);
          clearHighlights();

          addLog(\`\${role.toUpperCase()} gioca Marcia Forzata: \${unit.name} avanza di 1 casella a costo 0⚡!\`, role);
          glidePiece(fromIdx, targetIdx, () => {
            battleState.grid[targetIdx] = unit;
            battleState.grid[fromIdx] = null;
            renderPieces();
            updateHUD();
            showToast(\`\${unit.name} è avanzato con successo (0⚡)!\`);
            if (isP2P) {
              sendNetMsg({ type: 'ACTION_SPELL', cardId: 'Marcia Forzata', from: fromIdx, to: targetIdx, player: role });
            }
          });
          return;
        }
      }

      executeSpellAction(targetIdx, cardId, role, true);
    }

    function executeSpellAction(targetIdx, cardId, player = getMyRole(), isOriginator = true) {
      const card = CARDS_DB[cardId];
      if (!card) return;
      const opp = (player === 'p1') ? 'p2' : 'p1';
      const name = card.name || card.id;

      if (isOriginator) {
        if (battleState[player].mana < card.cost) return showToast("Mana insufficiente!");
        if ((name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') && battleState[player].blood < 2) {
          return showToast("Salasso Crudele richiede almeno 2 Sangue!");
        }
        const sq = document.querySelector(\`.square[data-index="\${targetIdx}"]\`);
        if (!sq || !sq.classList.contains('highlight-spell-target')) return;

        battleState[player].mana -= card.cost;
        if (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') battleState[player].blood -= 2;
        battleState[player].hand.splice(battleState.selectedHandIndex, 1);
        battleState.selectedHandIndex = null;
      } else {
        battleState[player].mana -= card.cost;
        if (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') battleState[player].blood -= 2;
        const hIdx = battleState[player].hand.indexOf(cardId);
        if (hIdx !== -1) battleState[player].hand.splice(hIdx, 1);
      }
      if (!battleState[player].graveyard) battleState[player].graveyard = [];
      battleState[player].graveyard.push(cardId);

      addLog(\`\${player.toUpperCase()} lancia Sortilegio: \${card.name} [\${RARITY_NAMES[card.rarity] || 'Comune'}] su cella \${targetIdx}\`, player);

      animateCardPlayed(card, () => {
        const target = battleState.grid[targetIdx];

        if ((name === 'Frantumare la Pietra' || card.id === 'spell_cleave') && target) {
          addLog(\`Frantumare la Pietra polverizza istantaneamente \${target.name}!\`, 'sys');
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
        } else if ((name === 'Genio del Geniere' || card.id === 'spell_fortify') && target) {
          const healAmount = target.type === 'altar' ? 3 : 2;
          target.hp += healAmount;
          addLog(\`\${target.name} ottiene +\${healAmount} PV da Genio del Geniere (PV: \${target.hp})\`, 'sys');
        } else if ((name === 'Carica Sfondante' || card.id === 'spell_push') && target) {
          pushPiece(targetIdx, 2, player);
        } else if (name === 'Marcia Forzata' || card.id === 'spell_heal') {
          if (target) {
            target.hp += 2;
            addLog(\`Marcia Forzata rinvigorisce \${target.name} (+2 PV)\`, 'sys');
          }
        } else if ((name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') && target) {
          target.hp -= 3;
          addLog(\`\${target.name} subisce 3 danni da Salasso Crudele (PV residui: \${target.hp})\`, 'sys');
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Furia dei Relitti' || card.id === 'spell_wrath') {
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) {
            getAdjs(commIdx).forEach(adj => {
              const p = battleState.grid[adj];
              if (p && p.owner === opp) {
                p.hp -= 2;
                addLog(\`Furia dei Relitti colpisce \${p.name} (-2 PV)\`, 'sys');
                if (p.hp <= 0) handlePieceDefeated(adj, player);
              }
            });
          }
        } else if (target && target.owner === opp) {
          target.hp -= 2;
          addLog(\`\${target.name} subisce 2 danni da \${card.name}!\`, 'sys');
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        }

        if (isP2P && isOriginator) {
          sendNetMsg({ type: 'ACTION_SPELL', targetIdx, cardId, player });
        }

        clearHighlights();
        renderPieces();
        updateHUD();
        renderHand();
        checkWin();
      });
    }

    function deployCard(idx) {
      const role = getMyRole();
      const cardId = battleState[role].hand[battleState.selectedHandIndex];
      executeDeployAction(idx, cardId, role, true);
    }

    function executeDeployAction(idx, cardId, player = getMyRole(), isOriginator = true) {
      const card = CARDS_DB[cardId];
      if (!card) return;

      if (isOriginator) {
        if (battleState[player].mana < card.cost) return showToast("Mana insufficiente!");
        const sq = document.querySelector(\`.square[data-index="\${idx}"]\`);
        if (!sq || !sq.classList.contains('highlight-deploy')) return;

        if (card.type === 'altar') {
          const altarsCount = battleState.grid.filter(p => p && p.owner === player && p.type === 'altar').length;
          if (altarsCount >= 4) return showToast("Limite raggiunto: massimo 4 Altari contemporanei!");
          if (battleState[player].altarDeployedThisTurn) return showToast("Puoi schierare al massimo 1 Altare per turno!");
        }

        battleState[player].mana -= card.cost;
        battleState[player].hand.splice(battleState.selectedHandIndex, 1);
        battleState.selectedHandIndex = null;
      } else {
        battleState[player].mana -= card.cost;
        const hIdx = battleState[player].hand.indexOf(cardId);
        if (hIdx !== -1) battleState[player].hand.splice(hIdx, 1);
      }

      addLog(\`\${player.toUpperCase()} schiera \${card.name} [\${RARITY_NAMES[card.rarity] || 'Comune'}] su cella \${idx}\`, player);

      animateCardPlayed(card, () => {
        const hasSlancio = card.slancio || (card.keywords && card.keywords.includes('slancio'));
        const piece = {
          owner: player,
          type: card.type,
          cardId: card.id,
          name: card.name,
          hp: card.hp,
          att: card.att,
          move: card.move || 'orth',
          range: card.range || 1,
          glyph: card.glyph,
          desc: card.desc,
          rarity: card.rarity || 'common',
          exhausted: !hasSlancio
        };

        battleState.grid[idx] = piece;

        if (card.type === 'altar') {
          battleState[player].altarDeployedThisTurn = true;
          battleState[player].maxMana = Math.min(4, battleState[player].maxMana + 1);
          battleState[player].mana = Math.min(battleState[player].maxMana, battleState[player].mana + 1);
          if (player === getMyRole()) showToast("Altare attivo! +1 Mana subito!");
        }

        if (isP2P && isOriginator) {
          sendNetMsg({ type: 'ACTION_DEPLOY', idx, cardId, player });
        }

        clearHighlights();
        renderPieces();
        updateHUD();
        renderHand();
      });
    }\n\n    `;

function patchFile(file) {
  let content = fs.readFileSync(file, 'utf8').replace(/\r?\n/g, '\n');

  // 1. In sendNetMsg
  const oldSendNetMsg = `      // 1. Cloud Relay via Supabase Realtime WebSockets (Internet globale WAN - Torino <-> Mondo)
      if (netSbChannel) {
        try {
          netSbChannel.send({
            type: 'broadcast',
            event: 'game_msg',
            payload: payload
          });
        } catch(e){}
      }`;
  const newSendNetMsg = `      // 1. Cloud Relay via Supabase Realtime WebSockets (Internet globale WAN - Torino <-> Mondo)
      if (netSbChannel && netSbChannel.state === 'joined') {
        try {
          netSbChannel.send({
            type: 'broadcast',
            event: 'game_msg',
            payload: payload
          });
        } catch(e) {
          console.warn("Realtime broadcast send err:", e);
        }
      }`;
  if (!content.includes(oldSendNetMsg)) throw new Error('oldSendNetMsg not found in ' + file);
  content = content.replace(oldSendNetMsg, newSendNetMsg);

  // 2. In joinMultiplayer
  const oldJoinTimer = `      let attempts = 0;
      const joinTimer = setInterval(() => {
        if (battleState && battleState.phase) {
          clearInterval(joinTimer);
        } else {
          attempts++;
          sendGuestHello();
          if (attempts >= 15) { // 30 secondi di tolleranza
            clearInterval(joinTimer);
            if (!battleState || !battleState.phase) {
              showToast("Tempo scaduto. Verifica che l'Host abbia la stanza aperta!");
            }
          }
        }
      }, 2000);`;
  const newJoinTimer = `      let attempts = 0;
      const joinTimer = setInterval(() => {
        if (battleState && battleState.phase) {
          clearInterval(joinTimer);
        } else {
          attempts++;
          if (netSbChannel && netSbChannel.state === 'joined') {
            sendGuestHello();
          }
          if (attempts >= 15) { // 30 secondi di tolleranza
            clearInterval(joinTimer);
            if (!battleState || !battleState.phase) {
              showToast("Tempo scaduto. Verifica che l'Host abbia la stanza aperta!");
            }
          }
        }
      }, 2000);`;
  if (!content.includes(oldJoinTimer)) throw new Error('oldJoinTimer not found in ' + file);
  content = content.replace(oldJoinTimer, newJoinTimer);

  // 3. In handleNetMsg
  const oldHelloJoinBlock = `      if (data.type === 'HELLO_JOIN') {
        if (myP2PRole === 'p1') {
          const deckSelect = document.getElementById('lobby-deck-select-p2p');
          const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
          let hostDeck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
          hostDeck.cards = ensureDeck30Cards(hostDeck);

          const statusEl = document.getElementById('host-status-msg');
          if (statusEl) statusEl.textContent = \`⚔️ \${data.username} è entrato nella stanza! Avvio duello...\`;

          const p1Cards = shuffleDeck(hostDeck.cards);
          const p2Cards = shuffleDeck(ensureDeck30Cards({ cards: data.cards }));

          sendNetMsg({
            type: 'HELLO_HOST',
            username: currentUser ? (currentUser.username || 'Host') : 'Condottiero 1',
            commanderId: hostDeck.commanderId || 'valeria',
            p1Cards: p1Cards,
            p2Cards: p2Cards
          });

          if (!battleState || !battleState.phase) {
            const hostData = {
              username: currentUser ? (currentUser.username || 'Host') : 'Condottiero 1',
              commanderId: hostDeck.commanderId || 'valeria',
              cards: p1Cards,
              shuffledDeck: p1Cards
            };
            const guestData = {
              username: data.username,
              commanderId: data.commanderId,
              cards: p2Cards,
              shuffledDeck: p2Cards
            };

            startBattleP2P(hostData, guestData, 'p1');
          }
        }
      }`;
  const newHelloJoinBlock = `      if (data.type === 'HELLO_JOIN') {
        if (myP2PRole === 'p1') {
          const deckSelect = document.getElementById('lobby-deck-select-p2p');
          const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
          let hostDeck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
          hostDeck.cards = ensureDeck30Cards(hostDeck);

          const statusEl = document.getElementById('host-status-msg');
          if (statusEl) statusEl.textContent = \`⚔️ \${data.username} è entrato nella stanza! Avvio duello...\`;

          let p1Cards, p2Cards;
          if (battleState && battleState.p1 && battleState.p1.initialDeck) {
            p1Cards = battleState.p1.initialDeck;
            p2Cards = battleState.p2.initialDeck;
          } else {
            p1Cards = shuffleDeck(hostDeck.cards);
            p2Cards = shuffleDeck(ensureDeck30Cards({ cards: data.cards }));
          }

          sendNetMsg({
            type: 'HELLO_HOST',
            username: currentUser ? (currentUser.username || 'Host') : 'Condottiero 1',
            commanderId: hostDeck.commanderId || 'valeria',
            p1Cards: p1Cards,
            p2Cards: p2Cards
          });

          if (!battleState || !battleState.phase) {
            const hostData = {
              username: currentUser ? (currentUser.username || 'Host') : 'Condottiero 1',
              commanderId: hostDeck.commanderId || 'valeria',
              cards: p1Cards,
              shuffledDeck: p1Cards
            };
            const guestData = {
              username: data.username,
              commanderId: data.commanderId,
              cards: p2Cards,
              shuffledDeck: p2Cards
            };

            startBattleP2P(hostData, guestData, 'p1');
          }
        }
      }`;
  if (!content.includes(oldHelloJoinBlock)) throw new Error('oldHelloJoinBlock not found in ' + file);
  content = content.replace(oldHelloJoinBlock, newHelloJoinBlock);

  // In handleNetMsg ACTION_SPELL:
  const oldActionSpell = `      } else if (data.type === 'ACTION_SPELL') {
        executeSpellAction(data.cardId, data.targetIdx, data.player, false);`;
  const newActionSpell = `      } else if (data.type === 'ACTION_SPELL') {
        if (data.cardId === 'Marcia Forzata' || data.cardId === 'spell_heal') {
          const unit = battleState.grid[data.from];
          if (unit) {
            glidePiece(data.from, data.to, () => {
              battleState.grid[data.to] = unit;
              battleState.grid[data.from] = null;
              addLog(\`\${unit.name} avanza di 1 casella con Marcia Forzata a costo 0⚡!\`, data.player);
              renderPieces();
            });
          }
        } else {
          executeSpellAction(data.targetIdx, data.cardId, data.player, false);
        }`;
  if (!content.includes(oldActionSpell)) throw new Error('oldActionSpell not found in ' + file);
  content = content.replace(oldActionSpell, newActionSpell);

  // 4. In highlightSpellTargets
  const oldHighlightSpellTargets = `    function highlightSpellTargets(card) {
      const role = getMyRole();
      const opp = getOppRole();
      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx === -1) return;
      const commR = Math.floor(commIdx / 8);
      const commC = commIdx % 8;

      for (let i = 0; i < 64; i++) {
        const target = battleState.grid[i];
        const r = Math.floor(i / 8);
        const c = i % 8;
        const dist = Math.max(Math.abs(r - commR), Math.abs(c - commC));

        if (card.id === 'spell_cleave') {
          if (target && target.owner === opp && target.type !== 'altar' && dist <= 2) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (card.id === 'spell_fortify') {
          if (target && target.owner === role) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (card.id === 'spell_push') {
          if (target && target.owner === opp && target.type !== 'altar') {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (card.id === 'spell_heal') {
          if (i === commIdx) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (card.id === 'spell_bloodsurge') {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (card.id === 'spell_wrath') {
          if (i === commIdx) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        }
      }
    }`;
  const newHighlightSpellTargets = `    function highlightSpellTargets(card) {
      const role = getMyRole();
      const opp = getOppRole();
      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx === -1) return;
      const commR = Math.floor(commIdx / 8);
      const commC = commIdx % 8;
      const name = card.name || card.id;

      battleState.marciaSelectedUnit = null;

      for (let i = 0; i < 64; i++) {
        const target = battleState.grid[i];
        const r = Math.floor(i / 8);
        const c = i % 8;
        const dist = Math.max(Math.abs(r - commR), Math.abs(c - commC));

        if (name === 'Marcia Forzata' || card.id === 'spell_heal') {
          // Marcia Forzata: bersaglia qualsiasi unità o miniatura alleata presente sul campo
          if (target && target.owner === role && (target.type === 'unit' || target.type === 'commander')) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Frantumare la Pietra' || card.id === 'spell_cleave') {
          // Bersaglia Altare o Muro nemico entro 4 caselle dal Comandante
          if (target && target.owner === opp && (target.type === 'altar' || (target.desc && target.desc.includes('Muro'))) && dist <= 4) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Genio del Geniere' || card.id === 'spell_fortify') {
          if (target && target.owner === role) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Carica Sfondante' || card.id === 'spell_push') {
          if (target && target.owner === opp && target.type !== 'altar') {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Furia dei Relitti' || card.id === 'spell_wrath') {
          if (i === commIdx) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        }
      }
    }`;
  if (!content.includes(oldHighlightSpellTargets)) throw new Error('oldHighlightSpellTargets not found in ' + file);
  content = content.replace(oldHighlightSpellTargets, newHighlightSpellTargets);

  // 5. In clearHighlights
  const oldClearHighlights = `    function clearHighlights() {
      document.querySelectorAll('.square').forEach(s => s.classList.remove('highlight-move', 'highlight-attack', 'highlight-deploy', 'highlight-spell-target'));
    }`;
  const newClearHighlights = `    function clearHighlights() {
      if (battleState) battleState.marciaSelectedUnit = null;
      document.querySelectorAll('.square').forEach(s => s.classList.remove('highlight-move', 'highlight-attack', 'highlight-deploy', 'highlight-spell-target'));
    }`;
  if (!content.includes(oldClearHighlights)) throw new Error('oldClearHighlights not found in ' + file);
  content = content.replace(oldClearHighlights, newClearHighlights);

  // 6. Replace castSpell and executeSpellAction
  if (!content.includes(exactSpellBlock)) throw new Error('exactSpellBlock not found in ' + file);
  content = content.replace(exactSpellBlock, newSpellBlock);

  // 7. In AI Engine
  const oldAIBlock = `    function runAI() {
      if (isP2P) return;

      const p2CommIdx = battleState.grid.findIndex(p => p && p.owner === 'p2' && p.type === 'commander');
      const p1CommIdx = battleState.grid.findIndex(p => p && p.owner === 'p1' && p.type === 'commander');

      if (p2CommIdx === -1) {
        continueAIActions(p2CommIdx, p1CommIdx);
        return;
      }

      if (battleState.p2.hand.length > 0) {
        const cardId = battleState.p2.hand[0];
        const card = CARDS_DB[cardId];
        const currentP2Altars = battleState.grid.filter(p => p && p.owner === 'p2' && p.type === 'altar').length;

        if (card && card.cost <= battleState.p2.mana && !(card.type === 'altar' && (battleState.p2.altarDeployedThisTurn || currentP2Altars >= 4))) {
          if (card.type !== 'spell') {
            const free = getAdjs(p2CommIdx).find(i => !battleState.grid[i]);
            if (free !== undefined) {
              battleState.p2.mana -= card.cost;
              battleState.p2.hand.shift();
              addLog(\`IA schiera \${card.name} su cella \${free}\`, 'p2');
              
              animateCardPlayed(card, () => {
                const hasSlancio = card.keywords && card.keywords.includes('slancio');
                battleState.grid[free] = { owner: 'p2', type: card.type, cardId: card.id, name: card.name, hp: card.hp, att: card.att, move: card.move || 'orth', range: 1, glyph: card.glyph, desc: card.desc, rarity: card.rarity || 'common', exhausted: !hasSlancio };
                if (card.type === 'altar') {
                  battleState.p2.altarDeployedThisTurn = true;
                  battleState.p2.maxMana = Math.min(4, battleState.p2.maxMana + 1);
                  battleState.p2.mana = Math.min(battleState.p2.maxMana, battleState.p2.mana + 1);
                  addLog("IA attiva Altare: +1 Mana max & istantaneo", 'p2');
                }
                renderPieces();
                updateHUD();
                continueAIActions(p2CommIdx, p1CommIdx);
              });
              return;
            }
          }
        }
      }

      continueAIActions(p2CommIdx, p1CommIdx);
    }

    function continueAIActions(p2CommIdx, p1CommIdx) {
      if (p2CommIdx !== -1 && p1CommIdx !== -1) {
        const adjs = getAdjs(p2CommIdx);
        if (adjs.includes(p1CommIdx)) {
          const attVal = battleState.grid[p2CommIdx].att;
          battleState.grid[p1CommIdx].hp -= attVal;
          addLog(\`IA attacca Comandante P1: -\${attVal} PV (PV residui P1: \${battleState.grid[p1CommIdx].hp})\`, 'p2');
        } else {
          const p1R = Math.floor(p1CommIdx / 8), p1C = p1CommIdx % 8;
          let bestSq = null;
          let minDistance = 999;

          adjs.filter(i => !battleState.grid[i]).forEach(sq => {
            const r = Math.floor(sq / 8), c = sq % 8;
            const dist = Math.hypot(p1R - r, p1C - c);
            if (dist < minDistance) {
              minDistance = dist;
              bestSq = sq;
            }
          });

          if (bestSq !== null) {
            addLog(\`IA muove Comandante da \${p2CommIdx} a \${bestSq}\`, 'p2');
            battleState.grid[bestSq] = battleState.grid[p2CommIdx];
            battleState.grid[p2CommIdx] = null;
          }
        }
      }

      renderPieces();
      checkWin();
      startTurnFor('p1');
    }`;

  const newAIBlock = `    // --- MOTORE IA COMBATTIVA, TATTICA ED OFFENSIVA ---
    function runAI() {
      if (isP2P) return;
      if (!battleState || battleState.turn !== 'p2' || battleState.phase !== 'active') return;

      addLog(\`--- TURNO IA AGGRESSIVA --- [Mana: \${battleState.p2.mana}/\${battleState.p2.maxMana}, Azioni: \${battleState.p2.actions}]\`, 'p2');

      // FASE 1: SCHIERAMENTO DINAMICO DI ALTARE E TRUPPE (Sfrutta tutto il Mana disponibile)
      aiDeployPhase(() => {
        // FASE 2: RITO SUPREMO DEL COMANDANTE SE DISPONIBILE
        aiCommanderRitePhase();

        // FASE 3: COMBATTIMENTO ED AVANZATA CON TUTTE LE UNITA (Sfrutta tutte le Azioni ⚡)
        aiCombatPhase(2, () => {
          renderPieces();
          updateHUD();
          checkWin();
          if (battleState && battleState.phase === 'active' && battleState.turn === 'p2') {
            setTimeout(() => startTurnFor('p1'), 500);
          }
        });
      });
    }

    function aiGetDeployableSquares() {
      const deploySources = [];
      battleState.grid.forEach((p, idx) => {
        if (p && p.owner === 'p2' && (p.type === 'commander' || p.type === 'altar')) {
          deploySources.push(idx);
        }
      });
      const freeSquares = new Set();
      deploySources.forEach(src => {
        getAdjs(src).forEach(adj => {
          if (!battleState.grid[adj]) freeSquares.add(adj);
        });
      });
      return Array.from(freeSquares);
    }

    function aiDeployPhase(onComplete) {
      if (!battleState || !battleState.p2) return onComplete();

      // 1. Schiera Altare se possibile e vantaggioso (< 4 altari)
      const currentAltars = battleState.grid.filter(p => p && p.owner === 'p2' && p.type === 'altar').length;
      if (!battleState.p2.altarDeployedThisTurn && currentAltars < 4) {
        const altarIdx = battleState.p2.hand.findIndex(cId => {
          const c = CARDS_DB[cId];
          return c && c.type === 'altar' && c.cost <= battleState.p2.mana;
        });
        if (altarIdx !== -1) {
          const cardId = battleState.p2.hand[altarIdx];
          const card = CARDS_DB[cardId];
          const freeSqs = aiGetDeployableSquares();
          if (freeSqs.length > 0) {
            // Posiziona l'altare nelle righe arretrate (righe 6 o 7)
            freeSqs.sort((a, b) => Math.floor(b / 8) - Math.floor(a / 8));
            const targetSq = freeSqs[0];

            battleState.p2.mana -= card.cost;
            battleState.p2.hand.splice(altarIdx, 1);
            battleState.p2.altarDeployedThisTurn = true;
            battleState.p2.maxMana = Math.min(4, battleState.p2.maxMana + 1);
            battleState.p2.mana = Math.min(battleState.p2.maxMana, battleState.p2.mana + 1);

            battleState.grid[targetSq] = {
              owner: 'p2',
              type: 'altar',
              cardId: card.id,
              name: card.name,
              hp: card.hp || 6,
              att: card.att || 0,
              move: 'none',
              range: 0,
              glyph: card.glyph || '🏛️',
              desc: card.desc,
              rarity: card.rarity || 'common',
              exhausted: false
            };
            addLog(\`IA attiva Altare: \${card.name} su cella \${targetSq} (+1 Mana max!)\`, 'p2');
            renderPieces();
            updateHUD();
          }
        }
      }

      // 2. Schiera quante più unità possibili con il Mana rimasto
      let canDeployMore = true;
      while (canDeployMore && battleState.p2.mana > 0) {
        canDeployMore = false;
        const unitIdx = battleState.p2.hand.findIndex(cId => {
          const c = CARDS_DB[cId];
          return c && c.type === 'unit' && c.cost <= battleState.p2.mana;
        });

        if (unitIdx !== -1) {
          const cardId = battleState.p2.hand[unitIdx];
          const card = CARDS_DB[cardId];
          const freeSqs = aiGetDeployableSquares();
          if (freeSqs.length > 0) {
            // Ordina verso il nemico (Comandante P1)
            const p1CommIdx = battleState.grid.findIndex(p => p && p.owner === 'p1' && p.type === 'commander');
            if (p1CommIdx !== -1) {
              const p1R = Math.floor(p1CommIdx / 8), p1C = p1CommIdx % 8;
              freeSqs.sort((a, b) => {
                const distA = Math.hypot(p1R - Math.floor(a / 8), p1C - (a % 8));
                const distB = Math.hypot(p1R - Math.floor(b / 8), p1C - (b % 8));
                return distA - distB;
              });
            }
            const targetSq = freeSqs[0];

            battleState.p2.mana -= card.cost;
            battleState.p2.hand.splice(unitIdx, 1);

            const hasSlancio = (card.slancio || (card.keywords && card.keywords.includes('slancio')) || (card.desc && card.desc.includes('Slancio')));
            battleState.grid[targetSq] = {
              owner: 'p2',
              type: 'unit',
              cardId: card.id,
              name: card.name,
              hp: card.hp || 3,
              att: card.att || 2,
              move: card.move || 'orth',
              range: card.gittata || 1,
              glyph: card.glyph || '⚔️',
              desc: card.desc,
              rarity: card.rarity || 'common',
              exhausted: !hasSlancio
            };
            addLog(\`IA schiera \${card.name} (\${card.att}/\${card.hp}) su cella \${targetSq}\${hasSlancio ? ' [SLANCIO PRONTO!]' : ''}\`, 'p2');
            canDeployMore = true;
            renderPieces();
            updateHUD();
          }
        }
      }

      // 3. Usa sortilegi distruttivi se disponibili
      const spellIdx = battleState.p2.hand.findIndex(cId => {
        const c = CARDS_DB[cId];
        return c && (c.type === 'spell' || c.type === 'reaction') && c.cost <= battleState.p2.mana;
      });
      if (spellIdx !== -1) {
        const cardId = battleState.p2.hand[spellIdx];
        const card = CARDS_DB[cardId];
        const p1AltarIdx = battleState.grid.findIndex(p => p && p.owner === 'p1' && p.type === 'altar');
        if (p1AltarIdx !== -1 && (card.name === 'Frantumare la Pietra' || card.id === 'spell_cleave')) {
          battleState.p2.mana -= card.cost;
          battleState.p2.hand.splice(spellIdx, 1);
          const altar = battleState.grid[p1AltarIdx];
          addLog(\`IA lancia Frantumare la Pietra polverizzando l'Altare nemico \${altar.name}!\`, 'p2');
          battleState.grid[p1AltarIdx] = null;
          renderPieces();
          updateHUD();
        }
      }

      setTimeout(onComplete, 200);
    }

    function aiCommanderRitePhase() {
      const comm = battleState.p2.commander;
      if (!comm || !comm.riteCost) return;
      if (battleState.p2.blood >= comm.riteCost) {
        battleState.p2.blood -= comm.riteCost;
        addLog(\`IA attiva il Rito Supremo: \${comm.name}! [-\${comm.riteCost}🩸]\`, 'p2');
        if (comm.id === 'ignis' || comm.id === 'morbida') {
          const p1Units = battleState.grid.map((p, i) => ({ p, i })).filter(item => item.p && item.p.owner === 'p1');
          if (p1Units.length > 0) {
            const target = p1Units[0];
            target.p.hp -= 2;
            addLog(\`Rito di \${comm.name} infligge 2 danni a \${target.p.name}!\`, 'p2');
            if (target.p.hp <= 0) handlePieceDefeated(target.i, 'p2');
          }
        }
        renderPieces();
        updateHUD();
      }
    }

    function aiCombatPhase(actionsLeft, onComplete) {
      if (actionsLeft <= 0 || !battleState || battleState.phase !== 'active') {
        return onComplete();
      }

      const readyPieces = [];
      battleState.grid.forEach((p, idx) => {
        if (p && p.owner === 'p2' && p.type !== 'altar' && !p.exhausted) {
          readyPieces.push({ idx, piece: p });
        }
      });

      if (readyPieces.length === 0) {
        return onComplete();
      }

      // 1. Priorità di attacco immediato
      let bestAttack = null;
      for (const item of readyPieces) {
        const moves = getValidMoves(item.idx, item.piece);
        if (moves.attacks && moves.attacks.length > 0) {
          for (const targetIdx of moves.attacks) {
            const def = battleState.grid[targetIdx];
            if (!def || def.owner !== 'p1') continue;

            let score = 10;
            if (def.type === 'commander') score = 100;
            else if (def.hp <= item.piece.att) score = 50;
            else if (def.type === 'altar') score = 20;

            if (!bestAttack || score > bestAttack.score) {
              bestAttack = { from: item.idx, to: targetIdx, score };
            }
          }
        }
      }

      if (bestAttack) {
        addLog(\`IA sceglie di attaccare con determinazione!\`, 'p2');
        executeAttackAction(bestAttack.from, bestAttack.to, 'p2', false);
        renderPieces();
        updateHUD();
        checkWin();
        setTimeout(() => aiCombatPhase(actionsLeft - 1, onComplete), 500);
        return;
      }

      // 2. Avanzata aggressiva verso il nemico
      const p1CommIdx = battleState.grid.findIndex(p => p && p.owner === 'p1' && p.type === 'commander');
      const targetR = p1CommIdx !== -1 ? Math.floor(p1CommIdx / 8) : 0;
      const targetC = p1CommIdx !== -1 ? p1CommIdx % 8 : 3;

      let bestMove = null;
      for (const item of readyPieces) {
        const moves = getValidMoves(item.idx, item.piece);
        if (moves.moves && moves.moves.length > 0) {
          const curR = Math.floor(item.idx / 8), curC = item.idx % 8;
          const currentDist = Math.hypot(targetR - curR, targetC - curC);

          for (const mIdx of moves.moves) {
            const mR = Math.floor(mIdx / 8), mC = mIdx % 8;
            const newDist = Math.hypot(targetR - mR, targetC - mC);
            const progress = currentDist - newDist;

            if (!bestMove || progress > bestMove.progress) {
              bestMove = { from: item.idx, to: mIdx, piece: item.piece, progress };
            }
          }
        }
      }

      if (bestMove && bestMove.progress >= 0) {
        executeMoveAction(bestMove.from, bestMove.to, 'p2', false);
        renderPieces();
        updateHUD();
        setTimeout(() => aiCombatPhase(actionsLeft - 1, onComplete), 500);
        return;
      }

      onComplete();
    }`;

  if (!content.includes(oldAIBlock)) throw new Error('oldAIBlock not found in ' + file);
  content = content.replace(oldAIBlock, newAIBlock);

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully patched", file);
}

patchFile('index.html');
patchFile('crownfall.html');

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality index.html === crownfall.html:', f1 === f2);
console.log('File size:', f1.length);
