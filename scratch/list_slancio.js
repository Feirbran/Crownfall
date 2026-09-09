const fs = require('fs');
const evalAlpha = new Function(fs.readFileSync('cards_alpha.js', 'utf8') + '; return CARDS_ALPHA;')();
const evalBeta = new Function(fs.readFileSync('cards_beta.js', 'utf8') + '; return CARDS_BETA;')();
const all = { ...evalAlpha, ...evalBeta };

Object.entries(all).forEach(([name, c]) => {
  if ((c.desc && c.desc.toLowerCase().includes('slancio')) || c.slancio) {
    const file = (name in evalAlpha) ? 'Alpha' : 'Beta';
    console.log('[' + file + '] ' + name + ': "' + c.desc + '" (slancio: ' + c.slancio + ')');
  }
});
