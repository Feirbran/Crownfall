const fs = require('fs');

function rebalanceCard(name, c) {
  const updated = { ...c };
  let modified = false;

  if (c.type === 'altar') {
    const oldPv = c.pv !== undefined ? c.pv : 5;
    let newPv = oldPv;
    if (name === 'Altare') newPv = 6;
    else if (oldPv <= 4) newPv = oldPv + 1;
    else if (oldPv === 5) newPv = 6;
    else if (oldPv === 6) newPv = 7;
    else if (oldPv === 7) newPv = 8;
    else if (oldPv >= 8) newPv = oldPv + 1;

    if (newPv !== oldPv) {
      updated.pv = newPv;
      modified = true;
      if (updated.desc) {
        updated.desc = updated.desc.replace(new RegExp(oldPv + ' PV', 'g'), newPv + ' PV');
      }
    }
  } else if (c.type === 'unit') {
    const cost = c.cost !== undefined ? c.cost : 1;
    let att = c.att !== undefined ? c.att : 1;
    let pv = c.pv !== undefined ? c.pv : 2;
    const oldAtt = att;
    const oldPv = pv;

    // 1. Fix glass units (HP = 1)
    if (pv === 1) {
      if (name === 'Tagliagole') {
        att = 2; pv = 2;
        updated.desc = 'Colpo letale: ignora armature nel primo turno di ingaggio.';
      } else if (name === 'Bravaccio da Taverna') {
        att = 2; pv = 3;
        updated.desc = 'Combattente da rissa economico e aggressivo nelle prime schermaglie.';
      } else if (name === 'Cane delle Fosse') {
        att = 2; pv = 2;
      } else if (name === 'Larva Eterea') {
        att = 1; pv = 3;
      } else if (name === 'Sciame di Tarme') {
        att = 2; pv = 2;
      } else if (name === 'Segugio di Faglia') {
        att = 2; pv = 2;
      } else if (name === 'Spirito Vagante') {
        att = 1; pv = 3;
      } else if (name === 'Larvone Infetto') {
        att = 1; pv = 3;
      } else {
        pv = 2;
      }
    }

    // 2. Fix excessive early burst rush
    if (name === 'Spadaccino con Stocco') { att = 2; pv = 3; }
    if (name === 'Ghoul Vorace') {
      att = 2; pv = 3;
      if (updated.desc) updated.desc = updated.desc.replace(/3 ATT/g, '2 ATT');
    }
    if (name === 'Fanatico delle Rovine') { att = 2; pv = 3; }

    // 3. Scale colossi (cost 4 and 5)
    if (cost === 4 && pv <= 5) pv += 2;
    else if (cost === 4 && pv === 6) pv = 7;
    else if (cost === 4 && pv === 7) pv = 8;
    else if (cost === 5) {
      if (pv <= 6) pv += 3;
      else if (pv <= 8) pv += 2;
      else if (pv <= 9) pv += 2;
      else pv += 2;
    }

    // 4. Boost units with very low HP for cost 2 and 3
    if (cost === 2 && pv === 2 && att >= 3) {
      att = 2; pv = 4;
    } else if (cost === 2 && pv === 2) {
      pv = 3;
    } else if (cost === 3 && pv === 2) {
      pv = 4;
    } else if (cost === 3 && pv === 3 && att >= 3) {
      pv = 4;
    }

    if (att !== oldAtt || pv !== oldPv || updated.desc !== c.desc) {
      updated.att = att;
      updated.pv = pv;
      modified = true;
      if (updated.desc && oldAtt !== att) {
        updated.desc = updated.desc.replace(new RegExp(oldAtt + ' ATT', 'g'), att + ' ATT');
      }
      if (updated.desc && oldPv !== pv) {
        updated.desc = updated.desc.replace(new RegExp(oldPv + ' PV', 'g'), pv + ' PV');
      }
    }
  }

  return { updated, modified };
}

function processCatalogFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  let modifiedCount = 0;

  const newLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('"')) return line;

    const m = trimmed.match(/^"([^"]+)":\s*({[\s\S]*})(,)?$/);
    if (!m) return line;

    const cardName = m[1];
    let cardObj;
    try {
      cardObj = eval('(' + m[2] + ')');
    } catch (e) {
      return line;
    }

    const { updated, modified } = rebalanceCard(cardName, cardObj);
    if (!modified) return line;

    modifiedCount++;
    let updatedLine = line;

    if (updated.pv !== undefined) {
      updatedLine = updatedLine.replace(/\bpv:\s*\d+/, 'pv: ' + updated.pv);
    }
    if (updated.att !== undefined) {
      updatedLine = updatedLine.replace(/\batt:\s*\d+/, 'att: ' + updated.att);
    }
    if (updated.desc !== undefined && updated.desc !== cardObj.desc) {
      updatedLine = updatedLine.replace(/\bdesc:\s*"([^"]*)"/, () => {
        return 'desc: ' + JSON.stringify(updated.desc);
      });
    }

    return updatedLine;
  });

  fs.writeFileSync(filePath, newLines.join('\r\n'), 'utf8');
  console.log(`Updated ${filePath}: ${modifiedCount} cards rebalanced.`);
}

// 1. Process cards_alpha.js and cards_beta.js
processCatalogFile('cards_alpha.js');
processCatalogFile('cards_beta.js');

// 2. Process index.html and crownfall.html
function updateHtmlFiles() {
  const oldCommandersPool = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 24, att: 2, move: "ortho", rite: "Schianto Sismico", bloodCost: 3, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (3S, 1Az): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 22, att: 2, move: "knight", rite: "Ruggito del Bastione", bloodCost: 3, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (3S, 1Az): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 18, att: 1, move: "omni", rite: "Vincolo di Carne", bloodCost: 4, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (4S, 1Az): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 16, att: 2, move: "diag", rite: "Masticazione", bloodCost: 4, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (4S, 1Az): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 20, att: 1, move: "diag", rite: "Ritorno di Marea", bloodCost: 3, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (3S, 1Az): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 18, att: 1, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 3, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (3S, 1Az): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 22, att: 2, move: "ortho", rite: "Decima di Ferro", bloodCost: 4, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (4S, 1Az): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 20, att: 2, move: "ortho", rite: "Sigillo della Legge", bloodCost: 4, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (4S, 1Az): Blocca abilità [1 Azione] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 18, att: 3, move: "ortho", rite: "Altare Semovente", bloodCost: 3, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (3S, 1Az): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 16, att: 3, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 3, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (3S, 1Az): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

  const newCommandersPool = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 3, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (3S, 1Az): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 3, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (3S, 1Az): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 4, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (4S, 1Az): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 4, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (4S, 1Az): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 3, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (3S, 1Az): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 3, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (3S, 1Az): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 4, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (4S, 1Az): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 4, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (4S, 1Az): Blocca abilità [1 Azione] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 3, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (3S, 1Az): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 3, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (3S, 1Az): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

  ['index.html', 'crownfall.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\r?\n/g, '\n');
    const normOld = oldCommandersPool.replace(/\r?\n/g, '\n');
    const normNew = newCommandersPool.replace(/\r?\n/g, '\n');

    if (!content.includes(normOld)) throw new Error('Could not find COMMANDERS_POOL in ' + file);
    content = content.replace(normOld, normNew);

    // Update Mockup 1 in Tutorial
    content = content.replace('<span class="hp-text">24 / 24 PV</span>', '<span class="hp-text">42 / 42 PV</span>');
    content = content.replace('<span class="hp-text">18 / 18 PV</span>', '<span class="hp-text">35 / 35 PV</span>');

    content = content.replace(/\n/g, '\r\n');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} with new Commander stats and tutorial numbers.`);
  });
}

updateHtmlFiles();

// Verify strict equality between index.html and crownfall.html
const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality index.html === crownfall.html:', f1 === f2);
