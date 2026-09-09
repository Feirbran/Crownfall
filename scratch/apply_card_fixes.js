const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. CSS Updates
  // Ensure .mtg-card-title has max-width and ellipsis
  content = content.replace(
    `.mtg-card-title { font-size: 0.72rem; font-weight: 800; color: #f1f2f6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
    `.mtg-card-title { font-size: 0.72rem; font-weight: 800; color: #f1f2f6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 95px; }`
  );

  // Update .mtg-cost-pip and add cost-wrap + blood pip + set badge
  const oldCostPipCss = `.mtg-cost-pip { width: 18px; height: 18px; border-radius: 50%; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.65rem; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .mtg-cost-pip.gold { background: #b8860b; border-color: #ffd700; color: #000; }`;

  const newCostPipCss = `.mtg-cost-pips-wrap { display: flex; align-items: center; gap: 3px; flex-shrink: 0; }
    .mtg-cost-pip { min-width: 19px; height: 19px; padding: 0 4px; border-radius: 10px; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.65rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; line-height: 1; box-sizing: border-box; flex-shrink: 0; }
    .mtg-cost-pip.mana { background: #0984e3; border-color: #74b9ff; }
    .mtg-cost-pip.blood { background: #8b0000; border-color: #ff4d4d; color: #fff; font-size: 0.6rem; padding: 0 4px; }
    .mtg-cost-pip.gold { background: #b8860b; border-color: #ffd700; color: #000; }`;

  content = content.replace(oldCostPipCss, newCostPipCss);

  // Update .mtg-text-box and add .mtg-set-badge
  const oldPtBoxCss = `.mtg-text-box { flex: 1; padding: 5px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; }
    .mtg-pt-box { position: absolute; bottom: 4px; right: 4px; background: #161924; border: 1px solid var(--gold-primary); border-radius: 4px; padding: 1px 6px; font-size: 0.68rem; font-weight: 900; color: #fff; }`;

  const newPtBoxCss = `.mtg-text-box { flex: 1; padding: 5px 6px 18px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; position: relative; }
    .mtg-set-badge { position: absolute; bottom: 4px; left: 4px; font-family: 'Cinzel', serif; font-size: 0.72rem; font-weight: 900; color: var(--gold-primary); background: rgba(10, 13, 20, 0.9); border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 4px; padding: 1px 5px; line-height: 1; text-transform: none; box-shadow: 0 2px 5px rgba(0,0,0,0.6); z-index: 5; pointer-events: none; }
    .mtg-pt-box { position: absolute; bottom: 4px; right: 4px; background: #161924; border: 1px solid var(--gold-primary); border-radius: 4px; padding: 1px 6px; font-size: 0.68rem; font-weight: 900; color: #fff; z-index: 5; }`;

  content = content.replace(oldPtBoxCss, newPtBoxCss);

  // Update hover preview CSS
  const oldHcpCss = `.hcp-cost { width: 22px; height: 22px; border-radius: 50%; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.75rem; font-weight: 900; display: flex; align-items: center; justify-content: center; }`;
  const newHcpCss = `.hcp-cost { min-width: 22px; height: 22px; padding: 0 5px; border-radius: 11px; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.75rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
    .hcp-footer { display: flex; justify-content: space-between; align-items: center; padding: 4px 8px 6px 8px; margin-top: auto; background: #0b0d12; border-top: 1px solid #232738; }
    .hcp-set-badge { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 900; color: var(--gold-primary); background: #161924; border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 4px; padding: 2px 8px; line-height: 1; text-transform: none; }`;

  content = content.replace(oldHcpCss, newHcpCss);

  // 2. HTML Updates
  // Add set filter pills in deckbuilder
  const oldFilterGroup = `<div class="arena-filter-group">
          <div class="type-pill-btn active" id="filter-type-all" onclick="setTypeFilter('all')">Tutto</div>
          <div class="type-pill-btn" id="filter-type-altar" onclick="setTypeFilter('altar')">🏛️ Altari</div>
          <div class="type-pill-btn" id="filter-type-unit" onclick="setTypeFilter('unit')">Truppe</div>
          <div class="type-pill-btn" id="filter-type-spell" onclick="setTypeFilter('spell')">Sortilegi</div>
        </div>`;

  const newFilterGroup = `<div class="arena-filter-group">
          <div class="type-pill-btn active" id="filter-type-all" onclick="setTypeFilter('all')">Tutto</div>
          <div class="type-pill-btn" id="filter-type-altar" onclick="setTypeFilter('altar')">🏛️ Altari</div>
          <div class="type-pill-btn" id="filter-type-unit" onclick="setTypeFilter('unit')">Truppe</div>
          <div class="type-pill-btn" id="filter-type-spell" onclick="setTypeFilter('spell')">Sortilegi</div>
        </div>

        <div class="arena-filter-group">
          <div class="type-pill-btn set-pill-btn active" id="filter-set-all" onclick="setSetFilter('all')">Tutti i Set</div>
          <div class="type-pill-btn set-pill-btn" id="filter-set-alpha" onclick="setSetFilter('α')">Set α</div>
          <div class="type-pill-btn set-pill-btn" id="filter-set-beta" onclick="setSetFilter('β')">Set β</div>
        </div>`;

  content = content.replace(oldFilterGroup, newFilterGroup);

  // Market shop box card text
  content = content.replace(
    `<span style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 900;">ESPANSIONE 1 — EREDI DELLA SECESSIONE</span>`,
    `<span style="font-size: 0.78rem; color: var(--gold-primary); font-weight: 900;">SET β — EREDI DELLA SECESSIONE</span>`
  );

  // Floating card preview HTML
  const oldHoverPreviewHtml = `  <!-- FLOATING CARD PREVIEW -->
  <div id="hover-card-preview">
    <div class="hcp-header">
      <span class="hcp-title" id="hcp-title">Nome Carta</span>
      <span class="hcp-cost" id="hcp-cost">0</span>
    </div>
    <div class="hcp-art" id="hcp-art">⚔️</div>
    <div class="hcp-type" id="hcp-type">
      <span id="hcp-type-text">TRUPPA</span>
      <span class="rarity-badge common" id="hcp-rarity-badge">COMUNE</span>
    </div>
    <div class="hcp-desc" id="hcp-desc">Descrizione regole.</div>
    <div class="hcp-pt" id="hcp-pt">0/0</div>
  </div>

  <div id="card-summon-overlay">
    <div style="width:260px; height:380px; background:#111319; border:3px solid var(--gold-primary); border-radius:12px; display:flex; flex-direction:column; overflow:hidden;">
      <div class="hcp-header">
        <span class="hcp-title" id="sc-title">Carta</span>
        <span class="hcp-cost" id="sc-cost">0</span>
      </div>
      <div class="hcp-art" id="sc-art" style="font-size:3.5rem; height:150px;">⚔️</div>
      <div class="hcp-type" id="sc-type" style="padding: 4px 10px; font-size: 0.65rem; font-weight: 800; color: var(--gold-primary); border-bottom: 1px solid #2d3248; display: flex; justify-content: space-between;">
        <span id="sc-type-text">TRUPPA</span>
        <span class="rarity-badge common" id="sc-rarity-badge">COMUNE</span>
      </div>
      <div class="hcp-desc" id="sc-desc" style="font-size:0.8rem; padding:10px; color:#cfd4e8;">Descrizione.</div>
      <div class="hcp-pt" id="sc-pt" style="align-self:flex-end; margin:0 10px 10px 0; border:1px solid var(--gold-primary); padding:2px 8px; border-radius:4px;">0/0</div>
    </div>
  </div>`;

  const newHoverPreviewHtml = `  <!-- FLOATING CARD PREVIEW -->
  <div id="hover-card-preview">
    <div class="hcp-header">
      <span class="hcp-title" id="hcp-title">Nome Carta</span>
      <div id="hcp-cost-wrap" class="mtg-cost-pips-wrap">
        <span class="hcp-cost" id="hcp-cost">0</span>
      </div>
    </div>
    <div class="hcp-art" id="hcp-art">⚔️</div>
    <div class="hcp-type" id="hcp-type">
      <span id="hcp-type-text">TRUPPA</span>
      <span class="rarity-badge common" id="hcp-rarity-badge">COMUNE</span>
    </div>
    <div class="hcp-desc" id="hcp-desc">Descrizione regole.</div>
    <div class="hcp-footer">
      <div class="hcp-set-badge" id="hcp-set-badge">α</div>
      <div class="hcp-pt" id="hcp-pt" style="margin: 0; align-self: center;">0/0</div>
    </div>
  </div>

  <div id="card-summon-overlay">
    <div style="width:260px; height:380px; background:#111319; border:3px solid var(--gold-primary); border-radius:12px; display:flex; flex-direction:column; overflow:hidden;">
      <div class="hcp-header">
        <span class="hcp-title" id="sc-title">Carta</span>
        <div id="sc-cost-wrap" class="mtg-cost-pips-wrap">
          <span class="hcp-cost" id="sc-cost">0</span>
        </div>
      </div>
      <div class="hcp-art" id="sc-art" style="font-size:3.5rem; height:150px;">⚔️</div>
      <div class="hcp-type" id="sc-type" style="padding: 4px 10px; font-size: 0.65rem; font-weight: 800; color: var(--gold-primary); border-bottom: 1px solid #2d3248; display: flex; justify-content: space-between;">
        <span id="sc-type-text">TRUPPA</span>
        <span class="rarity-badge common" id="sc-rarity-badge">COMUNE</span>
      </div>
      <div class="hcp-desc" id="sc-desc" style="font-size:0.8rem; padding:10px; color:#cfd4e8;">Descrizione.</div>
      <div class="hcp-footer">
        <div class="hcp-set-badge" id="sc-set-badge">α</div>
        <div class="hcp-pt" id="sc-pt" style="margin: 0; align-self: center;">0/0</div>
      </div>
    </div>
  </div>`;

  content = content.replace(oldHoverPreviewHtml, newHoverPreviewHtml);

  // 3. JavaScript Adapter Updates
  // CARDS_DB adapter
  const oldCardsDbAdapter = `    // ADAPTER COMPATIBILE CARDS_DB (114 carte)
    const CARDS_DB = {};
    Object.entries(FULL_CARD_CATALOG).forEach(([key, raw]) => {
      const isSet0 = (raw.faction === 'Neutral' && raw.rarity === 'C');
      const setNum = isSet0 ? 'α' : 'β';
      const r = RARITY_MAP[raw.rarity] || 'common';
      const moveNorm = (raw.move === 'ortho' ? 'orth' : (raw.move === 'ortho2' ? 'orth2' : (raw.move === 'none' ? 'orth' : raw.move)));

      const card = {
        id: key,
        name: key,
        shortName: raw.shortName || key,
        faction: raw.faction,
        glyph: raw.glyph,
        cost: raw.cost,
        bloodCost: raw.bloodCost || 0,
        type: raw.type,
        slot: raw.slot,
        manaGen: raw.manaGen || (raw.type === 'altar' ? 1 : 0),
        hp: raw.pv !== undefined ? raw.pv : (raw.hp || 1),
        pv: raw.pv !== undefined ? raw.pv : (raw.hp || 1),
        att: raw.att !== undefined ? raw.att : 0,
        move: moveNorm,
        rawMove: raw.move,
        range: raw.gittata !== undefined ? raw.gittata : (raw.range !== undefined ? raw.range : 1),
        gittata: raw.gittata !== undefined ? raw.gittata : (raw.range !== undefined ? raw.range : 1),
        rarity: r,
        rawRarity: raw.rarity,
        isMiniature: !!raw.isMiniature,
        slancio: !!raw.slancio,
        keywords: raw.slancio ? ['slancio'] : [],
        isCenterOnly: !!raw.isCenterOnly,
        desc: raw.desc,
        set: setNum
      };
      CARDS_DB[key] = card;
    });`;

  const newCardsDbAdapter = `    // ADAPTER COMPATIBILE CARDS_DB (560 carte uniche Set α e Set β)
    const CARDS_DB = {};
    Object.entries(FULL_CARD_CATALOG).forEach(([key, raw]) => {
      // Attribuzione corretta del Set:
      // CARDS_ALPHA (290 carte) appartiene al Set α
      // Le carte uniche di CARDS_BETA (270 carte) appartengono al Set β
      // Le 20 carte base neutrali appartengono al Set α
      const isBetaOnly = (typeof CARDS_BETA !== 'undefined') && (key in CARDS_BETA) && (typeof CARDS_ALPHA === 'undefined' || !(key in CARDS_ALPHA));
      const setNum = raw.set || (isBetaOnly ? 'β' : 'α');
      const r = RARITY_MAP[raw.rarity] || 'common';
      const moveNorm = (raw.move === 'ortho' ? 'orth' : (raw.move === 'ortho2' ? 'orth2' : (raw.move === 'none' ? 'orth' : raw.move)));

      const isUnit = raw.type === 'unit';
      const isAltar = raw.type === 'altar';
      let unitHp = undefined;
      let unitAtt = undefined;
      if (isUnit) {
        unitHp = raw.pv !== undefined ? raw.pv : (raw.hp !== undefined ? raw.hp : 1);
        unitAtt = raw.att !== undefined ? raw.att : 0;
      } else if (isAltar) {
        unitHp = raw.pv !== undefined ? raw.pv : (raw.hp !== undefined ? raw.hp : 5);
        unitAtt = raw.att !== undefined ? raw.att : 0;
      }

      const card = {
        id: key,
        name: key,
        shortName: raw.shortName || key,
        faction: raw.faction,
        glyph: raw.glyph,
        cost: raw.cost !== undefined ? raw.cost : 0,
        bloodCost: raw.bloodCost || 0,
        type: raw.type,
        slot: raw.slot,
        manaGen: raw.manaGen || (isAltar ? 1 : 0),
        hp: unitHp,
        pv: unitHp,
        att: unitAtt,
        move: moveNorm,
        rawMove: raw.move,
        range: raw.gittata !== undefined ? raw.gittata : (raw.range !== undefined ? raw.range : 1),
        gittata: raw.gittata !== undefined ? raw.gittata : (raw.range !== undefined ? raw.range : 1),
        rarity: r,
        rawRarity: raw.rarity,
        isMiniature: !!raw.isMiniature,
        slancio: !!raw.slancio,
        keywords: raw.slancio ? ['slancio'] : [],
        isCenterOnly: !!raw.isCenterOnly,
        desc: raw.desc,
        set: setNum
      };
      CARDS_DB[key] = card;
    });

    // Helper per renderizzare pips di costo (Mana blu + Sangue rosso)
    function getCardCostPipsHtml(card) {
      let html = '';
      if (card.cost > 0 || (!card.bloodCost && card.cost === 0)) {
        html += \`<span class="mtg-cost-pip mana">\${card.cost !== undefined ? card.cost : 0}</span>\`;
      }
      if (card.bloodCost && card.bloodCost > 0) {
        html += \`<span class="mtg-cost-pip blood">\${card.bloodCost}🩸</span>\`;
      }
      return \`<div class="mtg-cost-pips-wrap">\${html}</div>\`;
    }`;

  content = content.replace(oldCardsDbAdapter, newCardsDbAdapter);

  // deckFilters initialization
  content = content.replace(
    `let deckFilters = { mana: 'all', type: 'all', search: '', mode: 'cards' };`,
    `let deckFilters = { mana: 'all', type: 'all', set: 'all', search: '', mode: 'cards' };`
  );

  // showHoverCard function
  const oldShowHoverCard = `    function showHoverCard(card, e) {
      const el = document.getElementById('hover-card-preview');
      if(!el) return;
      document.getElementById('hcp-title').textContent = card.name;
      document.getElementById('hcp-cost').textContent = card.cost !== undefined ? card.cost : '';
      document.getElementById('hcp-art').textContent = card.glyph;
      document.getElementById('hcp-type-text').textContent = (card.type || '').toUpperCase();
      const rb = document.getElementById('hcp-rarity-badge');
      const r = card.rarity || 'common';
      rb.className = \`rarity-badge \${r}\`;
      rb.textContent = (RARITY_NAMES[r] || 'COMUNE').toUpperCase();
      document.getElementById('hcp-desc').textContent = card.desc || card.riteDesc || '';
      
      const pt = document.getElementById('hcp-pt');
      if (card.att !== undefined && card.hp !== undefined) {
        pt.style.display = 'block';
        pt.textContent = \`\${card.att}/\${card.hp}\`;
      } else {
        pt.style.display = 'none';
      }
      
      updateHoverCardPos(e);
      el.classList.add('active');
    }`;

  const newShowHoverCard = `    function showHoverCard(card, e) {
      const el = document.getElementById('hover-card-preview');
      if(!el) return;
      document.getElementById('hcp-title').textContent = card.name;
      
      const costWrap = document.getElementById('hcp-cost-wrap');
      if (costWrap) {
        costWrap.innerHTML = '';
        if (card.riteDesc && !card.cost && !card.bloodCost) {
          costWrap.innerHTML = '<span class="mtg-cost-pip gold" style="min-width:22px; height:22px;">👑</span>';
        } else {
          if (card.cost > 0 || (!card.bloodCost && card.cost === 0)) {
            costWrap.innerHTML += \`<span class="mtg-cost-pip mana" style="min-width:22px; height:22px; font-size:0.75rem;">\${card.cost !== undefined ? card.cost : 0}</span>\`;
          }
          if (card.bloodCost && card.bloodCost > 0) {
            costWrap.innerHTML += \`<span class="mtg-cost-pip blood" style="min-width:25px; height:22px; font-size:0.7rem;">\${card.bloodCost}🩸</span>\`;
          }
        }
      }

      document.getElementById('hcp-art').textContent = card.glyph || '⚔️';
      
      const typeLabels = {
        'unit': 'MINIATURA',
        'altar': 'ALTARE',
        'spell': 'MAGIA',
        'reaction': 'REAZIONE'
      };
      const isComm = !!card.riteDesc;
      const typeStr = isComm ? 'CAMPIONE' : (typeLabels[card.type] || (card.type || '').toUpperCase());
      document.getElementById('hcp-type-text').textContent = typeStr;
      
      const rb = document.getElementById('hcp-rarity-badge');
      const r = card.rarity || 'common';
      rb.className = \`rarity-badge \${r}\`;
      rb.textContent = (RARITY_NAMES[r] || 'COMUNE').toUpperCase();
      
      document.getElementById('hcp-desc').textContent = card.desc || card.riteDesc || '';

      const setBadge = document.getElementById('hcp-set-badge');
      if (setBadge) {
        setBadge.textContent = card.set || 'α';
      }
      
      const pt = document.getElementById('hcp-pt');
      if (pt) {
        if (card.type === 'unit' || isComm) {
          pt.style.display = 'block';
          pt.textContent = \`\${card.att !== undefined ? card.att : 0}/\${card.hp !== undefined ? card.hp : 1}\`;
        } else if (card.type === 'altar') {
          pt.style.display = 'block';
          pt.textContent = \`\${card.att ? card.att + '/' : ''}\${card.hp || 5} PV\`;
        } else {
          // Sortilegi e Reazioni non possiedono PV o ATT
          pt.style.display = 'none';
        }
      }
      
      updateHoverCardPos(e);
      el.classList.add('active');
    }`;

  content = content.replace(oldShowHoverCard, newShowHoverCard);

  // animateCardPlayed
  const oldAnimateCard = `    function animateCardPlayed(card, onComplete) {
      const overlay = document.getElementById('card-summon-overlay');
      if (!overlay) {
        if (onComplete) onComplete();
        return;
      }
      
      document.getElementById('sc-title').textContent = card.name;
      document.getElementById('sc-cost').textContent = card.cost !== undefined ? card.cost : '';
      document.getElementById('sc-art').textContent = card.glyph;
      document.getElementById('sc-type-text').textContent = (card.type || '').toUpperCase();
      
      const rb = document.getElementById('sc-rarity-badge');
      const r = card.rarity || 'common';
      rb.className = \`rarity-badge \${r}\`;
      rb.textContent = (RARITY_NAMES[r] || 'COMUNE').toUpperCase();
      
      document.getElementById('sc-desc').textContent = card.desc || '';
      const pt = document.getElementById('sc-pt');
      if (card.att !== undefined && card.hp !== undefined) {
        pt.style.display = 'block';
        pt.textContent = \`\${card.att}/\${card.hp}\`;
      } else {
        pt.style.display = 'none';
      }
      
      overlay.classList.add('active');
      
      setTimeout(() => {
        overlay.classList.remove('active');
        if (onComplete) onComplete();
      }, 1000);
    }`;

  const newAnimateCard = `    function animateCardPlayed(card, onComplete) {
      const overlay = document.getElementById('card-summon-overlay');
      if (!overlay) {
        if (onComplete) onComplete();
        return;
      }
      
      document.getElementById('sc-title').textContent = card.name;
      
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
      
      document.getElementById('sc-desc').textContent = card.desc || '';
      
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
      
      overlay.classList.add('active');
      
      setTimeout(() => {
        overlay.classList.remove('active');
        if (onComplete) onComplete();
      }, 1000);
    }`;

  content = content.replace(oldAnimateCard, newAnimateCard);

  // setSetFilter function addition
  const oldSetTypeFilter = `    function setTypeFilter(val) {
      deckFilters.type = val;
      document.querySelectorAll('.type-pill-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById('filter-type-' + val).classList.add('active');
      renderDeckBuilder();
    }`;

  const newSetTypeFilter = `    function setTypeFilter(val) {
      deckFilters.type = val;
      document.querySelectorAll('.type-pill-btn:not(.set-pill-btn)').forEach(btn => btn.classList.remove('active'));
      document.getElementById('filter-type-' + val).classList.add('active');
      renderDeckBuilder();
    }

    function setSetFilter(val) {
      deckFilters.set = val;
      document.querySelectorAll('.set-pill-btn').forEach(btn => btn.classList.remove('active'));
      const targetId = 'filter-set-' + (val === 'α' ? 'alpha' : (val === 'β' ? 'beta' : 'all'));
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
      renderDeckBuilder();
    }`;

  content = content.replace(oldSetTypeFilter, newSetTypeFilter);

  // renderDeckBuilder: commander select card HTML
  const oldCommSelectCardHtml = `          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title">\${comm.name}</span><span class="mtg-cost-pip gold">Set \${comm.set}</span></div>
            <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${comm.glyph}</div></div>
            <div class="mtg-type-banner">
              <span>Campione [Set \${comm.set}]</span>
              <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
            </div>
            <div class="mtg-text-box">\${comm.riteDesc}</div>
            <div class="mtg-pt-box">\${comm.att}/\${comm.hp}</div>
          \`;`;

  const newCommSelectCardHtml = `          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title" title="\${comm.name}">\${comm.name}</span><span class="mtg-cost-pip gold">👑</span></div>
            <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${comm.glyph}</div></div>
            <div class="mtg-type-banner">
              <span>CAMPIONE</span>
              <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
            </div>
            <div class="mtg-text-box">\${comm.riteDesc}</div>
            <div class="mtg-set-badge">\${comm.set || 'α'}</div>
            <div class="mtg-pt-box">\${comm.att}/\${comm.hp}</div>
          \`;`;

  content = content.replace(oldCommSelectCardHtml, newCommSelectCardHtml);

  // renderDeckBuilder: cards grid rendering
  const oldCardsGridRender = `          if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;

          const isUnlocked = (card.set === 0 || card.set === 'α') || (userState.collection[card.id] || 0) > 0;
          const currentCountInDeck = deck.cards.filter(id => id === card.id).length;
          const isMaxedOut = currentCountInDeck >= 4;

          const cardEl = document.createElement('div');
          const r = card.rarity || 'common';
          cardEl.className = \`mtg-card rarity-\${r} \${isUnlocked ? '' : 'locked'}\`;
          if (isMaxedOut) cardEl.style.opacity = '0.6';

          cardEl.onmouseenter = (e) => showHoverCard(card, e);
          cardEl.onmousemove = (e) => updateHoverCardPos(e);
          cardEl.onmouseleave = () => hideHoverCard();

          if (isUnlocked) {
            cardEl.onclick = () => {
              if (deck.cards.length >= 40) return showToast("Grimorio al completo (massimo 40 carte per lo Standard)!");
              if (currentCountInDeck >= 4) return showToast(\`Limite 4x raggiunto per \${card.name}!\`);
              deck.cards.push(card.id);
              renderDeckBuilder();
              saveCloudState();
            };
          }

          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title">\${card.name}</span><span class="mtg-cost-pip">\${card.cost}\${card.bloodCost ? ' + ' + card.bloodCost + '🩸' : ''}</span></div>
            <div class="mtg-card-art">\${card.glyph} \${isMaxedOut ? '<div style="position:absolute;bottom:2px;left:4px;font-size:0.6rem;background:#000;color:#ff7675;padding:1px 4px;border-radius:3px;">4/4 MAX</div>' : ''}</div>
            <div class="mtg-type-banner"><span>\${card.type === 'unit' ? 'Miniatura' : (card.type === 'altar' ? 'Altare' : (card.type === 'reaction' ? 'Reazione' : 'Magia'))} [Set \${card.set}]</span><span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span></div>
            <div class="mtg-text-box">\${card.desc}</div>
            \${card.type === 'unit' ? \`<div class="mtg-pt-box">\${card.att}/\${card.hp}</div>\` : ''}
          \`;`;

  const newCardsGridRender = `          if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;
          if (deckFilters.set && deckFilters.set !== 'all' && card.set !== deckFilters.set) return;

          const isUnlocked = (card.set === 0 || card.set === 'α') || (userState.collection[card.id] || 0) > 0;
          const currentCountInDeck = deck.cards.filter(id => id === card.id).length;
          const isMaxedOut = currentCountInDeck >= 4;

          const cardEl = document.createElement('div');
          const r = card.rarity || 'common';
          cardEl.className = \`mtg-card rarity-\${r} \${isUnlocked ? '' : 'locked'}\`;
          if (isMaxedOut) cardEl.style.opacity = '0.6';

          cardEl.onmouseenter = (e) => showHoverCard(card, e);
          cardEl.onmousemove = (e) => updateHoverCardPos(e);
          cardEl.onmouseleave = () => hideHoverCard();

          if (isUnlocked) {
            cardEl.onclick = () => {
              if (deck.cards.length >= 40) return showToast("Grimorio al completo (massimo 40 carte per lo Standard)!");
              if (currentCountInDeck >= 4) return showToast(\`Limite 4x raggiunto per \${card.name}!\`);
              deck.cards.push(card.id);
              renderDeckBuilder();
              saveCloudState();
            };
          }

          const typeLabel = card.type === 'unit' ? 'Miniatura' : (card.type === 'altar' ? 'Altare' : (card.type === 'reaction' ? 'Reazione' : 'Magia'));
          const ptBoxHtml = card.type === 'unit'
            ? \`<div class="mtg-pt-box">\${card.att}/\${card.hp}</div>\`
            : (card.type === 'altar' ? \`<div class="mtg-pt-box">\${card.hp} PV</div>\` : '');

          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title" title="\${card.name}">\${card.name}</span>\${getCardCostPipsHtml(card)}</div>
            <div class="mtg-card-art">\${card.glyph} \${isMaxedOut ? '<div style="position:absolute;top:2px;right:4px;font-size:0.6rem;background:#000;color:#ff7675;padding:1px 4px;border-radius:3px;z-index:4;">4/4 MAX</div>' : ''}</div>
            <div class="mtg-type-banner"><span>\${typeLabel}</span><span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span></div>
            <div class="mtg-text-box">\${card.desc}</div>
            <div class="mtg-set-badge">\${card.set || 'α'}</div>
            \${ptBoxHtml}
          \`;`;

  content = content.replace(oldCardsGridRender, newCardsGridRender);

  // openBooster: won commander card HTML
  const oldWonCommHtml = `        cEl.innerHTML = \`
          <div style="background: rgba(229,185,88,0.25); color: var(--gold-primary); font-size: 0.6rem; font-weight: 900; padding: 2px; text-align: center; border-bottom: 1px solid var(--border-gold);">
            👑 COMANDANTE SBLOCCATO
          </div>
          <div class="mtg-card-header">
            <span class="mtg-card-title">\${wonComm.name}</span>
            <span class="mtg-cost-pip gold">👑</span>
          </div>
          <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${wonComm.glyph}</div></div>
          <div class="mtg-type-banner">
            <span>CAMPIONE [Set \${wonComm.set}]</span>
            <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
          </div>
          <div class="mtg-text-box">\${wonComm.riteDesc}</div>
          <div class="mtg-pt-box">\${wonComm.att}/\${wonComm.hp}</div>
        \`;`;

  const newWonCommHtml = `        cEl.innerHTML = \`
          <div style="background: rgba(229,185,88,0.25); color: var(--gold-primary); font-size: 0.6rem; font-weight: 900; padding: 2px; text-align: center; border-bottom: 1px solid var(--border-gold);">
            👑 COMANDANTE SBLOCCATO
          </div>
          <div class="mtg-card-header">
            <span class="mtg-card-title" title="\${wonComm.name}">\${wonComm.name}</span>
            <span class="mtg-cost-pip gold">👑</span>
          </div>
          <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${wonComm.glyph}</div></div>
          <div class="mtg-type-banner">
            <span>CAMPIONE</span>
            <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
          </div>
          <div class="mtg-text-box">\${wonComm.riteDesc}</div>
          <div class="mtg-set-badge">\${wonComm.set || 'β'}</div>
          <div class="mtg-pt-box">\${wonComm.att}/\${wonComm.hp}</div>
        \`;`;

  content = content.replace(oldWonCommHtml, newWonCommHtml);

  // openBooster: pack cards HTML
  const oldPackCardHtml = `        const typeLabel = card.type === 'unit' ? 'TRUPPA' : (card.type === 'altar' ? 'ALTARE' : (card.type === 'reaction' ? 'REAZIONE' : 'INCANTESIMO'));
        const ptBox = card.type === 'unit'
          ? \`<div class="mtg-pt-box">\${card.att}/\${card.hp}</div>\`
          : (card.type === 'altar' ? \`<div class="mtg-pt-box">0/\${card.hp}</div>\` : '');

        cardEl.innerHTML = \`
          <div style="background: rgba(0,0,0,0.6); color: var(--gold-primary); font-size: 0.6rem; font-weight: 800; padding: 2px; text-align: center; border-bottom: 1px solid var(--border-frame);">
            \${item.slotName}
          </div>
          <div class="mtg-card-header">
            <span class="mtg-card-title">\${card.name}</span>
            <span class="mtg-cost-pip">\${card.cost}</span>
          </div>
          <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${card.glyph}</div></div>
          <div class="mtg-type-banner">
            <span>\${typeLabel} [Set \${card.set}]</span>
            <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
          </div>
          <div class="mtg-text-box">\${card.desc}</div>
          \${ptBox}
        \`;`;

  const newPackCardHtml = `        const typeLabel = card.type === 'unit' ? 'TRUPPA' : (card.type === 'altar' ? 'ALTARE' : (card.type === 'reaction' ? 'REAZIONE' : 'INCANTESIMO'));
        const ptBox = card.type === 'unit'
          ? \`<div class="mtg-pt-box">\${card.att}/\${card.hp}</div>\`
          : (card.type === 'altar' ? \`<div class="mtg-pt-box">\${card.hp} PV</div>\` : '');

        cardEl.innerHTML = \`
          <div style="background: rgba(0,0,0,0.6); color: var(--gold-primary); font-size: 0.6rem; font-weight: 800; padding: 2px; text-align: center; border-bottom: 1px solid var(--border-frame);">
            \${item.slotName}
          </div>
          <div class="mtg-card-header">
            <span class="mtg-card-title" title="\${card.name}">\${card.name}</span>
            \${getCardCostPipsHtml(card)}
          </div>
          <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${card.glyph}</div></div>
          <div class="mtg-type-banner">
            <span>\${typeLabel}</span>
            <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
          </div>
          <div class="mtg-text-box">\${card.desc}</div>
          <div class="mtg-set-badge">\${card.set || 'α'}</div>
          \${ptBox}
        \`;`;

  content = content.replace(oldPackCardHtml, newPackCardHtml);

  // renderHand: hand card HTML
  const oldHandCardHtml = `        cardEl.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:bold; color:var(--mana-cyan);">\${c.cost}</span>
            <span class="rarity-badge \${r}" style="font-size:0.5rem; padding:0 3px;">\${(RARITY_NAMES[r] || 'COM').slice(0,3)}</span>
          </div>
          <div style="font-size:0.75rem; font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">\${c.name}</div>
        \`;`;

  const newHandCardHtml = `        const costHtml = (c.bloodCost && c.bloodCost > 0)
          ? \`\${c.cost ? c.cost + ' ' : ''}<span style="color:#ff7675;">\${c.bloodCost}🩸</span>\`
          : \`<span style="font-weight:bold; color:var(--mana-cyan);">\${c.cost !== undefined ? c.cost : 0}</span>\`;
        const ptHtml = c.type === 'unit'
          ? \`<span style="font-size:0.65rem; color:#fff; font-weight:800;">\${c.att}/\${c.hp}</span>\`
          : (c.type === 'altar' ? \`<span style="font-size:0.62rem; color:var(--mana-cyan); font-weight:800;">\${c.hp} PV</span>\` : '');

        cardEl.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.75rem; font-weight:bold;">\${costHtml}</div>
            <span class="rarity-badge \${r}" style="font-size:0.5rem; padding:0 3px;">\${(RARITY_NAMES[r] || 'COM').slice(0,3)}</span>
          </div>
          <div style="font-size:0.75rem; font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="\${c.name}">\${c.name}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
            <span style="font-family:'Cinzel',serif; font-size:0.72rem; font-weight:900; color:var(--gold-primary); text-transform:none;">\${c.set || 'α'}</span>
            \${ptHtml}
          </div>
        \`;`;

  content = content.replace(oldHandCardHtml, newHandCardHtml);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated', filePath);
}

updateFile('crownfall.html');
updateFile('index.html');
