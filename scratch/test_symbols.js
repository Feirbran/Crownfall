const fs = require('fs');

function formatSymbols(text) {
  if (!text) return '';
  let res = text;
  // consuma 1A -> consuma 1⚡
  res = res.replace(/\bconsuma\s+(\d+)\s*A\b/gi, 'consuma $1⚡');
  // consuma 3S -> consuma 3🩸
  res = res.replace(/\bconsuma\s+(\d+)\s*S\b/gi, 'consuma $1🩸');
  // Rito (3S, 1Az) -> Rito (3🩸, 1⚡)
  res = res.replace(/\((\d+)S,\s*(\d+)Az\)/gi, '($1🩸, $2⚡)');
  // [1 Azione] -> [1⚡]
  res = res.replace(/\[1\s*Azione\]/gi, '[1⚡]');
  // (cost 0 + 2S) -> (cost 0 + 2🩸)
  res = res.replace(/\+(\s*)(\d+)S\b/g, '+$1$2🩸');
  return res;
}

const samples = [
  'Aura: ... Rito (3S, 1Az): 2 danni ad area e respinta (+1 danno urto).',
  'Aura: ... Rito (4S, 1Az): Riflette il 50% dei danni.',
  '[1 Azione]: ripara 2 PV a una struttura o Altare adiacente.',
  'consuma 1A per muovere una seconda volta.',
  'consuma 3S dalla propria riserva.',
  'Muro d\'Acciaio (cost 0 + 2S): Reazione.',
  'Reazione: nega l\'attivazione di un Rito d\'Armi o abilità [1 Azione] nemica.'
];

samples.forEach(s => console.log('IN: ', s, '\nOUT:', formatSymbols(s), '\n'));
