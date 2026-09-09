const fs = require('fs');

function applyToContent(content) {
  // Normalize CRLF to LF first so all replacements are 100% reliable
  const wasCRLF = content.includes('\r\n');
  let c = content.replace(/\r\n/g, '\n');

  // 1. Cost pip CSS replacement
  const oldCostPip = `    .mtg-cost-pip { width: 18px; height: 18px; border-radius: 50%; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.65rem; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .mtg-cost-pip.gold { background: #b8860b; border-color: #ffd700; color: #000; }`;

  const newCostPip = `    .mtg-cost-pips-wrap { display: flex; align-items: center; gap: 3px; flex-shrink: 0; }
    .mtg-cost-pip { min-width: 19px; height: 19px; padding: 0 4px; border-radius: 10px; background: #0984e3; border: 1px solid #74b9ff; color: #fff; font-size: 0.65rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; line-height: 1; box-sizing: border-box; flex-shrink: 0; }
    .mtg-cost-pip.mana { background: #0984e3; border-color: #74b9ff; }
    .mtg-cost-pip.blood { background: #8b0000; border-color: #ff4d4d; color: #fff; font-size: 0.6rem; padding: 0 4px; }
    .mtg-cost-pip.gold { background: #b8860b; border-color: #ffd700; color: #000; }`;

  c = c.replace(oldCostPip, newCostPip);

  // 2. Textbox & Set Badge CSS replacement
  const oldPtBox = `    .mtg-text-box { flex: 1; padding: 5px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; }
    .mtg-pt-box { position: absolute; bottom: 4px; right: 4px; background: #161924; border: 1px solid var(--gold-primary); border-radius: 4px; padding: 1px 6px; font-size: 0.68rem; font-weight: 900; color: #fff; }`;

  const newPtBox = `    .mtg-text-box { flex: 1; padding: 5px 6px 18px 6px; background: #0b0d12; font-size: 0.62rem; color: #c2c8de; line-height: 1.25; overflow-y: auto; position: relative; }
    .mtg-set-badge { position: absolute; bottom: 4px; left: 4px; font-family: 'Cinzel', serif; font-size: 0.72rem; font-weight: 900; color: var(--gold-primary); background: rgba(10, 13, 20, 0.9); border: 1px solid rgba(212, 175, 55, 0.45); border-radius: 4px; padding: 1px 5px; line-height: 1; text-transform: none; box-shadow: 0 2px 5px rgba(0,0,0,0.6); z-index: 5; pointer-events: none; }
    .mtg-pt-box { position: absolute; bottom: 4px; right: 4px; background: #161924; border: 1px solid var(--gold-primary); border-radius: 4px; padding: 1px 6px; font-size: 0.68rem; font-weight: 900; color: #fff; z-index: 5; }`;

  c = c.replace(oldPtBox, newPtBox);

  // 3. Commander Select cardEl.innerHTML in renderDeckBuilder
  const oldCommCard = `          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title">\${comm.name}</span><span class="mtg-cost-pip gold">Set \${comm.set}</span></div>
            <div class="mtg-card-art"><div class="mtg-card-art-glyph">\${comm.glyph}</div></div>
            <div class="mtg-type-banner">
              <span>Campione [Set \${comm.set}]</span>
              <span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span>
            </div>
            <div class="mtg-text-box">\${comm.riteDesc}</div>
            <div class="mtg-pt-box">\${comm.att}/\${comm.hp}</div>
          \`;`;

  const newCommCard = `          cardEl.innerHTML = \`
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

  c = c.replace(oldCommCard, newCommCard);

  // 4. Cards Grid cardEl.innerHTML in renderDeckBuilder
  const oldCardGrid = `          cardEl.innerHTML = \`
            <div class="mtg-card-header"><span class="mtg-card-title">\${card.name}</span><span class="mtg-cost-pip">\${card.cost}\${card.bloodCost ? ' + ' + card.bloodCost + '🩸' : ''}</span></div>
            <div class="mtg-card-art">\${card.glyph} \${isMaxedOut ? '<div style="position:absolute;bottom:2px;left:4px;font-size:0.6rem;background:#000;color:#ff7675;padding:1px 4px;border-radius:3px;">4/4 MAX</div>' : ''}</div>
            <div class="mtg-type-banner"><span>\${card.type === 'unit' ? 'Miniatura' : (card.type === 'altar' ? 'Altare' : (card.type === 'reaction' ? 'Reazione' : 'Magia'))} [Set \${card.set}]</span><span class="rarity-badge \${r}">\${RARITY_NAMES[r]}</span></div>
            <div class="mtg-text-box">\${card.desc}</div>
            \${card.type === 'unit' ? \`<div class="mtg-pt-box">\${card.att}/\${card.hp}</div>\` : ''}
          \`;`;

  const newCardGrid = `          const typeLabel = card.type === 'unit' ? 'Miniatura' : (card.type === 'altar' ? 'Altare' : (card.type === 'reaction' ? 'Reazione' : 'Magia'));
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

  c = c.replace(oldCardGrid, newCardGrid);

  // Set filter in renderDeckBuilder
  c = c.replace(
    `if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;`,
    `if (deckFilters.search && !card.name.toLowerCase().includes(deckFilters.search)) return;\n          if (deckFilters.set && deckFilters.set !== 'all' && card.set !== deckFilters.set) return;`
  );

  // 5. Booster pack wonComm
  const oldWonComm = `        cEl.innerHTML = \`
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

  const newWonComm = `        cEl.innerHTML = \`
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

  c = c.replace(oldWonComm, newWonComm);

  // 6. Booster pack cards
  const oldPackCard = `        const typeLabel = card.type === 'unit' ? 'TRUPPA' : (card.type === 'altar' ? 'ALTARE' : (card.type === 'reaction' ? 'REAZIONE' : 'INCANTESIMO'));
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

  const newPackCard = `        const typeLabel = card.type === 'unit' ? 'TRUPPA' : (card.type === 'altar' ? 'ALTARE' : (card.type === 'reaction' ? 'REAZIONE' : 'INCANTESIMO'));
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

  c = c.replace(oldPackCard, newPackCard);

  return wasCRLF ? c.replace(/\n/g, '\r\n') : c;
}

['crownfall.html', 'index.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const updated = applyToContent(content);
  fs.writeFileSync(file, updated, 'utf8');
  console.log('Processed', file);
});
