const fs = require('fs');

console.log("Reading index.html...");
let content = fs.readFileSync('index.html', 'utf8');

// 1. ADD CSS ENHANCEMENTS BEFORE </style>
const cssToAdd = `
    /* === MODERN GAMEPLAY "JUICE" & VISUAL POLISH === */
    .floating-combat-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      font-family: 'Cinzel', serif;
      font-weight: 900;
      font-size: 1.25rem;
      z-index: 1000;
      white-space: nowrap;
      text-shadow: 0 2px 8px rgba(0,0,0,0.95), 0 0 14px rgba(255, 0, 0, 0.8);
      animation: floatCombatAnim 0.85s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
    }
    .floating-combat-text.normal {
      color: #ff4757;
    }
    .floating-combat-text.crit {
      color: #ffd32a;
      font-size: 1.45rem;
      text-shadow: 0 0 18px rgba(255, 211, 42, 0.95);
    }
    .floating-combat-text.counter {
      color: #ff6b81;
      font-size: 1.05rem;
    }
    .floating-combat-text.shield {
      color: #70a1ff;
      font-size: 1.15rem;
      text-shadow: 0 0 14px rgba(112, 161, 255, 0.9);
    }
    .floating-combat-text.heal {
      color: #2ed573;
      font-size: 1.2rem;
      text-shadow: 0 0 14px rgba(46, 213, 115, 0.9);
    }

    @keyframes floatCombatAnim {
      0% {
        opacity: 0;
        transform: translate(-50%, -10%) scale(0.6);
      }
      20% {
        opacity: 1;
        transform: translate(-50%, -60%) scale(1.3);
      }
      75% {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -135%) scale(0.8);
      }
    }

    /* SCREEN SHAKE */
    .chessboard-container.shake-light {
      animation: boardShakeLight 0.25s ease-out;
    }
    .chessboard-container.shake-heavy {
      animation: boardShakeHeavy 0.35s ease-out;
    }
    @keyframes boardShakeLight {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(-3px, 2px); }
      50% { transform: translate(3px, -2px); }
      75% { transform: translate(-1px, 1px); }
    }
    @keyframes boardShakeHeavy {
      0%, 100% { transform: translate(0, 0); }
      20% { transform: translate(-6px, 4px) rotate(-0.5deg); }
      40% { transform: translate(6px, -4px) rotate(0.5deg); }
      60% { transform: translate(-3px, 3px); }
      80% { transform: translate(3px, -1px); }
    }

    /* CARD PLAYED FLOATING BANNER (NON-BLOCKING) */
    .card-played-banner {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%) translateY(-40px);
      background: linear-gradient(135deg, rgba(20, 24, 38, 0.96), rgba(10, 11, 16, 0.98));
      border: 1px solid var(--border-gold);
      border-radius: 8px;
      padding: 7px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.85), 0 0 16px var(--gold-glow);
      pointer-events: none;
      z-index: 500;
      opacity: 0;
      transition: all 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .card-played-banner.active {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .cpb-glyph {
      font-size: 1.6rem;
      filter: drop-shadow(0 0 6px rgba(255,215,0,0.6));
    }
    .cpb-info {
      display: flex;
      flex-direction: column;
    }
    .cpb-title {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 0.88rem;
      color: var(--gold-primary);
      letter-spacing: 0.5px;
    }
    .cpb-type {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* VICTORY & DEFEAT OVERLAY */
    .battle-end-overlay {
      position: fixed;
      inset: 0;
      background: rgba(3, 4, 8, 0.92);
      backdrop-filter: blur(8px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: clashFadeIn 0.3s ease-out;
    }
    .battle-end-overlay.active {
      display: flex !important;
    }
    .battle-end-modal {
      background: linear-gradient(180deg, #181c2b 0%, #0d0f17 100%);
      border: 2px solid var(--border-gold);
      border-radius: 14px;
      padding: 32px 28px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 16px 50px rgba(0,0,0,0.9), 0 0 30px var(--gold-glow);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .bem-icon {
      font-size: 3.5rem;
      filter: drop-shadow(0 0 18px rgba(255,215,0,0.7));
    }
    .bem-title {
      font-family: 'Cinzel', serif;
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 3px;
      color: var(--gold-primary);
      text-shadow: 0 0 16px var(--gold-glow);
    }
    .bem-title.defeat {
      color: #ff7675;
      text-shadow: 0 0 16px rgba(255, 118, 117, 0.6);
    }
    .bem-desc {
      font-size: 0.95rem;
      color: #c8d1e8;
      line-height: 1.5;
    }
    .bem-reward-badge {
      background: rgba(229, 185, 88, 0.15);
      border: 1px solid var(--border-gold);
      color: #ffd700;
      font-weight: 900;
      font-size: 1.1rem;
      padding: 8px 18px;
      border-radius: 8px;
      letter-spacing: 1px;
    }
    .bem-actions {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
      margin-top: 8px;
    }

    /* HOME HERO CTA */
    .home-hero-cta {
      background: radial-gradient(ellipse at 50% 0%, rgba(229, 185, 88, 0.22) 0%, rgba(14, 16, 25, 0.98) 75%),
                  linear-gradient(180deg, #1c2133 0%, #0e1019 100%);
      border: 2px solid var(--gold-primary);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 10px 35px rgba(0,0,0,0.8), 0 0 25px rgba(229, 185, 88, 0.25);
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      text-align: left;
      position: relative;
      overflow: hidden;
    }
    .home-hero-cta::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(229, 185, 88, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .hh-tag {
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      font-weight: 900;
      color: #ffd700;
      letter-spacing: 2px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .hh-title {
      font-family: 'Cinzel', serif;
      font-size: 1.65rem;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 1.5px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.9);
    }
    .hh-desc {
      font-size: 0.88rem;
      color: #b0b9d4;
      line-height: 1.5;
      max-width: 650px;
    }
    .hh-buttons-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-top: 6px;
    }
    .btn-hero-primary {
      background: linear-gradient(135deg, #f5c767 0%, #c99b42 100%);
      color: #0b0c10;
      font-family: 'Cinzel', serif;
      font-weight: 900;
      font-size: 1.05rem;
      padding: 14px 28px;
      border-radius: 8px;
      border: 1px solid #ffd700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(229, 185, 88, 0.45);
      transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .btn-hero-primary:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 25px rgba(229, 185, 88, 0.65);
    }
    .btn-hero-secondary {
      background: rgba(29, 33, 48, 0.8);
      border: 1px solid var(--border-gold);
      color: var(--gold-primary);
      font-weight: 800;
      font-size: 0.88rem;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .btn-hero-secondary:hover {
      background: rgba(229, 185, 88, 0.15);
      color: #ffd700;
      border-color: #ffd700;
      transform: translateY(-2px);
    }
`;

content = content.replace('  </style>', cssToAdd + '\n  </style>');

// 2. UPDATE NAVBAR IN HEADER
const oldNav = `<div class="brand-title" onclick="showPane(currentUser ? 'home' : 'auth')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 18l3-10 4 6 4-6 3 10H5z"/></svg>
      CROWNFALL
    </div>
    <div class="nav-actions">
      <span class="gold-pill" id="nav-gold-label">🪙 0 Oro</span>
      <span class="user-pill" id="nav-user-label"></span>
      <span class="cloud-pill" id="nav-cloud-status" style="display: none; font-size: 0.72rem; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-gold); background: rgba(229,185,88,0.1); color: var(--gold-primary); cursor: pointer; font-weight: 700;" onclick="testDBConnection()" title="Clicca per testare la connessione al Database">☁️ Sincronizzato</span>
      <button class="btn-nav" onclick="showPaneDirect('lore')">Lore</button>
      <button class="btn-nav" onclick="showPaneDirect('tutorial')">Tutorial</button>
      <button class="btn-nav" onclick="showPane('home')">Menu</button>
      <button class="btn-nav" onclick="showPane('battle-lobby')">Battaglia</button>
      <button class="btn-nav" onclick="openDeckBuilder()">Grimorio</button>
      <button class="btn-nav" onclick="showPane('packs')">Mercato Box</button>
      <button class="btn-nav" id="btn-nav-logout" style="display: none; border-color: var(--crimson-blood); color: #ff7675;" onclick="handleLogout()">Esci</button>
    </div>`;

const newNav = `<div class="brand-title" onclick="showPane('home')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 18l3-10 4 6 4-6 3 10H5z"/></svg>
      CROWNFALL
    </div>
    <div class="nav-actions">
      <span class="gold-pill" id="nav-gold-label">🪙 0 Oro</span>
      <span class="user-pill" id="nav-user-label"></span>
      <span class="cloud-pill" id="nav-cloud-status" style="display: none; font-size: 0.72rem; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-gold); background: rgba(229,185,88,0.1); color: var(--gold-primary); cursor: pointer; font-weight: 700;" onclick="testDBConnection()" title="Clicca per testare la connessione al Database">☁️ Sincronizzato</span>
      <button class="btn-nav" id="btn-audio-toggle" onclick="toggleAudioMute()" title="Attiva/Disattiva Suoni di Gioco" style="border-color: rgba(229,185,88,0.4); color: var(--gold-primary);">🔊 Audio</button>
      <button class="btn-nav" onclick="quickBattleAI()" style="background: rgba(229,185,88,0.15); border-color: var(--gold-primary); color: #ffd700; font-weight: 800;">⚔️ Gioca</button>
      <button class="btn-nav" onclick="showPaneDirect('tutorial')">Accademia</button>
      <button class="btn-nav" onclick="showPane('home')">Menu</button>
      <button class="btn-nav" onclick="showPane('battle-lobby')">Lobby</button>
      <button class="btn-nav" onclick="openDeckBuilder()">Grimorio</button>
      <button class="btn-nav" onclick="showPane('packs')">Mercato Box</button>
      <button class="btn-nav" id="btn-nav-cloud" onclick="showPaneDirect('auth')" title="Sincronizza account su Cloud Supabase" style="border-color: var(--border-frame);">☁️ Account</button>
      <button class="btn-nav" id="btn-nav-logout" style="display: none; border-color: var(--crimson-blood); color: #ff7675;" onclick="handleLogout()">Esci</button>
    </div>`;

content = content.replace(oldNav, newNav);

// 3. FIX AUTH PANE (Remove mojibake, add Clean Continue as Guest button)
const oldOfflineBtn = `<button type="button" class="btn" style="width: 100%; margin-top: 4px; border-color: var(--border-frame);" onclick="playOffline()">??? GIOCA SUBITO (MODALIT OFFLINE)</button>`;
const newOfflineBtn = `<button type="button" class="btn btn-gold" style="width: 100%; margin-top: 6px; padding: 12px; font-weight: 800; font-size: 0.92rem;" onclick="playOffline()">⚔️ GIOCA SUBITO (ACCESSO OSPITE IMMEDIATO)</button>
          <button type="button" class="btn" style="width: 100%; margin-top: 6px; border-color: var(--border-frame);" onclick="showPaneDirect('home')">🏛️ Torna al Menu Principale</button>`;

content = content.replace(oldOfflineBtn, newOfflineBtn);

// 4. OVERHAUL PANE HOME TO ACTION-FIRST LAYOUT
const oldHomeLayoutTarget = `<div class="home-layout">
          <!-- COLONNA SINISTRA: LORE & PILASTRI FONDAMENTALI -->
          <aside class="home-sidebar-lore">
            <div class="home-lore-box">
              <div class="home-lore-header">
                <span class="hl-badge">CRONACHE DI VERIDIA</span>
                <h3>📖 Il Conflitto dei Frammenti</h3>
              </div>
              <p class="home-lore-text">
                Dopo la <em>Sottrazione dell'Assoluto</em>, la Corona Primordiale si è spezzata in cinque frammenti di potere. 
                I cinque Ordini dominanti si sfidano sui campi scacchistici per la sovranità suprema: 
                <strong>Bastione di Ferro</strong>, <strong>Ceneri del Giudizio</strong>, <strong>Marea Abissale</strong>, 
                <strong>Silenzio Eterno</strong> e <strong>Forgia del Magma</strong>.
              </p>
            </div>

            <div class="home-pillars-box">
              <h4 class="pillars-title">⚖️ PILASTRI DI GIOCO</h4>
              
              <div class="pillar-item">
                <span class="p-icon">🏛️</span>
                <div class="p-content">
                  <strong>Altari & Mana 💧</strong>
                  <p>Controlla gli Altari per espandere il territorio e generare fino a 4 Mana per turno.</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">🩸</span>
                <div class="p-content">
                  <strong>Riserva Sangue & Riti d'Arma</strong>
                  <p>I caduti alimentano il Sangue. Scatena il devastante Rito d'Arma del tuo Comandante (max 1 volta per turno!).</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">⏳</span>
                <div class="p-content">
                  <strong>4 Fasi del Turno</strong>
                  <p>Mantenimento I ➔ Movimento & Azioni (2⚡) ➔ Mantenimento II ➔ Fine Turno.</p>
                </div>
              </div>

              <!-- SEZIONE SBUSTA FONDAMENTALE -->
              <div class="pillar-item highlight-packs">
                <span class="p-icon">📦</span>
                <div class="p-content">
                  <strong>SBUSTA PER VINCERE! (Fondamentale)</strong>
                  <p>Apri i Box di Espansione nel Mercato! Sbustare nuove carte Rare, Epiche e Mitiche è FONDAMENTALE per ampliare la tua collezione e forgiare mazzi vincenti.</p>
                </div>
              </div>
            </div>
          </aside>

          <!-- COLONNA DESTRA: AZIONI PRINCIPALI E MODALITÀ -->
          <main class="home-actions-main">
            <h4 class="actions-title">⚔️ AZIONI & MODALITÀ DI GIOCO</h4>

            <div class="home-action-card pack-shop-action" onclick="showPane('packs')">
              <div class="action-card-left">
                <div class="action-icon">📦</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">MERCATO BOX & SBUSTA BUSTINE</span>
                    <span class="action-badge pulse-gold">FONDAMENTALE</span>
                  </div>
                  <p class="action-desc">Apri box con le monete d'oro vinte, sblocca truppe leggendarie e amplia la tua collezione!</p>
                </div>
              </div>
              <button class="btn btn-gold action-btn" onclick="event.stopPropagation(); showPane('packs')">SBUSTA ORA (100 🪙)</button>
            </div>

            <div class="home-action-card battle-arena-action" onclick="showPane('battle-lobby')">
              <div class="action-card-left">
                <div class="action-icon">👑</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">ARENA DI BATTAGLIA</span>
                    <span class="action-reward-pill">🤖 IA: +100 🪙</span>
                    <span class="action-reward-pill p2p">🌐 P2P: +200 🪙</span>
                  </div>
                  <p class="action-desc">Sfida l'Intelligenza Artificiale tattica (+100 Oro) oppure combatti online in Multigiocatore P2P (+200 Oro)!</p>
                </div>
              </div>
              <button class="btn btn-crimson action-btn" onclick="event.stopPropagation(); showPane('battle-lobby')">ENTRA IN BATTAGLIA</button>
            </div>

            <div class="home-action-card deck-action" onclick="openDeckBuilder()">
              <div class="action-card-left">
                <div class="action-icon">📜</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">DECKBUILDER ARENA</span>
                    <span class="action-badge">40 CARTE STANDARD</span>
                  </div>
                  <p class="action-desc">Costruisci il tuo grimorio personalizzato o usa l'Autocompletamento Professionale IA a 40 carte.</p>
                </div>
              </div>
              <button class="btn action-btn" onclick="event.stopPropagation(); openDeckBuilder()">COMPONI MAZZO</button>
            </div>

            <div class="home-subgrid">
              <div class="home-mini-action" onclick="showPaneDirect('tutorial')">
                <span class="mini-icon">⚔️</span>
                <div>
                  <div class="mini-title">Accademia Tattica</div>
                  <div class="mini-desc">Guida a movimento, gittata, altari e fasi</div>
                </div>
              </div>

              <div class="home-mini-action" onclick="showPaneDirect('lore')">
                <span class="mini-icon">📖</span>
                <div>
                  <div class="mini-title">Grimorio della Lore</div>
                  <div class="mini-desc">I 5 Comandanti, la Sottrazione e i Frammenti</div>
                </div>
              </div>
            </div>
        

  </main>
        </div>`;

const newHomeLayout = `<!-- HERO BANNER PRIMARIO CON AVVIO ISTANTANEO 1-CLICK -->
        <div class="home-hero-cta">
          <div class="hh-tag">⚡ SKIRMISH TATTICO DARK FANTASY</div>
          <h2 class="hh-title">Entra sul Campo di Battaglia di Veridia</h2>
          <p class="hh-desc">
            Schiera Altari per canalizzare Mana, muovi le tue miniature con precisione scacchistica e scatena i devastanti Riti d'Arma del tuo Comandante per frantumare la corona avversaria.
          </p>
          <div class="hh-buttons-row">
            <button class="btn-hero-primary" onclick="quickBattleAI()">
              <span>⚔️</span>
              <span>BATTAGLIA RAPIDA VS IA (+100 🪙)</span>
            </button>
            <button class="btn-hero-secondary" onclick="showPane('battle-lobby')">
              <span>🌐</span>
              <span>Lobby & Duello P2P (+200 🪙)</span>
            </button>
            <button class="btn-hero-secondary" onclick="showPaneDirect('tutorial')">
              <span>🎓</span>
              <span>Accademia Tattica</span>
            </button>
          </div>
        </div>

        <div class="home-layout">
          <!-- COLONNA SINISTRA: LORE & GUIDA RAPIDA -->
          <aside class="home-sidebar-lore">
            <div class="home-pillars-box">
              <h4 class="pillars-title">🎯 COME SI GIOCA IN 3 PASSI</h4>
              
              <div class="pillar-item">
                <span class="p-icon">🏛️</span>
                <div class="p-content">
                  <strong>1. Altari & Mana 💧</strong>
                  <p>Consacra Altari accanto al tuo Comandante per espandere il territorio e generare fino a 4 Mana per turno.</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">⚔️</span>
                <div class="p-content">
                  <strong>2. Miniature & Aggiramento ⚡</strong>
                  <p>Spendi 2 Azioni a turno per muovere e colpire. Accerchia i nemici con due alleati per attivare il Flanking (+2 Danni!).</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">👑</span>
                <div class="p-content">
                  <strong>3. Vittoria & Sangue 🩸</strong>
                  <p>Ogni unità caduta alimenta il Sangue per i Riti d'Arma. Abbatti il Comandante nemico per trionfare!</p>
                </div>
              </div>
            </div>

            <div class="home-lore-box" style="margin-top: 14px;">
              <div class="home-lore-header">
                <span class="hl-badge">CRONACHE DI VERIDIA</span>
                <h3>📖 I Cinque Ordini</h3>
              </div>
              <p class="home-lore-text">
                Dopo la <em>Sottrazione dell'Assoluto</em>, la Corona Primordiale si è spezzata. I cinque Ordini dominanti si sfidano: 
                <strong>Bastione di Ferro</strong>, <strong>Ceneri del Giudizio</strong>, <strong>Marea Abissale</strong>, 
                <strong>Silenzio Eterno</strong> e <strong>Forgia del Magma</strong>.
              </p>
            </div>
          </aside>

          <!-- COLONNA DESTRA: MODALITA DI GIOCO & PROGRESSIONE -->
          <main class="home-actions-main">
            <h4 class="actions-title">⚔️ ARENA & ARMERIA</h4>

            <div class="home-action-card battle-arena-action" onclick="showPane('battle-lobby')">
              <div class="action-card-left">
                <div class="action-icon">👑</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">LOBBY DI BATTAGLIA & STANZE LIVE</span>
                    <span class="action-reward-pill">🤖 IA: +100 🪙</span>
                    <span class="action-reward-pill p2p">🌐 P2P: +200 🪙</span>
                  </div>
                  <p class="action-desc">Scegli il Comandante avversario, configura match personalizzati o duella online contro altri giocatori in stanze P2P!</p>
                </div>
              </div>
              <button class="btn btn-crimson action-btn" onclick="event.stopPropagation(); showPane('battle-lobby')">APRI LOBBY</button>
            </div>

            <div class="home-action-card deck-action" onclick="openDeckBuilder()">
              <div class="action-card-left">
                <div class="action-icon">📜</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">DECKBUILDER ARENA</span>
                    <span class="action-badge">40 CARTE STANDARD</span>
                  </div>
                  <p class="action-desc">Costruisci il tuo grimorio personalizzato o usa l'Autocompletamento Professionale IA a 40 carte.</p>
                </div>
              </div>
              <button class="btn action-btn" onclick="event.stopPropagation(); openDeckBuilder()">COMPONI MAZZO</button>
            </div>

            <div class="home-action-card pack-shop-action" onclick="showPane('packs')">
              <div class="action-card-left">
                <div class="action-icon">📦</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">MERCATO BOX & SBUSTA BUSTINE</span>
                    <span class="action-badge pulse-gold">RICOMPENSE</span>
                  </div>
                  <p class="action-desc">Spendi le monete d'oro vinte nelle battaglie per aprire box d'espansione e sbloccare carte Rare e Mitiche!</p>
                </div>
              </div>
              <button class="btn btn-gold action-btn" onclick="event.stopPropagation(); showPane('packs')">SBUSTA (100 🪙)</button>
            </div>

            <div class="home-subgrid">
              <div class="home-mini-action" onclick="showPaneDirect('tutorial')">
                <span class="mini-icon">⚔️</span>
                <div>
                  <div class="mini-title">Accademia Tattica</div>
                  <div class="mini-desc">Guida a movimento, gittata, altari e fasi</div>
                </div>
              </div>

              <div class="home-mini-action" onclick="showPaneDirect('lore')">
                <span class="mini-icon">📖</span>
                <div>
                  <div class="mini-title">Grimorio della Lore</div>
                  <div class="mini-desc">I 5 Comandanti, la Sottrazione e i Frammenti</div>
                </div>
              </div>
            </div>
          </main>
        </div>`;

content = content.replace(oldHomeLayoutTarget, newHomeLayout);

// 5. INSERT FLOATING BANNER AND VICTORY OVERLAY INTO PANE BATTLE
const targetBattleWrap = `<div class="battle-arena-wrap">
        <div id="chessboard" class="chessboard-container"></div>`;

const newBattleWrap = `<div class="battle-arena-wrap">
        <!-- BANNER NON-BLOCCANTE DI EVOCAZIONE CARTA -->
        <div id="card-played-banner" class="card-played-banner">
          <span class="cpb-glyph" id="cpb-glyph">⚔️</span>
          <div class="cpb-info">
            <div class="cpb-title" id="cpb-title">Fante Corazzato</div>
            <div class="cpb-type" id="cpb-type">MINIATURA EVOCATA</div>
          </div>
        </div>

        <div id="chessboard" class="chessboard-container"></div>`;

content = content.replace(targetBattleWrap, newBattleWrap);

// Insert Battle End Overlay before </body>
const battleEndOverlayHtml = `
  <!-- OVERLAY VITTORIA / SCONFITTA EPICO -->
  <div id="battle-end-overlay" class="battle-end-overlay">
    <div class="battle-end-modal">
      <div class="bem-icon" id="bem-icon">👑</div>
      <h2 class="bem-title" id="bem-title">VITTORIA TRIONFALE</h2>
      <p class="bem-desc" id="bem-desc">Il Comandante nemico è stato annientato sul campo di Veridia!</p>
      <div class="bem-reward-badge" id="bem-reward">+100 🪙 Monete d'Oro</div>
      <div class="bem-actions">
        <button class="btn btn-gold" style="padding: 12px; font-weight: 800; font-size: 0.95rem;" onclick="quickBattleAI()">⚔️ GIOCA ANCORA (BATTAGLIA RAPIDA)</button>
        <button class="btn" style="padding: 10px; border-color: var(--border-gold); color: var(--gold-primary); font-weight: 700;" onclick="closeBattleEndAndGo('packs')">📦 Apri Box nel Mercato</button>
        <button class="btn" style="padding: 10px; border-color: var(--border-frame);" onclick="closeBattleEndAndGo('home')">🏛️ Torna al Menu Principale</button>
      </div>
    </div>
  </div>
`;

content = content.replace('</body>', battleEndOverlayHtml + '\n</body>');

// 6. SOUND ENGINE & JAVASCRIPT HELPERS INSERTION
const soundEngineCode = `
    /* ==========================================================================
       SOUND ENGINE (PROCEDURAL WEB AUDIO API - ZERO NETWORK DEPENDENCIES)
       ========================================================================== */
    const SoundEngine = (function() {
      let ctx = null;
      let isMuted = localStorage.getItem('crownfall_sound_muted') === 'true';

      function initCtx() {
        if (!ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) ctx = new AudioCtx();
        }
        if (ctx && ctx.state === 'suspended') {
          ctx.resume();
        }
        return ctx;
      }

      // Resume context on user click/interaction
      if (typeof window !== 'undefined') {
        window.addEventListener('click', () => { initCtx(); }, { once: true });
        window.addEventListener('keydown', () => { initCtx(); }, { once: true });
      }

      function playTone(freq, duration, type = 'sine', gainVal = 0.15) {
        if (isMuted) return;
        try {
          const c = initCtx();
          if (!c) return;
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, c.currentTime);
          gain.gain.setValueAtTime(gainVal, c.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start();
          osc.stop(c.currentTime + duration);
        } catch(e) {}
      }

      return {
        toggleMute() {
          isMuted = !isMuted;
          localStorage.setItem('crownfall_sound_muted', isMuted);
          const btn = document.getElementById('btn-audio-toggle');
          if (btn) {
            btn.textContent = isMuted ? '🔇 Muto' : '🔊 Audio';
            btn.style.color = isMuted ? 'var(--text-muted)' : 'var(--gold-primary)';
          }
          if (!isMuted) playTone(440, 0.08, 'triangle', 0.15);
          return !isMuted;
        },
        isMuted() {
          return isMuted;
        },
        play(soundName) {
          if (isMuted) return;
          try {
            const c = initCtx();
            if (!c) return;
            const t = c.currentTime;

            if (soundName === 'card' || soundName === 'deploy') {
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(340, t);
              osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
              gain.gain.setValueAtTime(0.24, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(t);
              osc.stop(t + 0.15);
            } else if (soundName === 'attack') {
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(560, t);
              osc.frequency.exponentialRampToValueAtTime(120, t + 0.15);
              gain.gain.setValueAtTime(0.2, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(t);
              osc.stop(t + 0.16);
            } else if (soundName === 'damage') {
              const osc1 = c.createOscillator();
              const osc2 = c.createOscillator();
              const gain = c.createGain();
              osc1.type = 'sawtooth';
              osc2.type = 'sine';
              osc1.frequency.setValueAtTime(180, t);
              osc1.frequency.exponentialRampToValueAtTime(45, t + 0.22);
              osc2.frequency.setValueAtTime(95, t);
              osc2.frequency.exponentialRampToValueAtTime(30, t + 0.22);
              gain.gain.setValueAtTime(0.28, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
              osc1.connect(gain);
              osc2.connect(gain);
              gain.connect(c.destination);
              osc1.start(t);
              osc2.start(t);
              osc1.stop(t + 0.23);
              osc2.stop(t + 0.23);
            } else if (soundName === 'shield') {
              [580, 870, 1160].forEach((f, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, t);
                gain.gain.setValueAtTime(0.18 / (idx + 1), t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(t);
                osc.stop(t + 0.36);
              });
            } else if (soundName === 'spell') {
              [440, 554, 659, 880].forEach((f, idx) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, t + idx * 0.04);
                gain.gain.setValueAtTime(0.12, t + idx * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45 + idx * 0.04);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(t + idx * 0.04);
                osc.stop(t + 0.5 + idx * 0.04);
              });
            } else if (soundName === 'altar') {
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(140, t);
              osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);
              gain.gain.setValueAtTime(0.35, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(t);
              osc.stop(t + 0.36);
            } else if (soundName === 'rite') {
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(110, t);
              osc.frequency.exponentialRampToValueAtTime(440, t + 0.28);
              gain.gain.setValueAtTime(0.25, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(t);
              osc.stop(t + 0.36);
            } else if (soundName === 'turn') {
              [220, 277, 330].forEach((f) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, t);
                gain.gain.setValueAtTime(0.15, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(t);
                osc.stop(t + 0.4);
              });
            } else if (soundName === 'victory') {
              const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
              notes.forEach((f, i) => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = 'triangle';
                const startT = t + i * 0.1;
                osc.frequency.setValueAtTime(f, startT);
                gain.gain.setValueAtTime(0.18, startT);
                gain.gain.exponentialRampToValueAtTime(0.0001, startT + 0.6);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(startT);
                osc.stop(startT + 0.65);
              });
            } else if (soundName === 'defeat') {
              [130.81, 155.56, 185.00].forEach(f => {
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(f, t);
                gain.gain.setValueAtTime(0.2, t);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start(t);
                osc.stop(t + 1.25);
              });
            } else if (soundName === 'click') {
              playTone(600, 0.04, 'sine', 0.08);
            }
          } catch(e) {}
        }
      };
    })();

    function playSfx(name) {
      SoundEngine.play(name);
    }

    function toggleAudioMute() {
      SoundEngine.toggleMute();
    }

    /* FLOATING COMBAT TEXT & SCREEN SHAKE */
    function showFloatingCombatText(idx, text, type = 'normal') {
      const sq = document.querySelector(\`.square[data-index="\${idx}"]\`);
      if (!sq) return;
      const fct = document.createElement('div');
      fct.className = \`floating-combat-text \${type}\`;
      fct.textContent = text;
      sq.appendChild(fct);
      setTimeout(() => {
        if (fct.parentNode) fct.remove();
      }, 850);
    }

    function triggerScreenShake(type = 'light') {
      const board = document.getElementById('chessboard');
      if (!board) return;
      board.classList.remove('shake-light', 'shake-heavy');
      void board.offsetWidth;
      board.classList.add(type === 'heavy' ? 'shake-heavy' : 'shake-light');
      setTimeout(() => {
        board.classList.remove('shake-light', 'shake-heavy');
      }, 350);
    }

    let cpbTimeout = null;
    function showCardPlayedBanner(card) {
      const banner = document.getElementById('card-played-banner');
      if (!banner) return;
      const glyphEl = document.getElementById('cpb-glyph');
      const titleEl = document.getElementById('cpb-title');
      const typeEl = document.getElementById('cpb-type');
      if (glyphEl) glyphEl.textContent = card.glyph || '⚔️';
      if (titleEl) titleEl.textContent = card.name || 'Carta';
      if (typeEl) {
        const typeLabels = { 'unit': 'MINIATURA SCHIERATA', 'altar': 'ALTARE CONSACRATO', 'spell': 'SORTILEGIO LANCIATO', 'reaction': 'REAZIONE' };
        typeEl.textContent = typeLabels[card.type] || (card.type || '').toUpperCase();
      }
      banner.classList.add('active');
      if (cpbTimeout) clearTimeout(cpbTimeout);
      cpbTimeout = setTimeout(() => {
        banner.classList.remove('active');
      }, 1200);
    }

    /* 1-CLICK INSTANT QUICK PLAY */
    function quickBattleAI() {
      playSfx('turn');
      closeBattleEndOverlay();
      showPaneDirect('battle-lobby');
      startBattle('ai');
    }

    function closeBattleEndAndGo(pane) {
      closeBattleEndOverlay();
      showPaneDirect(pane);
    }

    function closeBattleEndOverlay() {
      const el = document.getElementById('battle-end-overlay');
      if (el) el.classList.remove('active');
    }
`;

// Insert SoundEngine right after the first <script> tag
content = content.replace('<script>', '<script>\n' + soundEngineCode);

// 7. OVERHAUL ANIMATE_CARD_PLAYED (Instant & fluid, non-blocking!)
const oldAnimateCard = `    let currentSummonOnComplete = null;
    function animateCardPlayed(card, onComplete) {
      hideHoverCard();
      const overlay = document.getElementById('card-summon-overlay');
      if (!overlay) {
        if (onComplete) onComplete();
        return;
      }

      currentSummonOnComplete = onComplete || null;

      const headerText = document.getElementById('sc-header-text');
      if (headerText) {
        if (card.type === 'spell') headerText.textContent = 'SORTILEGIO LANCIATO';
        else if (card.type === 'altar') headerText.textContent = 'ALTARE CONSACRATO';
        else if (card.riteDesc) headerText.textContent = 'RITO DI COMANDO';
        else headerText.textContent = 'TRUPPA SCHIERATA';
      }
      
      document.getElementById('sc-title').textContent = card.name || 'Carta';
      
      const costWrap = document.getElementById('sc-cost-wrap');
      if (costWrap) {
        costWrap.innerHTML = '';
        if (card.cost > 0 || (!card.bloodCost && card.cost === 0)) {
          costWrap.innerHTML += \`<span class="mtg-cost-pip mana" style="min-width:24px; height:24px; font-size:0.8rem;">\${card.cost !== undefined ? card.cost : 0}</span>\`;
        }
        if (card.bloodCost && card.bloodCost > 0) {
          costWrap.innerHTML += \`<span class="mtg-cost-pip blood" style="min-width:27px; height:24px; font-size:0.75rem;">\${card.bloodCost}🩸</span>\`;
        }
      }

      document.getElementById('sc-art').textContent = card.glyph || '⚔️';
      
      const typeLabels = { 'unit': 'MINIATURA', 'altar': 'ALTARE', 'spell': 'MAGIA', 'reaction': 'REAZIONE' };
      const isComm = !!card.riteDesc;
      document.getElementById('sc-type-text').textContent = isComm ? 'CAMPIONE' : (typeLabels[card.type] || (card.type || '').toUpperCase());
      
      const rb = document.getElementById('sc-rarity-badge');
      const r = card.rarity || 'common';
      rb.className = \`rarity-badge \${r}\`;
      rb.textContent = (RARITY_NAMES[r] || 'COMUNE').toUpperCase();
      
      document.getElementById('sc-desc').innerHTML = formatCardDesc(card.desc || '');
      
      const setBadge = document.getElementById('sc-set-badge');
      if (setBadge) setBadge.textContent = card.set || 'α';

      const pt = document.getElementById('sc-pt');
      if (pt) {
        if (card.type === 'unit' || isComm) {
          pt.style.display = 'block';
          pt.textContent = \`\${card.att !== undefined ? card.att : 0}/\${card.hp !== undefined ? card.hp : 1}\`;
        } else if (card.type === 'altar') {
          pt.style.display = 'block';
          pt.textContent = \`\${card.att ? card.att + '/' : ''}\${card.hp || 5} PV\`;
        } else {
          pt.style.display = 'none';
        }
      }
      
      overlay.style.display = 'flex';
      overlay.classList.add('active');
    }`;

const newAnimateCard = `    let currentSummonOnComplete = null;
    function animateCardPlayed(card, onComplete) {
      hideHoverCard();
      const soundType = card.type === 'altar' ? 'altar' : (card.type === 'spell' || card.type === 'reaction' ? 'spell' : 'card');
      playSfx(soundType);

      // Mostra banner fluido sulla scacchiera senza bloccare il flusso di gioco
      showCardPlayedBanner(card);

      // Esegui l'azione istantaneamente
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }`;

content = content.replace(oldAnimateCard, newAnimateCard);

// 8. OVERHAUL SHOW_COMBAT_CLASH_OVERLAY (Non-blocking with FCT & Shake)
const oldCombatClash = `    let clashOverlayTimer = null;
    function showCombatClashOverlay(attPiece, defPiece, damage, counterDmg, details = {}) {
      hideHoverCard();
      const overlay = document.getElementById('combat-clash-overlay');
      if (!overlay) return;

      if (clashOverlayTimer) {
        clearTimeout(clashOverlayTimer);
        clashOverlayTimer = null;
      }

      // Attacker data
      const attInitialHp = attPiece.hp;
      const attResultHp = Math.max(0, attPiece.hp - (counterDmg || 0));
      document.getElementById('clash-att-glyph').textContent = attPiece.glyph || (attPiece.type === 'commander' ? '👑' : '⚔️');
      document.getElementById('clash-att-name').textContent = attPiece.name || 'Attaccante';
      if (counterDmg > 0) {
        document.getElementById('clash-att-stats').textContent = \`⚔️ \${attPiece.att} ATT  •  ❤️ \${attInitialHp} ➔ \${attResultHp <= 0 ? '💀 CADUTO' : attResultHp + ' PV'}\`;
      } else {
        document.getElementById('clash-att-stats').textContent = \`⚔️ \${attPiece.att} ATT  •  ❤️ \${attPiece.hp} PV\`;
      }

      // Defender data
      const defInitialHp = defPiece.hp;
      const defResultHp = Math.max(0, defPiece.hp - damage);
      document.getElementById('clash-def-glyph').textContent = defPiece.glyph || (defPiece.type === 'altar' ? '🏛️' : (defPiece.type === 'commander' ? '👑' : '🛡️'));
      document.getElementById('clash-def-name').textContent = defPiece.name || 'Difensore';
      document.getElementById('clash-def-stats').textContent = \`❤️ \${defInitialHp} ➔ \${defResultHp <= 0 ? '💀 CADUTO' : defResultHp + ' PV'}\`;

      // Formula breakdown
      const formulaEl = document.getElementById('clash-formula-box');
      const lines = [];
      lines.push(\`<span>⚔️ Potenza Base: <strong>\${details.rawAtk || attPiece.att}</strong></span>\`);
      if (details.flankingBonus) {
        lines.push(\`<span style="color:#2ecc71;">+ Aggiramento (Flanking): <strong>+\${details.flankingBonus}</strong></span>\`);
      }
      if (details.isStructure) {
        lines.push(\`<span style="color:#f39c12;">💥 Sfondamento Struttura</span>\`);
      }
      if (details.absorbed && details.absorbed > 0) {
        lines.push(\`<span style="color:#74b9ff;">🛡️ Armatura/Riparo: <strong>-\${details.absorbed}</strong></span>\`);
      }
      if (defPiece.hasTotalShield) {
        lines.push(\`<span style="color:#ffd32a;">✨ Scudo Totale: Colpo Assorbito</span>\`);
      }
      formulaEl.innerHTML = lines.join('');

      document.getElementById('clash-damage-banner').textContent = \`💥 \${damage} DANNI INFLITTI\`;
      
      const counterBanner = document.getElementById('clash-counter-banner');
      if (counterDmg > 0) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🛡️ Contrattacco nemico: \${counterDmg} Danni\`;
      } else if (details.isRanged) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🏹 Attacco a distanza: Nessun contrattacco\`;
      } else if (details.defCannotCounter) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🛡️ Il difensore non può contrattaccare\`;
      } else {
        counterBanner.style.display = 'none';
      }

      overlay.style.display = 'flex';
      overlay.classList.add('active');
    }`;

const newCombatClash = `    let clashOverlayTimer = null;
    function showCombatClashOverlay(attPiece, defPiece, damage, counterDmg, details = {}) {
      hideHoverCard();

      // Suoni di combattimento dinamici
      if (defPiece.hasTotalShield || (details.absorbed && details.absorbed >= damage)) {
        playSfx('shield');
      } else if (damage > 0) {
        playSfx('damage');
      } else {
        playSfx('attack');
      }

      // Effetto Screen Shake
      triggerScreenShake(damage >= 3 ? 'heavy' : 'light');

      // Calcola casella difensore per Floating Combat Text
      const defIdx = battleState.grid.indexOf(defPiece);
      if (defIdx !== -1) {
        const text = damage > 0 ? \`-\${damage} 💥\` : (defPiece.hasTotalShield ? 'PROTETTO ✨' : 'ASSORBITO 🛡️');
        showFloatingCombatText(defIdx, text, damage >= 4 ? 'crit' : 'normal');
      }

      // Calcola casella attaccante per eventuale contrattacco
      if (counterDmg > 0) {
        const attIdx = battleState.grid.indexOf(attPiece);
        if (attIdx !== -1) {
          setTimeout(() => {
            playSfx('attack');
            showFloatingCombatText(attIdx, \`-\${counterDmg} ⚔️\`, 'counter');
          }, 200);
        }
      }
    }`;

content = content.replace(oldCombatClash, newCombatClash);

// 9. REMOVE ARTIFICIAL PHASE CHECKS IN onSquareClick
const oldSquarePhase1 = `        const phase = battleState.turnPhase || 1;
        if (card.type !== 'spell' && card.type !== 'reaction' && phase === 2) {
          showToast("🏰 Lo schieramento truppe/altari avviene in Fase Mantenimento (Fase 1 o 3)!");
          return;
        }`;

content = content.replace(oldSquarePhase1, `// Schieramento fluido senza blocchi artificiali di fase`);

const oldSquarePhase2 = `        const phase = battleState.turnPhase || 1;
        if (phase !== 2) {
          showToast("⚔️ Movimenti e attacchi richiedono la 2ª Fase (Azioni)! Clicca 'Passa a Fase 2'.");
          return;
        }`;

content = content.replace(oldSquarePhase2, `// Movimento e attacco fluidi senza blocchi artificiali di fase`);

// 10. UNIFY TURN END BUTTON IN updatePhaseUI & advanceTurnPhase
const oldAdvanceTurnPhase = `    function advanceTurnPhase() {
      if (!battleState) return;
      const role = getMyRole();
      if (battleState.turn !== role) return showToast("Non è il tuo turno!");

      const currentPhase = battleState.turnPhase || 1;

      if (currentPhase === 1) {
        setTurnPhase(2);
        showToast("⚔️ 2ª Fase: Movimento e Azioni! Spendi le tue 2 Azioni ⚡.");
        addLog(\`>>> Inizio 2ª Fase: Movimento / Azioni [Azioni: \${battleState[role].actions}]\`, role);
      } else if (currentPhase === 2) {
        setTurnPhase(3);
        showToast("💧 3ª Fase: Mantenimento! Puoi schierare truppe o usare magie residue.");
        addLog(\`>>> Inizio 3ª Fase: Mantenimento finale [Mana residuo: \${battleState[role].mana}]\`, role);
      } else if (currentPhase === 3) {
        setTurnPhase(4);
        showToast("⏳ 4ª Fase: Fine Turno! Passaggio del turno in corso...");
        addLog(\`>>> 4ª Fase: Conclusione turno \${role.toUpperCase()}\`, role);
        setTimeout(() => {
          endTurnP1();
        }, 300);
      } else {
        endTurnP1();
      }
    }`;

const newAdvanceTurnPhase = `    function advanceTurnPhase() {
      if (!battleState) return;
      const role = getMyRole();
      if (battleState.turn !== role) return showToast("Non è il tuo turno!");
      endTurnP1();
    }`;

content = content.replace(oldAdvanceTurnPhase, newAdvanceTurnPhase);

const oldUpdatePhaseUI = `      const btn = document.getElementById('btn-end-turn');
      if (btn) {
        if (!isMyTurn) {
          btn.textContent = "Turno Avversario...";
          btn.disabled = true;
          btn.style.opacity = "0.5";
          btn.style.cursor = "not-allowed";
        } else {
          btn.disabled = false;
          btn.style.opacity = "1";
          btn.style.cursor = "pointer";
          if (phase === 1) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 2: Azioni ⚔️</span><span class="phase-label-short">Fase 2: Azioni ⚔️</span>';
            btn.className = "btn btn-gold btn-hud-action";
          } else if (phase === 2) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 3: Mantenimento 💧</span><span class="phase-label-short">Fase 3: Mant. 💧</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          } else if (phase === 3) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 4: Fine Turno ⏳</span><span class="phase-label-short">Fase 4: Fine ⏳</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          } else {
            btn.innerHTML = '<span class="phase-label-full">Fine Turno ⏳</span><span class="phase-label-short">Fine Turno ⏳</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          }
        }
      }`;

const newUpdatePhaseUI = `      const btn = document.getElementById('btn-end-turn');
      if (btn) {
        if (!isMyTurn) {
          btn.textContent = "Turno Avversario...";
          btn.disabled = true;
          btn.style.opacity = "0.5";
          btn.style.cursor = "not-allowed";
          btn.className = "btn btn-hud-action";
        } else {
          btn.disabled = false;
          btn.style.opacity = "1";
          btn.style.cursor = "pointer";
          btn.innerHTML = '<span class="phase-label-full">FINE TURNO ⏳</span><span class="phase-label-short">FINE ⏳</span>';
          btn.className = "btn btn-crimson btn-hud-action pulse-gold";
        }
      }`;

content = content.replace(oldUpdatePhaseUI, newUpdatePhaseUI);

// 11. OVERHAUL checkWin (Epic Modal & Sound instead of alert)
const oldCheckWinAlert = `        if (role === 'p1') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          alert(\`👑 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +\${goldReward} Oro 🪙!\`);
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');`;

const newCheckWinAlert = `        if (role === 'p1') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          playSfx('victory');
          showVictoryModal(true, goldReward);
        } else {
          playSfx('defeat');
          showVictoryModal(false, 0);
        }`;

content = content.replace(oldCheckWinAlert, newCheckWinAlert);

const oldCheckWinAlertP2 = `        if (role === 'p2') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          alert(\`👑 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +\${goldReward} Oro 🪙!\`);
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');`;

const newCheckWinAlertP2 = `        if (role === 'p2') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          playSfx('victory');
          showVictoryModal(true, goldReward);
        } else {
          playSfx('defeat');
          showVictoryModal(false, 0);
        }`;

content = content.replace(oldCheckWinAlertP2, newCheckWinAlertP2);

// Add showVictoryModal helper function
const victoryModalJs = `
    function showVictoryModal(isVictory, goldReward = 100) {
      const overlay = document.getElementById('battle-end-overlay');
      if (!overlay) return;
      const iconEl = document.getElementById('bem-icon');
      const titleEl = document.getElementById('bem-title');
      const descEl = document.getElementById('bem-desc');
      const rewardEl = document.getElementById('bem-reward');

      if (isVictory) {
        if (iconEl) iconEl.textContent = '👑';
        if (titleEl) {
          titleEl.textContent = 'VITTORIA TRIONFALE';
          titleEl.className = 'bem-title';
        }
        if (descEl) descEl.textContent = 'Il Comandante nemico è caduto! Hai conquistato il Frammento della Corona.';
        if (rewardEl) {
          rewardEl.style.display = 'block';
          rewardEl.textContent = \`+\${goldReward} 🪙 Monete d'Oro Guadagnate!\`;
        }
      } else {
        if (iconEl) iconEl.textContent = '💀';
        if (titleEl) {
          titleEl.textContent = 'SCONFITTA';
          titleEl.className = 'bem-title defeat';
        }
        if (descEl) descEl.textContent = 'Il tuo Comandante è caduto. Riorganizza il tuo grimorio e torna a combattere!';
        if (rewardEl) rewardEl.style.display = 'none';
      }
      overlay.classList.add('active');
    }
`;

content = content.replace('function checkWin() {', victoryModalJs + '\n    function checkWin() {');

// 12. OVERHAUL DOMContentLoaded (Zero Login Wall for New Players)
const oldDOMContentLoaded = `    window.addEventListener('DOMContentLoaded', async () => {
      showPaneDirect('auth');
      initLobbyPresence();

      // 1. Prova a ripristinare la sessione Cloud da Supabase
      if (sbClient) {
        try {
          const { data: { session }, error: sessionError } = await sbClient.auth.getSession();
          if (session && session.user) {
            console.log("Sessione Supabase trovata per:", session.user.email);
            
            // Cerca il profilo sul Cloud
            let { data: profile, error: pErr } = await sbClient
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            // Autoriparazione: se il profilo non esiste nel DB, crealo all'istante
            if (!profile) {
              console.log("Profilo mancante sul DB, inizializzazione automatica...");
              const initialDecks = { 'Mazzo Base': { commanderId: 'valeria', cards: [...defaultBaseDeck] } };
              profile = {
                id: session.user.id,
                username: (session.user.user_metadata && session.user.user_metadata.username) || session.user.email.split('@')[0],
                gold: 100,
                decks: initialDecks,
                collection: {},
                active_deck_name: 'Mazzo Base',
                updated_at: new Date().toISOString()
              };
              await sbClient.from('profiles').upsert(profile);
            }

            currentUser = {
              id: session.user.id,
              email: session.user.email,
              username: profile.username || session.user.email.split('@')[0]
            };

            let stateData = {
              gold: profile.gold,
              collection: profile.collection,
              decks: profile.decks,
              activeDeckName: profile.active_deck_name
            };

            // Controlla se il salvataggio locale recente ha più progressi
            const localBackupRaw = localStorage.getItem('crownfall_user_state_' + currentUser.id);
            if (localBackupRaw) {
              try {
                const lb = JSON.parse(localBackupRaw);
                if (lb && typeof lb.gold === 'number' && lb.gold > (profile.gold || 0)) {
                  stateData.gold = lb.gold;
                }
                if (lb && lb.decks && Object.keys(lb.decks).length > Object.keys(stateData.decks || {}).length) {
                  stateData.decks = lb.decks;
                }
                if (lb && lb.unlockedCommanders) {
                  stateData.unlockedCommanders = lb.unlockedCommanders;
                }
              } catch (e) {}
            }

            userState = normalizeUserState(stateData);
            localStorage.setItem('crownfall_last_login_type', 'cloud');
            onLoginSuccess(\`Sessione Cloud ripristinata: \${currentUser.username}\`);
            return;
          }
        } catch (e) {
          console.warn("Errore ripristino sessione Cloud:", e);
        }
      }

      // 2. Se non c'è sessione Cloud, controlla se l'utente stava giocando Offline
      const lastLogin = localStorage.getItem('crownfall_last_login_type');
      if (lastLogin === 'offline') {
        const savedRaw = localStorage.getItem('crownfall_active_save') || localStorage.getItem('crownfall_offline_save');
        if (savedRaw) {
          try {
            currentUser = { id: 'local_dev', email: 'offline@veridia.com', username: 'Condottiero Offline' };
            userState = normalizeUserState(JSON.parse(savedRaw));
            onLoginSuccess("Sessione Offline ripristinata!");
            return;
          } catch (e) {
            console.warn("Errore ripristino sessione Offline:", e);
          }
        }
      }
    });`;

const newDOMContentLoaded = `    window.addEventListener('DOMContentLoaded', async () => {
      // Inizializza audio e lobby
      initLobbyPresence();

      // 1. Prova a ripristinare la sessione Cloud da Supabase se presente
      if (sbClient) {
        try {
          const { data: { session }, error: sessionError } = await sbClient.auth.getSession();
          if (session && session.user) {
            let { data: profile, error: pErr } = await sbClient
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (!profile) {
              const initialDecks = { 'Mazzo Base': { commanderId: 'valeria', cards: [...defaultBaseDeck] } };
              profile = {
                id: session.user.id,
                username: (session.user.user_metadata && session.user.user_metadata.username) || session.user.email.split('@')[0],
                gold: 100,
                decks: initialDecks,
                collection: {},
                active_deck_name: 'Mazzo Base',
                updated_at: new Date().toISOString()
              };
              await sbClient.from('profiles').upsert(profile);
            }

            currentUser = {
              id: session.user.id,
              email: session.user.email,
              username: profile.username || session.user.email.split('@')[0]
            };

            let stateData = {
              gold: profile.gold,
              collection: profile.collection,
              decks: profile.decks,
              activeDeckName: profile.active_deck_name
            };

            const localBackupRaw = localStorage.getItem('crownfall_user_state_' + currentUser.id);
            if (localBackupRaw) {
              try {
                const lb = JSON.parse(localBackupRaw);
                if (lb && typeof lb.gold === 'number' && lb.gold > (profile.gold || 0)) stateData.gold = lb.gold;
                if (lb && lb.decks && Object.keys(lb.decks).length > Object.keys(stateData.decks || {}).length) stateData.decks = lb.decks;
                if (lb && lb.unlockedCommanders) stateData.unlockedCommanders = lb.unlockedCommanders;
              } catch (e) {}
            }

            userState = normalizeUserState(stateData);
            localStorage.setItem('crownfall_last_login_type', 'cloud');
            onLoginSuccess(\`Bentornato, \${currentUser.username}!\`);
            return;
          }
        } catch (e) {
          console.warn("Ripristino sessione Cloud:", e);
        }
      }

      // 2. Se non c'è sessione Cloud, carica il profilo locale o creane uno istantaneo da Ospite!
      const savedRaw = localStorage.getItem('crownfall_active_save') || localStorage.getItem('crownfall_offline_save');
      let parsed = null;
      if (savedRaw) {
        try { parsed = JSON.parse(savedRaw); } catch (e) {}
      }

      const guestName = (parsed && parsed.guestName) || ('Condottiero_' + Math.floor(100 + Math.random() * 900));
      currentUser = { id: 'local_guest', email: 'ospite@veridia.com', username: guestName };
      userState = normalizeUserState(parsed);
      if (!userState.guestName) userState.guestName = guestName;
      localStorage.setItem('crownfall_last_login_type', 'offline');
      saveCloudState();

      // Entra direttamente nel gioco senza alcun blocco!
      onLoginSuccess(\`Benvenuto a Crownfall, \${guestName}!\`);
    });`;

content = content.replace(oldDOMContentLoaded, newDOMContentLoaded);

// Write back to index.html and crownfall.html
fs.writeFileSync('index.html', content, 'utf8');
fs.writeFileSync('crownfall.html', content, 'utf8');
console.log("SUCCESS: index.html and crownfall.html successfully overwritten with complete overhaul!");
