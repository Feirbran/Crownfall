const fs = require('fs');
const path = require('path');

const alphaRaw = fs.readFileSync('cards_alpha.js', 'utf8');
const betaRaw = fs.readFileSync('cards_beta.js', 'utf8');

const alphaMatch = alphaRaw.match(/const\s+CARDS_ALPHA\s*=\s*(\{[\s\S]*?\});/);
const betaMatch = betaRaw.match(/const\s+CARDS_BETA\s*=\s*(\{[\s\S]*?\});/);

const fileHeader = `// =============================================================================
// CROWNFALL — Master Cards & Commander Database (React Module)
// =============================================================================

export const CARDS_ALPHA = ${alphaMatch ? alphaMatch[1] : '{}'};

export const CARDS_BETA = ${betaMatch ? betaMatch[1] : '{}'};

export const COMMANDERS_POOL = {
  "Valeria": { 
    faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 7, 
    auraDesc: "Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L.",
    activeRiteDesc: "2 danni ad area e respinta di 1 casella (+1 danno urto).",
    desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (7🩸, 1⚡, max 1/turno): 2 danni ad area e respinta di 1 casella (+1 danno urto)." 
  },
  "Garek": { 
    faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 7, 
    auraDesc: "Le truppe nemiche adiacenti non possono muoversi.",
    activeRiteDesc: "Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco.",
    desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (7🩸, 1⚡, max 1/turno): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." 
  },
  "Malakor": { 
    faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 8, 
    auraDesc: "Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari.",
    activeRiteDesc: "Riflette il 50% dei danni subiti sul bersaglio per 1 round.",
    desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (8🩸, 1⚡, max 1/turno): Riflette il 50% dei danni subiti sul bersaglio per 1 round." 
  },
  "Morbida": { 
    faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 8, 
    auraDesc: "I caduti alleati creano Cimiteri (1 danno ai nemici che transitano).",
    activeRiteDesc: "Consuma un Cimitero per infliggere 3 danni diretti a vista.",
    desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (8🩸, 1⚡, max 1/turno): Consuma un Cimitero per infliggere 3 danni diretti a vista." 
  },
  "Vespera": { 
    faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 7, 
    auraDesc: "Trascina di 1 casella un nemico entro 3 passi a inizio turno.",
    activeRiteDesc: "Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli).",
    desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (7🩸, 1⚡, max 1/turno): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." 
  },
  "Kaelen": { 
    faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 7, 
    auraDesc: "Respinge di 1 chi entra adiacente.",
    activeRiteDesc: "Scambia di posizione due unità qualsiasi entro 4 passi.",
    desc: "Aura: Respinge di 1 chi entra adiacente. Rito (7🩸, 1⚡, max 1/turno): Scambia di posizione due unità qualsiasi entro 4 passi." 
  },
  "Aurelius": { 
    faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 8, 
    auraDesc: "Chi muore entro 2 caselle da lui non genera Sangue per nessuno.",
    activeRiteDesc: "Se il nemico attacca paga 1 Mana o subisce 2 danni.",
    desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (8🩸, 1⚡, max 1/turno): Se il nemico attacca paga 1 Mana o subisce 2 danni." 
  },
  "Justiciar Kael": { 
    faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 8, 
    auraDesc: "L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno.",
    activeRiteDesc: "Blocca abilità [1⚡] e Riti nemici per 1 turno.",
    desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (8🩸, 1⚡, max 1/turno): Blocca abilità [1⚡] e Riti nemici per 1 turno." 
  },
  "Vulkan": { 
    faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 7, 
    auraDesc: "Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa.",
    activeRiteDesc: "Anima un Altare in truppa 3/5 che attacca subito.",
    desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (7🩸, 1⚡, max 1/turno): Anima un Altare in truppa 3/5 che attacca subito." 
  },
  "Ignis": { 
    faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 7, 
    auraDesc: "Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato.",
    activeRiteDesc: "Sacrifica un Altare per infliggere 3 danni ad area ortogonale.",
    desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (7🩸, 1⚡, max 1/turno): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." 
  }
};

export const RARITY_NAMES = {
  common: 'Comune', uncommon: 'Non Comune', rare: 'Rara', mythic: 'Mitica', legendary: 'Leggendaria',
  C: 'Comune', U: 'Non Comune', R: 'Rara', M: 'Mitica', L: 'Leggendaria'
};

export const RARITY_MAP = { 'C': 'common', 'U': 'uncommon', 'R': 'rare', 'M': 'mythic', 'L': 'legendary' };

export const KEYWORD_REMINDERS_MAP = {
  'slancio': '*(può muoversi e attaccare nello stesso turno in cui entra in gioco)*',
  'balzo': '*(muove e salta oltre pedine e ostacoli con traiettoria a L)*',
  'allungo': '*(può colpire a 2 caselle in linea retta senza subire contrattacco)*',
  'flanking': '*(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*',
  'presidio': '*(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*',
  'sfondamento': '*(infligge danni massicci ad Altari e Muri nemici)*',
  'inamovibile': '*(immune a spinte, urti e Voragini)*',
  'massiccio': '*(immune a spinte e urti)*',
  'travolgere': '*(spinge indietro il difensore e occupa la sua casella)*',
  'interposizione': '*(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*'
};

export function formatCardDesc(desc) {
  if (!desc) return '';
  let res = desc;
  res = res.replace(/\\[1\\s*Azione\\]/gi, '[1⚡]');
  res = res.replace(/\\bconsuma\\s+(\\d+)\\s*A\\b/gi, 'consuma $1⚡');
  res = res.replace(/\\bconsuma\\s+(\\d+)\\s*S\\b/gi, 'consuma $1🩸');
  res = res.replace(/\\b(\\d+)S,\\s*(\\d+)Az\\b/gi, '$1🩸, $2⚡');
  res = res.replace(/\\*\\(([^)]+)\\)\\*/g, '<em class="reminder-text">*($1)*</em>');

  if (!res.includes('muoversi e attaccare')) {
    const slancioRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.slancio + '</em>';
    res = res.replace(/\\bSlancio\\s*&\\s*Balzo a L\\s*:/gi, 'Slancio ' + slancioRem + ' & Balzo a L <em class="reminder-text">' + KEYWORD_REMINDERS_MAP.balzo + '</em>:');
    res = res.replace(/\\bSlancio\\s+(diagonale|omnidirezionale|lineare)\\s*:/gi, 'Slancio ' + slancioRem + ' ($1):');
    res = res.replace(/\\bSlancio\\s+e\\s+volo\\s*:/gi, 'Slancio ' + slancioRem + ' & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:');
    res = res.replace(/\\bSlancio\\s*:(?!\\s*<em)/gi, 'Slancio ' + slancioRem + ':');
    res = res.replace(/\\b(ottiene|conferendole|con|parola chiave)\\s+Slancio\\b(?!\\s*<em)/gi, '$1 Slancio ' + slancioRem);
  }

  if (!res.includes('traiettoria a L')) {
    const balzoRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.balzo + '</em>';
    res = res.replace(/\\bBalzo a L\\s*:(?!\\s*<em)/gi, 'Balzo a L ' + balzoRem + ':');
    res = res.replace(/\\bBalzo a L\\s*(&|e)\\s*(?!\\s*<em)/gi, 'Balzo a L ' + balzoRem + ' $1 ');
    res = res.replace(/\\b(con|a|da movimenti a)\\s+Balzo a L\\b(?!\\s*<em)/gi, '$1 Balzo a L ' + balzoRem);
    res = res.replace(/\\bBalzo a L\\b(?!\\s*<em)/gi, 'Balzo a L ' + balzoRem);
  }

  if (!res.includes('2 caselle in linea retta senza')) {
    const allungoRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.allungo + '</em>';
    res = res.replace(/\\bAllungo\\s*:(?!\\s*<em)/gi, 'Allungo ' + allungoRem + ':');
    res = res.replace(/\\bAllungo\\s*&(?!\\s*<em)/gi, 'Allungo ' + allungoRem + ' &');
    res = res.replace(/\\bAllungo\\b(?!\\s*<em)/gi, 'Allungo ' + allungoRem);
  }

  if (!res.includes('bersaglio è ingaggiato anche')) {
    const flankingRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.flanking + '</em>';
    res = res.replace(/\\bFlanking\\s*:(?!\\s*<em)/gi, 'Flanking ' + flankingRem + ':');
    res = res.replace(/\\bFlanking\\b(?!\\s*<em)/gi, 'Flanking ' + flankingRem);
  }

  return res;
}

export const COMMANDERS = {};
Object.entries(COMMANDERS_POOL).forEach(([key, raw]) => {
  const id = key.toLowerCase().replace(/\\s+/g, '_');
  const setNum = (['valeria', 'malakor', 'vespera', 'aurelius', 'vulkan'].includes(id) ? 'α' : 'β');
  const moveNorm = (raw.move === 'ortho' ? 'orth' : (raw.move === 'ortho2' ? 'orth2' : raw.move));
  const comm = {
    id: id,
    key: key,
    name: key,
    shortName: raw.shortName || key,
    faction: raw.faction,
    glyph: raw.glyph,
    hp: raw.hp,
    att: raw.att,
    move: moveNorm,
    rawMove: raw.move,
    rite: raw.rite,
    riteCost: raw.bloodCost || 7,
    bloodCost: raw.bloodCost || 7,
    auraDesc: raw.auraDesc || raw.desc,
    activeRiteDesc: raw.activeRiteDesc || raw.rite,
    rawDesc: raw.desc,
    desc: formatCardDesc(raw.desc),
    set: setNum,
    rarity: 'legendary'
  };
  COMMANDERS[id] = comm;
  COMMANDERS[key] = comm;
});

// Normalized CARDS_DB
export const CARDS_DB = { ...CARDS_ALPHA, ...CARDS_BETA };
Object.entries(CARDS_DB).forEach(([k, c]) => {
  if (!c.name) c.name = k;
  if (!c.shortName) c.shortName = k.slice(0, 8).toUpperCase();
  if (!c.id) c.id = k;
});

export function getTroopArchetype(card) {
  if (!card) return { icon: '⚔️', label: 'Truppa', color: '#a4b0be' };
  if (card.type === 'commander') return { icon: '👑', label: 'Comandante', color: '#e5b958' };
  if (card.type === 'altar') return { icon: '🏛️', label: 'Altare', color: '#00e5ff' };
  if (card.type === 'wall') return { icon: '🧱', label: 'Muro', color: '#718093' };
  if (card.type === 'reaction') return { icon: '⚡', label: 'Reazione', color: '#a55eea' };
  if (card.type === 'spell') return { icon: '🔮', label: 'Magia', color: '#0984e3' };
  
  const desc = (card.desc || '').toLowerCase();
  const gittata = card.gittata || card.range || 1;
  const move = card.move || 'ortho';

  if (desc.includes('armatura') || desc.includes('interposizione') || desc.includes('presidio') || (card.pv >= 5 && card.cost <= 2)) {
    return { icon: '🛡️', label: 'Difensore', color: '#74b9ff' };
  }
  if (gittata >= 2 || desc.includes('tiro') || desc.includes('balestr') || desc.includes('arco') || desc.includes('gittata')) {
    return { icon: '🏹', label: 'Tiratore', color: '#2ecc71' };
  }
  if (move === 'knight' || desc.includes('balzo') || desc.includes('cavall') || desc.includes('slancio')) {
    return { icon: '🐎', label: 'Cavalleria', color: '#f39c12' };
  }
  if (desc.includes('sfondamento') || card.att >= 3) {
    return { icon: '💥', label: 'Assalitore', color: '#ff7675' };
  }
  return { icon: '⚔️', label: 'Fanteria', color: '#dfe4ea' };
}
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/cardsData.js', fileHeader, 'utf8');
console.log('src/data/cardsData.js generated successfully!');
