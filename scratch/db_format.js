const fs = require('fs');
const path = require('path');

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

const FULL_CARD_CATALOG = {
  "Altare": { faction: "Neutral", glyph: "🏛️", shortName: "ALTARE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana/turno. Struttura solida impassabile. Copertura difensiva: -1 danno fisico ad alleati adiacenti." },
  "Vena Tettorica Instabile": { faction: "Neutral", glyph: "⚡", shortName: "VENA +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 3, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana/turno! Fragile (3 PV): se distrutto dal nemico, implode infliggendo 2 danni al Comandante alleato." },
  "Altare del Patto di Sangue": { faction: "Neutral", glyph: "🩸", shortName: "PATTO +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana/turno! Pedaggio vitale: il Comandante alleato subisce 1 danno diretto irriducibile a inizio turno." },
  "Il Cuore della Griglia": { faction: "Neutral", glyph: "💖", shortName: "CUORE +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 8, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false, isCenterOnly: true, desc: "Mitico: +2 Mana e +1 Sangue a inizio turno. Schierabile SOLO al centro (d4,d5,e4,e5). Se sconfitto in mischia si converte al nemico con 4 PV!" },
  "Monolito dell'Eclissi Totale": { faction: "Neutral", glyph: "🌑", shortName: "ECLISSE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false, desc: "+1 Mana/turno. Soppressione magica: finché è integro, tutti i sortilegi nemici costano +1 Mana addizionale." },
  "Monolito di Basalto": { faction: "Neutral", glyph: "🪨", shortName: "BASALTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Struttura titanica (8 PV). Immune a sortilegi diretti." },
  "Baluardo di Granito Vivente": { faction: "Ferro", glyph: "🏰", shortName: "GRANITO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana/turno. Massiccio (7 PV). Immune a spinte." },
  "Altare della Fortezza": { faction: "Ferro", glyph: "🛡️", shortName: "FORTEZZA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Bastione d'armi: alleati adiacenti +1 danno extra in contrattacco." },
  "Sepolcro delle Ceneri Calde": { faction: "Ceneri", glyph: "⚰️", shortName: "SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana/turno. Tributo funerario: se distrutto, genera +2 Sangue." },
  "Altare del Sepolcro": { faction: "Ceneri", glyph: "🪦", shortName: "ALT. SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Mietitura: unità alleata morta adiacente = +1 Sangue extra." },
  "Fugace Condotto Astrale": { faction: "Marea", glyph: "🌌", shortName: "CONDOTTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 4, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana/turno. Distorsione: devia attacchi a distanza nemici attraverso caselle adiacenti." },
  "Altare del Vuoto Astrale": { faction: "Marea", glyph: "🕳️", shortName: "VUOTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Barriera angolare: blocca movimenti diagonali nemici." },
  "Monolito Giurato di Tassa": { faction: "Silenzio", glyph: "⚖️", shortName: "MONO. TASSA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Sanzione: se distrutto, avversario perde 1 Azione prossimo turno." },
  "Altare della Decima": { faction: "Silenzio", glyph: "📜", shortName: "DECIMA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Anatema: se distrutto, avversario perde 2 Mana a inizio turno per 2 turni." },
  "Altare della Fornace Eterna": { faction: "Forgia", glyph: "🔥", shortName: "FORNACE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Calore radiante: se subisce danno non letale, 1 danno ad adiacenti." },
  "Fornace della Tempra Eterna": { faction: "Forgia", glyph: "⚒️", shortName: "TEMPRA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana/turno. Fucina: automa amiche adiacenti ottengono +1 ATT." },

  "Recluta di Leva": { faction: "Neutral", glyph: "🗡️", shortName: "RECLUTA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Fanteria economica per bloccare linee di vista." },
  "Scudiero Rovinato": { faction: "Neutral", glyph: "🛡️", shortName: "SCUDIERO", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio solido: contrattacca a 2 ATT solo se colpito in mischia." },
  "Ladro di Tombe": { faction: "Neutral", glyph: "🗝️", shortName: "LADRO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Infiltratore obliquo: muove e attacca in diagonale." },
  "Segugio Randagio": { faction: "Neutral", glyph: "🐺", shortName: "SEGUGIO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio d'assalto: muove fino a 2 caselle ortogonali e attacca subito." },
  "Sentinella delle Mura": { faction: "Neutral", glyph: "🏰", shortName: "SENTINELLA", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio: contrattacca a 2 ATT, non sferra attacchi attivi." },
  "Schermagliatore Randagio": { faction: "Neutral", glyph: "🪓", shortName: "SCHERMAGL.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Unità multi-asse: muove di 1 in qualsiasi direzione." },
  "Mastino da Guerra": { faction: "Neutral", glyph: "🐕", shortName: "MASTINO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Cacciatore rapido: si muove fino a 2 caselle con Slancio." },
  "Fante Corazzato": { faction: "Ferro", glyph: "🛡️", shortName: "FANTE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura pesante: -1 danno fisico subito." },
  "Fante con Scudo a Torre": { faction: "Ferro", glyph: "🚪", shortName: "SCUDO TORRE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Interposizione: devia attacchi a distanza nemici su di lui." },
  "Guscio Esplosivo": { faction: "Ceneri", glyph: "💣", shortName: "GUSCIO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Detonazione: alla morte 2 danni ad adiacenti." },
  "Kamikaze di Braci": { faction: "Ceneri", glyph: "🧨", shortName: "KAMIKAZE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Scoppio direzionale: 3 danni alla casella frontale se muore." },
  "Sonda di Singolarità": { faction: "Marea", glyph: "🛰️", shortName: "SONDA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Campo repulsivo: devia lateralmente nemici." },
  "Scivolatore Astrale": { faction: "Marea", glyph: "⛸️", shortName: "SCIVOLATORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Passo etereo: attraversa alleati in movimento." },
  "Censore Minore": { faction: "Silenzio", glyph: "🔕", shortName: "CENSORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Aura soppressiva: annulla passive e armature a nemici adiacenti." },
  "Monaco del Voto": { faction: "Silenzio", glyph: "📜", shortName: "VOTO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Voto di fermezza: nemici adiacenti non possono curarsi o buffarsi." },
  "Rottame Semovente": { faction: "Forgia", glyph: "⚙️", shortName: "ROTTAME", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Alla morte deposita Blocco Scorie (0/2 PV)." },
  "Costrutto di Scorie": { faction: "Forgia", glyph: "🪨", shortName: "COSTRUTTO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Lascia materiale di scarto se muore." },
  
  "Mercenario Veterano": { faction: "Neutral", glyph: "⚔️", shortName: "VETERANO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 3 ATT effettivi in contrattacco." },
  "Giavellottiere Cieco": { faction: "Neutral", glyph: "🎯", shortName: "GIAVELLOT.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale senza contrattacco." },
  "Arciere Cieco": { faction: "Neutral", glyph: "🏹", shortName: "ARCIERE C.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Tiro a distanza ortogonale." },
  "Esploratore delle Cripte": { faction: "Neutral", glyph: "🔦", shortName: "ESPL. CRIPTE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, rarity: "C", isMiniature: true, desc: "Balzo a L." },
  "Picchiere Mercenario": { faction: "Neutral", glyph: "🔱", shortName: "PICCA MERC.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo a 2 ortogonale." },
  "Esploratore a Cavallo": { faction: "Neutral", glyph: "🐎", shortName: "ESPLORAT.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo scacchistico a L." },
  "Monaco Mendicante": { faction: "Neutral", glyph: "📿", shortName: "MONACO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Fa pescare 1 carta se distrutto." },
  "Alchimista Dissidente": { faction: "Neutral", glyph: "🧪", shortName: "ALCHIMISTA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "Avvelena la casella alla morte." },
  "Baluardo di Rovina": { faction: "Neutral", glyph: "🗿", shortName: "BALUARDO", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Immune a spinte e collisioni." },
  "Balestriere d'Élite": { faction: "Neutral", glyph: "🏹", shortName: "BALESTR.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Mira Fissa (Gittata 3)." },
  "Spadaccino Errante": { faction: "Neutral", glyph: "🤺", shortName: "SPADACCINO", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "4 danni se bersaglio isolato." },
  "Lanciere a Cavallo": { faction: "Neutral", glyph: "🏇", shortName: "LANCIERE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Balzo a L + Gittata orto 2." },
  "Custode del Tempio": { faction: "Neutral", glyph: "🏛️", shortName: "CUSTODE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Alleati adiacenti -1 danno." },
  "Duellante di Rovina": { faction: "Neutral", glyph: "⚔️", shortName: "DUELLANTE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "Flanking: +2 danni." },
  "Carrettiere da Trincea": { faction: "Neutral", glyph: "🛒", shortName: "CARRETTIERE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Traina unità amica quando muove." },
  "Assassino di Tombe": { faction: "Neutral", glyph: "🗡️", shortName: "ASSASSINO", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 2, move: "diag", gittata: 1, rarity: "U", isMiniature: true, desc: "Attacco diagonale no contrattacco." },
  "Automa Disertore": { faction: "Neutral", glyph: "🤖", shortName: "AUTOMA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Scudo arcano (1 spell)." },
  "Picchiere della Guardia": { faction: "Ferro", glyph: "🔱", shortName: "PICCHIERE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 ortogonale." },
  "Alabardiere da Trincea": { faction: "Ferro", glyph: "🪓", shortName: "ALABARDA", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "3 danni con Aggiramento." },
  "Fante Corazzato Veterano": { faction: "Ferro", glyph: "🛡️", shortName: "FANTE VET.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Alleati adiacenti immuni a danni da urto." },
  "Ghoul Dissotterrato": { faction: "Ceneri", glyph: "🧟", shortName: "GHOUL", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 2, move: "knight", gittata: 1, slancio: true, rarity: "U", isMiniature: true, desc: "Slancio & Balzo a L." },
  "Ombra delle Fosse": { faction: "Ceneri", glyph: "👤", shortName: "OMBRA", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Slancio se entra su cadavere recente." },
  "Banshee delle Ceneri": { faction: "Ceneri", glyph: "👻", shortName: "BANSHEE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diagonale ignora armature." },
  "Tessitore di Vortici": { faction: "Marea", glyph: "🕸️", shortName: "TESSITORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diag, trascina 1 casella." },
  "Tessitore d'Ombre": { faction: "Marea", glyph: "🕷️", shortName: "TESS. OMBRE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diag, inverte posizione." },
  "Arbitro di Pegni": { faction: "Silenzio", glyph: "🪙", shortName: "ARBITRO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Se subisce danno ruba 1 Sangue." },
  "Inquisitore di Pegni": { faction: "Silenzio", glyph: "⚖️", shortName: "INQUISITORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Se contrattacca ruba 1 Sangue." },
  "Fonditore di Piastre": { faction: "Forgia", glyph: "🔨", shortName: "FONDITORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "[1 Az]: 2 danni Altare -> +2 ATT automa." },
  "Martellatore Meccanico": { faction: "Forgia", glyph: "🦾", shortName: "MARTELLAT.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Spinge bersaglio (+2 danni urto)." },

  "Golia di Rifiuti": { faction: "Neutral", glyph: "🦾", shortName: "GOLIA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 5, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Danni raddoppiati a strutture." },
  "Cavaliere Senz'Armi": { faction: "Neutral", glyph: "🛡️", shortName: "CAVALIERE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Balzo a L; 1 danno ad area atterraggio." },
  "Guardiano dell'Archivio": { faction: "Neutral", glyph: "📜", shortName: "GUARDIANO", cost: 4, type: "unit", slot: "HEAVY", att: 1, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Nemici pagano +1 Mana per abilità attive." },
  "Balista da Campo": { faction: "Neutral", glyph: "🎯", shortName: "BALISTA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 4, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 ortogonale." },
  "Veterano di Mille Assedi": { faction: "Neutral", glyph: "🎖️", shortName: "VET. ASSEDI", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "5 ATT effettivi in contrattacco." },
  "Juggernaut di Rifiuti": { faction: "Neutral", glyph: "🚜", shortName: "JUGGERNAUT", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 6, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Spinge difensore e occupa casella." },
  "Colosso di Rame": { faction: "Neutral", glyph: "🥉", shortName: "COL. RAME", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "+1 Mana territoriale." },
  "Titano di Basalto": { faction: "Neutral", glyph: "🏔️", shortName: "TITANO", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 8, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Inamovibile, demolisce ostacoli al passaggio." },
  "Ariete da Breccia": { faction: "Ferro", glyph: "🪵", shortName: "ARIETE", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 6, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "6 danni a muri. Respinge." },
  "Ariete Spaccagranito": { faction: "Ferro", glyph: "🪨", shortName: "SPACCAGRAN.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Distrugge Altari crea Voragine." },
  "Necro-Abominio": { faction: "Ceneri", glyph: "🧟", shortName: "ABOMINIO", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Rigenera 2 PV se uccide in combattimento." },
  "Sentinella dell'Eclissi": { faction: "Marea", glyph: "🌒", shortName: "SENTINELLA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Nemici spendono 2 Azioni se muovono adiacenti." },
  "Catapulta a Trazione": { faction: "Marea", glyph: "☄️", shortName: "CATAPULTA", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 5, move: "diag", gittata: 4, rarity: "R", isMiniature: true, desc: "Gittata 4 diagonale." },
  "Esecutore della Decima": { faction: "Silenzio", glyph: "⚖️", shortName: "ESECUTORE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 5, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Balzo a L. 5 danni se bersaglio ha speso azione." },
  "Giustiziere Senza Volto": { faction: "Silenzio", glyph: "👤", shortName: "GIUSTIZIERE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Balzo a L. Ignora riduzioni danno." },
  "Colosso di Scorie": { faction: "Forgia", glyph: "🗿", shortName: "COLOSSO", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 6, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Danno in eccesso trasferito dietro." },
  "Fornace Semovente": { faction: "Forgia", glyph: "🏭", shortName: "FORN. SEMOV.", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "[1 Az]: consuma Blocco -> +1 ATT truppe entro 2." },

  "Frantumare la Pietra": { faction: "Neutral", glyph: "🔨", shortName: "FRANTUMA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Demolisce 1 Altare nemico entro 4 passi." },
  "Marcia Forzata": { faction: "Neutral", glyph: "⚡", shortName: "MARCIA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove 1 truppa di 1 casella a 0 Azioni." },
  "Carica Sfondante": { faction: "Neutral", glyph: "🦏", shortName: "CARICA SF.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove +1 passo e +1 ATT al prossimo attacco." },
  "Salasso Crudele": { faction: "Neutral", glyph: "🩸", shortName: "SALASSO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "3 danni diretti a unità ferita o a costo 1-2." },
  "Barricata Improvvisata": { faction: "Neutral", glyph: "🧱", shortName: "BARRICATA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Crea Muro Detriti (3 PV) entro 3 passi." },
  "Sguardo del Monolito": { faction: "Neutral", glyph: "👁️", shortName: "SGUARDO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Pietrifica nemico fino al prossimo turno." },
  "Pozza di Sangue": { faction: "Neutral", glyph: "🩸", shortName: "POZZA SANGUE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Incanta casella: transito genera 2 Sangue." },
  "Genio del Geniere": { faction: "Neutral", glyph: "🔧", shortName: "GENIERE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripara 3 PV ad Altare/Muro entro 3 passi." },
  "Rito di Comunione": { faction: "Neutral", glyph: "🍷", shortName: "COMUNIONE", cost: 3, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Pesca 2 carte (3 se Comandante <10 PV)." },
  "Furia dei Relitti": { faction: "Neutral", glyph: "💥", shortName: "FURIA REL.", cost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Danni pari a morti nel round a truppa entro 3 passi." },
  "Spaccatura Terrestre": { faction: "Neutral", glyph: "🌋", shortName: "SPACCATURA", cost: 2, bloodCost: 1, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Crea Voragine permanente entro 3 passi." },
  "Fendenti Incrociati": { faction: "Neutral", glyph: "⚔️", shortName: "FENDENTI", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Per 1 turno, attacchi Flanking +2 danni." },
  "Giuramento Ancestrale": { faction: "Neutral", glyph: "👑", shortName: "GIURAMENTO", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "M", isMiniature: false, desc: "Pesca 3 carte e cura 4 PV al Comandante." },
  "Contro-Urto": { faction: "Neutral", glyph: "🛡️", shortName: "CONTRO-URTO", cost: 0, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Dona a un alleato: Il prossimo attacco subito è ridotto di 2 e respinge l'attaccante." },
  "Comando di Trincea": { faction: "Ferro", glyph: "🛡️", shortName: "TRINCEA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Alleati adiacenti immuni a tiri a distanza per 1 turno." },
  "Manto d'Ossidiana": { faction: "Ferro", glyph: "🖤", shortName: "MANTO OSS.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Valeria e alleati immuni a spinte/urti." },
  "Scudo d'Ossidiana": { faction: "Ferro", glyph: "✨", shortName: "SCUDO OSS.", cost: 1, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Cura 3 PV e Scudo Totale a Comandante." },
  "Muro d'Acciaio": { faction: "Ferro", glyph: "🪞", shortName: "MURO ACC.", cost: 0, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Dona a un alleato: Azzera il danno del prossimo attacco a distanza." },
  "Offerta Funebre": { faction: "Ceneri", glyph: "🕯️", shortName: "OFFERTA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica truppa per 3 Sangue e 1 carta." },
  "Offerta d'Ossa": { faction: "Ceneri", glyph: "🦴", shortName: "OFFERTA OSSA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica truppa per 2 carte e 2 Sangue." },
  "Scudo di Brace": { faction: "Ceneri", glyph: "🔥", shortName: "SCUDO BRACE", cost: 0, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Dona a un alleato: Alla morte, infligge 2 danni all'uccisore." },
  "Marea Sepolcrale": { faction: "Ceneri", glyph: "💀", shortName: "SEPOLCRALE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Rianima 2 truppe (costo 1-2) adiacenti a Malakor." },
  "Singolarità Tascabile": { faction: "Marea", glyph: "🌌", shortName: "SINGOLARITA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trascina nemico di 2 caselle verso Comandante." },
  "Pressione di Marea": { faction: "Marea", glyph: "🌊", shortName: "PRESSIONE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trascina 2 nemici di 1 verso il centro." },
  "Deviazione Astrale": { faction: "Marea", glyph: "🌀", shortName: "DEVIAZIONE", cost: 0, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Incanta alleato: devia la destinazione del prossimo nemico che gli muove contro." },
  "Collasso di Marea": { faction: "Marea", glyph: "🌪️", shortName: "COLLASSO", cost: 2, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Nemici entro 2 da Altare/Vespera subiscono 2 danni e respinti." },
  "Editto di Quarantena": { faction: "Silenzio", glyph: "🚫", shortName: "QUARANTENA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Sigilla 2x2 per 1 round (nessun ingresso/attacco)." },
  "Editto di Confisca": { faction: "Silenzio", glyph: "📑", shortName: "CONFISCA ED.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Nemico perde 1 Mana nel prossimo turno." },
  "Sigillo di Confisca": { faction: "Silenzio", glyph: "📜", shortName: "CONFISCA S.", cost: 1, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Ruba 2 Sangue (2 danni se a zero)." },
  "Interdizione di Legge": { faction: "Silenzio", glyph: "🔕", shortName: "INTERDIZIONE", cost: 0, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "L'avversario non può lanciare sortilegi nel suo prossimo turno." },
  "Manto del Giudizio": { faction: "Silenzio", glyph: "⚖️", shortName: "MANTO GIUD.", cost: 1, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Dona al Comandante: Annulla 1 attacco e sottrae 1 Azione avversaria." },
  "Fusione d'Emergenza": { faction: "Forgia", glyph: "💥", shortName: "FUSIONE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica Altare per 2 carte e 2 danni ad area." },
  "Fonderia da Campo": { faction: "Forgia", glyph: "🏭", shortName: "FONDERIA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Converte Muro in Blocco Scorie, 1 danno adiacenti." },
  "Raffreddamento Istantaneo": { faction: "Forgia", glyph: "🧊", shortName: "RAFFREDD.", cost: 0, bloodCost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Dona ad Altare: Sopravvive al danno letale a 1 PV come Blocco solido." },
  "Ignizione Primordiale": { faction: "Forgia", glyph: "🔥", shortName: "IGNIZIONE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Anima Altare in costrutto 4/5 che genera Mana." }
};

let outputCmd = '    const COMMANDERS = {\n';
for (const [k, v] of Object.entries(COMMANDERS_POOL)) {
  const id = k.toLowerCase().replace(/[^a-z0-9]/g, '_');
  let riteDesc = v.desc.split('Rito ')[1] || v.desc;
  outputCmd += `      ${id}: { id: '${id}', set: ${k === 'Garek' || k === 'Morbida' || k === 'Kaelen' || k.includes('Kael') || k === 'Ignis' ? 1 : 0}, rarity: 'legendary', name: '${k.replace(/'/g, "\\'")}', hp: ${v.hp}, att: ${v.att}, move: '${v.move}', glyph: '${v.glyph}', archetype: '${v.faction.toLowerCase()}', riteCost: ${v.bloodCost}, riteDesc: 'Rito ${riteDesc.replace(/'/g, "\\'")}' },\n`;
}
outputCmd += '    };\n';

let outputCard = '    const CARDS_DB = {\n';
let baseDeckCards = [];
let earlyCount = 0, tacticCount = 0, heavyCount = 0, spellCount = 0;

for (const [k, v] of Object.entries(FULL_CARD_CATALOG)) {
  const id = k.toLowerCase().replace(/[^a-z0-9]/g, '_');
  let range = v.gittata !== undefined ? v.gittata : (v.range || 1);
  let type = v.type === 'reaction' ? 'spell' : v.type;
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

// Replace COMMANDERS
html = html.replace(/const COMMANDERS = \{[\s\S]*?\n    \};\n/, outputCmd + '\n');
// Replace CARDS_DB
html = html.replace(/const CARDS_DB = \{[\s\S]*?\n    \};\n/, outputCard + '\n');
// Replace defaultBaseDeck
html = html.replace(/const defaultBaseDeck = \[[\s\S]*?\n    \];\n/, deckArrayStr + '\n');

// Make unlocked commanders all 10
html = html.replace(/unlockedCommanders: \['valeria', 'malakor', 'vespera', 'aurelius', 'vulkan'\]/, "unlockedCommanders: ['valeria', 'garek', 'malakor', 'morbida', 'vespera', 'kaelen', 'aurelius', 'justiciar_kael', 'vulkan', 'ignis']");

fs.writeFileSync('../index.html', html, 'utf8');
console.log('Done replacement');
