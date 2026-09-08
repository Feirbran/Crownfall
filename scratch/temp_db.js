const COMMANDERS_POOL = {
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
};

// === DATABASE COMPLETO CARTE: SET 0 (FONDAZIONE) & SET 1 (FRATTURA) ===
const FULL_CARD_CATALOG = {
  // ==========================================
  // 1. CONDOTTI ALTARI & STRUTTURE TERRITORIALI
  // ==========================================
  "Altare": {
    faction: "Neutral", glyph: "🏛️", shortName: "ALTARE", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false,
    desc: "+1 Mana/turno. Struttura solida impassabile. Copertura difensiva: -1 danno fisico ad alleati adiacenti."
  },
  "Vena Tettorica Instabile": {
    faction: "Neutral", glyph: "⚡", shortName: "VENA +2M", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 2, pv: 3, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+2 Mana/turno! Fragile (3 PV): se distrutto dal nemico, implode infliggendo 2 danni al Comandante alleato."
  },
  "Altare del Patto di Sangue": {
    faction: "Neutral", glyph: "🩸", shortName: "PATTO +2M", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+2 Mana/turno! Pedaggio vitale: il Comandante alleato subisce 1 danno diretto irriducibile a inizio turno."
  },
  "Il Cuore della Griglia": {
    faction: "Neutral", glyph: "💖", shortName: "CUORE +2M", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 2, pv: 8, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false, isCenterOnly: true,
    desc: "Mitico: +2 Mana e +1 Sangue a inizio turno. Schierabile SOLO al centro (d4,d5,e4,e5). Se sconfitto in mischia si converte al nemico con 4 PV!"
  },
  "Monolito dell'Eclissi Totale": {
    faction: "Neutral", glyph: "🌑", shortName: "ECLISSE", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false,
    desc: "+1 Mana/turno. Soppressione magica: finché è integro, tutti i sortilegi nemici costano +1 Mana addizionale."
  },
  "Monolito di Basalto": {
    faction: "Neutral", glyph: "🪨", shortName: "BASALTO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Struttura titanica (8 PV). Immune a sortilegi diretti (non può essere bersagliato da Frantumare la Pietra)."
  },
  "Baluardo di Granito Vivente": {
    faction: "Ferro", glyph: "🏰", shortName: "GRANITO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false,
    desc: "+1 Mana/turno. Massiccio (7 PV). Immune a spinte e sfondamento raddoppiato. Copertura estesa: -2 danni fisici per alleati adiacenti."
  },
  "Altare della Fortezza": {
    faction: "Ferro", glyph: "🛡️", shortName: "FORTEZZA", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Bastione d'armi: le truppe alleate adiacenti infliggono +1 danno extra durante il contrattacco difensivo."
  },
  "Sepolcro delle Ceneri Calde": {
    faction: "Ceneri", glyph: "⚰️", shortName: "SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false,
    desc: "+1 Mana/turno. Tributo funerario: se distrutto, genera immediatamente +2 Segnalini Sangue per il proprietario anziché zero."
  },
  "Altare del Sepolcro": {
    faction: "Ceneri", glyph: "🪦", shortName: "ALT. SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Mietitura: quando un'unità alleata muore mentre è adiacente a questo Altare, incassi +1 Sangue addizionale."
  },
  "Fugace Condotto Astrale": {
    faction: "Marea", glyph: "🌌", shortName: "CONDOTTO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 4, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false,
    desc: "+1 Mana/turno. Distorsione: gli attacchi a distanza nemici che attraversano caselle adiacenti a questo Altare vengono deviati."
  },
  "Altare del Vuoto Astrale": {
    faction: "Marea", glyph: "🕳️", shortName: "VUOTO", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Barriera angolare: le truppe nemiche non possono entrare nelle 4 caselle ortogonalmente adiacenti muovendo in diagonale."
  },
  "Monolito Giurato di Tassa": {
    faction: "Silenzio", glyph: "⚖️", shortName: "MONO. TASSA", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Sanzione: se un'unità nemica distrugge questo Altare, l'avversario perde 1 Azione Tattica nel suo turno successivo."
  },
  "Altare della Decima": {
    faction: "Silenzio", glyph: "📜", shortName: "DECIMA", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Anatema: se distrutto dal nemico, l'avversario perde 2 Mana a inizio turno per i 2 turni successivi."
  },
  "Altare della Fornace Eterna": {
    faction: "Forgia", glyph: "🔥", shortName: "FORNACE", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Calore radiante: quando subisce danno senza essere distrutto, infligge 1 danno a tutte le unità adiacenti."
  },
  "Fornace della Tempra Eterna": {
    faction: "Forgia", glyph: "⚒️", shortName: "TEMPRA", cost: 0, type: "altar", slot: "ALTAR",
    manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false,
    desc: "+1 Mana/turno. Fucina: le truppe automa amiche che stazionano adiacenti all'Altare ottengono permanentemente +1 ATT."
  },

  // ==========================================
  // 2. FANTERIA LEGGERA & SCHERMAGLIA (1 MANA)
  // ==========================================
  "Recluta di Leva": {
    faction: "Neutral", glyph: "🗡️", shortName: "RECLUTA", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Fanteria economica per bloccare linee di vista e occupare caselle chiave nei primi turni."
  },
  "Scudiero Rovinato": {
    faction: "Neutral", glyph: "🛡️", shortName: "SCUDIERO", cost: 1, type: "unit", slot: "EARLY",
    att: 0, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Presidio solido: non spende azioni per attaccare, ma contrattacca a 2 ATT solo se colpito direttamente in mischia."
  },
  "Ladro di Tombe": {
    faction: "Neutral", glyph: "🗝️", shortName: "LADRO", cost: 1, type: "unit", slot: "EARLY",
    att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Infiltratore obliquo: muove e attacca esclusivamente lungo le diagonali libere."
  },
  "Segugio Randagio": {
    faction: "Neutral", glyph: "🐺", shortName: "SEGUGIO", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true,
    desc: "Slancio d'assalto: muove fino a 2 caselle ortogonali e può attaccare nello stesso turno in cui viene schierato."
  },
  "Sentinella delle Mura": {
    faction: "Neutral", glyph: "🏰", shortName: "SENTINELLA", cost: 1, type: "unit", slot: "EARLY",
    att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Presidio: contrattacca a 2 ATT solo se ingaggiata in mischia; non può sferrare attacchi attivi."
  },
  "Schermagliatore Randagio": {
    faction: "Neutral", glyph: "🪓", shortName: "SCHERMAGL.", cost: 1, type: "unit", slot: "EARLY",
    att: 2, pv: 2, move: "omni", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Unità multi-asse: può muovere di 1 casella in qualsiasi direzione (ortogonale o diagonale)."
  },
  "Mastino da Guerra": {
    faction: "Neutral", glyph: "🐕", shortName: "MASTINO", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true,
    desc: "Cacciatore rapido: si muove fino a 2 caselle con Slancio per punire tiratori scoperti."
  },
  "Fante Corazzato": {
    faction: "Ferro", glyph: "🛡️", shortName: "FANTE", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Armatura pesante: riduce sempre di -1 ogni danno fisico subito da attacchi o contrattacchi (minimo 1)."
  },
  "Fante con Scudo a Torre": {
    faction: "Ferro", glyph: "🚪", shortName: "SCUDO TORRE", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Interposizione: gli attacchi nemici a distanza diretti contro alleati adiacenti vengono deviati su di lui."
  },
  "Guscio Esplosivo": {
    faction: "Ceneri", glyph: "💣", shortName: "GUSCIO", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Detonazione: alla morte esplode infliggendo 2 danni a tutte le 4 caselle ortogonalmente adiacenti."
  },
  "Kamikaze di Braci": {
    faction: "Ceneri", glyph: "🧨", shortName: "KAMIKAZE", cost: 1, type: "unit", slot: "EARLY",
    att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Scoppio direzionale: alla morte infligge 3 danni alla casella esattamente frontale rispetto alla sua carica."
  },
  "Sonda di Singolarità": {
    faction: "Marea", glyph: "🛰️", shortName: "SONDA", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Campo repulsivo: le truppe nemiche che entrano nelle caselle ortogonalmente adiacenti vengono deviate lateralmente."
  },
  "Scivolatore Astrale": {
    faction: "Marea", glyph: "⛸️", shortName: "SCIVOLATORE", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Passo etereo: può attraversare caselle occupate da miniature alleate durante il movimento diagonale."
  },
  "Censore Minore": {
    faction: "Silenzio", glyph: "🔕", shortName: "CENSORE", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Aura soppressiva: annulla passive, armature e abilità speciali alle truppe nemiche adiacenti."
  },
  "Monaco del Voto": {
    faction: "Silenzio", glyph: "📜", shortName: "VOTO", cost: 1, type: "unit", slot: "EARLY",
    att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Voto di fermezza: le unità nemiche adiacenti non possono ricevere aumenti di ATT o cure."
  },
  "Rottame Semovente": {
    faction: "Forgia", glyph: "⚙️", shortName: "ROTTAME", cost: 1, type: "unit", slot: "EARLY",
    att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Macerie solide: alla morte deposita un Blocco di Scorie solido (0/2 PV) nella propria casella."
  },
  "Costrutto di Scorie": {
    faction: "Forgia", glyph: "🪨", shortName: "COSTRUTTO", cost: 1, type: "unit", slot: "EARLY",
    att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Recupero termico: lascia materiale di scarto utilizzabile dai Riti della Forgia quando cade."
  },

  // ==========================================
  // 3. SPECIALISTI & MANOVRA (2 - 3 MANA)
  // ==========================================
  "Mercenario Veterano": {
    faction: "Neutral", glyph: "⚔️", shortName: "VETERANO", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 4, move: "omni", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Riflessi pronti: infligge +1 danno addizionale (3 ATT effettivi) durante il contrattacco difensivo."
  },
  "Giavellottiere Cieco": {
    faction: "Neutral", glyph: "🎯", shortName: "GIAVELLOT.", cost: 2, type: "unit", slot: "TACTIC",
    att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true,
    desc: "Gittata 2 ortogonale: colpisce a 2 caselle in linea retta senza subire contrattacco difensivo."
  },
  "Arciere Cieco": {
    faction: "Neutral", glyph: "🏹", shortName: "ARCIERE C.", cost: 2, type: "unit", slot: "TACTIC",
    att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true,
    desc: "Gittata 2 ortogonale: tiro a distanza lungo assi liberi."
  },
  "Esploratore delle Cripte": {
    faction: "Neutral", glyph: "🔦", shortName: "ESPL. CRIPTE", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "knight", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Balzo a L: salta ostacoli, truppe e Altari come il cavallo degli scacchi."
  },
  "Picchiere Mercenario": {
    faction: "Neutral", glyph: "🔱", shortName: "PICCA MERC.", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true,
    desc: "Allungo: attacca a 2 caselle ortogonali senza subire contrattacco."
  },
  "Esploratore a Cavallo": {
    faction: "Neutral", glyph: "🐎", shortName: "ESPLORAT.", cost: 2, type: "unit", slot: "TACTIC",
    att: 1, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Balzo scacchistico a L: scavalca pezzi, ostacoli e Altari con traiettoria a L (2+1)."
  },
  "Monaco Mendicante": {
    faction: "Neutral", glyph: "📿", shortName: "MONACO", cost: 2, type: "unit", slot: "TACTIC",
    att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Elemosina spirituale: fa pescare 1 carta dal Grimorio al controllore quando viene distrutto."
  },
  "Alchimista Dissidente": {
    faction: "Neutral", glyph: "🧪", shortName: "ALCHIMISTA", cost: 2, type: "unit", slot: "TACTIC",
    att: 1, pv: 3, move: "omni", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Pozza tossica: alla morte avvelena la propria casella per 2 turni (1 danno a chi vi sosta)."
  },
  "Baluardo di Rovina": {
    faction: "Neutral", glyph: "🗿", shortName: "BALUARDO", cost: 3, type: "unit", slot: "TACTIC",
    att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Ancorato al suolo: immune a spinte, trascinamenti forzati e danni da collisione."
  },
  "Balestriere d'Élite": {
    faction: "Neutral", glyph: "🏹", shortName: "BALESTR.", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true,
    desc: "Mira Fissa (Gittata 3): colpisce fino a 3 caselle ortogonali libere senza contrattacco. Non contrattacca se aggredito in mischia."
  },
  "Spadaccino Errante": {
    faction: "Neutral", glyph: "🤺", shortName: "SPADACCINO", cost: 3, type: "unit", slot: "TACTIC",
    att: 3, pv: 3, move: "diag2", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Duellante: infligge 4 danni anziché 3 se il bersaglio non ha alleati nelle caselle adiacenti."
  },
  "Lanciere a Cavallo": {
    faction: "Neutral", glyph: "🏇", shortName: "LANCIERE", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 4, move: "knight", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Carica d'Allungo: unisce il Balzo a L del cavallo a una Gittata ortogonale di 2 caselle senza contrattacco."
  },
  "Custode del Tempio": {
    faction: "Neutral", glyph: "🏛️", shortName: "CUSTODE", cost: 3, type: "unit", slot: "TACTIC",
    att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Baluardo mobile: gli alleati e gli Altari adiacenti subiscono -1 danno da ogni attacco diretto."
  },
  "Duellante di Rovina": {
    faction: "Neutral", glyph: "⚔️", shortName: "DUELLANTE", cost: 3, type: "unit", slot: "TACTIC",
    att: 3, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Maestro di Flanking: infligge +2 danni extra se esegue un attacco con Aggiramento Tattico."
  },
  "Carrettiere da Trincea": {
    faction: "Neutral", glyph: "🛒", shortName: "CARRETTIERE", cost: 3, type: "unit", slot: "TACTIC",
    att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Scorta protetta: quando muove può trainare un'unità alleata adiacente nella casella appena liberata."
  },
  "Assassino di Tombe": {
    faction: "Neutral", glyph: "🗡️", shortName: "ASSASSINO", cost: 3, type: "unit", slot: "TACTIC",
    att: 4, pv: 2, move: "diag", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Colpo invisibile: se attacca da una casella diagonale, il bersaglio non contrattacca mai."
  },
  "Automa Disertore": {
    faction: "Neutral", glyph: "🤖", shortName: "AUTOMA", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 5, move: "omni", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Scudo arcano: annulla automaticamente il primo sortilegio nemico che lo prende a bersaglio."
  },
  "Picchiere della Guardia": {
    faction: "Ferro", glyph: "🔱", shortName: "PICCHIERE", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Allungo (Gittata 2): attacca a 2 caselle in linea retta senza subire contrattacco difensivo."
  },
  "Alabardiere da Trincea": {
    faction: "Ferro", glyph: "🪓", shortName: "ALABARDA", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Allungo & Flanking: Gittata 2 ortogonale; infligge 3 danni anziché 2 se attacca con Aggiramento."
  },
  "Fante Corazzato Veterano": {
    faction: "Ferro", glyph: "🛡️", shortName: "FANTE VET.", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true,
    desc: "Muro di Scudi: gli alleati e gli Altari ortogonalmente adiacenti non subiscono danni da impatto da urto."
  },
  "Ghoul Dissotterrato": {
    faction: "Ceneri", glyph: "🧟", shortName: "GHOUL", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 2, move: "knight", gittata: 1, slancio: true, rarity: "U", isMiniature: true,
    desc: "Slancio & Balzo a L: salta ostacoli e miniature come un cavallo e attacca subito nel turno di ingresso."
  },
  "Ombra delle Fosse": {
    faction: "Ceneri", glyph: "👤", shortName: "OMBRA", cost: 2, type: "unit", slot: "TACTIC",
    att: 3, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Imboscata: ottiene Slancio se entra in gioco su una casella dove è morta un'unità in questo round."
  },
  "Banshee delle Ceneri": {
    faction: "Ceneri", glyph: "👻", shortName: "BANSHEE", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "diag", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Gittata 2 diagonale: spara a 2 caselle lungo le diagonali libere ignorando armature fisiche."
  },
  "Tessitore di Vortici": {
    faction: "Marea", glyph: "🕸️", shortName: "TESSITORE", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Gittata 2 diagonale: colpisce a distanza 2 e trascina il bersaglio di 1 casella verso di sé."
  },
  "Tessitore d'Ombre": {
    faction: "Marea", glyph: "🕷️", shortName: "TESS. OMBRE", cost: 2, type: "unit", slot: "TACTIC",
    att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true,
    desc: "Tiro sfasante: Gittata 2 diagonale; se colpisce, inverte la posizione del bersaglio con una casella libera."
  },
  "Arbitro di Pegni": {
    faction: "Silenzio", glyph: "🪙", shortName: "ARBITRO", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Tassa di rappresaglia: se subisce danno, sottrae immediatamente 1 Segnalino Sangue all'avversario."
  },
  "Inquisitore di Pegni": {
    faction: "Silenzio", glyph: "⚖️", shortName: "INQUISITORE", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Tassa di Sangue: quando contrattacca con successo in mischia, ruba 1 Sangue all'avversario."
  },
  "Fonditore di Piastre": {
    faction: "Forgia", glyph: "🔨", shortName: "FONDITORE", cost: 3, type: "unit", slot: "TACTIC",
    att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "[1 Azione]: infligge 2 danni a un Altare adiacente per conferire +2 ATT / +1 PV a un automa alleato."
  },
  "Martellatore Meccanico": {
    faction: "Forgia", glyph: "🦾", shortName: "MARTELLAT.", cost: 3, type: "unit", slot: "TACTIC",
    att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true,
    desc: "Battitura a caldo: quando attacca, spinge il bersaglio di 1 casella (+2 danni se urta strutture)."
  },

  // ==========================================
  // 4. COLOSSI & ASSISE PESANTI (4+ MANA)
  // ==========================================
  "Golia di Rifiuti": {
    faction: "Neutral", glyph: "🦾", shortName: "GOLIA", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 5, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Frantumatore: infligge danni raddoppiati (6 danni base) contro Altari, muri e blocchi solidi."
  },
  "Cavaliere Senz'Armi": {
    faction: "Neutral", glyph: "🛡️", shortName: "CAVALIERE", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 4, move: "knight", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Fendente d'Urto: Balzo a L; infligge 1 danno ad area ai nemici adiacenti alla casella di atterraggio."
  },
  "Guardiano dell'Archivio": {
    faction: "Neutral", glyph: "📜", shortName: "GUARDIANO", cost: 4, type: "unit", slot: "HEAVY",
    att: 1, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Tassa arcana: i nemici adiacenti devono pagare +1 Mana per attivare abilità che richiedono Azioni."
  },
  "Balista da Campo": {
    faction: "Neutral", glyph: "🎯", shortName: "BALISTA", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 4, move: "ortho", gittata: 3, rarity: "R", isMiniature: true,
    desc: "Assedio a lungo raggio: Gittata 3 ortogonale libera senza contrattacco."
  },
  "Veterano di Mille Assedi": {
    faction: "Neutral", glyph: "🎖️", shortName: "VET. ASSEDI", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Contrattacco letale: infligge +2 ATT addizionali (5 ATT effettivi) durante il contrattacco."
  },
  "Juggernaut di Rifiuti": {
    faction: "Neutral", glyph: "🚜", shortName: "JUGGERNAUT", cost: 4, type: "unit", slot: "HEAVY",
    att: 4, pv: 6, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Travolgere: quando attacca in mischia, spinge indietro il difensore e occupa la casella liberata."
  },
  "Colosso di Rame": {
    faction: "Neutral", glyph: "🥉", shortName: "COL. RAME", cost: 5, type: "unit", slot: "HEAVY",
    att: 4, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Monolito vivente: finché è in vita genera anche +1 Mana territoriale a ogni inizio turno."
  },
  "Titano di Basalto": {
    faction: "Neutral", glyph: "🏔️", shortName: "TITANO", cost: 5, type: "unit", slot: "HEAVY",
    att: 4, pv: 8, move: "ortho", gittata: 1, rarity: "M", isMiniature: true,
    desc: "Inamovibile: immune a spinte, trascinamenti e Voragini. Demolisce istantaneamente muri e detriti al passaggio."
  },
  "Ariete da Breccia": {
    faction: "Ferro", glyph: "🪵", shortName: "ARIETE", cost: 4, type: "unit", slot: "HEAVY",
    att: 2, pv: 6, move: "ortho", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Sfondamento: infligge 6 danni ad Altari e muri. Respinge i pezzi (+2 danni se urtano ostacoli)."
  },
  "Ariete Spaccagranito": {
    faction: "Ferro", glyph: "🪨", shortName: "SPACCAGRAN.", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Frattura pesante: infligge 6 danni agli Altari; se distrugge una struttura, genera una Voragine permanente."
  },
  "Necro-Abominio": {
    faction: "Ceneri", glyph: "🧟♂️", shortName: "ABOMINIO", cost: 4, type: "unit", slot: "HEAVY",
    att: 4, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Banchetto di carne: rigenera 2 PV ogni volta che distrugge un'unità nemica in combattimento."
  },
  "Sentinella dell'Eclissi": {
    faction: "Marea", glyph: "🌒", shortName: "SENTINELLA", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Freno gravitazionale: i nemici che muovono adiacenti a lei spendono entrambe le loro 2 Azioni del turno."
  },
  "Catapulta a Trazione": {
    faction: "Marea", glyph: "☄️", shortName: "CATAPULTA", cost: 4, type: "unit", slot: "HEAVY",
    att: 2, pv: 5, move: "diag", gittata: 4, rarity: "R", isMiniature: true,
    desc: "Gittata 4 diagonale: scaglia proiettili fino a 4 passi diagonali liberi; infligge 4 danni agli Altari."
  },
  "Esecutore della Decima": {
    faction: "Silenzio", glyph: "⚖️", shortName: "ESECUTORE", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 5, move: "knight", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Sentenza: Balzo a L. Infligge 5 danni se il bersaglio ha già speso un'azione durante questo round."
  },
  "Giustiziere Senza Volto": {
    faction: "Silenzio", glyph: "👤", shortName: "GIUSTIZIERE", cost: 4, type: "unit", slot: "HEAVY",
    att: 3, pv: 6, move: "knight", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Castigo puro: Balzo a L; i suoi attacchi ignorano riduzioni di danno, armature e coperture degli Altari."
  },
  "Colosso di Scorie": {
    faction: "Forgia", glyph: "🗿", shortName: "COLOSSO", cost: 4, type: "unit", slot: "HEAVY",
    att: 4, pv: 6, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true,
    desc: "Devastazione: il danno letale inflitto in eccesso si trasferisce sul pezzo nemico retrostante."
  },
  "Fornace Semovente": {
    faction: "Forgia", glyph: "🏭", shortName: "FORN. SEMOV.", cost: 4, type: "unit", slot: "HEAVY",
    att: 2, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true,
    desc: "[1 Azione]: consuma un Blocco adiacente per conferire +1 ATT a tutte le truppe alleate entro 2 caselle."
  },

  // ==========================================
  // 5. SORTILEGI TATTICI & REAZIONI ISTANTANEE
  // ==========================================
  "Frantumare la Pietra": {
    faction: "Neutral", glyph: "🔨", shortName: "FRANTUMA", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Demolizione: distrugge istantaneamente 1 Altare o Muro nemico entro 4 caselle dal tuo Comandante."
  },
  "Marcia Forzata": {
    faction: "Neutral", glyph: "⚡", shortName: "MARCIA", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Manovra: muove 1 truppa alleata di 1 casella ortogonale extra a costo 0 Azioni Tattiche."
  },
  "Carica Sfondante": {
    faction: "Neutral", glyph: "🦏", shortName: "CARICA SF.", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Muove un'unità di 1 passo ortogonale extra e le conferisce +1 ATT sul suo prossimo attacco in questo turno."
  },
  "Salasso Crudele": {
    faction: "Neutral", glyph: "🩸", shortName: "SALASSO", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Esecuzione: infligge 3 danni diretti a un'unità già ferita o con costo di schieramento <= 2."
  },
  "Barricata Improvvisata": {
    faction: "Neutral", glyph: "🧱", shortName: "BARRICATA", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Evocazione solida: crea un Muro di Detriti solido (0 ATT / 3 PV) su una casella libera entro 3 passi."
  },
  "Sguardo del Monolito": {
    faction: "Neutral", glyph: "👁️", shortName: "SGUARDO", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Pietrificazione: blocca completamente movimento e attacchi di una truppa nemica fino al prossimo turno."
  },
  "Pozza di Sangue": {
    faction: "Neutral", glyph: "🩸", shortName: "POZZA SANGUE", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Incanta una casella: chiunque vi transiti o vi venga spinto conferisce 2 Segnalini Sangue a chi ha giocato la carta."
  },
  "Genio del Geniere": {
    faction: "Neutral", glyph: "🔧", shortName: "GENIERE", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Riparazione: ripristina 3 PV a un proprio Altare o Muro danneggiato entro 3 passi dal Comandante."
  },
  "Rito di Comunione": {
    faction: "Neutral", glyph: "🍷", shortName: "COMUNIONE", cost: 3, bloodCost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Pesca 2 carte dal Grimorio (pesca 3 carte se il tuo Comandante ha meno di 10 PV rimasti)."
  },
  "Furia dei Relitti": {
    faction: "Neutral", glyph: "💥", shortName: "FURIA REL.", cost: 3, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Infligge danni diretti pari al numero di unità morte nel round in corso a una truppa nemica entro 3 passi."
  },
  "Spaccatura Terrestre": {
    faction: "Neutral", glyph: "🌋", shortName: "SPACCATURA", cost: 2, bloodCost: 1, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Crea una Voragine permanente e impassabile su una casella libera entro 3 passi dal Comandante."
  },
  "Fendenti Incrociati": {
    faction: "Neutral", glyph: "⚔️", shortName: "FENDENTI", cost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Per il turno in corso, tutti gli attacchi alleati con Aggiramento (Flanking) infliggono +2 danni addizionali."
  },
  "Giuramento Ancestrale": {
    faction: "Neutral", glyph: "👑", shortName: "GIURAMENTO", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL",
    rarity: "M", isMiniature: false,
    desc: "Sortilegio apocalittico: pesca 3 carte dal Grimorio e rigenera 4 PV al tuo Comandante."
  },
  "Contro-Urto": {
    faction: "Neutral", glyph: "🛡️", shortName: "CONTRO-URTO", cost: 0, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Reazione Istantanea: giocabile quando un alleato subisce un attacco in mischia. Riduce di 2 i danni e respinge l'attaccante (+2 danni urto)."
  },
  "Comando di Trincea": {
    faction: "Ferro", glyph: "🛡️", shortName: "TRINCEA", cost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Le unità amiche adiacenti al Comandante o ad Altari azzerano i danni subiti da tiri a distanza per 1 round."
  },
  "Manto d'Ossidiana": {
    faction: "Ferro", glyph: "🖤", shortName: "MANTO OSS.", cost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Valeria e gli alleati adiacenti ad Altari diventano immuni a spinte, trascinamenti e danni da urto fino al prossimo turno."
  },
  "Scudo d'Ossidiana": {
    faction: "Ferro", glyph: "✨", shortName: "SCUDO OSS.", cost: 1, bloodCost: 2, type: "spell", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Ripristina 3 PV al Comandante e gli conferisce Scudo Totale contro la prossima fonte di danno."
  },
  "Muro d'Acciaio": {
    faction: "Ferro", glyph: "🪞", shortName: "MURO ACC.", cost: 0, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Reazione Istantanea: azzera completamente il danno di un attacco nemico a distanza."
  },
  "Offerta Funebre": {
    faction: "Ceneri", glyph: "🕯️", shortName: "OFFERTA", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Sacrificio: distruggi una tua truppa a costo 1 per incassare 3 Segnalini Sangue e pescare 1 carta."
  },
  "Offerta d'Ossa": {
    faction: "Ceneri", glyph: "🦴", shortName: "OFFERTA OSSA", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Sacrifica una propria truppa per pescare 2 carte e incassare 2 Segnalini Sangue."
  },
  "Scudo di Brace": {
    faction: "Ceneri", glyph: "🔥", shortName: "SCUDO BRACE", cost: 0, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Reazione Istantanea: giocabile alla morte di un proprio pezzo. Infligge 2 danni immediati all'uccisore."
  },
  "Marea Sepolcrale": {
    faction: "Ceneri", glyph: "💀", shortName: "SEPOLCRALE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Rianima 2 truppe a costo 1-2 dal Cimitero su caselle libere adiacenti a Malakor o ad Altari."
  },
  "Singolarità Tascabile": {
    faction: "Marea", glyph: "🌌", shortName: "SINGOLARITA", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Trascina una truppa nemica di 2 caselle in linea retta verso una casella adiacente al tuo Comandante."
  },
  "Pressione di Marea": {
    faction: "Marea", glyph: "🌊", shortName: "PRESSIONE", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Trascina 2 unità nemiche qualsiasi di 1 casella verso l'asse centrale della scacchiera."
  },
  "Deviazione Astrale": {
    faction: "Marea", glyph: "🌀", shortName: "DEVIAZIONE", cost: 0, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Reazione Istantanea: quando un nemico dichiara una mossa verso una tua truppa, devia la sua destinazione di 1 asse."
  },
  "Collasso di Marea": {
    faction: "Marea", glyph: "🌪️", shortName: "COLLASSO", cost: 2, bloodCost: 2, type: "spell", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Tutti i nemici entro 2 passi da un proprio Altare o da Vespera subiscono 2 danni e vengono respinti."
  },
  "Editto di Quarantena": {
    faction: "Silenzio", glyph: "🚫", shortName: "QUARANTENA", cost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Sigilla un blocco 2x2 della scacchiera per 1 round: nessuna unità può entrarvi o attaccare attraverso di esso."
  },
  "Editto di Confisca": {
    faction: "Silenzio", glyph: "📑", shortName: "CONFISCA ED.", cost: 2, type: "spell", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Sottrae 1 Mana dalla riserva iniziale dell'avversario nel suo turno successivo."
  },
  "Sigillo di Confisca": {
    faction: "Silenzio", glyph: "📜", shortName: "CONFISCA S.", cost: 1, bloodCost: 2, type: "spell", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Ruba 2 Segnalini Sangue dalla riserva nemica (infligge 2 danni diretti al Comandante se il nemico ha 0 Sangue)."
  },
  "Interdizione di Legge": {
    faction: "Silenzio", glyph: "🔕", shortName: "INTERDIZIONE", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Reazione Istantanea: giocabile quando l'avversario lancia un sortilegio dalla mano. Annulla e dissipa il sortilegio."
  },
  "Manto del Giudizio": {
    faction: "Silenzio", glyph: "⚖️", shortName: "MANTO GIUD.", cost: 1, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Reazione Istantanea: quando il Comandante subisce un attacco, annulla il danno e sottrae 1 Azione al turno nemico successivo."
  },
  "Fusione d'Emergenza": {
    faction: "Forgia", glyph: "💥", shortName: "FUSIONE", cost: 1, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Sacrifica un proprio Altare o Blocco per pescare 2 carte e infliggere 2 danni ad area alle unità adiacenti."
  },
  "Fonderia da Campo": {
    faction: "Forgia", glyph: "🏭", shortName: "FONDERIA", cost: 2, type: "spell", slot: "SPELL",
    rarity: "C", isMiniature: false,
    desc: "Converte un Muro di Detriti in un Blocco di Scorie e infligge 1 danno a tutte le unità nemiche adiacenti."
  },
  "Raffreddamento Istantaneo": {
    faction: "Forgia", glyph: "🧊", shortName: "RAFFREDD.", cost: 0, bloodCost: 2, type: "reaction", slot: "SPELL",
    rarity: "U", isMiniature: false,
    desc: "Reazione Istantanea: quando un Altare subisce danno letale, sopravvive a 1 PV trasformandosi in Blocco solido."
  },
  "Ignizione Primordiale": {
    faction: "Forgia", glyph: "🔥", shortName: "IGNIZIONE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL",
    rarity: "R", isMiniature: false,
    desc: "Anima un Altare alleato in un costrutto semovente 4 ATT / 5 PV che mantiene la generazione di +1 Mana."
  }
};


module.exports = { COMMANDERS_POOL, FULL_CARD_CATALOG };
