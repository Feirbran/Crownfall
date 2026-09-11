const fs = require('fs');
let s = fs.readFileSync('scratch/test_spell_engine.js', 'utf8');
s = s.replace(/'Scudo d\'Ossidiana'/g, '"Scudo d\'Ossidiana"')
     .replace(/'Tempra d\'Acciaio'/g, '"Tempra d\'Acciaio"')
     .replace(/'Offerta d\'Ossa'/g, '"Offerta d\'Ossa"')
     .replace(/'Saldata d\'Urgenza'/g, '"Saldata d\'Urgenza"')
     .replace(/'Fusione d\'Emergenza'/g, '"Fusione d\'Emergenza"')
     .replace(/'Manto d\'Ossidiana'/g, '"Manto d\'Ossidiana"');
fs.writeFileSync('scratch/test_spell_engine.js', s, 'utf8');
console.log('Fixed quotes in scratch/test_spell_engine.js');
