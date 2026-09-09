const fs = require('fs');

function applyAll(content) {
  const isCRLF = content.includes('\r\n');
  let c = content.replace(/\r\n/g, '\n');

  // 1. Hover & Summon HTML
  const oldHoverAndSummon = `<div id="hover-card-preview">
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

  const newHoverAndSummon = `<div id="hover-card-preview">
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

  if (c.includes(oldHoverAndSummon)) {
    c = c.replace(oldHoverAndSummon, newHoverAndSummon);
    console.log('Replaced Hover & Summon HTML');
  } else {
    console.log('Hover & Summon HTML already replaced or not found');
  }

  // 2. Filter Group: Add Set filter pills
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

  if (c.includes(oldFilterGroup)) {
    c = c.replace(oldFilterGroup, newFilterGroup);
    console.log('Replaced Filter Group HTML');
  } else {
    console.log('Filter Group HTML already replaced or not found');
  }

  // 3. showHoverCard JS function
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

  if (c.includes(oldShowHoverCard)) {
    c = c.replace(oldShowHoverCard, newShowHoverCard);
    console.log('Replaced showHoverCard');
  } else {
    console.log('showHoverCard already replaced or not found');
  }

  // 4. animateCardPlayed JS function
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

  if (c.includes(oldAnimateCard)) {
    c = c.replace(oldAnimateCard, newAnimateCard);
    console.log('Replaced animateCardPlayed');
  } else {
    console.log('animateCardPlayed already replaced or not found');
  }

  // 5. setTypeFilter JS function: Add setSetFilter
  const oldSetTypeFilter = `    function setTypeFilter(val) {
      deckFilters.type = val;
      document.querySelectorAll('.type-pill-btn').forEach(el => el.classList.remove('active'));
      const activeEl = document.getElementById('filter-type-' + val);
      if (activeEl) activeEl.classList.add('active');
      renderDeckBuilder();
    }`;

  const newSetTypeFilter = `    function setTypeFilter(val) {
      deckFilters.type = val;
      document.querySelectorAll('.type-pill-btn:not(.set-pill-btn)').forEach(el => el.classList.remove('active'));
      const activeEl = document.getElementById('filter-type-' + val);
      if (activeEl) activeEl.classList.add('active');
      renderDeckBuilder();
    }

    function setSetFilter(val) {
      deckFilters.set = val;
      document.querySelectorAll('.set-pill-btn').forEach(el => el.classList.remove('active'));
      const targetId = 'filter-set-' + (val === 'α' ? 'alpha' : (val === 'β' ? 'beta' : 'all'));
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
      renderDeckBuilder();
    }`;

  if (c.includes(oldSetTypeFilter)) {
    c = c.replace(oldSetTypeFilter, newSetTypeFilter);
    console.log('Replaced setTypeFilter & added setSetFilter');
  } else {
    console.log('setTypeFilter already replaced or not found');
  }

  // 6. renderHand JS function: Add set edition to bottom-left of hand card
  const oldRenderHand = `        cardEl.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:bold; color:var(--mana-cyan);">\${c.cost}</span>
            <span class="rarity-badge \${r}" style="font-size:0.5rem; padding:0 3px;">\${(RARITY_NAMES[r] || 'COM').slice(0,3)}</span>
          </div>
          <div style="font-size:0.75rem; font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">\${c.name}</div>
        \`;`;

  const newRenderHand = `        const costHtml = (c.bloodCost && c.bloodCost > 0)
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

  if (c.includes(oldRenderHand)) {
    c = c.replace(oldRenderHand, newRenderHand);
    console.log('Replaced renderHand');
  } else {
    console.log('renderHand already replaced or not found');
  }

  return isCRLF ? c.replace(/\n/g, '\r\n') : c;
}

['crownfall.html', 'index.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const updated = applyAll(content);
  fs.writeFileSync(f, updated, 'utf8');
  console.log('Updated', f);
});
