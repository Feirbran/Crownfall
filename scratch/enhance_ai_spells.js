const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const hasCRLF = html.includes('\r\n');
html = html.replace(/\r\n/g, '\n');

const searchMarker = "} else if (name === 'Barricata Improvvisata' || name === 'Fucina da Campo'";
const mIdx = html.indexOf(searchMarker);
if (mIdx === -1) {
  console.error("Marker not found!");
  process.exit(1);
}

const ifSpellPlayedIdx = html.indexOf("if (spellPlayed) {", mIdx);
if (ifSpellPlayedIdx === -1) {
  console.error("if (spellPlayed) not found!");
  process.exit(1);
}

// Find the closing brace of Barricata if-block right before if (spellPlayed)
const lastBraceBefore = html.lastIndexOf("}", ifSpellPlayedIdx);

const aiGeneralSpellCode = ` else {
            // Lancio Sortilegi universale dell'IA
            const arch = getSpellTargetArchetype(card);
            const bloodReq = card.bloodCost || 0;
            if (bloodReq <= battleState.p2.blood) {
              const aiCommIdx = battleState.grid.findIndex(p => p && p.owner === 'p2' && p.type === 'commander');
              let targetFound = -1;
              if (arch === 'commander') {
                targetFound = aiCommIdx;
              } else if (arch === 'ally_altar') {
                const altars = battleState.grid.map((p, i) => ({ p, i })).filter(x => x.p && x.p.owner === 'p2' && x.p.type === 'altar');
                if (altars.length > 0) {
                  altars.sort((a, b) => a.p.hp - b.p.hp);
                  targetFound = altars[0].i;
                }
              } else if (arch === 'ally_unit') {
                const units = battleState.grid.map((p, i) => ({ p, i })).filter(x => x.p && x.p.owner === 'p2' && x.p.type === 'unit');
                if (units.length > 0) {
                  units.sort((a, b) => b.p.att - a.p.att);
                  targetFound = units[0].i;
                }
              } else if (arch === 'enemy_any' || arch === 'enemy_unit') {
                const enemies = battleState.grid.map((p, i) => ({ p, i })).filter(x => x.p && x.p.owner === 'p1' && x.p.type !== 'wall');
                if (enemies.length > 0) {
                  enemies.sort((a, b) => (b.p.att || 0) - (a.p.att || 0));
                  targetFound = enemies[0].i;
                }
              } else if (arch === 'free_cell') {
                if (aiCommIdx !== -1) {
                  const cr = Math.floor(aiCommIdx / 8), cc = aiCommIdx % 8;
                  for (let i = 0; i < 64; i++) {
                    if (!battleState.grid[i]) {
                      const r = Math.floor(i / 8), c = i % 8;
                      if (Math.max(Math.abs(r - cr), Math.abs(c - cc)) <= 3) {
                        targetFound = i;
                        break;
                      }
                    }
                  }
                }
              }

              if (targetFound !== -1) {
                executeSpellAction(targetFound, cardId, 'p2', false);
                spellPlayed = true;
              }
            }
          }`;

html = html.substring(0, lastBraceBefore + 1) + aiGeneralSpellCode + html.substring(lastBraceBefore + 1);

if (hasCRLF) {
  html = html.replace(/\n/g, '\r\n');
}

// Validate syntax
const scriptStartTag = '<script>';
const scriptEndTag = '</script>';
const sStart = html.indexOf(scriptStartTag);
const sEnd = html.lastIndexOf(scriptEndTag);
const jsCode = html.substring(sStart + scriptStartTag.length, sEnd);

try {
  new Function(jsCode);
  console.log('AI Spell Enhancement: JavaScript syntax validation PASSED! ✅');
} catch (e) {
  console.error('JavaScript syntax validation FAILED:', e.message);
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('crownfall.html', html, 'utf8');

const b1 = fs.readFileSync('index.html');
const b2 = fs.readFileSync('crownfall.html');
if (b1.equals(b2)) {
  console.log('PARITY VERIFICATION: 100% byte-for-byte identical! ✅');
} else {
  console.error('ERROR: Parity failed!');
  process.exit(1);
}
console.log('AI SPELL ENGINE ENHANCED SUCCESSFULLY! 🤖✨');
