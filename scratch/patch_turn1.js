const fs = require('fs');

let html = fs.readFileSync('../index.html', 'utf8');

// Replace startBattle
const startBattlePattern = /function startBattle\(mode\) \{[\s\S]*?showPaneDirect\('battle'\);\n\s*createBoard\(\);\n\s*highlightPlacementRow\('p1'\);\n\s*addLog\("Nuova battaglia avviata: Single Player vs IA", 'sys'\);\n\s*showToast\("Piazza il tuo Comandante sulla prima riga \(a1–h1\)!"\);\n\s*updateHUD\(\);\n\s*\}/;

const newStartBattle = `function startBattle(mode) {
      if (mode === 'p2p') {
        return hostMultiplayer();
      }
      isP2P = false;
      myP2PRole = 'p1';

      const deckSelect = document.getElementById('lobby-deck-select-ai');
      const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
      let deck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
      deck.cards = ensureDeck30Cards(deck);

      const aiCommId = document.getElementById('lobby-ai-select') ? document.getElementById('lobby-ai-select').value : 'malakor';
      const aiComm = COMMANDERS[aiCommId] || COMMANDERS['malakor'];
      const p1Comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];

      battleLogs = [];
      const logContainer = document.getElementById('log-entries');
      if (logContainer) logContainer.innerHTML = '';

      battleState = {
        isP2P: false,
        myRole: 'p1',
        phase: 'active',
        turn: 'p1',
        round: 1,
        p1: {
          name: currentUser ? (currentUser.username || 'P1') : 'Condottiero',
          commander: p1Comm,
          hp: p1Comm.hp,
          mana: 1,
          maxMana: 1,
          blood: 0,
          actions: 2,
          altarDeployedThisTurn: false,
          deck: [...deck.cards].sort(() => Math.random() - 0.5),
          hand: []
        },
        p2: {
          name: 'IA Avversaria',
          commander: aiComm,
          hp: aiComm.hp,
          mana: 1,
          maxMana: 1,
          blood: 0,
          actions: 2,
          altarDeployedThisTurn: false,
          deck: [...defaultBaseDeck].sort(() => Math.random() - 0.5),
          hand: []
        },
        grid: Array(64).fill(null),
        selectedSquare: null,
        selectedHandIndex: null,
        nextTurnManaDrainP1: 0,
        nextTurnManaDrainP2: 0,
        p1Placed: true,
        p2Placed: true,
        hasDrawnInitialCards: true
      };

      // Schieramento automatico Comandanti
      const p1Idx = 60; // riga 7, colonna 4
      const p2Idx = 4;  // riga 0, colonna 4
      
      battleState.grid[p1Idx] = {
        owner: 'p1', type: 'commander', cardId: p1Comm.id, name: p1Comm.name, hp: p1Comm.hp, att: p1Comm.att,
        move: p1Comm.move, range: 1, glyph: p1Comm.glyph, rarity: 'legendary', riteDesc: p1Comm.riteDesc, riteCost: p1Comm.riteCost, archetype: p1Comm.archetype, exhausted: false
      };
      
      battleState.grid[p2Idx] = {
        owner: 'p2', type: 'commander', cardId: aiComm.id, name: aiComm.name, hp: aiComm.hp, att: aiComm.att,
        move: aiComm.move, range: 1, glyph: aiComm.glyph, rarity: 'legendary', riteDesc: aiComm.riteDesc, riteCost: aiComm.riteCost, archetype: aiComm.archetype, exhausted: false
      };

      showPaneDirect('battle');
      createBoard();
      
      for (let i = 0; i < 4; i++) { drawCard('p1'); drawCard('p2'); }
      
      renderPieces();
      updateHUD();
      renderHand();
      addLog("Nuova battaglia avviata: Single Player vs IA", 'sys');
      addLog("--- INIZIO BATTAGLIA (Turno P1) ---", 'sys');
      showToast("Comandanti schierati! Inizia il duello. Turno di P1.");
    }`;

// Replace startBattleP2P
const startBattleP2PPattern = /function startBattleP2P\(hostData, guestData, role\) \{[\s\S]*?showPaneDirect\('battle'\);\n\s*createBoard\(\);\n\s*highlightPlacementRow\(role\);\n\s*addLog\("Nuova battaglia avviata: Multiplayer", 'sys'\);\n\s*showToast\("Piazza il tuo Comandante sulla riga iniziale!"\);\n\s*updateHUD\(\);\n\s*\}/;

const newStartBattleP2P = `function startBattleP2P(hostData, guestData, role) {
      isP2P = true;
      myP2PRole = role;

      const p1Comm = COMMANDERS[hostData.commanderId] || COMMANDERS['valeria'];
      const p2Comm = COMMANDERS[guestData.commanderId] || COMMANDERS['malakor'];
      const myDeckName = userState.activeDeckName;
      let deck = userState.decks[myDeckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
      deck.cards = ensureDeck30Cards(deck);

      battleLogs = [];
      const logContainer = document.getElementById('log-entries');
      if (logContainer) logContainer.innerHTML = '';

      battleState = {
        isP2P: true,
        myRole: role,
        phase: 'active',
        turn: 'p1',
        round: 1,
        p1: {
          name: hostData.username,
          commander: p1Comm,
          hp: p1Comm.hp,
          mana: 1,
          maxMana: 1,
          blood: 0,
          actions: 2,
          altarDeployedThisTurn: false,
          deck: role === 'p1' ? [...deck.cards].sort(() => Math.random() - 0.5) : [],
          hand: []
        },
        p2: {
          name: guestData.username,
          commander: p2Comm,
          hp: p2Comm.hp,
          mana: 1,
          maxMana: 1,
          blood: 0,
          actions: 2,
          altarDeployedThisTurn: false,
          deck: role === 'p2' ? [...deck.cards].sort(() => Math.random() - 0.5) : [],
          hand: []
        },
        grid: Array(64).fill(null),
        selectedSquare: null,
        selectedHandIndex: null,
        nextTurnManaDrainP1: 0,
        nextTurnManaDrainP2: 0,
        p1Placed: true,
        p2Placed: true,
        hasDrawnInitialCards: true
      };

      // Schieramento automatico Comandanti
      const p1Idx = 60; // riga 7, colonna 4
      const p2Idx = 4;  // riga 0, colonna 4
      
      battleState.grid[p1Idx] = {
        owner: 'p1', type: 'commander', cardId: p1Comm.id, name: p1Comm.name, hp: p1Comm.hp, att: p1Comm.att,
        move: p1Comm.move, range: 1, glyph: p1Comm.glyph, rarity: 'legendary', riteDesc: p1Comm.riteDesc, riteCost: p1Comm.riteCost, archetype: p1Comm.archetype, exhausted: false
      };
      
      battleState.grid[p2Idx] = {
        owner: 'p2', type: 'commander', cardId: p2Comm.id, name: p2Comm.name, hp: p2Comm.hp, att: p2Comm.att,
        move: p2Comm.move, range: 1, glyph: p2Comm.glyph, rarity: 'legendary', riteDesc: p2Comm.riteDesc, riteCost: p2Comm.riteCost, archetype: p2Comm.archetype, exhausted: false
      };

      showPaneDirect('battle');
      createBoard();

      if (role === 'p1') {
        for (let i = 0; i < 4; i++) { drawCard('p1'); }
      } else {
        for (let i = 0; i < 4; i++) { drawCard('p2'); }
      }
      
      renderPieces();
      updateHUD();
      renderHand();
      addLog("Nuova battaglia avviata: Multiplayer", 'sys');
      addLog("--- INIZIO BATTAGLIA (Turno P1) ---", 'sys');
      showToast("Comandanti schierati! Turno di P1.");
    }`;

// In onSquareClick remove the placement phase warning/block. 
// Just to be safe, phase won't be 'placement' anymore, so it's naturally bypassed.

// Remove handleNetMsg handling for SYNC_PLACEMENT
const handleNetMsgPattern = /if \(data\.type === 'SYNC_PLACEMENT'\) \{[\s\S]*?addLog\("--- INIZIO BATTAGLIA \(Turno P1\) ---", 'sys'\);\n\s*\}\n\s*\} else if/;
const newHandleNetMsgPattern = "if";

html = html.replace(startBattlePattern, newStartBattle);
html = html.replace(startBattleP2PPattern, newStartBattleP2P);
html = html.replace(handleNetMsgPattern, "if");

// For Deploy action, just make sure to consume mana. executeDeployAction already does that.
// The prompt says "Cliccando una carta giocabile devono illuminarsi solo le caselle adiacenti libere attorno al Comandante"
// That logic is in highlightDeploy()

fs.writeFileSync('../index.html', html, 'utf8');
console.log('Done patch turn 1');
