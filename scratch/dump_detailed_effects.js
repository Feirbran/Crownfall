const fs = require('fs');

let b = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA', 'global.CARDS_BETA');
let a = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA', 'global.CARDS_ALPHA');
eval(b); eval(a);

const allCards = { ...global.CARDS_ALPHA, ...global.CARDS_BETA };

const auditReport = [];

Object.entries(allCards).forEach(([name, c]) => {
  auditReport.push({
    name,
    faction: c.faction,
    type: c.type,
    cost: c.cost,
    bloodCost: c.bloodCost || 0,
    att: c.att,
    pv: c.pv || c.hp,
    move: c.move,
    gittata: c.gittata !== undefined ? c.gittata : (c.range !== undefined ? c.range : (c.type === 'unit' ? 1 : 0)),
    slancio: !!c.slancio,
    desc: c.desc || ''
  });
});

fs.writeFileSync('scratch/all_cards_audit.json', JSON.stringify(auditReport, null, 2), 'utf8');
console.log('Exported scratch/all_cards_audit.json with', auditReport.length, 'cards');
