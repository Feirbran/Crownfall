const fs = require('fs');

const actualOld = fs.readFileSync('scratch/actual_old_net.txt', 'utf8').replace(/\r?\n/g, '\n');

const newNetBlock = `// --- 5. NETWORKING MULTIPLAYER IBRIDO (SUPABASE REALTIME WEBSOCKET + BROADCASTCHANNEL + WEBRTC) ---
    function copyHostRoomCode() {
      if (!currentRoomCode) return;
      const text = currentRoomCode;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast("📋 Codice Stanza copiato: " + text);
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }

    function pasteRoomCode() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(text => {
          const el = document.getElementById('join-room-input');
          if (el) el.value = text.trim().toUpperCase();
          showToast("Codice incollato!");
        }).catch(() => {
          showToast("Incolla manualmente con Ctrl+V");
        });
      } else {
        showToast("Incolla manualmente con Ctrl+V");
      }
    }

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast("📋 Codice Stanza copiato: " + text);
      } catch (e) {
        showToast("Seleziona e copia il codice manualmente.");
      }
      document.body.removeChild(ta);
    }

    // Server STUN Google affidabili per WebRTC P2P diretto
    const TURN_ICE_SERVERS = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' }
    ];

    function normalizePeerCode(input) {
      if (!input) return '';
      let clean = input.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!clean.startsWith('cf')) {
        clean = 'cf' + clean;
      }
      return clean;
    }

    function cleanupNetwork() {
      if (netSbChannel && sbClient) {
        try { sbClient.removeChannel(netSbChannel); } catch(e){}
        netSbChannel = null;
      }
      if (netBC) {
        try { netBC.close(); } catch(e){}
        netBC = null;
      }
      if (netConn) {
        try { netConn.close(); } catch(e){}
        netConn = null;
      }
      if (netPeer) {
        try { netPeer.destroy(); } catch(e){}
        netPeer = null;
      }
    }

    function hostMultiplayer() {
      cleanupNetwork();
      const deckSelect = document.getElementById('lobby-deck-select-p2p');
      const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
      let deck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
      deck.cards = ensureDeck30Cards(deck);

      const rawNum = Math.floor(1000 + Math.random() * 9000);
      const displayCode = 'CF-' + rawNum;
      const peerCode = 'cf' + rawNum;
      currentRoomCode = displayCode;
      isP2P = true;
      myP2PRole = 'p1';

      const hostDisplay = document.getElementById('host-id-display');
      if (hostDisplay) {
        hostDisplay.innerHTML = \`
          <div style="background: rgba(229,185,88,0.1); border: 2px dashed var(--gold-primary); border-radius: 8px; padding: 12px; text-align: center; margin-top: 6px;">
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--gold-primary); text-transform: uppercase;">CODICE STANZA:</div>
            <div id="host-room-code-display" style="font-size: 1.8rem; font-weight: 900; color: #fff; letter-spacing: 3px; margin: 4px 0; user-select: all; -webkit-user-select: all;">\${displayCode}</div>
            <button type="button" class="btn btn-gold" onclick="copyHostRoomCode()" style="padding: 5px 12px; font-size: 0.78rem; font-weight: 800;">📋 COPIA CODICE</button>
            <div id="host-status-msg" style="font-size: 0.76rem; color: #a4b0be; margin-top: 8px;">⏳ Connessione al Cloud Relay in corso...</div>
          </div>
        \`;
      }

      initNetwork(peerCode, true);
      showToast(\`Stanza \${displayCode} creata! Comunica il codice all'avversario.\`);
    }
    const hostP2PMatch = hostMultiplayer;

    function joinMultiplayer() {
      const inputEl = document.getElementById('join-room-input');
      const rawVal = (inputEl ? inputEl.value : '').trim();
      if (!rawVal) return showToast("Inserisci il codice della stanza fornito dall'Host!");

      cleanupNetwork();
      const peerCode = normalizePeerCode(rawVal);
      currentRoomCode = peerCode.toUpperCase();
      isP2P = true;
      myP2PRole = 'p2';

      showToast(\`Connessione alla stanza \${currentRoomCode}...\`);
      initNetwork(peerCode, false);

      let attempts = 0;
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
      }, 2000);
    }
    const joinP2PMatch = joinMultiplayer;

    function initNetwork(peerCode, isHost) {
      // 1. Canale Cloud Relay Globale via Supabase Realtime (garantito al 100% su qualsiasi rete Internet / Torino <-> Mondo)
      if (sbClient) {
        try {
          netSbChannel = sbClient.channel('crownfall_room_' + peerCode, {
            config: { broadcast: { self: false } }
          });

          netSbChannel.on('broadcast', { event: 'game_msg' }, ({ payload }) => {
            if (payload && payload.senderId !== localClientId) {
              handleNetMsg(payload);
            }
          });

          netSbChannel.subscribe((status) => {
            console.log("Supabase Realtime status per stanza " + peerCode + ":", status);
            if (status === 'SUBSCRIBED') {
              if (isHost) {
                const statusEl = document.getElementById('host-status-msg');
                if (statusEl) statusEl.textContent = "🟢 Stanza online attiva sul Cloud! In attesa dell'avversario...";
              } else {
                console.log("Guest iscritto alla stanza Cloud. Invio pacchetto di ingresso HELLO_JOIN...");
                sendGuestHello();
              }
            }
          });
        } catch(e) {
          console.warn("Supabase Realtime init error:", e);
        }
      }

      // 2. Canale locale BroadcastChannel (per test istantaneo tra schede nello stesso browser/PC)
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          netBC = new BroadcastChannel('crownfall_' + peerCode);
          netBC.onmessage = (ev) => {
            if (ev.data && ev.data.senderId !== localClientId) {
              handleNetMsg(ev.data);
            }
          };
        }
      } catch(e) {
        console.warn("BroadcastChannel err:", e);
      }

      // 3. WebRTC PeerJS (canale P2P diretto ausiliario)
      if (typeof Peer !== 'undefined') {
        try {
          if (isHost) {
            netPeer = new Peer(peerCode, {
              debug: 1,
              config: { iceServers: TURN_ICE_SERVERS }
            });

            netPeer.on('open', (id) => {
              console.log("PeerJS Host online con ID:", id);
            });

            netPeer.on('connection', (conn) => {
              netConn = conn;
              conn.on('open', () => {
                console.log("PeerJS WebRTC connesso con Guest!");
              });
              conn.on('data', (data) => handleNetMsg(data));
              conn.on('error', (e) => console.warn("Host WebRTC conn err:", e));
            });

            netPeer.on('error', (err) => {
              console.warn("PeerJS Host error:", err);
            });
          } else {
            // Guest
            netPeer = new Peer({
              debug: 1,
              config: { iceServers: TURN_ICE_SERVERS }
            });

            netPeer.on('open', (guestId) => {
              console.log("PeerJS Guest registrato:", guestId, "-> tento connessione WebRTC a:", peerCode);
              attemptGuestConnect(peerCode);
            });

            netPeer.on('error', (err) => {
              console.warn("PeerJS Guest error:", err);
            });
          }
        } catch(e) {
          console.warn("Peer init error:", e);
        }
      }
    }

    function attemptGuestConnect(hostId) {
      if (!netPeer || netPeer.destroyed) return;
      if (netConn && (netConn.open || netConn._open)) return; // Già connesso o handshake in corso
      try {
        netConn = netPeer.connect(hostId, { reliable: true });
        if (netConn) {
          netConn.on('open', () => {
            console.log("WebRTC aperto con Host!");
            sendGuestHello();
          });
          netConn.on('data', (data) => handleNetMsg(data));
          netConn.on('error', (e) => console.warn("Guest conn err:", e));
        }
      } catch(e) { console.warn("Connect attempt failed:", e); }
    }

    function sendGuestHello() {
      const deckSelect = document.getElementById('lobby-deck-select-p2p');
      const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
      let deck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
      const validCards = ensureDeck30Cards(deck);
      sendNetMsg({
        type: 'HELLO_JOIN',
        username: currentUser ? (currentUser.username || 'Condottiero 2') : 'Ospite',
        commanderId: deck.commanderId || 'valeria',
        cards: validCards
      });
    }

    function sendNetMsg(payload) {
      if (!payload) return;
      payload.senderId = localClientId;
      if (!payload.msgId) {
        payload.msgId = localClientId + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      }

      // 1. Cloud Relay via Supabase Realtime WebSockets (Internet globale WAN - Torino <-> Mondo)
      if (netSbChannel) {
        try {
          netSbChannel.send({
            type: 'broadcast',
            event: 'game_msg',
            payload: payload
          });
        } catch(e){}
      }

      // 2. Canale locale BroadcastChannel (stesso PC / schede locali)
      if (netBC) {
        try { netBC.postMessage(payload); } catch(e){}
      }

      // 3. WebRTC DataChannel (P2P diretto)
      if (netConn && netConn.open) {
        try { netConn.send(payload); } catch(e){}
      }
    }
    const sendP2P = sendNetMsg;

    function handleNetMsg(data) {
      if (!data || !data.type) return;

      // Deduplicazione pacchetti (nel caso arrivino sia via Supabase che via locale/WebRTC)
      if (data.msgId) {
        if (processedNetMsgIds.has(data.msgId)) return;
        processedNetMsgIds.add(data.msgId);
        if (processedNetMsgIds.size > 250) {
          const first = processedNetMsgIds.values().next().value;
          processedNetMsgIds.delete(first);
        }
      }

      if (data.type === 'HELLO_JOIN') {
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
      } else if (data.type === 'HELLO_HOST') {
        if (myP2PRole === 'p2') {
          if (battleState && battleState.phase) return;

          const deckSelect = document.getElementById('lobby-deck-select-p2p');
          const deckName = deckSelect ? deckSelect.value : userState.activeDeckName;
          let guestDeck = userState.decks[deckName] || userState.decks['Mazzo Base'] || Object.values(userState.decks)[0];
          guestDeck.cards = ensureDeck30Cards(guestDeck);

          const hostData = {
            username: data.username,
            commanderId: data.commanderId,
            cards: data.p1Cards || data.cards,
            shuffledDeck: data.p1Cards
          };
          const guestData = {
            username: currentUser ? (currentUser.username || 'Ospite') : 'Condottiero 2',
            commanderId: guestDeck.commanderId || 'valeria',
            cards: data.p2Cards || guestDeck.cards,
            shuffledDeck: data.p2Cards
          };

          startBattleP2P(hostData, guestData, 'p2');
        }
      } else if (data.type === 'SYNC_PLACEMENT') {
        const comm = (data.role === 'p1') ? battleState.p1.commander : battleState.p2.commander;
        battleState.grid[data.idx] = {
          owner: data.role,
          type: 'commander',
          cardId: comm.id,
          name: comm.name,
          hp: comm.hp,
          att: comm.att,
          move: comm.move,
          range: 1,
          glyph: comm.glyph,
          rarity: 'legendary',
          riteDesc: comm.riteDesc,
          riteCost: comm.riteCost,
          archetype: comm.archetype,
          exhausted: false
        };
        battleState[data.role + 'Placed'] = true;
        addLog(\`\${data.role.toUpperCase()} piazza Comandante su cella \${data.idx}\`, data.role);
        renderPieces();

        if (battleState.p1Placed && battleState.p2Placed && !battleState.hasDrawnInitialCards) {
          battleState.hasDrawnInitialCards = true;
          document.querySelectorAll('.square').forEach(s => s.classList.remove('highlight-placement'));
          battleState.phase = 'active';
          battleState.turn = 'p1';
          for (let i = 0; i < 4; i++) {
            drawCard('p1');
            drawCard('p2');
          }
          renderPieces();
          updateHUD();
          renderHand();
          showToast("Entrambi i Comandanti schierati! Turno di P1.");
          addLog("--- INIZIO BATTAGLIA (Turno P1) ---", 'sys');
        }
      } else if (data.type === 'ACTION_MOVE') {
        executeMoveAction(data.from, data.to, data.player, false);
      } else if (data.type === 'ACTION_ATTACK') {
        executeAttackAction(data.from, data.to, data.player, false);
      } else if (data.type === 'ACTION_DEPLOY') {
        executeDeployAction(data.idx, data.cardId, data.player, false);
      } else if (data.type === 'ACTION_SPELL') {
        executeSpellAction(data.cardId, data.targetIdx, data.player, false);
      } else if (data.type === 'ACTION_RITE') {
        executeRiteAction(data.player, false);
      } else if (data.type === 'ACTION_KAELEN_SWAP') {
        executeKaelenSwap(data.firstIdx, data.secondIdx, data.player, false);
      } else if (data.type === 'SYNC_END_TURN') {
        startTurnFor(data.nextTurn);
      }
    }`;

function patchFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\r?\n/g, '\n');

  if (!content.includes(actualOld)) {
    throw new Error('actualOld not found in ' + file);
  }

  content = content.replace(actualOld, newNetBlock);
  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully patched multiplayer networking in', file);
}

patchFile('index.html');
patchFile('crownfall.html');

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict byte-for-byte equality:', f1 === f2);
console.log('New file size:', f1.length);
