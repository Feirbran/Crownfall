const fs = require('fs');

function applyPixel8Fix(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. UPDATE BATTLE HTML (add Log toggle button and close button in battle log header)
  const oldBattleHudActions = `<div class="battle-hud-actions-row">
          <button class="btn btn-gold btn-hud-action" id="btn-rite-p1" onclick="useWeaponRiteP1()" onmouseenter="showRiteHoverCard(event)" onmousemove="updateHoverCardPos(event)" onmouseleave="hideHoverCard()">🩸 Rito d'Armi</button>
          <button class="btn btn-crimson btn-hud-action" id="btn-end-turn" onclick="advanceTurnPhase()">Passa a Fase 2 ⚔️</button>
          <button class="btn btn-crimson btn-surrender" id="btn-surrender" onclick="surrenderMatch()" title="Arrenditi ed esci dalla partita">🏳️ Resa</button>
        </div>`;

  const newBattleHudActions = `<div class="battle-hud-actions-row">
          <button class="btn btn-gold btn-hud-action" id="btn-rite-p1" onclick="useWeaponRiteP1()" onmouseenter="showRiteHoverCard(event)" onmousemove="updateHoverCardPos(event)" onmouseleave="hideHoverCard()">🩸 Rito</button>
          <button class="btn btn-crimson btn-hud-action" id="btn-end-turn" onclick="advanceTurnPhase()">Passa a Fase 2 ⚔️</button>
          <button class="btn btn-hud-action btn-log-toggle" onclick="toggleBattleLogMobile()" title="Visualizza registro eventi">📜 Log</button>
          <button class="btn btn-crimson btn-surrender" id="btn-surrender" onclick="surrenderMatch()" title="Arrenditi ed esci dalla partita">🏳️ Resa</button>
        </div>`;

  if (content.includes(oldBattleHudActions)) {
    content = content.replace(oldBattleHudActions, newBattleHudActions);
  }

  const oldLogHeader = `<div class="log-header">
            <span>📜 REGISTRO DI BATTAGLIA</span>
            <button class="btn" style="padding: 2px 6px; font-size: 0.65rem;" onclick="copyBattleLog()">📋 Copia Log</button>
          </div>`;

  const newLogHeader = `<div class="log-header">
            <span>📜 REGISTRO DI BATTAGLIA</span>
            <div style="display: flex; gap: 4px; align-items: center;">
              <button class="btn" style="padding: 2px 6px; font-size: 0.65rem;" onclick="copyBattleLog()">📋 Copia</button>
              <button class="btn btn-close-log-btn" style="padding: 2px 8px; font-size: 0.72rem; font-weight: 900; background: rgba(255,255,255,0.1);" onclick="toggleBattleLogMobile()">✕ Chiudi</button>
            </div>
          </div>`;

  if (content.includes(oldLogHeader)) {
    content = content.replace(oldLogHeader, newLogHeader);
  }

  // 2. INJECT toggleBattleLogMobile() IN JS
  const toggleJsFunc = `
    function toggleBattleLogMobile() {
      const drawer = document.getElementById('battle-log-drawer');
      if (drawer) {
        drawer.classList.toggle('mobile-open');
      }
    }
  `;

  if (!content.includes('function toggleBattleLogMobile()')) {
    content = content.replace('function copyBattleLog() {', toggleJsFunc + '\n    function copyBattleLog() {');
  }

  // 3. REPLACE CSS MOBILE BLOCK WITH PIXEL 8 & SMARTPHONE PRECISION SUITE
  const cssBlockOldRegex = /\/\* ==========================================================================\s+CROWNFALL — COMPREHENSIVE RESPONSIVE[\s\S]*?<\/style>/;

  const precisionMobileCss = `/* ==========================================================================
       CROWNFALL — PIXEL 8 & SMARTPHONE PRECISION ENGINE
       ========================================================================== */
    html, body {
      height: 100% !important;
      height: 100dvh !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      position: fixed !important;
      inset: 0 !important;
    }

    body {
      display: flex;
      flex-direction: column;
      background: var(--bg-dark);
      color: var(--text-main);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    main.view-container {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }

    .pane {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      background: var(--bg-dark);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .pane.active {
      display: flex !important;
    }

    /* BATTLE PANE SPECIFIC FIT */
    #pane-battle.active {
      display: flex !important;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden !important;
      height: 100% !important;
    }

    .battle-hud-players-row {
      display: contents;
    }
    .battle-hud-actions-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .btn-log-toggle {
      display: none;
    }
    .btn-close-log-btn {
      display: none;
    }
    .phase-label-short {
      display: none;
    }
    .phase-label-full {
      display: inline;
    }

    @media (max-width: 860px) {
      /* 1. TOP NAVIGATION */
      header.global-nav {
        height: 44px;
        min-height: 44px;
        padding: 4px 10px;
        gap: 6px;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .brand-title {
        font-size: 0.92rem;
        letter-spacing: 1px;
        gap: 4px;
        flex-shrink: 0;
      }
      .brand-title svg {
        width: 16px;
        height: 16px;
      }
      .nav-actions {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        overflow-x: auto;
      }
      .btn-nav {
        padding: 4px 8px;
        font-size: 0.68rem;
        white-space: nowrap;
        border-radius: 4px;
      }
      .gold-pill, .user-pill, .cloud-pill {
        font-size: 0.65rem;
        padding: 2px 6px;
        white-space: nowrap;
      }

      /* 2. BATTLE HUD */
      .battle-hud {
        padding: 4px 8px;
        flex-direction: column;
        gap: 4px;
        font-size: 0.72rem;
        flex-shrink: 0;
      }
      .battle-hud-players-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      .battle-hud .player-hud-box {
        gap: 5px;
        font-size: 0.70rem;
      }
      .hud-actions-label {
        display: none;
      }
      .hud-stat {
        gap: 2px;
      }
      .btn-hud-pile {
        padding: 2px 4px;
        font-size: 0.64rem;
        border-radius: 3px;
      }
      .battle-hud-actions-row {
        display: flex;
        width: 100%;
        gap: 4px;
        align-items: stretch;
      }
      .battle-hud-actions-row .btn-hud-action {
        flex: 1;
        padding: 6px 4px;
        font-size: 0.72rem;
        font-weight: 800;
        min-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .btn-log-toggle {
        display: flex !important;
        flex: 0 0 auto !important;
        padding: 6px 8px !important;
        font-size: 0.70rem !important;
        background: rgba(255,255,255,0.08) !important;
      }
      .btn-surrender {
        flex: 0 0 auto !important;
        padding: 6px 8px !important;
      }

      /* 3. PHASE TRACKER */
      .turn-phase-tracker {
        padding: 2px 6px;
        gap: 2px;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .phase-step {
        padding: 2px 4px;
        font-size: 0.58rem;
        gap: 3px;
        flex: 1;
        justify-content: center;
      }
      .phase-step .phase-num {
        width: 13px;
        height: 13px;
        font-size: 0.55rem;
      }
      .phase-label-full {
        display: none;
      }
      .phase-label-short {
        display: inline;
      }
      .phase-arrow {
        font-size: 0.52rem;
      }

      /* 4. CHESSBOARD (FULL SQUARE FIT ON ANY PHONE) */
      .battle-arena-wrap {
        padding: 2px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }
      .chessboard-container {
        width: min(96vw, calc(100dvh - 245px), 430px) !important;
        height: min(96vw, calc(100dvh - 245px), 430px) !important;
        max-width: 96vw !important;
        max-height: calc(100dvh - 245px) !important;
        aspect-ratio: 1 / 1 !important;
        border-width: 2px;
      }
      .square {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      .piece {
        width: 90%;
        height: 90%;
        border-width: 2px;
        touch-action: manipulation;
      }
      .piece-name-tag {
        font-size: 0.44rem;
        top: -4px;
        padding: 0 2px;
        max-width: 98%;
      }
      .piece-glyph-wrap {
        font-size: 1.05rem;
      }
      .piece-badges {
        font-size: 0.50rem;
        bottom: -4px;
        padding: 0 2px;
        gap: 1px;
      }
      .piece-auras-row {
        top: -4px;
        right: -2px;
      }
      .piece-aura-badge {
        font-size: 0.45rem;
        padding: 0 2px;
      }

      /* 5. BATTLE LOG AS COLLAPSIBLE BOTTOM SHEET */
      #battle-log-drawer {
        display: none !important;
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 50vh !important;
        max-height: 360px !important;
        z-index: 10000 !important;
        border-radius: 14px 14px 0 0 !important;
        border: 2px solid var(--border-gold) !important;
        border-bottom: none !important;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.95) !important;
      }
      #battle-log-drawer.mobile-open {
        display: flex !important;
      }
      .btn-close-log-btn {
        display: inline-block !important;
      }

      /* 6. ACTIVE FIELD TRAY */
      .active-field-tray-wrap {
        padding: 2px 6px;
        max-height: 52px;
        flex-shrink: 0;
      }
      .field-tray-header {
        font-size: 0.55rem;
      }
      .field-card {
        min-width: 105px;
        height: 38px;
        padding: 2px 4px;
        gap: 4px;
      }
      .field-card-glyph {
        font-size: 0.9rem;
      }
      .field-card-name {
        font-size: 0.60rem;
      }
      .field-card-stats-box {
        font-size: 0.56rem;
      }

      /* 7. HAND CARDS */
      .battle-hand-bar {
        height: 88px;
        padding: 3px 6px;
        gap: 5px;
        flex-shrink: 0;
      }
      .hand-card {
        min-width: 76px;
        width: 76px;
        height: 80px;
        padding: 3px 4px;
        font-size: 0.62rem;
        touch-action: manipulation;
      }
      .hand-card .hc-glyph {
        font-size: 1rem;
      }
      .hand-card .hc-name {
        font-size: 0.58rem;
      }

      /* 8. DECKBUILDER WORKSPACE */
      #pane-deck {
        overflow-y: auto;
      }
      .arena-filter-bar {
        height: auto;
        padding: 6px 8px;
        flex-direction: column;
        align-items: stretch;
        gap: 6px;
      }
      .arena-filter-group {
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      .arena-search-input {
        width: 100%;
      }
      .arena-deck-workspace {
        display: flex;
        flex-direction: column;
        overflow: visible;
        height: auto;
      }
      .arena-catalog-area {
        padding: 8px;
        overflow: visible;
        min-height: 280px;
      }
      .arena-cards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .mtg-card {
        width: 100%;
        height: 190px;
        touch-action: manipulation;
      }
      .arena-deck-sidebar {
        width: 100% !important;
        border-left: none !important;
        border-top: 2px solid var(--border-gold) !important;
        max-height: 380px;
        overflow-y: auto;
        padding: 8px;
      }

      /* 9. LOBBY & SHOP */
      .lobby-layout-wrap {
        grid-template-columns: 1fr;
        gap: 14px;
        margin: 6px auto 16px auto;
        padding: 0 8px;
      }
      .lobby-modes-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .lobby-mode-card {
        padding: 12px 10px;
        gap: 8px;
      }

      /* 10. MODALS & COMBAT OVERLAY */
      .clash-modal {
        padding: 12px 8px;
        max-width: 96vw;
        gap: 8px;
      }
      .clash-fighters-row {
        gap: 4px;
      }
      .clash-card {
        padding: 6px 2px;
        gap: 2px;
      }
      .clash-card-glyph {
        font-size: 1.4rem;
      }
      .clash-card-name {
        font-size: 0.65rem;
      }
      .clash-vs-box {
        padding: 3px;
        gap: 2px;
      }
      .clash-vs-icon {
        font-size: 1rem;
      }
      .battle-modal-window {
        width: 96vw;
        max-height: 90dvh;
        padding: 10px 8px;
      }
      .bpm-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }

      /* TOUCH PREVENTIONS */
      #hover-card-preview {
        display: none !important;
        pointer-events: none !important;
      }
    }
  </style>`;

  if (cssBlockOldRegex.test(content)) {
    content = content.replace(cssBlockOldRegex, precisionMobileCss);
  } else {
    content = content.replace('</style>', precisionMobileCss);
  }

  fs.writeFileSync(filename, content, 'utf8');
  console.log('Pixel 8 Precision applied to ' + filename);
  return true;
}

applyPixel8Fix('index.html');
applyPixel8Fix('crownfall.html');
