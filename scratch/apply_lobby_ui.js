const fs = require('fs');

function updateFile(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. UPDATE CSS FOR LOBBY
  const cssStartMarker = '    /* LOBBY BROWSER & OPEN ROOMS SIDEBAR */';
  const cssEndMarker = '    /* FLOATING COLLISION POPUP & IMPACT ANIMATIONS */';

  const startIndex = content.indexOf(cssStartMarker);
  const endIndex = content.indexOf(cssEndMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found for CSS in ' + filename);
    return false;
  }

  const newLobbyCss = `    /* LOBBY BROWSER & OPEN ROOMS SIDEBAR (PREMIUM REDESIGN) */
    .lobby-layout-wrap {
      max-width: 1280px;
      width: 100%;
      margin: 16px auto 36px auto;
      padding: 0 16px;
      display: grid;
      grid-template-columns: 1.22fr 0.78fr;
      gap: 24px;
      align-items: stretch;
    }

    @media (max-width: 1024px) {
      .lobby-layout-wrap {
        grid-template-columns: 1fr;
      }
    }

    .lobby-modes-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    @media (max-width: 768px) {
      .lobby-modes-grid {
        grid-template-columns: 1fr;
      }
    }

    .lobby-mode-card {
      background: linear-gradient(180deg, rgba(20, 22, 32, 0.96) 0%, rgba(13, 15, 22, 0.98) 100%);
      border: 1.5px solid var(--border-frame);
      border-radius: 12px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: relative;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .lobby-mode-card.multiplayer-card {
      border-color: rgba(229, 185, 88, 0.55);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), 0 0 20px rgba(229, 185, 88, 0.1), inset 0 1px 0 rgba(229, 185, 88, 0.2);
    }

    .lobby-mode-card:hover {
      border-color: var(--border-gold);
    }

    .lobby-card-title {
      font-family: 'Cinzel', serif;
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .lobby-field-label {
      font-size: 0.72rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .lobby-custom-select {
      width: 100%;
      padding: 9px 12px;
      background: #0b0d14;
      color: #fff;
      border: 1px solid var(--border-frame);
      border-radius: 6px;
      font-size: 0.84rem;
      font-weight: 600;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .lobby-custom-select:focus, .lobby-custom-select:hover {
      border-color: var(--gold-primary);
      box-shadow: 0 0 10px rgba(229, 185, 88, 0.25);
    }

    /* Commander Preview Card Inner */
    .lobby-comm-card-inner {
      background: radial-gradient(circle at top, rgba(29, 33, 48, 0.8) 0%, rgba(10, 11, 16, 0.95) 100%);
      border: 1px solid var(--border-frame);
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 9px;
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
      transition: border-color 0.2s ease;
    }

    .lobby-comm-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .lobby-comm-role {
      font-size: 0.68rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lobby-comm-identity {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lobby-comm-glyph {
      font-size: 1.8rem;
      line-height: 1;
      filter: drop-shadow(0 0 8px rgba(229, 185, 88, 0.4));
      flex-shrink: 0;
    }

    .lobby-comm-names {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }

    .lobby-comm-name {
      font-family: 'Cinzel', serif;
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lobby-comm-tags {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }

    .lobby-comm-tag {
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ced6e0;
    }

    .lobby-comm-tag.faction-ferro { background: rgba(116, 125, 140, 0.25); border-color: #a4b0be; color: #dfe4ea; }
    .lobby-comm-tag.faction-ceneri { background: rgba(235, 77, 75, 0.25); border-color: #ff7675; color: #ff7675; }
    .lobby-comm-tag.faction-marea { background: rgba(9, 132, 227, 0.25); border-color: #74b9ff; color: #74b9ff; }
    .lobby-comm-tag.faction-silenzio { background: rgba(253, 203, 110, 0.25); border-color: #ffeaa7; color: #ffeaa7; }
    .lobby-comm-tag.faction-forgia { background: rgba(230, 126, 34, 0.25); border-color: #e67e22; color: #fab1a0; }

    .lobby-comm-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .lobby-stat-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 5px;
      padding: 4px 6px;
      font-size: 0.72rem;
    }

    .lobby-stat-badge .stat-icon { font-size: 0.8rem; }
    .lobby-stat-badge .stat-lbl { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; }
    .lobby-stat-badge .stat-val { font-size: 0.76rem; font-weight: 900; color: #fff; white-space: nowrap; }

    .lobby-stat-badge.stat-pv .stat-val { color: #ff6b81; }
    .lobby-stat-badge.stat-att .stat-val { color: #ffd32a; }
    .lobby-stat-badge.stat-move .stat-val { color: #70a1ff; }

    .lobby-comm-rite-box {
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(229, 185, 88, 0.2);
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lobby-rite-header {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .lobby-rite-icon { font-size: 0.85rem; }

    .lobby-rite-title {
      font-size: 0.74rem;
      font-weight: 800;
      color: var(--gold-primary);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lobby-rite-cost-badge {
      font-size: 0.68rem;
      font-weight: 900;
      padding: 1px 6px;
      border-radius: 3px;
      background: rgba(153, 0, 18, 0.35);
      border: 1px solid var(--crimson-blood);
      color: #ff6b81;
      white-space: nowrap;
    }

    .lobby-rite-desc {
      font-family: 'Crimson Pro', serif;
      font-size: 0.85rem;
      line-height: 1.35;
      color: #e4e7eb;
    }

    /* Join Room Input Group */
    .lobby-join-group {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }

    .lobby-join-input {
      flex: 1;
      padding: 10px 12px;
      background: #0b0d14;
      border: 1.5px solid var(--border-frame);
      border-radius: 6px;
      color: #fff;
      font-family: monospace;
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      outline: none;
      transition: all 0.2s ease;
    }

    .lobby-join-input:focus {
      border-color: var(--gold-primary);
      box-shadow: 0 0 12px rgba(229, 185, 88, 0.3);
    }

    .lobby-join-input::placeholder {
      color: #57606f;
      font-size: 0.78rem;
      letter-spacing: 0;
    }

    .lobby-btn-paste {
      padding: 0 14px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-frame);
      border-radius: 6px;
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .lobby-btn-paste:hover {
      background: rgba(229, 185, 88, 0.15);
      border-color: var(--gold-primary);
      color: var(--gold-primary);
    }

    .lobby-open-rooms-panel {
      background: linear-gradient(180deg, rgba(20, 22, 32, 0.96) 0%, rgba(13, 15, 22, 0.98) 100%);
      border: 2px solid var(--border-gold);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.85), inset 0 0 25px rgba(201, 155, 66, 0.08);
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
    }

    .open-rooms-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-frame);
      padding-bottom: 12px;
    }

    .open-rooms-title {
      font-family: 'Cinzel', serif;
      font-size: 1.05rem;
      font-weight: 900;
      color: var(--gold-primary);
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .open-rooms-live-pill {
      font-size: 0.68rem;
      font-weight: 800;
      color: #2ed573;
      background: rgba(46, 213, 115, 0.12);
      border: 1px solid rgba(46, 213, 115, 0.4);
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .open-rooms-live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2ed573;
      box-shadow: 0 0 8px #2ed573;
      animation: liveDotPulse 1.8s infinite;
    }

    @keyframes liveDotPulse {
      0% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.7; }
    }

    .open-rooms-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 520px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .open-room-card {
      background: #0f1118;
      border: 1px solid var(--border-frame);
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: all 0.2s ease;
      position: relative;
    }

    .open-room-card:hover {
      border-color: var(--gold-primary);
      background: #141724;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.6);
    }

    .open-room-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .open-room-host {
      font-size: 0.88rem;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .open-room-code-badge {
      font-family: monospace;
      font-size: 0.82rem;
      font-weight: 900;
      color: var(--gold-primary);
      background: rgba(229, 185, 88, 0.12);
      border: 1px solid var(--border-gold);
      padding: 2px 7px;
      border-radius: 4px;
      letter-spacing: 1px;
    }

    .open-room-mid {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.76rem;
      color: var(--text-muted);
    }

    .open-room-comm-pill {
      color: #d8dce8;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .open-room-faction-tag {
      font-size: 0.65rem;
      padding: 2px 6px;
      border-radius: 3px;
      background: #1e2233;
      color: #a4b0be;
      border: 1px solid #3c425c;
      text-transform: uppercase;
    }

    .open-room-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }

    .open-room-time {
      font-size: 0.7rem;
      color: #718093;
    }

    .btn-quick-join {
      background: linear-gradient(135deg, #d4af37 0%, #aa771c 100%);
      color: #000;
      border: 1px solid #ffeaa7;
      font-size: 0.78rem;
      font-weight: 900;
      padding: 6px 14px;
      border-radius: 4px;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: all 0.2s;
      box-shadow: 0 3px 10px rgba(212, 175, 55, 0.3);
    }

    .btn-quick-join:hover {
      background: linear-gradient(135deg, #e5b958 0%, #c99b42 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(229, 185, 88, 0.5);
    }

    .open-rooms-empty {
      text-align: center;
      padding: 36px 16px;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .open-rooms-empty-icon {
      font-size: 2.2rem;
      opacity: 0.7;
    }

    .open-rooms-empty-title {
      font-size: 0.9rem;
      font-weight: 800;
      color: #d8dce8;
    }

    .open-rooms-empty-desc {
      font-size: 0.76rem;
      line-height: 1.45;
      max-width: 320px;
      color: #718093;
    }
\n`;

  content = content.slice(0, startIndex) + newLobbyCss + content.slice(endIndex);

  // 2. UPDATE HTML FOR PANE-BATTLE-LOBBY
  const htmlStartMarker = '    <!-- LOBBY (AI + MULTIPLAYER P2P + STANZE APERTE A LATO) -->';
  const htmlEndMarker = '    <!-- CAMPO DI BATTAGLIA -->';

  const htmlStartIndex = content.indexOf(htmlStartMarker);
  const htmlEndIndex = content.indexOf(htmlEndMarker);

  if (htmlStartIndex === -1 || htmlEndIndex === -1) {
    console.error('Markers not found for HTML in ' + filename);
    return false;
  }

  const newLobbyHtml = `    <!-- LOBBY (AI + MULTIPLAYER P2P + STANZE APERTE A LATO) -->
    <div id="pane-battle-lobby" class="pane">
      <div class="lobby-layout-wrap">
        
        <!-- COLONNA SINISTRA: MODALITÀ DI GIOCO -->
        <div class="lobby-main-col" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h2 style="font-family: 'Cinzel', serif; font-size: 1.7rem; color: var(--gold-primary); letter-spacing: 2px;">Lobby di Battaglia</h2>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">Scegli se allenarti contro l'IA tattica o sfidare un Condottiero online in tempo reale.</p>
          </div>

          <div class="lobby-modes-grid">
            <!-- Opzione 1: Single Player vs AI -->
            <div class="lobby-mode-card">
              <div class="lobby-card-title">
                <span>🤖</span>
                <span>Skirmish vs IA</span>
              </div>
              
              <div>
                <label class="lobby-field-label">📜 Tuo Grimorio:</label>
                <select id="lobby-deck-select-ai" class="lobby-custom-select" onchange="onLobbyDeckChanged('ai')"></select>
              </div>
              
              <div id="lobby-p1-card"></div>
              
              <div>
                <label class="lobby-field-label">👹 Condottiero IA Avversario:</label>
                <select id="lobby-ai-select" class="lobby-custom-select" onchange="updateLobbyP2Preview()"></select>
              </div>
              
              <div id="lobby-p2-card"></div>
              
              <button class="btn btn-gold" style="margin-top: auto; padding: 12px; font-weight: 800; font-size: 0.9rem;" onclick="startBattle('ai')">⚔️ GIOCA VS IA</button>
            </div>

            <!-- Opzione 2: Multiplayer Online & Locale -->
            <div class="lobby-mode-card multiplayer-card">
              <div class="lobby-card-title" style="color: var(--gold-primary);">
                <span>🌐</span>
                <span>Duello Multiplayer Online</span>
              </div>
              
              <div>
                <label class="lobby-field-label">📜 Tuo Grimorio:</label>
                <select id="lobby-deck-select-p2p" class="lobby-custom-select" onchange="onLobbyDeckChanged('p2p')"></select>
              </div>
              
              <div id="lobby-p2p-card"></div>
              
              <button class="btn btn-gold" onclick="hostMultiplayer()" style="font-weight: 800; padding: 12px; font-size: 0.88rem; box-shadow: 0 4px 15px rgba(229, 185, 88, 0.25);">👑 CREA STANZA (HOST)</button>
              <div id="host-id-display" style="font-size: 0.78rem; color: var(--gold-primary); word-break: break-all; min-height: 18px;"></div>

              <div style="border-top: 1px solid rgba(255,255,255,0.08); margin: 4px 0;"></div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label class="lobby-field-label">🔑 Oppure entra con codice:</label>
                <div class="lobby-join-group">
                  <input type="text" id="join-room-input" class="lobby-join-input" placeholder="ES. CF-8492" maxlength="20">
                  <button class="lobby-btn-paste" onclick="pasteRoomCode()" title="Incolla dagli appunti">📋 Incolla</button>
                </div>
                <button class="btn btn-crimson" onclick="joinMultiplayer()" style="font-weight: 800; padding: 12px; font-size: 0.88rem;">⚔️ ENTRA CON CODICE</button>
              </div>
            </div>
          </div>
        </div>

        <!-- COLONNA DESTRA: STANZE MULTIPLAYER APERTE A LATO -->
        <aside class="lobby-open-rooms-panel">
          <div class="open-rooms-header">
            <div class="open-rooms-title">
              <span>🏛️ STANZE APERTE</span>
              <span class="open-rooms-live-pill"><span class="open-rooms-live-dot"></span> LIVE CLOUD</span>
            </div>
            <button class="btn" onclick="refreshOpenRooms()" style="padding: 5px 12px; font-size: 0.76rem; border-color: var(--border-gold); color: var(--gold-primary); font-weight: 700;" title="Aggiorna elenco stanze">🔄 Aggiorna</button>
          </div>

          <p style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.45;">
            I Condottieri online compaiono qui in tempo reale. Clicca su <strong>"SFIDA ORA"</strong> per duellare istantaneamente!
          </p>

          <div id="open-rooms-list" class="open-rooms-list">
            <!-- Renderizzato dinamicamente da renderOpenRoomsList() -->
          </div>
        </aside>

      </div>
    </div>\n\n`;

  content = content.slice(0, htmlStartIndex) + newLobbyHtml + content.slice(htmlEndIndex);

  // 3. UPDATE JS FOR LOBBY PREVIEWS
  const jsOldMarker = '    function updateLobbyP1Preview() {';
  const jsEndMarker = '    function startBattle(mode) {';

  const jsStartIndex = content.indexOf(jsOldMarker);
  const jsEndIndex = content.indexOf(jsEndMarker);

  if (jsStartIndex === -1 || jsEndIndex === -1) {
    console.error('Markers not found for JS in ' + filename);
    return false;
  }

  const newJs = `    function getLobbyMoveLabel(move) {
      if (!move) return '1 Casella';
      const m = String(move).toLowerCase();
      if (m === 'orth' || m === 'ortho') return 'Ortogonale (1)';
      if (m === 'orth2' || m === 'ortho2') return 'Orto (2)';
      if (m === 'diag') return 'Diagonale (1)';
      if (m === 'diag2') return 'Diag (2)';
      if (m === 'knight') return 'Balzo a L';
      if (m === 'omni') return 'Omni (8 dir)';
      if (m === 'none') return 'Statico';
      return move;
    }

    function renderLobbyCommanderCard(c, roleLabel, isEnemy) {
      if (!c) return '';
      const rarity = c.rarity || 'legendary';
      const rarityName = RARITY_NAMES[rarity] || 'LEGGENDA';
      const moveText = getLobbyMoveLabel(c.move || c.rawMove);
      const factionName = c.faction || 'Neutrale';
      const borderColor = isEnemy ? 'rgba(235, 77, 75, 0.4)' : 'rgba(229, 185, 88, 0.4)';
      const nameColor = isEnemy ? '#ff7675' : 'var(--gold-primary)';
      const roleColor = isEnemy ? '#ff7675' : '#9ec5fe';

      return '<div class="lobby-comm-card-inner" style="border-color: ' + borderColor + ';">' +
        '<div class="lobby-comm-header">' +
          '<span class="lobby-comm-role" style="color: ' + roleColor + ';">' +
            (isEnemy ? '👹 ' : '👑 ') + roleLabel +
          '</span>' +
          '<span class="rarity-badge ' + rarity + '">' + rarityName + '</span>' +
        '</div>' +
        '<div class="lobby-comm-identity">' +
          '<span class="lobby-comm-glyph">' + (c.glyph || '🛡️') + '</span>' +
          '<div class="lobby-comm-names">' +
            '<div class="lobby-comm-name" style="color: ' + nameColor + ';">' + c.name + '</div>' +
            '<div class="lobby-comm-tags">' +
              '<span class="lobby-comm-tag faction-' + factionName.toLowerCase() + '">' + factionName + '</span>' +
              '<span class="lobby-comm-tag set-tag">Set ' + (c.set || 'α') + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="lobby-comm-stats-grid">' +
          '<div class="lobby-stat-badge stat-pv"><span class="stat-icon">❤️</span><span class="stat-lbl">PV</span><span class="stat-val">' + c.hp + '</span></div>' +
          '<div class="lobby-stat-badge stat-att"><span class="stat-icon">⚔️</span><span class="stat-lbl">ATT</span><span class="stat-val">' + c.att + '</span></div>' +
          '<div class="lobby-stat-badge stat-move"><span class="stat-icon">👟</span><span class="stat-lbl">Passo</span><span class="stat-val">' + moveText + '</span></div>' +
        '</div>' +
        '<div class="lobby-comm-rite-box">' +
          '<div class="lobby-rite-header">' +
            '<span class="lobby-rite-icon">🩸</span>' +
            '<span class="lobby-rite-title">' + (c.rite ? 'Rito: ' + c.rite : 'Potere del Condottiero') + '</span>' +
            '<span class="lobby-rite-cost-badge">' + (c.riteCost || c.bloodCost || 3) + ' 🩸</span>' +
          '</div>' +
          '<div class="lobby-rite-desc">' + (c.riteDesc || c.desc || '') + '</div>' +
        '</div>' +
      '</div>';
    }

    function updateLobbyP1Preview() {
      const deckSelect = document.getElementById('lobby-deck-select-ai');
      if (!deckSelect) return;
      const deck = userState.decks[deckSelect.value] || Object.values(userState.decks)[0];
      if (!deck) return;
      const c = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const p1Card = document.getElementById('lobby-p1-card');
      if (p1Card && c) {
        p1Card.innerHTML = renderLobbyCommanderCard(c, 'Comandante Assegnato', false);
      }
    }

    function updateLobbyP2PPreview() {
      const deckSelect = document.getElementById('lobby-deck-select-p2p');
      if (!deckSelect) return;
      const deck = userState.decks[deckSelect.value] || Object.values(userState.decks)[0];
      if (!deck) return;
      const c = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const p2pCard = document.getElementById('lobby-p2p-card');
      if (p2pCard && c) {
        p2pCard.innerHTML = renderLobbyCommanderCard(c, 'Comandante Assegnato', false);
      }
    }

    function updateLobbyP2Preview() {
      const sel = document.getElementById('lobby-ai-select');
      if (!sel) return;
      const c = COMMANDERS[sel.value] || COMMANDERS['malakor'];
      const p2Card = document.getElementById('lobby-p2-card');
      if (p2Card && c) {
        p2Card.innerHTML = renderLobbyCommanderCard(c, 'Condottiero IA Nemico', true);
      }
    }`;

  content = content.slice(0, jsStartIndex) + newJs + '\n\n    ' + content.slice(jsEndIndex);

  fs.writeFileSync(filename, content, 'utf8');
  console.log('Successfully updated ' + filename);
  return true;
}

const okIndex = updateFile('index.html');
const okCrownfall = updateFile('crownfall.html');

console.log('Update result:', { okIndex, okCrownfall });
