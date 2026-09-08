const fs = require('fs');

const text = fs.readFileSync('full_prompt.txt', 'utf8');

const cmdStart = text.indexOf('const COMMANDERS_POOL = {');
let jsCode = text.substring(cmdStart);

const endTag = jsCode.indexOf('</USER_REQUEST>');
if (endTag !== -1) jsCode = jsCode.substring(0, endTag);
const endCode = jsCode.indexOf('```');
if (endCode !== -1) jsCode = jsCode.substring(0, endCode);

jsCode += '\n\nmodule.exports = { COMMANDERS_POOL, FULL_CARD_CATALOG };\n';
fs.writeFileSync('temp_db.js', jsCode, 'utf8');

const { COMMANDERS_POOL, FULL_CARD_CATALOG } = require('./temp_db.js');

console.log("Extracted Commanders:", Object.keys(COMMANDERS_POOL).length);
console.log("Extracted Cards:", Object.keys(FULL_CARD_CATALOG).length);

if (Object.keys(COMMANDERS_POOL).length === 0) process.exit(1);

let outputCmd = '    const COMMANDERS = {\n';
for (const [k, v] of Object.entries(COMMANDERS_POOL)) {
  const id = k.toLowerCase().replace(/[^a-z0-9]/g, '_');
  let riteDesc = v.desc.split('Rito ')[1] || v.desc;
  outputCmd += `      ${id}: { id: '${id}', set: ${k === 'Garek' || k === 'Morbida' || k === 'Kaelen' || k.includes('Kael') || k === 'Ignis' ? 1 : 0}, rarity: 'legendary', name: '${k.replace(/'/g, "\\'")}', hp: ${v.hp}, att: ${v.att}, move: '${v.move}', glyph: '${v.glyph}', archetype: '${v.faction.toLowerCase()}', riteCost: ${v.bloodCost}, riteDesc: 'Rito ${riteDesc.replace(/'/g, "\\'")}' },\n`;
}
outputCmd += '    };\n';

let outputCard = '    const CARDS_DB = {\n';
let baseDeckCards = [];

for (const [k, v] of Object.entries(FULL_CARD_CATALOG)) {
  const id = k.toLowerCase().replace(/[^a-z0-9]/g, '_');
  let range = v.gittata !== undefined ? v.gittata : (v.range || 1);
  let type = v.type === 'reaction' ? 'spell' : v.type;
  
  // Try to preserve exactly the set info if possible. Neutral/Ferro/Ceneri/Marea/Silenzio/Forgia. The prompt might have specified factions.
  // We'll just assume all cards in FULL_CARD_CATALOG are either set 0 or 1.
  let set = 0;
  
  if (k === 'Recluta di Leva' || k === 'Scudiero Rovinato' || k === 'Ladro di Tombe') {
    if (baseDeckCards.length < 30) {
        baseDeckCards.push(id, id, id);
    }
  } else if (k === 'Altare' || k === 'Vena Tettorica Instabile') {
      baseDeckCards.push(id, id);
  } else if (k === 'Fante Corazzato' || k === 'Picchiere della Guardia') {
      baseDeckCards.push(id, id);
  } else if (k === 'Marcia Forzata' || k === 'Frantumare la Pietra') {
      baseDeckCards.push(id, id);
  } else if (k === 'Carica Sfondante' && baseDeckCards.length < 30) {
      baseDeckCards.push(id);
  }
  
  outputCard += `      ${id}: { id: '${id}', set: ${set}, rarity: '${v.rarity === 'C' ? 'common' : v.rarity === 'U' ? 'uncommon' : v.rarity === 'R' ? 'rare' : 'mythic'}', name: '${k.replace(/'/g, "\\'")}', type: '${type}', cost: ${v.cost}, hp: ${v.pv || 0}, att: ${v.att || 0}, move: '${v.move || 'none'}', range: ${range}, glyph: '${v.glyph}', desc: '${v.desc.replace(/'/g, "\\'")}'${v.slancio ? ", keywords: ['slancio']" : ""}${v.bloodCost ? `, bloodCost: ${v.bloodCost}` : ""} },\n`;
}
outputCard += '    };\n';

const deckArrayStr = '    const defaultBaseDeck = [\n      ' + baseDeckCards.slice(0, 30).map(c => `'${c}'`).join(', ') + '\n    ];\n';

let html = fs.readFileSync('../index.html', 'utf8');
html = html.replace(/const COMMANDERS = \{[\s\S]*?\n    \};\n/, outputCmd + '\n');
html = html.replace(/const CARDS_DB = \{[\s\S]*?\n    \};\n/, outputCard + '\n');
html = html.replace(/const defaultBaseDeck = \[[\s\S]*?\n    \];\n/, deckArrayStr + '\n');

fs.writeFileSync('../index.html', html, 'utf8');
console.log('Done full db replacement');
