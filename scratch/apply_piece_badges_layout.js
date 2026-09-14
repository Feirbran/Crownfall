const fs = require('fs');

function updatePieceRendering(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  const oldCodeRegex = /const aurasHtml = auraBadges\.length > 0 \? '<div class="piece-auras-row">' \+ auraBadges\.join\(''\) \+ '<\/div>' : '';[\s\S]*?sq\.appendChild\(el\);/;

  const newCode = `const aurasHtml = auraBadges.length > 0 ? '<span class="piece-auras-row">' + auraBadges.join('') + '</span>' : '';

          const glyph = p.glyph || (p.type === 'commander' ? '👑' : (p.type === 'altar' ? '🏛️' : (p.type === 'wall' ? '🧱' : '⚔️')));
          const nameShort = p.name ? p.name.split(' ')[0] : 'Truppa';
          const col = String.fromCharCode(65 + (i % 8));
          const row = 8 - Math.floor(i / 8);
          const coord = col + row;

          const rangeBadge = (p.range && p.range > 1) ? '<span class="piece-range-badge" title="Gittata: ' + p.range + '">🏹' + p.range + '</span>' : '';
          const exhaustedBadge = p.exhausted ? '<span class="piece-exhausted-tag" title="Esausta">💤</span>' : '';

          let statsHtml = '';
          if (p.type === 'altar') {
            statsHtml = '<span class="piece-stat-hp">🏛️' + p.hp + '</span>';
          } else if (p.type === 'wall') {
            statsHtml = '<span class="piece-stat-hp">🧱' + p.hp + '</span>';
          } else {
            const isDamaged = (p.maxHp && p.hp < p.maxHp) || false;
            statsHtml = '<span class="piece-stat-atk">⚔️' + p.att + '</span><span class="piece-stat-hp ' + (isDamaged ? 'damaged' : '') + '">❤️' + p.hp + '</span>';
          }
          statsHtml += aurasHtml;

          el.innerHTML = rangeBadge + exhaustedBadge +
            '<span class="piece-name-tag" title="' + p.name + ' [' + coord + ']">' + nameShort + '</span>' +
            '<span class="piece-glyph-wrap">' + glyph + '</span>' +
            '<div class="piece-badges">' + statsHtml + '</div>';

          sq.appendChild(el);`;

  if (oldCodeRegex.test(content)) {
    content = content.replace(oldCodeRegex, newCode);
    console.log('Piece rendering updated in ' + filename);
  } else {
    console.warn('oldCodeRegex not matched in ' + filename);
  }

  fs.writeFileSync(filename, content, 'utf8');
  return true;
}

updatePieceRendering('index.html');
updatePieceRendering('crownfall.html');
