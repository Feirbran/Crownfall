// =============================================================================
// CROWNFALL — Master Cards & Commander Database (React Module)
// =============================================================================

export const CARDS_ALPHA = {
  // =========================================================================
  // 1. BASTIONE DI FERRO (38 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Baluardo di Granito Vivente": { faction: "Ferro", glyph: "🏰", shortName: "GRANITO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. 8 PV. Massiccio *(immune a spinte e urti)*: immune a spinte. Copertura: -2 danni fisici adiacenti." },
  "Altare della Fortezza": { faction: "Ferro", glyph: "🛡️", shortName: "FORTEZZA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Alleati adiacenti infliggono +1 danno extra durante il contrattacco." },
  "Torretta di Ferro Fuso": { faction: "Ferro", glyph: "🗼", shortName: "TORRETTA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 1, move: "none", gittata: 2, rarity: "U", isMiniature: false, desc: "+1 Mana. Contrattacca a distanza 2 se un alleato adiacente subisce attacchi ortogonali." },
  "Fossa dei Picchieri": { faction: "Ferro", glyph: "🕳️", shortName: "FOSSA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Nemici che muovono adiacenti a questa struttura subiscono 1 danno immediato." },
  "Contrafforte di Trincea": { faction: "Ferro", glyph: "🧱", shortName: "CONTRAFF.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Assorbe 1 danno subito da un alleato adiacente trasferendolo su di sé." },

  // FANTERIA 1M (6)
  "Fante Corazzato": { faction: "Ferro", glyph: "🛡️", shortName: "FANTE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura: riduce di -1 ogni danno fisico subito (minimo 1)." },
  "Fante con Scudo a Torre": { faction: "Ferro", glyph: "🚪", shortName: "SCUDO TORRE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Interposizione *(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*: i tiri a distanza nemici contro alleati adiacenti deviano su di lui." },
  "Recluta con Brocchiero": { faction: "Ferro", glyph: "🛡️", shortName: "BROCCHIERO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Ha 1 armatura temporanea solo nel primo round in cui subisce un attacco." },
  "Sentinella del Bastione": { faction: "Ferro", glyph: "🏰", shortName: "SENT. BAST.", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: non attacca attivamente; contrattacca a 2 ATT solo se colpita in mischia." },
  "Picchiere di Presidio": { faction: "Ferro", glyph: "🔱", shortName: "PICCA PRES.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: attacca a 2 caselle senza contrattacco; muove solo avanti o indietro." },
  "Guardia alla Porta": { faction: "Ferro", glyph: "🗝️", shortName: "G. PORTA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "I nemici non possono attraversare le caselle ortogonalmente adiacenti a lui." },

  // SPECIALISTI 2-3M (11)
  "Balestriere della Guardia": { faction: "Ferro", glyph: "🏹", shortName: "BALESTR. G.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Tiro Coperto: Gittata 2 senza contrattacco; non contrattacca in mischia." },
  "Picchiere della Guardia": { faction: "Ferro", glyph: "🔱", shortName: "PICCHIERE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: colpisce a 2 caselle in linea retta senza subire contrattacco difensivo." },
  "Alabardiere da Trincea": { faction: "Ferro", glyph: "🪓", shortName: "ALABARDA", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* & Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*: infligge 3 danni anziché 2 se attacca con Aggiramento." },
  "Fante Corazzato Veterano": { faction: "Ferro", glyph: "🛡️", shortName: "FANTE VET.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Muro di Scudi: alleati e Altari adiacenti sono immuni a danni da impatto contro ostacoli." },
  "Guardia Giurata di Ferro": { faction: "Ferro", glyph: "⚔️", shortName: "G. GIURATA", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Ottiene +1 ATT se si trova a 2 o meno passi dal Comandante alleato." },
  "Genio Ferriere": { faction: "Ferro", glyph: "🔧", shortName: "GENIO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "[1⚡]: ripara 2 PV a una struttura o Altare adiacente." },
  "Cavaliere Corazzato": { faction: "Ferro", glyph: "🐎", shortName: "CAV. CORAZ.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli; se atterra adiacente a un nemico lo spinge di 1 casella." },
  "Lanciere da Breccia": { faction: "Ferro", glyph: "🏇", shortName: "LANCIERE B.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* & Gittata 2 ortogonale: attacca a distanza senza contrattacco." },
  "Scudiero d'Ossidiana": { faction: "Ferro", glyph: "🛡️", shortName: "SCUD. OSS.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Assorbe la metà del danno inflitto al Comandante se gli è adiacente." },
  "Campione del Bastione": { faction: "Ferro", glyph: "🎖️", shortName: "CAMPIONE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Contrattacca a 4 ATT se i suoi PV scendono a 2 o meno." },
  "Mastro d'Armi di Ferro": { faction: "Ferro", glyph: "⚒️", shortName: "MASTRO FERRO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Le truppe alleate adiacenti con armatura infliggono +1 danno in mischia." },

  // COLOSSI 4+M (5)
  "Ariete da Breccia": { faction: "Ferro", glyph: "🪵", shortName: "ARIETE", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 7, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Sfondamento *(infligge danni massicci ad Altari e Muri nemici)*: 6 danni ad Altari e muri. Respinge i pezzi (+2 danni se urtano)." },
  "Ariete Spaccagranito": { faction: "Ferro", glyph: "🪨", shortName: "SPACCAGRAN.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Frattura: distruggendo un Altare crea una Voragine permanente impassabile." },
  "Balista Corazzata": { faction: "Ferro", glyph: "🎯", shortName: "BALISTA C.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3: tiro in linea retta senza contrattacco; infligge 4 danni a strutture." },
  "Carro di Trincea": { faction: "Ferro", glyph: "🚜", shortName: "CARRO TRIN.", cost: 3, type: "unit", slot: "HEAVY", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Copertura Mobile: le caselle retrostanti sono protette contro tiri a distanza." },
  "Titano della Porta": { faction: "Ferro", glyph: "🚪", shortName: "TITANO PORTA", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 11, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Inespugnabile: immune a spinte e sortilegi diretti. Blocca il transito nemico attorno a sé." },

  // SORTILEGI & REAZIONI (11)
  "Comando di Trincea": { faction: "Ferro", glyph: "🛡️", shortName: "TRINCEA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Comandante e alleati adiacenti ad Altari azzerano i danni a distanza per 1 round." },
  "Manto d'Ossidiana": { faction: "Ferro", glyph: "🖤", shortName: "MANTO OSS.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "2 alleati diventano immuni a spinte, trascinamenti e danni urto fino al prossimo turno." },
  "Formazione a Testuggine": { faction: "Ferro", glyph: "🐢", shortName: "TESTUGGINE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Alleati adiacenti tra loro ottengono +1 armatura; non possono muovere in questo turno." },
  "Carica d'Acciaio": { faction: "Ferro", glyph: "⚡", shortName: "CARICA ACC.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Un'unità con armatura muove di 1 casella extra a costo 0 Azioni e spinge ostacoli." },
  "Rinforzo dei Plinti": { faction: "Ferro", glyph: "🧱", shortName: "RINFORZO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripristina 3 PV a un Altare alleato o conferisce 3 PV temporanei a una struttura." },
  "Sfondamento di Linea": { faction: "Ferro", glyph: "💥", shortName: "SFONDAMENTO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Il prossimo attacco alleato ignora coperture difensive e spinge indietro il difensore." },
  "Frantumare la Corazza": { faction: "Ferro", glyph: "🔨", shortName: "FRANT. COR.", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimuove permanentemente armature e scudi passivi da un nemico entro 3 passi." },
  "Scudo d'Ossidiana": { faction: "Ferro", glyph: "✨", shortName: "SCUDO OSS.", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Cura 3 PV al Comandante e conferisce Scudo Totale contro il prossimo colpo subito." },
  "Interdizione di Bastione": { faction: "Ferro", glyph: "🚫", shortName: "INTERD. BAST.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "I nemici non possono attraversare una specifica riga con movimenti lineari nel prossimo round." },
  "Muro d'Acciaio": { faction: "Ferro", glyph: "🪞", shortName: "MURO ACC.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: azzera completamente il danno di un attacco a distanza nemico." },
  "Ritorsione dello Scudo": { faction: "Ferro", glyph: "🛡️", shortName: "RITORSIONE", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione su attacco mischia: riduce il danno di 2 e infligge 2 danni all'attaccante." },

  // =========================================================================
  // 2. ROGO DELLE CENERI (38 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Sepolcro delle Ceneri Calde": { faction: "Ceneri", glyph: "⚰️", shortName: "SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Se distrutto, genera +2 Segnalini Sangue per te anziché zero." },
  "Altare del Sepolcro": { faction: "Ceneri", glyph: "🪦", shortName: "ALT. SEPOLCRO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Quando un alleato muore adiacente a questo Altare, incassi +1 Sangue extra." },
  "Pira dell'Anima": { faction: "Ceneri", glyph: "🔥", shortName: "PIRA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Sacrificando volontariamente questa struttura ottieni 3 Sangue immediati." },
  "Cripta dei Condannati": { faction: "Ceneri", glyph: "🚪", shortName: "CRIPTA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Consente di schierare truppe a costo 1 Mana adiacenti ad essa." },
  "Focolare delle Braci Spente": { faction: "Ceneri", glyph: "🌋", shortName: "FOCOLARE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Quando un'unità muore entro 2 caselle, infligge 1 danno al nemico più vicino." },

  // FANTERIA 1M (6)
  "Guscio Esplosivo": { faction: "Ceneri", glyph: "💣", shortName: "GUSCIO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Detonazione: alla morte infligge 2 danni a tutte le 4 caselle ortogonali adiacenti." },
  "Kamikaze di Braci": { faction: "Ceneri", glyph: "🧨", shortName: "KAMIKAZE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Scoppio Frontale: alla morte infligge 3 danni alla casella esattamente frontale." },
  "Spirito Vagante": { faction: "Ceneri", glyph: "👻", shortName: "SPIRITO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (Diagonale): entra, muove lungo le diagonali e attacca subito." },
  "Cane delle Fosse": { faction: "Ceneri", glyph: "🐕", shortName: "CANE FOSSE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Sciame: ottiene +1 ATT se attacca assieme a un altro Cane delle Fosse." },
  "Carogna Rianimata": { faction: "Ceneri", glyph: "🧟", shortName: "CAROGNA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Se distrutta da un attacco a distanza, non fornisce Sangue all'uccisore." },
  "Verme Sepolcrale": { faction: "Ceneri", glyph: "🪱", shortName: "VERME SEP.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Alla morte genera 1 Sangue extra per il controllore." },

  // SPECIALISTI 2-3M (11)
  "Ghoul Dissotterrato": { faction: "Ceneri", glyph: "🧟", shortName: "GHOUL", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, slancio: true, rarity: "U", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli e attacca subito nel turno di ingresso." },
  "Ombra delle Fosse": { faction: "Ceneri", glyph: "👤", shortName: "OMBRA", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Imboscata: ottiene Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* se entra dove è morta un'unità in questo round." },
  "Banshee delle Ceneri": { faction: "Ceneri", glyph: "👻", shortName: "BANSHEE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diagonale: spara a 2 caselle diagonali ignorando armature fisiche." },
  "Masticatore di Ossa": { faction: "Ceneri", glyph: "🦷", shortName: "MASTICAT.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: distrugge un alleato con 1 PV per ripristinare interamente la propria salute." },
  "Sacerdote del Rogo": { faction: "Ceneri", glyph: "🧙", shortName: "SACERDOTE", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Quando lanci un sortilegio che spende Sangue, infligge 1 danno al Comandante nemico." },
  "Spettro Vorace": { faction: "Ceneri", glyph: "🦇", shortName: "SPETTRO", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "Passo Etereo: attraversa unità amiche e nemiche durante il movimento." },
  "Urlatore delle Catacombe": { faction: "Ceneri", glyph: "🗣️", shortName: "URLATORE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: quando colpisce un nemico, gli impedisce di contrattaccare per il turno." },
  "Flagellatore di Braci": { faction: "Ceneri", glyph: "🔥", shortName: "FLAGELLAT.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "diag", gittata: 1, rarity: "U", isMiniature: true, desc: "Spine di cenere: infligge 1 danno riflesso a chiunque lo colpisca in mischia." },
  "Rianimatore Sepolcrale": { faction: "Ceneri", glyph: "🪦", shortName: "RIANIMAT.", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "[1 Azione + 2 Sangue]: schiera un Guscio Esplosivo su una casella libera adiacente." },
  "Cavaliere del Sudario": { faction: "Ceneri", glyph: "🏇", shortName: "CAV. SUDARIO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: ottiene +1 ATT se attacca bersagli che hanno già subito danni nel round." },
  "Necromante Minore": { faction: "Ceneri", glyph: "💀", shortName: "NECROMANTE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: se distrugge un pezzo nemico, incassi +1 Sangue addizionale." },

  // COLOSSI 4+M (5)
  "Necro-Abominio": { faction: "Ceneri", glyph: "🧟‍♂️", shortName: "ABOMINIO", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Banchetto: recupera 2 PV ogni volta che distrugge un pezzo nemico in combattimento." },
  "Colosso di Cadaveri": { faction: "Ceneri", glyph: "🗿", shortName: "COL. CADAV.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Alla morte genera 2 Carogne Rianimate nelle caselle adiacenti libere." },
  "Drago delle Fosse": { faction: "Ceneri", glyph: "🐉", shortName: "DRAGO FOSSE", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 9, move: "knight", gittata: 2, rarity: "M", isMiniature: true, desc: "Soffio di Cenere: Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*; attacca a distanza 2 colpendo anche le caselle adiacenti al bersaglio." },
  "Banshee Regina": { faction: "Ceneri", glyph: "👑", shortName: "REGINA C.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "diag2", gittata: 2, rarity: "R", isMiniature: true, desc: "Gittata 2 diagonale: sottrae 1 Sangue all'avversario ogni volta che danneggia un pezzo." },
  "Guerriero Eterno": { faction: "Ceneri", glyph: "💀", shortName: "ETERNO", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "La prima volta che muore ritorna in gioco con 2 PV sulla casella di partenza." },

  // SORTILEGI & REAZIONI (11)
  "Offerta Funebre": { faction: "Ceneri", glyph: "🕯️", shortName: "OFFERTA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica una tua truppa a costo 1 per incassare 3 Segnalini Sangue e pescare 1 carta." },
  "Offerta d'Ossa": { faction: "Ceneri", glyph: "🦴", shortName: "OFFERTA OSSA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica una truppa per pescare 2 carte e incassare 2 Segnalini Sangue." },
  "Marea Sepolcrale": { faction: "Ceneri", glyph: "💀", shortName: "SEPOLCRALE", cost: 2, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Rianima 2 truppe a costo 1-2 dal Cimitero adiacenti al Comandante o ad Altari." },
  "Esplosione Spettrale": { faction: "Ceneri", glyph: "💥", shortName: "ESPL. SPETTR.", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Fai detonare un tuo Guscio o Carogna infliggendo 3 danni ad area ortogonale." },
  "Salasso di Massa": { faction: "Ceneri", glyph: "🩸", shortName: "SALASSO M.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Tutte le unità in campo con salute inferiore a 3 PV subiscono 1 danno immediato." },
  "Patto della Pira": { faction: "Ceneri", glyph: "📜", shortName: "PATTO PIRA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Subisci 2 danni al Comandante per ottenere 3 Sangue e 1 Azione extra in questo turno." },
  "Catene di Braci": { faction: "Ceneri", glyph: "⛓️", shortName: "CATENE B.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Immobilizza un pezzo nemico per 1 round; subisce 1 danno se tenta di attaccare." },
  "Rianimazione Veloce": { faction: "Ceneri", glyph: "⚡", shortName: "RIAN. VELOCE", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimetti in gioco una truppa a costo 1 morta in questo round conferendole Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*." },
  "Festino Macabro": { faction: "Ceneri", glyph: "🍖", shortName: "FESTINO", cost: 2, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Distruggi tutti i tuoi pezzi a costo 1: cura il tuo Comandante di 3 PV per ciascuno." },
  "Scudo di Brace": { faction: "Ceneri", glyph: "🔥", shortName: "SCUDO BRACE", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: alla morte di un alleato, infligge 2 danni immediati all'uccisore." },
  "Riflesso di Carne": { faction: "Ceneri", glyph: "🩸", shortName: "RIFLESSO", cost: 0, bloodCost: 5, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione: quando subisci danno, trasferisci 3 danni su una truppa nemica." },

  // =========================================================================
  // 3. FORGIA CIECA (38 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Altare della Fornace Eterna": { faction: "Forgia", glyph: "🔥", shortName: "FORNACE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Quando subisce danno senza cadere, infligge 1 danno a tutte le unità adiacenti." },
  "Fornace della Tempra Eterna": { faction: "Forgia", glyph: "⚒️", shortName: "TEMPRA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Gli automi alleati che stazionano adiacenti all'Altare ottengono permanentemente +1 ATT." },
  "Blocco di Scorie Incandescenti": { faction: "Forgia", glyph: "🧱", shortName: "BLOCCO SCORIE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Può essere consumato come azione gratuita per ottenere 1 Mana immediato." },
  "Torre dei Fumi": { faction: "Forgia", glyph: "🏭", shortName: "TORRE FUMI", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Fumo denso: le unità entro 1 casella non possono essere bersagliate a distanza." },
  "Incudine Ancestrale": { faction: "Forgia", glyph: "🔨", shortName: "INCUDINE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Se distrutta conferisce +2 ATT a tutti gli automi alleati sul campo." },

  // FANTERIA 1M (6)
  "Rottame Semovente": { faction: "Forgia", glyph: "⚙️", shortName: "ROTTAME", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Macerie: alla morte lascia un Blocco di Scorie (0 ATT / 2 PV) sulla casella." },
  "Costrutto di Scorie": { faction: "Forgia", glyph: "🪨", shortName: "COSTRUTTO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Recupero termico: lascia materiale di scarto per le abilità della Forgia." },
  "Ragno Meccanico": { faction: "Forgia", glyph: "🕷️", shortName: "RAGNO MEC.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "omni", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (Omnidirezionale): muove in ogni direzione e attacca subito." },
  "Servo di Bronzo": { faction: "Forgia", glyph: "🥉", shortName: "SERVO BRONZO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Riparatore: ripristina 1 PV a un automa alleato adiacente a inizio turno." },
  "Puntone Semovente": { faction: "Forgia", glyph: "🔩", shortName: "PUNTONE", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: blocca linee; contrattacca con 2 ATT se caricato frontalmente." },
  "Minatore Meccanico": { faction: "Forgia", glyph: "⛏️", shortName: "MINATORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: distrugge un muro adiacente per generare +1 Mana temporaneo." },

  // SPECIALISTI 2-3M (11)
  "Fonditore di Piastre": { faction: "Forgia", glyph: "🔨", shortName: "FONDITORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "[1⚡]: infligge 2 danni a un Altare per donare +2 ATT / +1 PV a un alleato." },
  "Martellatore Meccanico": { faction: "Forgia", glyph: "🦾", shortName: "MARTELLAT.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Battitura a caldo: quando attacca spinge il bersaglio (+2 danni se urta strutture)." },
  "Automa Rivettato": { faction: "Forgia", glyph: "🤖", shortName: "AUTOMA RIV.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura termica: riduce di -1 i danni subiti da attacchi fisici in mischia." },
  "Balestriere a Vapore": { faction: "Forgia", glyph: "💨", shortName: "BAL. VAPORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: spara a distanza 2 senza contrattacco; spinge il bersaglio di 1 casella." },
  "Trivellatore di Rovina": { faction: "Forgia", glyph: "🪛", shortName: "TRIVELLAT.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Penetrazione: ignora armature e riduzioni passive del difensore." },
  "Centauro Meccanico": { faction: "Forgia", glyph: "🐎", shortName: "CENTAURO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli; ottiene +1 ATT se attacca nello stesso turno in cui muove." },
  "Colatore di Ghisa": { faction: "Forgia", glyph: "🫗", shortName: "COLATORE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: ricopre la casella colpita di metallo fuso (1 danno a chi vi sosta)." },
  "Automa Sentinella": { faction: "Forgia", glyph: "🛡️", shortName: "SENT. FORGIA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Riflette 1 danno da mischia verso l'attaccante ogni volta che incassa un colpo." },
  "Demolitore Pneumatico": { faction: "Forgia", glyph: "⛏️", shortName: "DEMOLITORE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Infligge 5 danni contro muri, blocchi e Altari nemici." },
  "Forgiatore di Scaglie": { faction: "Forgia", glyph: "🛠️", shortName: "FORG. SCAGLIE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "A inizio turno conferisce 1 Scudo temporaneo a un'unità amica adiacente." },
  "Saldatore di Rame": { faction: "Forgia", glyph: "🔥", shortName: "SALDATORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Cura 2 PV a una struttura o automa alleato al costo di 1 Azione." },

  // COLOSSI 4+M (5)
  "Colosso di Scorie": { faction: "Forgia", glyph: "🗿", shortName: "COLOSSO", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Devastazione: il danno letale inflitto in eccesso travolge il pezzo retrostante." },
  "Fornace Semovente": { faction: "Forgia", glyph: "🏭", shortName: "FORN. SEMOV.", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 8, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "[1⚡]: consuma un Blocco per conferire +1 ATT a tutte le truppe entro 2 caselle." },
  "Golem di Bronzo Antico": { faction: "Forgia", glyph: "🥉", shortName: "GOLEM BRONZO", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Inarrestabile: riduce tutti i danni subiti di 1. Immune a spinte e trascinamenti." },
  "Cannone a Vapore": { faction: "Forgia", glyph: "💣", shortName: "CANNONE VAP.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3: tiro d'assedio ad alto impatto. Se colpisce un Altare lo demolisce." },
  "Golia Meccanico": { faction: "Forgia", glyph: "🤖", shortName: "GOLIA MEC.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Alla morte genera 2 Rottami Semoventi nelle caselle libere ortogonali." },

  // SORTILEGI & REAZIONI (11)
  "Fusione d'Emergenza": { faction: "Forgia", glyph: "💥", shortName: "FUSIONE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica un proprio Altare o Blocco per pescare 2 carte e infliggere 2 danni ad area." },
  "Fonderia da Campo": { faction: "Forgia", glyph: "🏭", shortName: "FONDERIA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Converte un Muro in Blocco di Scorie e infligge 1 danno alle unità adiacenti." },
  "Ignizione Primordiale": { faction: "Forgia", glyph: "🔥", shortName: "IGNIZIONE", cost: 2, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Trasforma un Altare in truppa semovente 4/5 mantenendo la produzione di Mana." },
  "Sovraccarico Termico": { faction: "Forgia", glyph: "⚡", shortName: "SOVRACCARICO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Un automa ottiene +2 ATT per questo round, ma subisce 2 danni alla fine del turno." },
  "Riciclo Metalli": { faction: "Forgia", glyph: "♻️", shortName: "RICICLO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimuovi un Blocco di Scorie per incassare immediatamente +2 Mana spendibili subito." },
  "Saldata d'Urgenza": { faction: "Forgia", glyph: "🧯", shortName: "SALDATA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripristina 3 PV a un automa alleato o al Comandante." },
  "Gettata di Ghisa": { faction: "Forgia", glyph: "🌋", shortName: "GETTATA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Infligge 2 danni a un bersaglio e riduce il suo movimento a 0 per 1 round." },
  "Forgiatura Istantanea": { faction: "Forgia", glyph: "🔨", shortName: "FORG. ISTANT.", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Schiera immediatamente un automa a costo 1 o 2 dalla mano a costo 0 Azioni." },
  "Tempra d'Acciaio": { faction: "Forgia", glyph: "🛡️", shortName: "TEMPRA ACC.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Conferisce +1 armatura permanente a un automa alleato (max 2 per unità)." },
  "Raffreddamento Istantaneo": { faction: "Forgia", glyph: "🧊", shortName: "RAFFREDD.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un Altare subisce danno letale, sopravvive a 1 PV diventando Blocco." },
  "Detonazione di Scorie": { faction: "Forgia", glyph: "💣", shortName: "DETON. SCORIE", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: fai esplodere un Blocco adiacente a un attaccante nemico infliggendogli 3 danni." },

  // =========================================================================
  // 4. MAREA ASTRALE (38 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Fugace Condotto Astrale": { faction: "Marea", glyph: "🌌", shortName: "CONDOTTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Gli attacchi a distanza nemici che transitano adiacenti all'Altare vengono deviati." },
  "Altare del Vuoto Astrale": { faction: "Marea", glyph: "🕳️", shortName: "VUOTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. I nemici non possono entrare nelle 4 caselle ortogonali adiacenti muovendo in diagonale." },
  "Vortice Tellurico": { faction: "Marea", glyph: "🌀", shortName: "VORTICE TEL.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. A fine turno trascina di 1 passo verso di sé il nemico più vicino entro 3 caselle." },
  "Prisma Stellare": { faction: "Marea", glyph: "💎", shortName: "PRISMA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Estende di +1 la gittata dei tiri a distanza delle unità amiche adiacenti." },
  "Pozzo di Gravità": { faction: "Marea", glyph: "⚓", shortName: "POZZO GRAV.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Le truppe nemiche che tentano di allontanarsi da esso pagano +1 Azione di movimento." },

  // FANTERIA 1M (6)
  "Sonda di Singolarità": { faction: "Marea", glyph: "🛰️", shortName: "SONDA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Campo repulsivo: devia i nemici che entrano nelle caselle ortogonalmente adiacenti." },
  "Scivolatore Astrale": { faction: "Marea", glyph: "⛸️", shortName: "SCIVOLATORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Passo etereo: attraversa le caselle occupate da miniature alleate durante il movimento." },
  "Vedetta di Nebulosa": { faction: "Marea", glyph: "🔭", shortName: "VEDETTA NEB.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "diag", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 diagonale: tiro rapido senza contrattacco lungo diagonali libere." },
  "Larva Eterea": { faction: "Marea", glyph: "🐛", shortName: "LARVA ET.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: scatta di 2 passi diagonali e attacca subito nel turno di ingresso." },
  "Devia-Frecce Astrale": { faction: "Marea", glyph: "🧲", shortName: "DEVIA-FRECCE", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a danni a distanza; contrattacca solo a bersagli che la colpiscono in mischia." },
  "Riflesso di Marea": { faction: "Marea", glyph: "🪞", shortName: "RIFLESSO M.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Scambia di posizione con un alleato adiacente quando viene ingaggiato." },

  // SPECIALISTI 2-3M (11)
  "Tessitore di Vortici": { faction: "Marea", glyph: "🕸️", shortName: "TESSITORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diagonale: colpisce a distanza 2 e trascina il bersaglio di 1 casella verso di sé." },
  "Tessitore d'Ombre": { faction: "Marea", glyph: "🕷️", shortName: "TESS. OMBRE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Tiro sfasante: se colpisce inverte la posizione del bersaglio con una casella libera." },
  "Corsaro delle Onde": { faction: "Marea", glyph: "⛵", shortName: "CORSARO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Spostamento rapido: può scattare fino a 2 caselle diagonali prima di colpire." },
  "Mistico di Vespera": { faction: "Marea", glyph: "🔮", shortName: "MISTICO V.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "diag", gittata: 2, rarity: "U", isMiniature: true, desc: "Ogni volta che trascina o sposta un nemico, gli infligge 1 danno da distorsione." },
  "Sferzatore Gravitazionale": { faction: "Marea", glyph: "🌊", shortName: "SFERZATORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 2, rarity: "U", isMiniature: true, desc: "Spinge indietro di 2 caselle qualsiasi bersaglio che colpisce a distanza." },
  "Pungolatore Stellare": { faction: "Marea", glyph: "✨", shortName: "PUNGOLATORE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli; ignora riduzioni di danno e coperture." },
  "Danzatore dei Flussi": { faction: "Marea", glyph: "💃", shortName: "DANZATORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Schiva il primo attacco in mischia subito in ciascun round scambiandosi di casella." },
  "Arcanista di Flusso": { faction: "Marea", glyph: "🌀", shortName: "ARCANISTA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "diag", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 diagonale: tira a lunga distanza lungo assi diagonali liberi senza contrattacco." },
  "Medusa del Vuoto": { faction: "Marea", glyph: "🪼", shortName: "MEDUSA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Stordimento: chi la colpisce in mischia non può muovere nel suo turno successivo." },
  "Nocchiero Celeste": { faction: "Marea", glyph: "🧭", shortName: "NOCCHIERO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "[1⚡]: teletrasporta un alleato adiacente su una casella libera entro 2 passi." },
  "Scudiero di Corallo": { faction: "Marea", glyph: "🪸", shortName: "SCUD. CORALLO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Ottiene +1 armatura se posizionato su una casella adiacente a un Altare." },

  // COLOSSI 4+M (5)
  "Sentinella dell'Eclissi": { faction: "Marea", glyph: "🌒", shortName: "SENTINELLA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Freno: nemici che muovono adiacenti a lei spendono entrambe le loro 2 Azioni." },
  "Catapulta a Trazione": { faction: "Marea", glyph: "☄️", shortName: "CATAPULTA", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 7, move: "diag", gittata: 4, rarity: "R", isMiniature: true, desc: "Gittata 4 diagonale: scaglia proiettili a distanza 4; raddoppia i danni contro Altari." },
  "Kraken di Nebulosa": { faction: "Marea", glyph: "🐙", shortName: "KRAKEN", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 9, move: "diag2", gittata: 2, rarity: "M", isMiniature: true, desc: "Trascina tutti i nemici entro raggio 2 verso di sé quando sferra un attacco." },
  "Leviatano dei Vuoti": { faction: "Marea", glyph: "🐋", shortName: "LEVIATANO", cost: 5, type: "unit", slot: "HEAVY", att: 3, pv: 10, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Occupa 1 casella ma proietta aura d'impatto: nemici adiacenti pagano +1 Mana per agire." },
  "Colosso d'Ossidiana Fluida": { faction: "Marea", glyph: "🗿", shortName: "COL. FLUIDO", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a danni da collisione; si sposta di 1 casella gratis se colpito da sortilegi." },

  // SORTILEGI & REAZIONI (11)
  "Singolarità Tascabile": { faction: "Marea", glyph: "🌌", shortName: "SINGOLARITA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trascina una truppa nemica di 2 caselle in linea retta verso il Comandante." },
  "Pressione di Marea": { faction: "Marea", glyph: "🌊", shortName: "PRESSIONE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trascina 2 unità nemiche qualsiasi di 1 casella verso l'asse centrale della scacchiera." },
  "Deviazione Astrale": { faction: "Marea", glyph: "🌀", shortName: "DEVIAZIONE", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico dichiara una mossa verso di te, devia la destinazione di 1 asse." },
  "Collasso di Marea": { faction: "Marea", glyph: "🌪️", shortName: "COLLASSO", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Nemici entro 2 passi da un proprio Altare subiscono 2 danni e vengono respinti." },
  "Spostamento di Fase": { faction: "Marea", glyph: "⚡", shortName: "FASE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Scambia istantaneamente di posizione 2 miniature amiche sulla plancia." },
  "Salto di Quanta": { faction: "Marea", glyph: "💫", shortName: "SALTO QUANTA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Teletrasporta un'unità amica su una qualsiasi casella adiacente a un proprio Altare." },
  "Frattura Spazio-Temporale": { faction: "Marea", glyph: "🕳️", shortName: "FRATT. SPAZIO", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Rimuove dal gioco un'unità per 1 intero round; riappare al round dopo nella stessa casella." },
  "Ritorno all'Origine": { faction: "Marea", glyph: "↩️", shortName: "RITORNO", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Rimanda una miniatura nemica non-Comandante sulla sua riga di partenza (riga 8)." },
  "Marea Crescente": { faction: "Marea", glyph: "🌊", shortName: "CRESCENTE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Tutte le unità che muovono in diagonale ottengono +1 passo di movimento in questo round." },
  "Bolla di Vuoto": { faction: "Marea", glyph: "🫧", shortName: "BOLLA VUOTO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: annulla un attacco contro un alleato e lo sposta di 1 casella diagonale." },
  "Barriera di Risonanza": { faction: "Marea", glyph: "🪞", shortName: "RISONANZA", cost: 0, bloodCost: 5, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione: respinge l'attaccante di 3 caselle in linea retta (+2 danni se urta ostacoli)." },

  // =========================================================================
  // 5. SILENZIO D'ORO (38 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Monolito Giurato di Tassa": { faction: "Silenzio", glyph: "⚖️", shortName: "MONO. TASSA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Sanzione: se distrutto dal nemico, l'avversario perde 1 Azione nel suo turno successivo." },
  "Altare della Decima": { faction: "Silenzio", glyph: "📜", shortName: "DECIMA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Anatema: se distrutto dal nemico, l'avversario perde 2 Mana a turno per 2 round." },
  "Sigillo di Marmo Bianco": { faction: "Silenzio", glyph: "🏛️", shortName: "SIG. MARMO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Finché è integro, l'avversario non può lanciare più di 1 sortilegio a turno." },
  "Pulpito della Regola": { faction: "Silenzio", glyph: "📖", shortName: "PULPITO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. I nemici che sostano entro 2 caselle da questo Altare non generano Sangue se muoiono." },
  "Obelisco dell'Indulto": { faction: "Silenzio", glyph: "🕊️", shortName: "INDULTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Se sacrificato, rimuove tutte le alterazioni e penalità dalle tue unità." },

  // FANTERIA 1M (6)
  "Censore Minore": { faction: "Silenzio", glyph: "🔕", shortName: "CENSORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Silenziatore: rimuove passive, armature e abilità speciali ai nemici adiacenti." },
  "Monaco del Voto": { faction: "Silenzio", glyph: "📜", shortName: "VOTO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Voto di fermezza: le unità nemiche adiacenti non possono ricevere aumenti di ATT o cure." },
  "Novizio della Regola": { faction: "Silenzio", glyph: "🕯️", shortName: "NOVIZIO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Contrattacca sempre a 2 ATT se il nemico attaccante possiede più di 2 Sangue." },
  "Scriba Inquisitore": { faction: "Silenzio", glyph: "✒️", shortName: "SCRIBA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Quando muore fa scartare 1 carta casuale dalla mano dell'avversario." },
  "Sentinella Silente": { faction: "Silenzio", glyph: "🛡️", shortName: "SENT. SILENTE", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: blocca linee; contrattacca con 2 ATT solo se caricata direttamente." },
  "Portatore del Canone": { faction: "Silenzio", glyph: "⚖️", shortName: "PORTATORE C.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Gli alleati adiacenti non possono essere presi a bersaglio da magie nemiche a costo 1." },

  // SPECIALISTI 2-3M (11)
  "Arbitro di Pegni": { faction: "Silenzio", glyph: "🪙", shortName: "ARBITRO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Tassa di rappresaglia: se subisce danno sottrae 1 Sangue all'avversario." },
  "Inquisitore di Pegni": { faction: "Silenzio", glyph: "⚖️", shortName: "INQUISITORE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Tassa di Sangue: quando contrattacca con successo in mischia ruba 1 Sangue al nemico." },
  "Monaco Censore": { faction: "Silenzio", glyph: "📿", shortName: "M. CENSORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Le truppe nemiche adiacenti pagano +1 Azione per muoversi via dalla sua casella." },
  "Custode delle Leggi": { faction: "Silenzio", glyph: "📜", shortName: "CUSTODE LEGGI", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Immune a sortilegi diretti; trasferisce la sua immunità alle strutture adiacenti." },
  "Giudice di Prima Istanza": { faction: "Silenzio", glyph: "🔨", shortName: "GIUDICE 1A", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Infligge 4 danni a pezzi nemici che non hanno ancora contrattaccato in questo round." },
  "Epuratore di Mana": { faction: "Silenzio", glyph: "✨", shortName: "EPURATORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: colpisce a distanza riducendo di 1 il Mana del nemico per il round successivo." },
  "Penitente Incatenato": { faction: "Silenzio", glyph: "⛓️", shortName: "PENITENTE", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Non può muoversi a meno che il controllore non spenda 1 Sangue oltre all'Azione." },
  "Guardiano della Decima": { faction: "Silenzio", glyph: "💰", shortName: "GUARD. DECIMA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra sottraendo 1 Sangue al giocatore avversario se adiacente a un nemico." },
  "Paladino del Silenzio": { faction: "Silenzio", glyph: "🛡️", shortName: "PALADINO S.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Armatura: -1 danno; non può essere scavalcato da movimenti a Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*." },
  "Cerusico Giurato": { faction: "Silenzio", glyph: "🩹", shortName: "CERUSICO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: cura 2 PV al Comandante o a un'unità amica spendendo 1 Sangue." },
  "Dogmatico di Ferro": { faction: "Silenzio", glyph: "📖", shortName: "DOGMATICO", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Scatta di 2 caselle ortogonali per colpire nemici che hanno accumulato Sangue." },

  // COLOSSI 4+M (5)
  "Esecutore della Decima": { faction: "Silenzio", glyph: "⚖️", shortName: "ESECUTORE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Sentenza: Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*. Infligge 5 danni se il bersaglio ha già agito nel turno." },
  "Giustiziere Senza Volto": { faction: "Silenzio", glyph: "👤", shortName: "GIUSTIZIERE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Castigo puro: Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*; i suoi attacchi ignorano armature fisiche e coperture." },
  "Archivista Supremo": { faction: "Silenzio", glyph: "📚", shortName: "ARCHIVISTA", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 8, move: "ortho", gittata: 2, rarity: "R", isMiniature: true, desc: "Gittata 2: blocca il lancio di sortilegi nemici entro 3 caselle attorno a sé." },
  "Colosso dell'Interdizione": { faction: "Silenzio", glyph: "🗿", shortName: "COL. INTERD.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Tassa suprema: finché è in vita, l'avversario deve spendere 1 Mana extra per ogni attacco." },
  "Avatar del Giuramento": { faction: "Silenzio", glyph: "👼", shortName: "AVATAR GIUR.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Se distrutto, sigilla tutte le abilità attive del pezzo uccisore per il resto del match." },

  // SORTILEGI & REAZIONI (11)
  "Editto di Quarantena": { faction: "Silenzio", glyph: "🚫", shortName: "QUARANTENA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Sigilla un'area 2x2 per 1 round: nessuna unità può entrarvi o attaccare attraverso." },
  "Editto di Confisca": { faction: "Silenzio", glyph: "📑", shortName: "CONFISCA ED.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Sottrae 1 Mana dalla riserva iniziale dell'avversario nel suo turno successivo." },
  "Sigillo di Confisca": { faction: "Silenzio", glyph: "📜", shortName: "CONFISCA S.", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Sottrae 2 Sangue al nemico (infligge 2 danni al Comandante se a secco)." },
  "Interdizione di Legge": { faction: "Silenzio", glyph: "🔕", shortName: "INTERDIZIONE", cost: 0, bloodCost: 5, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione: annulla e dissipa completamente un sortilegio nemico appena lanciato." },
  "Manto del Giudizio": { faction: "Silenzio", glyph: "⚖️", shortName: "MANTO GIUD.", cost: 1, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione su attacco a Comandante: nega il danno e sottrae 1 Azione al turno nemico." },
  "Tassa Imperiale": { faction: "Silenzio", glyph: "💰", shortName: "TASSA IMP.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "L'avversario deve pagare 1 Sangue per ogni unità che muove nel suo prossimo turno." },
  "Anatema del Silenzio": { faction: "Silenzio", glyph: "🤐", shortName: "ANATEMA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimuove permanentemente il testo di abilità di un'unità nemica non-Comandante." },
  "Confisca Forzata": { faction: "Silenzio", glyph: "🗝️", shortName: "CONFISCA FORZ.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Distrugge un Altare nemico se l'avversario controlla più Altari di te." },
  "Sentenza Inappellabile": { faction: "Silenzio", glyph: "🔨", shortName: "SENTENZA IN.", cost: 3, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Distrugge istantaneamente una truppa nemica che ha sferrato un attacco in questo round." },
  "Veto Inquisitorio": { faction: "Silenzio", glyph: "🛑", shortName: "VETO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: nega l'attivazione di un Rito d'Armi o abilità [1⚡] nemica." },
  "Giudizio Immediato": { faction: "Silenzio", glyph: "⚡", shortName: "GIUDIZIO IMM.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico muove adiacente al Comandante, subisce 2 danni immediati." },

  // =========================================================================
  // 6. POOL NEUTRALE (100 CARTE)
  // =========================================================================
  // ALTARI & STRUTTURE NEUTRALI (10)
  "Altare": { faction: "Neutral", glyph: "🏛️", shortName: "ALTARE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana/turno. Struttura solida impassabile. Copertura: -1 danno fisico adiacenti." },
  "Vena Tettorica Instabile": { faction: "Neutral", glyph: "⚡", shortName: "VENA +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 4, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana/turno! Fragile (4 PV): se distrutto infligge 2 danni al Comandante alleato." },
  "Altare del Patto di Sangue": { faction: "Neutral", glyph: "🩸", shortName: "PATTO +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana/turno! Subisci 1 danno a inizio turno se incassi il secondo Mana." },
  "Il Cuore della Griglia": { faction: "Neutral", glyph: "💖", shortName: "CUORE +2M", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 9, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false, isCenterOnly: true, desc: "Mitico: +2 Mana e +1 Sangue. Solo caselle centrali. Se sconfitto si converte al nemico!" },
  "Monolito dell'Eclissi Totale": { faction: "Neutral", glyph: "🌑", shortName: "ECLISSE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "M", isMiniature: false, desc: "+1 Mana. Tutti i sortilegi nemici costano +1 Mana addizionale finché è integro." },
  "Monolito di Basalto": { faction: "Neutral", glyph: "🪨", shortName: "BASALTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 9, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Immune a sortilegi diretti nemici (non bersagliabile da Frantumare)." },
  "Pilastro delle Terre Aride": { faction: "Neutral", glyph: "🏜️", shortName: "PILASTRO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Fornisce copertura a 360 gradi alle unità amiche adiacenti." },
  "Sorgente Primordiale": { faction: "Neutral", glyph: "💧", shortName: "SORGENTE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Rigenera 1 PV a inizio turno all'unità amica con meno salute adiacente." },
  "Altare dell'Assedio": { faction: "Neutral", glyph: "🏹", shortName: "ALT. ASSEDIO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Le truppe con tiro a distanza adiacenti ottengono +1 danno contro Altari." },
  "Tomba Anonima": { faction: "Neutral", glyph: "🪦", shortName: "TOMBA ANON.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Genera 1 Segnalino Sangue per chiunque la demolisca per primo." },

  // FANTERIA NEUTRALE 1M (20)
  "Recluta di Leva": { faction: "Neutral", glyph: "🗡️", shortName: "RECLUTA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Fanteria economica per occupare le caselle chiave iniziali." },
  "Scudiero Rovinato": { faction: "Neutral", glyph: "🛡️", shortName: "SCUDIERO", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: non attacca attivamente; contrattacca solo se colpito." },
  "Ladro di Tombe": { faction: "Neutral", glyph: "🗝️", shortName: "LADRO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Passo Diagonale: muove e attacca solo lungo le diagonali libere." },
  "Segugio Randagio": { faction: "Neutral", glyph: "🐺", shortName: "SEGUGIO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: muove fino a 2 caselle ortogonali e attacca subito." },
  "Sentinella delle Mura": { faction: "Neutral", glyph: "🏰", shortName: "SENTINELLA", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: contrattacca a 2 ATT solo se ingaggiata in mischia." },
  "Schermagliatore Randagio": { faction: "Neutral", glyph: "🪓", shortName: "SCHERMAGL.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Unità multi-asse: muove di 1 casella in qualsiasi direzione." },
  "Mastino da Guerra": { faction: "Neutral", glyph: "🐕", shortName: "MASTINO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Cacciatore rapido: muove fino a 2 caselle con Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*." },
  "Tagliagole": { faction: "Neutral", glyph: "🔪", shortName: "TAGLIAGOLE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Colpo letale: ignora armature nel primo turno di ingaggio." },
  "Disertore Reclutato": { faction: "Neutral", glyph: "🏃", shortName: "DISERTORE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Muove di 1 casella gratis all'inizio della partita." },
  "Cacciatore di Ratti": { faction: "Neutral", glyph: "🪤", shortName: "CACC. RATTI", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Ottiene +1 ATT se attacca unità con salute pari o inferiore a 2 PV." },
  "Strillone delle Strade": { faction: "Neutral", glyph: "📢", shortName: "STRILLONE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Alla morte rivela le prime 2 carte del mazzo nemico." },
  "Esploratore Cieco": { faction: "Neutral", glyph: "🦯", shortName: "ESPL. CIECO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Muove solo in diagonale; ignora la debolezza da schieramento." },
  "Minatore Randagio": { faction: "Neutral", glyph: "⛏️", shortName: "MINATORE R.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 3 danni contro strutture e barriere solide." },
  "Guerriero Tribale": { faction: "Neutral", glyph: "🪶", shortName: "TRIBALE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "+1 ATT durante il contrattacco se combatte adiacente a un alleato." },
  "Cane da Pastore": { faction: "Neutral", glyph: "🐩", shortName: "PASTORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Può saltare sopra una pedina alleata durante il movimento." },
  "Picchiere della Plebe": { faction: "Neutral", glyph: "🔱", shortName: "PICCA PLEBE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: attacca a 2 caselle in linea retta senza contrattacco." },
  "Ragazzo di Trincea": { faction: "Neutral", glyph: "🧒", shortName: "RAGAZZO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Può scambiare posizione con una struttura adiacente a costo 1 Azione." },
  "Sentinella di Campagna": { faction: "Neutral", glyph: "🌾", shortName: "SENT. CAMP.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Subisce -1 danno se posizionata nella propria metà campo." },
  "Mercenario a Giornata": { faction: "Neutral", glyph: "🪙", shortName: "MERC. GIORNO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Costo economico ma non può contrattaccare se attaccato." },
  "Guida delle Paludi": { faction: "Neutral", glyph: "🗺️", shortName: "GUIDA PALUDI", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a Voragini e terreni dannosi sulla scacchiera." },

  // SPECIALISTI NEUTRALI 2-3M (35)
  "Mercenario Veterano": { faction: "Neutral", glyph: "⚔️", shortName: "VETERANO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "+1 ATT addizionale (3 ATT effettivi) durante il contrattacco." },
  "Giavellottiere Cieco": { faction: "Neutral", glyph: "🎯", shortName: "GIAVELLOT.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale: attacca a 2 caselle senza subire contrattacco." },
  "Arciere Cieco": { faction: "Neutral", glyph: "🏹", shortName: "ARCIERE C.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale: tiro a distanza lungo assi liberi." },
  "Esploratore delle Cripte": { faction: "Neutral", glyph: "🔦", shortName: "ESPL. CRIPTE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, rarity: "C", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli, truppe e Altari come il cavallo." },
  "Picchiere Mercenario": { faction: "Neutral", glyph: "🔱", shortName: "PICCA MERC.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: attacca a 2 caselle ortogonali senza contrattacco." },
  "Esploratore a Cavallo": { faction: "Neutral", glyph: "🐎", shortName: "ESPLORAT.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo scacchistico a L: scavalca pezzi, ostacoli e Altari." },
  "Monaco Mendicante": { faction: "Neutral", glyph: "📿", shortName: "MONACO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Elemosina: fa pescare 1 carta al controllore quando viene distrutto." },
  "Alchimista Dissidente": { faction: "Neutral", glyph: "🧪", shortName: "ALCHIMISTA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "Pozza tossica: alla morte avvelena la propria casella per 2 turni." },
  "Baluardo di Rovina": { faction: "Neutral", glyph: "🗿", shortName: "BALUARDO", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Ancorato al suolo: immune a spinte, trascinamenti e danni da urto." },
  "Balestriere d'Élite": { faction: "Neutral", glyph: "🏹", shortName: "BALESTR.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Mira Fissa (Gittata 3): colpisce fino a 3 caselle ortogonali libere senza contrattacco." },
  "Spadaccino Errante": { faction: "Neutral", glyph: "🤺", shortName: "SPADACCINO", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "Duellante: infligge 4 danni se il bersaglio non ha alleati adiacenti." },
  "Lanciere a Cavallo": { faction: "Neutral", glyph: "🏇", shortName: "LANCIERE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Carica d'Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* e Gittata ortogonale 2 senza contrattacco." },
  "Custode del Tempio": { faction: "Neutral", glyph: "🏛️", shortName: "CUSTODE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Baluardo mobile: alleati e Altari adiacenti subiscono -1 danno da attacchi." },
  "Duellante di Rovina": { faction: "Neutral", glyph: "⚔️", shortName: "DUELLANTE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "Maestro di Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*: +2 danni se attacca con Aggiramento Tattico." },
  "Carrettiere da Trincea": { faction: "Neutral", glyph: "🛒", shortName: "CARRETTIERE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Scorta protetta: quando muove traina un alleato adiacente nella casella liberata." },
  "Assassino di Tombe": { faction: "Neutral", glyph: "🗡️", shortName: "ASSASSINO", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "diag", gittata: 1, rarity: "U", isMiniature: true, desc: "Colpo invisibile: se attacca in diagonale, il bersaglio non contrattacca mai." },
  "Automa Disertore": { faction: "Neutral", glyph: "🤖", shortName: "AUTOMA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Scudo arcano: annulla automaticamente il primo sortilegio nemico subito." },
  "Balestriere a Cavallo": { faction: "Neutral", glyph: "🏇", shortName: "BAL. CAVALLO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* & Gittata 2: salta ostacoli e tira a distanza ortogonale." },
  "Medico di Guerra": { faction: "Neutral", glyph: "💉", shortName: "MEDICO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "[1⚡]: cura 2 PV a un alleato adiacente." },
  "Bracconiere": { faction: "Neutral", glyph: "🏹", shortName: "BRACCONIERE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: ottiene +1 ATT contro bestie o segugi." },
  "Ufficiale di Ventura": { faction: "Neutral", glyph: "🎖️", shortName: "UFFICIALE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Le reclute e unità a costo 1 adiacenti ottengono +1 ATT." },
  "Spadaccino con Stocco": { faction: "Neutral", glyph: "🤺", shortName: "STOCCO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (lineare): scatta di 2 caselle in linea retta per attaccare." },
  "Tagliagole Esperto": { faction: "Neutral", glyph: "🔪", shortName: "TAGLIA. ESP.", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "Infligge 5 danni se attacca alle spalle di un'unità già ingaggiata." },
  "Guardiano delle Porte": { faction: "Neutral", glyph: "🚪", shortName: "GUARD. PORTE", cost: 3, type: "unit", slot: "TACTIC", att: 1, pv: 6, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Immobilizza per 1 turno il primo nemico che muove adiacente a lui." },
  "Cavaliere Solitario": { faction: "Neutral", glyph: "🐎", shortName: "CAV. SOLITARIO", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: ottiene +1 ATT se non ha alleati entro 2 caselle." },
  "Fanatico di Pietra": { faction: "Neutral", glyph: "🪨", shortName: "FANATICO P.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a veleni e Voragini; non può essere spinto." },
  "Mago di Trincea": { faction: "Neutral", glyph: "🧙", shortName: "MAGO TRINCEA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: il suo colpo infligge danno magico che ignora armature." },
  "Geniere Dissidente": { faction: "Neutral", glyph: "💣", shortName: "GENIERE DISS.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: piazza una mina su una casella libera (2 danni a chi vi passa)." },
  "Ladro di Bestiame": { faction: "Neutral", glyph: "🐂", shortName: "LADRO BEST.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Ruba 1 Sangue all'avversario se distrugge una bestia o segugio." },
  "Veterano Sfregiato": { faction: "Neutral", glyph: "🪓", shortName: "VET. SFREG.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Contrattacca sempre, anche se il colpo subito è letale." },
  "Schermagliatore con Rete": { faction: "Neutral", glyph: "🕸️", shortName: "RETE", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 3, move: "omni", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: intrappola il bersaglio impedendogli di muoversi per 1 round." },
  "Arciere Scelto": { faction: "Neutral", glyph: "🏹", shortName: "ARCIERE SC.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3 ortogonale libera senza subire contrattacco." },
  "Cavalcagrifi": { faction: "Neutral", glyph: "🦅", shortName: "CAVALCAGRIFI", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 1, slancio: true, rarity: "R", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Volo *(scavalca pedine e ostacoli)*: scavalca ostacoli muovendo di 2 passi diagonali." },
  "Lottatore delle Fosse": { faction: "Neutral", glyph: "🥊", shortName: "LOTTATORE", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Spinge indietro di 1 casella qualsiasi bersaglio che colpisce in mischia." },
  "Chierico Errante": { faction: "Neutral", glyph: "✝️", shortName: "CHIERICO", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Quando muore cura 3 PV al Comandante alleato." },

  // COLOSSI NEUTRALI 4+M (15)
  "Golia di Rifiuti": { faction: "Neutral", glyph: "🦾", shortName: "GOLIA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Frantumatore: danni raddoppiati (6 danni base) contro Altari e strutture." },
  "Cavaliere Senz'Armi": { faction: "Neutral", glyph: "🛡️", shortName: "CAVALIERE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Fendente d'Urto: Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*; infligge 1 danno ad area ai nemici all'atterraggio." },
  "Guardiano dell'Archivio": { faction: "Neutral", glyph: "📜", shortName: "GUARDIANO", cost: 4, type: "unit", slot: "HEAVY", att: 1, pv: 8, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Tassa: nemici adiacenti pagano +1 Mana per attivare abilità con Azioni." },
  "Balista da Campo": { faction: "Neutral", glyph: "🎯", shortName: "BALISTA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 ortogonale libera senza subire contrattacco difensivo." },
  "Veterano di Mille Assedi": { faction: "Neutral", glyph: "🎖️", shortName: "VET. ASSEDI", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Contrattacco letale: infligge +2 ATT addizionali (5 ATT) in contrattacco." },
  "Juggernaut di Rifiuti": { faction: "Neutral", glyph: "🚜", shortName: "JUGGERNAUT", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Travolgere *(spinge indietro il difensore e occupa la sua casella)*: spinge indietro il pezzo colpito e occupa la sua casella." },
  "Colosso di Rame": { faction: "Neutral", glyph: "🥉", shortName: "COL. RAME", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 9, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Monolito vivente: genera anche +1 Mana a inizio turno finché è in vita." },
  "Titano di Basalto": { faction: "Neutral", glyph: "🏔️", shortName: "TITANO", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Inamovibile *(immune a spinte, urti e Voragini)*: demolisce muri al passaggio; immune a spinte e voragini." },
  "Gigante delle Rocce": { faction: "Neutral", glyph: "🪨", shortName: "GIGANTE R.", cost: 5, type: "unit", slot: "HEAVY", att: 5, pv: 9, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Spazza via: quando colpisce in mischia danneggia anche le caselle ai fianchi." },
  "Mangiatore di Uomini": { faction: "Neutral", glyph: "👹", shortName: "OGRE", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Forza bruta: attacca con 4 ATT ma subisce +1 danno da attacchi a distanza." },
  "Catapulta a Molla": { faction: "Neutral", glyph: "🪵", shortName: "CATAPULTA M.", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 6, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3: infligge 4 danni a strutture e barriere." },
  "Behemoth Corazzato": { faction: "Neutral", glyph: "🦣", shortName: "BEHEMOTH", cost: 5, type: "unit", slot: "HEAVY", att: 3, pv: 11, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Armatura pesante: riduce di -1 ogni danno subito da qualsiasi fonte." },
  "Rinoceronte d'Assedio": { faction: "Neutral", glyph: "🦏", shortName: "RINOCERONTE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Carica: infligge +2 danni se muove di 2 caselle prima di attaccare." },
  "Manticora Selvatica": { faction: "Neutral", glyph: "🦁", shortName: "MANTICORA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "knight", gittata: 2, rarity: "R", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* e spina velenosa a distanza 2 ortogonale senza contrattacco." },
  "Condottiero Senza Corona": { faction: "Neutral", glyph: "👑", shortName: "CONDOTTIERO", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Tutti gli alleati entro 2 caselle ottengono +1 ATT." },

  // SORTILEGI & REAZIONI NEUTRALI (20)
  "Frantumare la Pietra": { faction: "Neutral", glyph: "🔨", shortName: "FRANTUMA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Distrugge istantaneamente 1 Altare o Muro nemico entro 4 caselle dal Comandante." },
  "Marcia Forzata": { faction: "Neutral", glyph: "⚡", shortName: "MARCIA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove 1 truppa alleata di 1 casella ortogonale extra a costo 0 Azioni." },
  "Carica Sfondante": { faction: "Neutral", glyph: "🦏", shortName: "CARICA SF.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove un'unità di 1 passo extra e le conferisce +1 ATT sul prossimo attacco." },
  "Salasso Crudele": { faction: "Neutral", glyph: "🩸", shortName: "SALASSO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "3 danni diretti a un'unità ferita o a costo <= 2 entro 3 caselle." },
  "Barricata Improvvisata": { faction: "Neutral", glyph: "🧱", shortName: "BARRICATA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Evoca un Muro di Detriti solido (0 ATT / 3 PV) su una casella libera entro 3 passi." },
  "Sguardo del Monolito": { faction: "Neutral", glyph: "👁️", shortName: "SGUARDO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Blocca completamente movimento e attacchi di un nemico fino al prossimo turno." },
  "Pozza di Sangue": { faction: "Neutral", glyph: "🩸", shortName: "POZZA SANGUE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Incanta una casella: chiunque vi transiti conferisce 2 Sangue al controllore." },
  "Genio del Geniere": { faction: "Neutral", glyph: "🔧", shortName: "GENIERE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripristina 3 PV a un Altare o Muro alleato entro 3 passi dal Comandante." },
  "Rito di Comunione": { faction: "Neutral", glyph: "🍷", shortName: "COMUNIONE", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Pesca 2 carte (3 carte se il tuo Comandante ha meno di 10 PV rimasti)." },
  "Furia dei Relitti": { faction: "Neutral", glyph: "💥", shortName: "FURIA REL.", cost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Danni diretti pari alle unità morte in questo round a una truppa entro 3 passi." },
  "Spaccatura Terrestre": { faction: "Neutral", glyph: "🌋", shortName: "SPACCATURA", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Crea una Voragine permanente e impassabile su una casella libera entro 3 passi." },
  "Fendenti Incrociati": { faction: "Neutral", glyph: "⚔️", shortName: "FENDENTI", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Per questo turno, tutti gli attacchi con Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)* infliggono +2 danni extra." },
  "Giuramento Ancestrale": { faction: "Neutral", glyph: "👑", shortName: "GIURAMENTO", cost: 3, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "M", isMiniature: false, desc: "Pesca 3 carte dal Grimorio e rigenera 4 PV al tuo Comandante." },
  "Contro-Urto": { faction: "Neutral", glyph: "🛡️", shortName: "CONTRO-URTO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione su attacco mischia: riduce di 2 il danno e respinge l'attaccante (+2 danni urto)." },
  "Tagliola da Campo": { faction: "Neutral", glyph: "🪤", shortName: "TAGLIOLA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Piazza una trappola invisibile: il primo nemico che vi entra subisce 2 danni e si ferma." },
  "Passo Falso": { faction: "Neutral", glyph: "🦶", shortName: "PASSO FALSO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico dichiara una mossa, riduci il suo movimento a 0 per il round." },
  "Rinvigorire": { faction: "Neutral", glyph: "🧪", shortName: "RINVIGORIRE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Un'unità alleata che ha già agito in questo round può muovere di 1 casella extra." },
  "Saccheggio Rapido": { faction: "Neutral", glyph: "💰", shortName: "SACCHEGGIO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Se hai distrutto una struttura nemica in questo round, incassi +2 Mana immediati." },
  "Nebbia di Guerra": { faction: "Neutral", glyph: "🌫️", shortName: "NEBBIA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Tutti gli attacchi a distanza sono impediti per 1 intero round di gioco." },
  "Provocazione": { faction: "Neutral", glyph: "🗣️", shortName: "PROVOCAZ.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Costringe una truppa nemica entro 2 caselle ad attaccare l'alleato bersaglio nel suo turno." }
};

export const CARDS_BETA = {
  // =========================================================================
  // 1. BASTIONE DI FERRO — FRATTURA D'OSSIDIANA
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Monolito di Granito Nero": { faction: "Ferro", glyph: "🪨", shortName: "GRANITO NERO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 9, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. 9 PV. Inamovibile *(immune a spinte, urti e Voragini)*: non subisce mai danni doppi da Arieti o macchine d'assedio." },
  "Faglia d'Ossidiana": { faction: "Ferro", glyph: "🌋", shortName: "FAGLIA OSS.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Se distrutto, trasforma permanentemente la propria casella in Voragine." },
  "Torre degli Arpioni": { faction: "Ferro", glyph: "🗼", shortName: "TORRE ARPINI", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 1, move: "none", gittata: 3, rarity: "U", isMiniature: false, desc: "+1 Mana. Gittata 3 ortogonale: a fine turno trascina di 1 casella verso di sé un nemico a tiro." },
  "Muro di Piastre Fuso": { faction: "Ferro", glyph: "🧱", shortName: "MURO FUSO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Gli alleati adiacenti a questo muro sono immuni al Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*(accerchiamento)." },
  "Redotta del Cavaliere": { faction: "Ferro", glyph: "🛡️", shortName: "REDOTTA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Le truppe alleate con Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* possono partire da questa casella saltando 1 passo extra." },

  // FANTERIA 1M (6)
  "Picconiere di Faglia": { faction: "Ferro", glyph: "⛏️", shortName: "PICCONIERE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 4 danni a strutture e barricate se attacca da una casella adiacente." },
  "Guardia di Magma": { faction: "Ferro", glyph: "🔥", shortName: "G. MAGMA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura fusa: subisce -1 danno fisico e infligge 1 danno riflesso a chi lo colpisce in mischia." },
  "Scudiero Pesante": { faction: "Ferro", glyph: "🛡️", shortName: "SCUD. PES.", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 6, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: 0 ATT / 6 PV. Blocca completamente la linea di carica di cavalli e segugi." },
  "Geniere da Breccia": { faction: "Ferro", glyph: "🧨", shortName: "GEN. BRECCIA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: piazza una Carica Esplosiva su una struttura adiacente (3 danni a fine turno)." },
  "Balestriere di Trincea": { faction: "Ferro", glyph: "🏹", shortName: "BAL. TRINC.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale: infligge 2 danni se spara stando adiacente a un Altare alleato." },
  "Sentinella Rinforzata": { faction: "Ferro", glyph: "🚪", shortName: "SENT. RINF.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Non può essere spinta o deviata. Se urta un ostacolo, non subisce danno da collisione." },

  // SPECIALISTI 2-3M (11)
  "Spezzatore di Garek": { faction: "Ferro", glyph: "♞", shortName: "SPEZZATORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra bloccando per 1 round il movimento di tutti i nemici ortogonalmente adiacenti." },
  "Picchiere d'Ossidiana": { faction: "Ferro", glyph: "🔱", shortName: "PICCA OSS.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* (Gittata 2): se colpisce un'unità con armatura, ignora la riduzione di danno." },
  "Cavaliere Corazzato di Garek": { faction: "Ferro", glyph: "🐎", shortName: "CAV. GAREK", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: ottiene +1 armatura fisica permanente se atterra adiacente a un Altare alleato." },
  "Martellatore Pesante": { faction: "Ferro", glyph: "🔨", shortName: "MART. PES.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Schianto: spinge indietro di 2 caselle il bersaglio in mischia (+2 danni urto)." },
  "Custode della Frattura": { faction: "Ferro", glyph: "🪨", shortName: "CUST. FRATT.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Le Voragini adiacenti a questa unità sono considerate ponti calpestabili solo per gli alleati." },
  "Balestriere a Doppia Corda": { faction: "Ferro", glyph: "🏹", shortName: "BAL. DOPPIA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3 ortogonale: spara a 3 caselle; se non muove nel turno, può sferrare due attacchi distinti." },
  "Veterano della Voragine": { faction: "Ferro", glyph: "⚔️", shortName: "VET. VORAG.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "+2 ATT extra se combatte contro un'unità posizionata a bordo plancia o vicino a una Voragine." },
  "Alabardiere Pesante": { faction: "Ferro", glyph: "🪓", shortName: "ALAB. PES.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* (Gittata 2): impedisce ai nemici di compiere Balzi a L nelle caselle che controlla." },
  "Geniere da Fortezza": { faction: "Ferro", glyph: "🔧", shortName: "GEN. FORT.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: erige una Barricata solida (0 ATT / 3 PV) su una casella libera adiacente." },
  "Scudiero della Faglia": { faction: "Ferro", glyph: "🛡️", shortName: "SCUD. FAGLIA", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Subisce i danni al posto del Comandante Garek se si trova entro 2 caselle da lui." },
  "Campione Spezzatore": { faction: "Ferro", glyph: "🎖️", shortName: "CAMP. SPEZZ.", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Sfondamento *(infligge danni massicci ad Altari e Muri nemici)*: demolisce armature nemiche al primo colpo inferto." },

  // COLOSSI 4+M (5)
  "Golia di Ossidiana": { faction: "Ferro", glyph: "🗿", shortName: "GOLIA OSS.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Titanico: armatura fissa -1. Quando muore si spacca in due Blocchi di Granito (4 PV ciascuno)." },
  "Ariete Cataclismatico": { faction: "Ferro", glyph: "🪵", shortName: "ARIETE CAT.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Sfondamento *(infligge danni massicci ad Altari e Muri nemici)*: 8 danni ad Altari. Se distrugge una struttura, danneggia i nemici attorno." },
  "Balista Pesante da Fortezza": { faction: "Ferro", glyph: "🎯", shortName: "BALISTA PES.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3: tiro in linea retta che trapassa il primo bersaglio colpendo anche quello retrostante." },
  "Carro Corazzato da Breccia": { faction: "Ferro", glyph: "🚜", shortName: "CARRO CORAZ.", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 8, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Travolgere *(spinge indietro il difensore e occupa la sua casella)*: attraversa pedine nemiche di costo 1-2 spingendole ai lati della sua corsia." },
  "Mastodonte d'Acciaio": { faction: "Ferro", glyph: "🦣", shortName: "MASTODONTE", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Non può subire più di 2 danni da un singolo attacco o sortilegio." },

  // SORTILEGI & REAZIONI (11)
  "Faglia Improvvisa": { faction: "Ferro", glyph: "🌋", shortName: "FAGLIA IMM.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Apre una Voragine permanente su una casella libera entro 3 passi dal Comandante." },
  "Impatto Tettonico": { faction: "Ferro", glyph: "💥", shortName: "IMPATTO TETT.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Infligge 2 danni a tutte le unità adiacenti a muri o Altari e le respinge di 1 casella." },
  "Salasso di Piastre": { faction: "Ferro", glyph: "🩸", shortName: "SALASSO P.", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimuovi l'armatura da un alleato per conferirgli +2 ATT immediati in questo round." },
  "Riparazione di Garek": { faction: "Ferro", glyph: "🔧", shortName: "RIPARAZ. G.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripristina 4 PV a un Altare alleato o a una macchina d'assedio." },
  "Muraglia di Scudi": { faction: "Ferro", glyph: "🛡️", shortName: "MURAGLIA SC.", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Tutte le unità alleate guadagnano +1 armatura temporanea fino all'inizio del prossimo turno." },
  "Carica Inarrestabile": { faction: "Ferro", glyph: "⚡", shortName: "CARICA INARR.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Un colosso alleato muove di 2 passi extra e travolge il primo ostacolo che incontra." },
  "Bastione Spezzato": { faction: "Ferro", glyph: "🪨", shortName: "BAST. SPEZZ.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Distruggi un tuo muro o blocco per pescare 2 carte dal Grimorio." },
  "Ruggito d'Ossidiana": { faction: "Ferro", glyph: "🗣️", shortName: "RUGGITO OSS.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Tutti i nemici adiacenti a Garek vengono spinti indietro di 2 passi (+2 danni urto)." },
  "Pietrificazione": { faction: "Ferro", glyph: "🗿", shortName: "PIETRIFICAZ.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Trasforma una truppa nemica ferita in un Muro solido (0 ATT / 4 PV) permanente." },
  "Contro-Sfondamento": { faction: "Ferro", glyph: "🛡️", shortName: "CONTRO-SFOND.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico carica un alleato, nega la carica e gli infligge 3 danni." },
  "Scudo Fratturato": { faction: "Ferro", glyph: "✨", shortName: "SCUDO FRATT.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: riduce a 0 il danno subito da un attacco; scaglia schegge infliggendo 2 danni all'attaccante." },

  // =========================================================================
  // 2. ROGO DELLE CENERI — INFESTAZIONE DI MORBIDA
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Cimitero Putrescente": { faction: "Ceneri", glyph: "🪦", shortName: "CIMIT. PUTR.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. I nemici che transitano sulle caselle adiacenti subiscono 1 danno e perdono 1 movimento." },
  "Nido della Nutrice": { faction: "Ceneri", glyph: "🪱", shortName: "NIDO NUTR.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. All'inizio del tuo turno genera gratuitamente un Larvone Infetto (1/1 con Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*) adiacente." },
  "Calderone di Pece": { faction: "Ceneri", glyph: "🫕", shortName: "CALDERONE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Se distrutto, sparge pece bollente nelle 4 caselle attorno (2 danni a chiunque vi sosti)." },
  "Altare dei Vermi": { faction: "Ceneri", glyph: "🪱", shortName: "ALT. VERMI", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Drawback: alla fine del tuo turno infligge 1 danno a una tua truppa a caso." },
  "Tumulo d'Ossa": { faction: "Ceneri", glyph: "☠️", shortName: "TUMULO OSSA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Rilascia 2 Segnalini Sangue se sacrificato volontariamente dal controllore." },

  // FANTERIA 1M (6)
  "Larvone Infetto": { faction: "Ceneri", glyph: "🐛", shortName: "LARVONE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (diagonale): muove in diagonale e attacca subito; alla morte avvelena la casella." },
  "Parassita Sepolcrale": { faction: "Ceneri", glyph: "🪱", shortName: "PARASSITA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Se muore attaccando in mischia, si attacca al bersaglio infliggendogli 1 danno a inizio turno." },
  "Sciame di Tarme": { faction: "Ceneri", glyph: "🦗", shortName: "SCIAME TARME", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "omni", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (omnidirezionale): muove ovunque di 1 passo e attacca subito; muore dopo l'attacco." },
  "Scheletro di Trincea": { faction: "Ceneri", glyph: "🦴", shortName: "SCHELETRO T.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Se distrutto da armi contundenti o da mischia si ricompone con 1 PV all'inizio del round dopo." },
  "Cane Infetto": { faction: "Ceneri", glyph: "🐕‍🦺", shortName: "CANE INF.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Scatta di 2 caselle ortogonali; se distrugge una truppa nemica guarisce 1 PV." },
  "Guscio di Morbida": { faction: "Ceneri", glyph: "💣", shortName: "GUSCIO MORB.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Detonazione Diagonale: alla morte infligge 2 danni alle 4 caselle diagonali adiacenti." },

  // SPECIALISTI 2-3M (11)
  "Nutrice di Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "NUTRICE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "diag", gittata: 1, rarity: "U", isMiniature: true, desc: "Passo Diagonale: quando una truppa alleata muore entro 2 caselle, guadagna permanentemente +1 ATT." },
  "Ghoul Vorace": { faction: "Ceneri", glyph: "🧟", shortName: "GHOUL VOR.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, slancio: true, rarity: "U", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: 2 ATT. Se attacca un'unità ferita non subisce contrattacco." },
  "Inquisitore delle Ceneri": { faction: "Ceneri", glyph: "🔥", shortName: "INQ. CENERI", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 ortogonale: i suoi colpi lasciano braci ardenti sulla casella colpita." },
  "Mangiatore di Carogne": { faction: "Ceneri", glyph: "🦷", shortName: "MANGIACAROGNE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: consuma un Cimitero o una truppa morta sulla sua casella per ottenere +2 ATT fisso." },
  "Banshee Urlante": { faction: "Ceneri", glyph: "👻", shortName: "BANSHEE URL.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diagonale: riduce di -1 l'ATT del bersaglio colpito fino alla fine del round." },
  "Sacerdotessa della Piaga": { faction: "Ceneri", glyph: "🧙‍♀️", shortName: "SACERD. PIAGA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "diag", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: trasforma la casella bersaglio in Cimitero permanente spendendo 1 Sangue." },
  "Spettro Putrido": { faction: "Ceneri", glyph: "👤", shortName: "SPETTR. PUTR.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli; se atterra adiacente al Comandante nemico gli sottrae 1 Sangue." },
  "Necro-Geniere": { faction: "Ceneri", glyph: "🛠️", shortName: "NECRO-GEN.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: fa detonare un Altare alleato infliggendo 4 danni a tutti i pezzi attorno." },
  "Biacco delle Fosse": { faction: "Ceneri", glyph: "🐍", shortName: "BIACCO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: scatta di 2 passi diagonali; velenoso (1 danno a inizio turno al nemico ferito)." },
  "Cavaliere Putrefatto": { faction: "Ceneri", glyph: "🏇", shortName: "CAV. PUTR.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: se distrugge una truppa nemica genera un Cimitero sulla casella del caduto." },
  "Guerriero di Morbida": { faction: "Ceneri", glyph: "⚔️", shortName: "GUERR. MORB.", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "diag", gittata: 1, rarity: "R", isMiniature: true, desc: "Infligge 5 danni se attacca un nemico che staziona sopra un Cimitero." },

  // COLOSSI 4+M (5)
  "Verme Behemoth": { faction: "Ceneri", glyph: "🪱", shortName: "BEHEMOTH V.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho2", gittata: 1, rarity: "M", isMiniature: true, desc: "Scava nel sottosuolo: può muovere attraverso muri e Altari distruggendoli al passaggio." },
  "Abominio Putrescente": { faction: "Ceneri", glyph: "🧟‍♂️", shortName: "ABOM. PUTR.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 8, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Aura pestilenziale: tutte le unità adiacenti a inizio turno subiscono 1 danno velenoso." },
  "Banshee Madre": { faction: "Ceneri", glyph: "👑", shortName: "BANSHEE MADRE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "diag2", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 diagonale: colpisce a distanza 3 lungo diagonali libere senza contrattacco." },
  "Carro Funebre": { faction: "Ceneri", glyph: "🚜", shortName: "CARRO FUN.", cost: 4, type: "unit", slot: "HEAVY", att: 2, pv: 8, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Raccoglitore: ottieni 1 Sangue extra ogni volta che un'unità qualsiasi muore sulla plancia." },
  "Colosso di Ceneri": { faction: "Ceneri", glyph: "🗿", shortName: "COL. CENERI", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Alla morte esplode infliggendo 2 danni a tutti i nemici entro 2 passi di distanza." },

  // SORTILEGI & REAZIONI (11)
  "Infestazione di Vermi": { faction: "Ceneri", glyph: "🪱", shortName: "INFESTAZIONE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Genera 3 Cimiteri su caselle libere a scelta; ciascuno infligge 1 danno ai nemici che vi passano." },
  "Masticazione Rapida": { faction: "Ceneri", glyph: "🦷", shortName: "MASTIC. RAP.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Distruggi un tuo pezzo a costo 1 per curare 3 PV a un'altra truppa o a Morbida." },
  "Rianimazione Putrescente": { faction: "Ceneri", glyph: "💀", shortName: "RIAN. PUTR.", cost: 2, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Rimetti in gioco dal Cimitero un colosso a costo 4 con 3 PV su una casella libera adiacente." },
  "Nube di Larve": { faction: "Ceneri", glyph: "🦗", shortName: "NUBE LARVE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Acceca un'unità nemica: la sua gittata massima è ridotta a 1 per 1 round." },
  "Contagio": { faction: "Ceneri", glyph: "☣️", shortName: "CONTAGIO", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Infligge 1 danno a un bersaglio; se muore in questo turno, il danno si diffonde a catena attorno." },
  "Patto Sepolcrale": { faction: "Ceneri", glyph: "📜", shortName: "PATTO SEP.", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Pesca 2 carte dal Grimorio e genera 1 Cimitero sotto la posizione del Comandante." },
  "Scoppio di Braciere": { faction: "Ceneri", glyph: "💥", shortName: "SCOPPIO BRAC.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Fai brillare tutti i Cimiteri: ciascun Cimitero infligge 2 danni alle unità che vi sostano sopra." },
  "Marea di Larve": { faction: "Ceneri", glyph: "🐛", shortName: "MAREA LARVE", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Evoca 3 Larvoni Infetti (1/1 con Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*) adiacenti a Morbida o ad Altari." },
  "Carne Putrida": { faction: "Ceneri", glyph: "🥩", shortName: "CARNE PUTR.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Conferisce +2 PV massimi a una truppa delle Ceneri ma ne riduce l'ATT di 1." },
  "Ritorsione Putrescente": { faction: "Ceneri", glyph: "☠️", shortName: "RITORS. PUTR.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un alleato muore in mischia, trasforma la casella in Cimitero e infligge 2 danni." },
  "Muro di Cadaveri": { faction: "Ceneri", glyph: "🧱", shortName: "MURO CADAV.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: evoca istantaneamente un Muro di Ossa (3 PV) davanti a una carica nemica." },

  // =========================================================================
  // 3. MAREA ASTRALE — OCCHIO DEL VORTICE DI KAELEN
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Occhio del Vortice": { faction: "Marea", glyph: "🌀", shortName: "OCCHIO VORT.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Respinge di 1 casella qualsiasi unità nemica che entri nelle caselle adiacenti." },
  "Singolarità Stabile": { faction: "Marea", glyph: "🕳️", shortName: "SINGOLARITA S.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Drawback: a inizio turno attira di 1 passo verso di sé il pezzo alleato più vicino." },
  "Faro delle Maree": { faction: "Marea", glyph: "🗼", shortName: "FARO MAREE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Aumenta di +1 la gittata di tutte le truppe alleate con tiro a distanza diagonale." },
  "Barriera di Rifrazione": { faction: "Marea", glyph: "💎", shortName: "RIFRAZIONE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. I tiri a distanza nemici che attraversano le sue caselle adiacenti falliscono automaticamente." },
  "Condotto di Kaelen": { faction: "Marea", glyph: "🌌", shortName: "COND. KAELEN", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Kaelen può usare la sua abilità di scambio posizione anche attraverso questo Altare." },

  // FANTERIA 1M (6)
  "Sonda Devettrice": { faction: "Marea", glyph: "🛰️", shortName: "SONDA DEV.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Respinge di 1 passo qualsiasi truppa nemica che tenti di attaccarla frontalmente." },
  "Pattugliatore Stellare": { faction: "Marea", glyph: "✨", shortName: "PATTUGLIATORE", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (diagonale): si muove in diagonale e sferra attacchi fulminei al turno 1." },
  "Sonda Gravitazionale": { faction: "Marea", glyph: "🧲", shortName: "SONDA GRAV.", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 4, move: "diag", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: non infligge danno; trascina il pezzo bersaglio di 1 casella verso di sé." },
  "Scivolatore dei Vortici": { faction: "Marea", glyph: "⛸️", shortName: "SCIVOL. VORT.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Può saltare sopra una Voragine senza cadervi dentro durante il movimento diagonale." },
  "Sentinella Astrale": { faction: "Marea", glyph: "🛡️", shortName: "SENT. ASTRALE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Non può subire danni da impatto contro muri o strutture." },
  "Nave da Schermaglia": { faction: "Marea", glyph: "🛶", shortName: "NAVE SCHERM.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Ottiene +1 ATT se attacca dallo stesso asse diagonale di Kaelen." },

  // SPECIALISTI 2-3M (11)
  "Vorticista di Kaelen": { faction: "Marea", glyph: "🌀", shortName: "VORTICISTA", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Doppio passo ortogonale: spinge di 1 casella qualsiasi bersaglio che colpisce in mischia." },
  "Tessitore di Singolarità": { faction: "Marea", glyph: "🕸️", shortName: "TESS. SING.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2 diagonale: spara a distanza 2 e scambia la posizione del bersaglio con un vuoto." },
  "Tiratore Stellare": { faction: "Marea", glyph: "🏹", shortName: "TIRATORE ST.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3 diagonale: tira a lunga gittata diagonale senza subire contrattacco difensivo." },
  "Cavalleria di Comete": { faction: "Marea", glyph: "🐎", shortName: "CAV. COMETE", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra respingendo le truppe nemiche adiacenti di 1 casella." },
  "Mago Gravitazionale": { faction: "Marea", glyph: "🧙‍♂️", shortName: "MAGO GRAV.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: [1⚡] inverte la posizione di due miniature nemiche adiacenti tra loro." },
  "Corsaro dei Flussi": { faction: "Marea", glyph: "⛵", shortName: "CORSARO FL.", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Scatta di 2 passi diagonali; ottiene +1 ATT se attacca con Aggiramento (Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*)." },
  "Deviatore di Flussi": { faction: "Marea", glyph: "🪞", shortName: "DEVIATORE FL.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Riflette il primo attacco a distanza subito in ogni round verso una casella adiacente." },
  "Nocchiere del Vortice": { faction: "Marea", glyph: "🧭", shortName: "NOCCH. VORT.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Consente alle truppe amiche adiacenti di muovere spendendo 1 passo extra." },
  "Spadaccino Gravitazionale": { faction: "Marea", glyph: "⚔️", shortName: "SPADA GRAV.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "Quando colpisce in mischia trascina il difensore nella casella che ha appena lasciato." },
  "Sacerdote dell'Ossidiana Stellare": { faction: "Marea", glyph: "🔮", shortName: "SACERD. ST.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 2, rarity: "R", isMiniature: true, desc: "Gittata 2: scambia la propria posizione con quella di un Altare alleato spendendo 1 Azione." },
  "Sentinella del Vortice": { faction: "Marea", glyph: "🛡️", shortName: "SENT. VORT.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "I nemici adiacenti non possono compiere attacchi a distanza contro altri bersagli." },

  // COLOSSI 4+M (5)
  "Leviatano del Vortice": { faction: "Marea", glyph: "🐋", shortName: "LEVIAT. VORT.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "omni", gittata: 2, rarity: "M", isMiniature: true, desc: "Trascina tutti i nemici entro raggio 2 verso di sé prima di sferrare il suo attacco." },
  "Catapulta a Gravità Inversa": { faction: "Marea", glyph: "☄️", shortName: "CATAP. GRAV.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "diag", gittata: 4, rarity: "R", isMiniature: true, desc: "Gittata 4 diagonale: tira a distanza 4 scavalcando qualsiasi ostacolo sulla linea di tiro." },
  "Colosso Sfasatore": { faction: "Marea", glyph: "🗿", shortName: "COL. SFASAT.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "diag2", gittata: 1, rarity: "R", isMiniature: true, desc: "Può scambiare posizione con un'unità nemica se la porta a 0 PV in combattimento." },
  "Golia di Singolarità": { faction: "Marea", glyph: "🦾", shortName: "GOLIA SING.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Devastazione: infligge 6 danni a muri e Altari; crea una Voragine alla distruzione della struttura." },
  "Titano delle Onde Nere": { faction: "Marea", glyph: "🌊", shortName: "TITANO ONDE", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Inarrestabile: spinge indietro di 2 caselle tutti i nemici che incontra lungo il suo tragitto." },

  // SORTILEGI & REAZIONI (11)
  "Faglia Gravitazionale Rapida": { faction: "Marea", glyph: "🌀", shortName: "FAGLIA GRAV.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Inverte istantaneamente la posizione di 2 unità qualsiasi sulla plancia." },
  "Trazione Forzata": { faction: "Marea", glyph: "🧲", shortName: "TRAZIONE FORZ.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trascina un'unità nemica di 2 caselle ortogonali verso il pezzo alleato più vicino." },
  "Onda d'Urto Astrale": { faction: "Marea", glyph: "🌊", shortName: "ONDA URTO", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Respinge tutti i nemici adiacenti a Kaelen di 2 passi (+2 danni se impattano ostacoli)." },
  "Sfasamento di Kaelen": { faction: "Marea", glyph: "✨", shortName: "SFASAMENTO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Kaelen scambia posizione con una sua truppa senza spendere Azioni Tattiche." },
  "Vortice Temporale": { faction: "Marea", glyph: "⏳", shortName: "VORTICE TEMP.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Ricarica 1 Azione Tattica per questo round spendendo 3 Segnalini Sangue." },
  "Prisma di Distorsione": { faction: "Marea", glyph: "💎", shortName: "PRISMA DIST.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Tutti gli attacchi a distanza alleati ottengono +1 gittata fino alla fine del round." },
  "Bolla Sfasante": { faction: "Marea", glyph: "🫧", shortName: "BOLLA SFAS.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Rende un alleato immune ad attacchi fisici per 1 turno; non può attaccare durante l'effetto." },
  "Spinta nel Vuoto": { faction: "Marea", glyph: "🕳️", shortName: "SPINTA VUOTO", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Spinge una miniatura nemica di 2 passi: se finisce in una Voragine, viene rimossa dal gioco." },
  "Corrente di Marea": { faction: "Marea", glyph: "💨", shortName: "CORRENTE M.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove 2 pedine amiche di 1 casella diagonale gratis." },
  "Deviazione Istantanea": { faction: "Marea", glyph: "↩️", shortName: "DEVIAZIONE I.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico ti attacca a distanza, devia il colpo su un'altra unità a portata." },
  "Riflesso del Vuoto": { faction: "Marea", glyph: "🪞", shortName: "RIFLESSO V.", cost: 0, bloodCost: 5, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione: scambia di posto Kaelen con l'attaccante prima che il danno venga calcolato." },

  // =========================================================================
  // 4. SILENZIO D'ORO — SIGILLI DI JUSTICIAR KAEL
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Sigillo della Legge": { faction: "Silenzio", glyph: "📜", shortName: "SIG. LEGGE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Se l'avversario guadagna 3+ Sangue in un turno, subisce 2 danni immediati." },
  "Cella di Giudizio": { faction: "Silenzio", glyph: "⛓️", shortName: "CELLA GIUD.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Le truppe nemiche adiacenti non possono usare abilità [1⚡] o Riti." },
  "Tassa di Pietra": { faction: "Silenzio", glyph: "🪙", shortName: "TASSA PIETRA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Drawback: all'inizio del turno devi possedere almeno 1 Sangue o subisci 1 danno." },
  "Colonna dell'Inquisizione": { faction: "Silenzio", glyph: "🏛️", shortName: "COL. INQUIS.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Rimuove permanentemente la parola chiave Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* a tutti i nemici che entrano." },
  "Cattedrale Sbarrata": { faction: "Silenzio", glyph: "🚪", shortName: "CATTEDRALE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Non può essere bersagliata da magie o tiri a distanza nemici." },

  // FANTERIA 1M (6)
  "Censore della Legge": { faction: "Silenzio", glyph: "🔕", shortName: "CENS. LEGGE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "I nemici adiacenti non possono usare sortilegi istantanei di Reazione." },
  "Chierico di Giustizia": { faction: "Silenzio", glyph: "⚖️", shortName: "CHIER. GIUST.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Cura 1 PV al Comandante ogni volta che un'unità nemica muore senza generare Sangue." },
  "Guardia Inquisitoria": { faction: "Silenzio", glyph: "🛡️", shortName: "G. INQUISIT.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura fissa -1 contro attacchi provenienti da unità con costo 3 o superiore." },
  "Balestriere Inquisitore": { faction: "Silenzio", glyph: "🏹", shortName: "BAL. INQUIS.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale: infligge +1 danno se il bersaglio possiede abilità attive [1⚡]." },
  "Novizio del Voto": { faction: "Silenzio", glyph: "📜", shortName: "NOV. VOTO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Contrattacca sempre a 2 ATT; muove esclusivamente lungo le diagonali libere." },
  "Sentinella Dogmatica": { faction: "Silenzio", glyph: "🏰", shortName: "SENT. DOGMA", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: i nemici adiacenti non possono compiere mosse a doppio passo o balzi a L." },

  // SPECIALISTI 2-3M (11)
  "Justiciar Minore": { faction: "Silenzio", glyph: "📜", shortName: "JUSTICIAR M.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Ogni volta che contrattacca in mischia, annulla le passive del bersaglio fino a fine turno." },
  "Arbitro di Legge": { faction: "Silenzio", glyph: "⚖️", shortName: "ARBITRO L.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Se ferito fa pagare 1 Mana extra all'avversario sul suo prossimo schieramento di truppe." },
  "Inquisitore d'Ossidiana": { faction: "Silenzio", glyph: "⚔️", shortName: "INQ. OSSID.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra infliggendo 1 danno a tutti i nemici che possiedono Sangue non speso." },
  "Cavaliere del Dogma": { faction: "Silenzio", glyph: "🐎", shortName: "CAV. DOGMA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: immune a spinte e trascinamenti; blocca i Riti dei nemici adiacenti." },
  "Monaco Tassatore": { faction: "Silenzio", glyph: "💰", shortName: "MONACO TASS.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "All'inizio del turno avversario sottrae 1 Sangue dalla riserva del nemico." },
  "Balestriere Giudicante": { faction: "Silenzio", glyph: "🏹", shortName: "BAL. GIUD.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3: tiro d'inquisizione. Se colpisce un'unità con Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*, la elimina sul colpo." },
  "Custode della Sentenza": { faction: "Silenzio", glyph: "🔨", shortName: "CUST. SENT.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Doppio passo ortogonale: infligge 4 danni a pezzi nemici che hanno già agito nel round." },
  "Cerusico dell'Inquisizione": { faction: "Silenzio", glyph: "🩹", shortName: "CERUSICO INQ.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: cura 3 PV al Comandante spendendo 1 Sangue rubato all'avversario." },
  "Paladino Giurato": { faction: "Silenzio", glyph: "🛡️", shortName: "PALADINO G.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Armatura fissa -1; riflette 1 danno da mischia verso l'attaccante se colpito." },
  "Dogmatico d'Acciaio": { faction: "Silenzio", glyph: "📖", shortName: "DOGMA ACC.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Le unità nemiche adiacenti non possono ricevere aumenti di ATT o armature temporanee." },
  "Esecutore Minore": { faction: "Silenzio", glyph: "🪓", shortName: "ESECUT. MIN.", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "diag", gittata: 1, rarity: "R", isMiniature: true, desc: "Passo Diagonale: infligge 5 danni contro pezzi nemici che non hanno compagni adiacenti." },

  // COLOSSI 4+M (5)
  "Giudice Supremo": { faction: "Silenzio", glyph: "⚖️", shortName: "GIUDICE SUPR.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 9, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Sentenza di morte: [1 Azione + 3 Sangue] distrugge all'istante un'unità non-Comandante a vista." },
  "Colosso Dogmatico": { faction: "Silenzio", glyph: "🗿", shortName: "COL. DOGMAT.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Aura di silenzio: l'avversario non può giocare sortilegi fintanto che è entro 3 caselle dal Colosso." },
  "Esecutore d'Ossidiana": { faction: "Silenzio", glyph: "⚔️", shortName: "ESEC. OSSID.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "knight", gittata: 1, rarity: "R", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: salta ostacoli; i suoi attacchi trapassano qualsiasi tipo di barriera o armatura." },
  "Cavaliere del Giudizio": { faction: "Silenzio", glyph: "🐎", shortName: "CAV. GIUDIZIO", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra infliggendo 2 danni al pezzo nemico con più PV entro 2 passi." },
  "Avatar della Legge": { faction: "Silenzio", glyph: "👼", shortName: "AVATAR LEGGE", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Ogni volta che l'avversario sferra un attacco, deve pagare 1 Mana o subire 2 danni diretti." },

  // SORTILEGI & REAZIONI (11)
  "Sigillo di Kael": { faction: "Silenzio", glyph: "📜", shortName: "SIGILLO KAEL", cost: 1, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Blocca completamente i Riti d'Armi e le abilità speciali del Comandante nemico per 1 round." },
  "Confisca Totale": { faction: "Silenzio", glyph: "💰", shortName: "CONF. TOTALE", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Azzera la riserva di Sangue dell'avversario; cura il tuo Comandante di 2 PV per ogni Sangue tolto." },
  "Quarantena di Faglia": { faction: "Silenzio", glyph: "🚫", shortName: "QUARANT. FAGLIA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Sigilla una casella per il resto del match: non può essere attraversata né occupata." },
  "Decreto d'Interdizione": { faction: "Silenzio", glyph: "📑", shortName: "DECR. INTERD.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "L'avversario non può schierare più di 1 carta dalla mano nel suo turno successivo." },
  "Tassa sulle Armi": { faction: "Silenzio", glyph: "🪙", shortName: "TASSA ARMI", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Il prossimo attacco dichiarato dall'avversario costa 1 Mana addizionale." },
  "Verdetto Immediato": { faction: "Silenzio", glyph: "⚡", shortName: "VERDETTO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Infligge 3 danni diretti a una truppa nemica che ha già compiuto un'azione in questo turno." },
  "Voto di Silenzio": { faction: "Silenzio", glyph: "🤐", shortName: "VOTO SILENZIO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Nessun giocatore può lanciare sortilegi non-Reazione fino all'inizio del prossimo round." },
  "Manto di Marmo": { faction: "Silenzio", glyph: "🏛️", shortName: "MANTO MARMO", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Conferisce Scudo Totale a un Altare alleato: previene la prossima fonte di danno su di esso." },
  "Castigo della Legge": { faction: "Silenzio", glyph: "🔨", shortName: "CASTIGO LEGGE", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Infligge 4 danni a un'unità nemica; se muore, l'avversario non guadagna Segnalini Sangue." },
  "Veto Inappellabile": { faction: "Silenzio", glyph: "🛑", shortName: "VETO INAPP.", cost: 0, bloodCost: 5, type: "reaction", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Reazione: annulla e scarta un sortilegio nemico; infligge 2 danni al Comandante nemico." },
  "Giudizio Riflesso": { faction: "Silenzio", glyph: "🪞", shortName: "GIUD. RIFL.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un alleato subisce danno letale, infligge lo stesso danno all'attaccante." },

  // =========================================================================
  // 5. FORGIA CIECA — FUSIONE PERENNE DI IGNIS
  // =========================================================================
  // ALTARI & STRUTTURE (5)
  "Fornace di Magma Vivo": { faction: "Forgia", glyph: "🌋", shortName: "MAGMA VIVO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. Quando cade un Altare alleato, Ignis ottiene +1 ATT fisso e la Fornace eroga +1 Mana extra." },
  "Calderone di Scorie Fuso": { faction: "Forgia", glyph: "🫕", shortName: "CALDERONE S.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Se distrutto, trasforma tutte le 4 caselle ortogonali in lava dannosa (1 danno a chi passa)." },
  "Incudine di Faglia": { faction: "Forgia", glyph: "🔨", shortName: "INCUD. FAGLIA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Gli automi alleati possono essere schierati direttamente adiacenti a questa Incudine." },
  "Muro di Scorie Incandescenti": { faction: "Forgia", glyph: "🧱", shortName: "MURO SCORIE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Infligge 1 danno a qualsiasi unità nemica che tenti di attaccarlo o oltrepassarlo." },
  "Sfiato a Vapore": { faction: "Forgia", glyph: "💨", shortName: "SFIATO VAPORE", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Respinge indietro di 1 passo qualsiasi nemico che sferri un attacco in mischia adiacente." },

  // FANTERIA 1M (6)
  "Rottame Esplosivo": { faction: "Forgia", glyph: "💣", shortName: "ROTT. ESPL.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Detonazione metallica: alla morte infligge 2 danni a una struttura o Altare adiacente." },
  "Scoria Vivente": { faction: "Forgia", glyph: "🪨", shortName: "SCORIA VIV.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Può fondersi con un altro automa adiacente donandogli +1 ATT / +2 PV permanentemente." },
  "Ragno da Fucina": { faction: "Forgia", glyph: "🕷️", shortName: "RAGNO FUC.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "omni", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: muove ovunque di 1 passo e attacca subito; ripara 1 PV a un Altare se lo tocca." },
  "Puntone d'Ossidiana": { faction: "Forgia", glyph: "🔩", shortName: "PUNT. OSSID.", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: blocca linee; se distrutto lascia un Blocco solido da 3 PV." },
  "Automa Minatore": { faction: "Forgia", glyph: "⛏️", shortName: "AUTOMA MIN.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: distrugge una Voragine trasformandola in terreno normale calpestabile." },
  "Costrutto Bruciante": { faction: "Forgia", glyph: "🔥", shortName: "COSTR. BRUC.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 1 danno da bruciatura all'attaccante ogni volta che riceve un attacco in mischia." },

  // SPECIALISTI 2-3M (11)
  "Martellatore di Ignis": { faction: "Forgia", glyph: "🔨", shortName: "MART. IGNIS", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Fucina d'impatto: infligge 5 danni ad Altari e muri; spinge indietro i pezzi nemici." },
  "Colatore di Magma": { faction: "Forgia", glyph: "🌋", shortName: "COL. MAGMA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: spara magma fluido a distanza 2; lascia una Voragine di lava sulla casella." },
  "Balestriere a Fornace": { faction: "Forgia", glyph: "🏹", shortName: "BAL. FORNACE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: i suoi dardi infuocati ignorano coperture fornite da muri o strutture." },
  "Centauro di Ghisa": { faction: "Forgia", glyph: "🐎", shortName: "CENT. GHISA", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra spargendo schegge di ghisa (1 danno a tutti i nemici adiacenti)." },
  "Automa Demolitore": { faction: "Forgia", glyph: "🦾", shortName: "AUTOMA DEM.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Se distrugge una struttura nemica, il controllore incassa immediatamente +2 Mana." },
  "Fonditore d'Ossidiana": { faction: "Forgia", glyph: "⚒️", shortName: "FOND. OSSID.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "[1⚡]: distrugge un Altare alleato per conferire permanentemente +2 ATT a tutti gli automi." },
  "Automa a Vapore Pesante": { faction: "Forgia", glyph: "💨", shortName: "AUT. VAPORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Doppio passo ortogonale: rilascia fumo denso (non bersagliabile da tiri a distanza)." },
  "Saldatore da Battaglia": { faction: "Forgia", glyph: "🧯", shortName: "SALD. BATT.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "[1⚡]: ripristina 3 PV a una macchina d'assedio o a un Altare alleato." },
  "Scavatore a Trivella": { faction: "Forgia", glyph: "🪛", shortName: "TRIVELLA", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho2", gittata: 1, slancio: true, rarity: "U", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: scatta di 2 passi ortogonali; ignora completamente le armature del bersaglio." },
  "Costrutto Corazzato di Ghisa": { faction: "Forgia", glyph: "🛡️", shortName: "COSTR. GHISA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 6, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura pesante fissa: subisce sempre -1 danno da ogni attacco fisico." },
  "Guardiano della Fucina": { faction: "Forgia", glyph: "🏰", shortName: "GUARD. FUCINA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Mentre difende un Altare adiacente, contrattacca con 4 ATT effettivi." },

  // COLOSSI 4+M (5)
  "Fornace Vivente di Ignis": { faction: "Forgia", glyph: "🏭", shortName: "FORNACE VIV.", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Conta sia come Colosso che come Altare (+1 Mana). A fine turno infligge 1 danno ad area attorno a sé." },
  "Colosso d'Ossidiana Fusa": { faction: "Forgia", glyph: "🗿", shortName: "COL. OSSID.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 8, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Devastazione: il danno letale in eccesso trapassa il bersaglio colpendo la casella dietro." },
  "Cannone Cataclismatico": { faction: "Forgia", glyph: "💣", shortName: "CANNONE CAT.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "ortho", gittata: 4, rarity: "R", isMiniature: true, desc: "Gittata 4 ortogonale: tiro d'assedio devastante; distrugge qualsiasi Altare colpito in 1 colpo." },
  "Golia di Ghisa": { faction: "Forgia", glyph: "🦾", shortName: "GOLIA GHISA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Immune a veleni, spinte e trascinamenti. Spinge indietro i pezzi nemici che carica." },
  "Titano delle Fornaci": { faction: "Forgia", glyph: "🌋", shortName: "TITANO FORN.", cost: 5, type: "unit", slot: "HEAVY", att: 5, pv: 10, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Può distruggere un Altare alleato per compiere un attacco aggiuntivo a costo 0 Azioni." },

  // SORTILEGI & REAZIONI (11)
  "Eruzione di Scorie Rapida": { faction: "Forgia", glyph: "🌋", shortName: "ERUZIONE S.", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Distrugge un proprio Altare infliggendo 4 danni a tutti i nemici entro 2 caselle." },
  "Fusione di Emergenza": { faction: "Forgia", glyph: "💥", shortName: "FUSIONE EM.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Sacrifica un blocco o rottame per pescare 2 carte e infliggere 2 danni alle caselle adiacenti." },
  "Tempra d'Ossidiana": { faction: "Forgia", glyph: "🛡️", shortName: "TEMPRA OSS.", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Conferisce +2 armatura temporanea a un automa alleato per questo round." },
  "Sovraccarico di Vapore": { faction: "Forgia", glyph: "💨", shortName: "SOVRACC. VAP.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Un automa alleato muove di 2 passi extra ortogonali e spinge il primo ostacolo toccato." },
  "Riciclo Istantaneo": { faction: "Forgia", glyph: "♻️", shortName: "RICICLO IST.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Rimuovi un automa distrutto per incassare immediatamente +2 Mana spendibili subito." },
  "Ignizione di Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIZIONE I.", cost: 2, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "R", isMiniature: false, desc: "Anima permanentemente un Altare in un costrutto semovente 4/5 che attacca subito." },
  "Colata di Magma": { faction: "Forgia", glyph: "🫗", shortName: "COLATA MAGMA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Inonda una riga della scacchiera di lava: chiunque vi transiti subisce 2 danni immediati." },
  "Martellata Sismica": { faction: "Forgia", glyph: "🔨", shortName: "MARTELLATA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Infligge 3 danni diretti a una struttura o a un'unità che staziona su un muro." },
  "Fucina da Campo": { faction: "Forgia", glyph: "🏭", shortName: "FUCINA CAMPO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Schiera immediatamente un blocco di scorie solido (4 PV) su una casella libera." },
  "Raffreddamento d'Urgenza": { faction: "Forgia", glyph: "🧊", shortName: "RAFFREDD. U.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un automa subisce danno letale, sopravvive con 1 PV diventando solido." },
  "Scoppio di Caldaia": { faction: "Forgia", glyph: "💣", shortName: "SCOPPIO CALD.", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: alla distruzione di un automa, infligge 3 danni ad area a tutti i pezzi attorno." },

  // =========================================================================
  // 6. POOL NEUTRALE — FRATTURA D'OSSIDIANA
  // =========================================================================
  // ALTARI & STRUTTURE (10)
  "Monolito della Frattura": { faction: "Neutral", glyph: "🌋", shortName: "MONO. FRATT.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 5, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Fragile (5 PV): se distrutto, collassa generando una Voragine permanente." },
  "Altare dell'Ossidiana Nera": { faction: "Neutral", glyph: "🖤", shortName: "ALT. OSSID.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 8, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+1 Mana. 8 PV. Riflette 1 danno da mischia a chiunque lo attacchi direttamente." },
  "Faro di Guerra": { faction: "Neutral", glyph: "🗼", shortName: "FARO GUERRA", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Gli alleati adiacenti infliggono +1 danno quando attaccano bersagli a distanza." },
  "Trincea Scavata": { faction: "Neutral", glyph: "🕳️", shortName: "TRINCEA SCAV.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Le truppe che sostano su questa struttura sono immuni a spinte e cariche." },
  "Altare del Salasso": { faction: "Neutral", glyph: "🩸", shortName: "ALT. SALASSO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 2, pv: 6, att: 0, move: "none", gittata: 0, rarity: "R", isMiniature: false, desc: "+2 Mana! Pedaggio: all'inizio del turno perdi 1 Sangue (se ne hai zero subisci 1 danno)." },
  "Muro di Detriti Pesanti": { faction: "Neutral", glyph: "🧱", shortName: "MURO PES.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Blocco solido impassabile; blocca completamente qualsiasi linea di tiro." },
  "Pulpito delle Braci": { faction: "Neutral", glyph: "🔥", shortName: "PULPITO BRACI", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Chi distrugge questo Altare subisce 2 danni immediati da ustione." },
  "Monolito dell'Avamposto": { faction: "Neutral", glyph: "🏰", shortName: "AVAMPOSTO", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 7, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Consente di schierare miniature amiche a costo 1 direttamente adiacenti ad esso." },
  "Altare dei Sacrifici": { faction: "Neutral", glyph: "☠️", shortName: "ALT. SACRIFICI", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 6, att: 0, move: "none", gittata: 0, rarity: "U", isMiniature: false, desc: "+1 Mana. Rilascia 3 Segnalini Sangue anziché zero se viene distrutto da un proprio sortilegio." },
  "Santuario Sfondato": { faction: "Neutral", glyph: "🏚️", shortName: "SANTUARIO SF.", cost: 0, type: "altar", slot: "ALTAR", manaGen: 1, pv: 5, att: 0, move: "none", gittata: 0, rarity: "C", isMiniature: false, desc: "+1 Mana. Fa pescare 1 carta al primo giocatore che muove una truppa adiacente ad esso." },

  // FANTERIA 1M (20)
  "Mercenario d'Ossidiana": { faction: "Neutral", glyph: "🗡️", shortName: "MERC. OSSID.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Taglio netto: 2 ATT ma non può contrattaccare se attaccato in mischia." },
  "Sentinella della Frattura": { faction: "Neutral", glyph: "🛡️", shortName: "SENT. FRATT.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a Voragini; non può essere trascinata o deviata da magie nemiche." },
  "Segugio di Faglia": { faction: "Neutral", glyph: "🐺", shortName: "SEG. FAGLIA", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: scatta fino a 2 caselle ortogonali e colpisce subito al turno 1." },
  "Arciere di Ventura": { faction: "Neutral", glyph: "🏹", shortName: "ARC. VENTURA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 ortogonale: tiro leggero a distanza lungo corridoi liberi." },
  "Recluta con Picca Corta": { faction: "Neutral", glyph: "🔱", shortName: "PICCA CORTA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: attacca a 2 caselle in linea retta senza subire contrattacco." },
  "Scudiero della Barricata": { faction: "Neutral", glyph: "🚪", shortName: "SCUD. BARR.", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: blocca linee; contrattacca con 2 ATT se caricato frontalmente." },
  "Geniere Minatore": { faction: "Neutral", glyph: "⛏️", shortName: "GEN. MINATORE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 3 danni ad Altari e barriere solide." },
  "Ladro della Voragine": { faction: "Neutral", glyph: "🗝️", shortName: "LADRO VORAG.", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "diag", gittata: 1, rarity: "C", isMiniature: true, desc: "Passo Diagonale: muove solo lungo le diagonali libere; scavalca le Voragini." },
  "Schermagliatore a Piedi": { faction: "Neutral", glyph: "🪓", shortName: "SCHERM. PIEDI", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 2, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Muove in qualsiasi direzione (ortogonale o diagonale) di 1 passo." },
  "Cacciatore di Teste": { faction: "Neutral", glyph: "🏹", shortName: "CACC. TESTE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "diag", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2 diagonale: tiro angolare senza contrattacco difensivo." },
  "Tagliaborse": { faction: "Neutral", glyph: "🔪", shortName: "TAGLIABORSE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Ruba 1 Sangue al giocatore nemico se lo colpisce in mischia." },
  "Fante Spadaccino": { faction: "Neutral", glyph: "⚔️", shortName: "FANTE SPADA", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Unità standard da prima linea con buon bilanciamento attacco/difesa." },
  "Esploratore delle Rovine": { faction: "Neutral", glyph: "🧭", shortName: "ESPL. ROVINE", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Riconoscimento: rivela la prima carta del mazzo alleato a inizio turno." },
  "Veterano delle Paludi": { faction: "Neutral", glyph: "🌾", shortName: "VET. PALUDI", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Subisce -1 danno se posizionato su una casella d'acqua o palude." },
  "Bravaccio da Taverna": { faction: "Neutral", glyph: "🥊", shortName: "BRAVACCIO", cost: 1, type: "unit", slot: "EARLY", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Combattente da rissa economico e aggressivo nelle prime schermaglie." },
  "Guerriero con Scudo Tondo": { faction: "Neutral", glyph: "🛡️", shortName: "SCUDO TONDO", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Contrattacca sempre per primo se attaccato da un'altra truppa a costo 1." },
  "Balestriere Cieco da Fossa": { faction: "Neutral", glyph: "🎯", shortName: "BAL. FOSSA", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 2, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: non contrattacca mai se attaccato in mischia." },
  "Carrettiere Solitario": { faction: "Neutral", glyph: "🛒", shortName: "CARRETT. SOL.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Muove di 2 passi ortogonali; può trasportare una truppa amica adiacente." },
  "Monaco Errante": { faction: "Neutral", glyph: "📿", shortName: "MONACO ERR.", cost: 1, type: "unit", slot: "EARLY", att: 1, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Quando muore cura 2 PV a un alleato adiacente." },
  "Puntone di Faglia": { faction: "Neutral", glyph: "🔩", shortName: "PUNT. FAGLIA", cost: 1, type: "unit", slot: "EARLY", att: 0, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*: non può muoversi dopo essere stato schierato." },

  // SPECIALISTI 2-3M (35)
  "Veterano d'Ossidiana": { faction: "Neutral", glyph: "⚔️", shortName: "VET. OSSID.", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "omni", gittata: 1, rarity: "U", isMiniature: true, desc: "+1 ATT addizionale se contrattacca contro unità dotate di armatura." },
  "Balestriere d'Assedio": { faction: "Neutral", glyph: "🏹", shortName: "BAL. ASSEDIO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3 ortogonale: infligge 4 danni se colpisce Altari o strutture." },
  "Cavaliere d'Ossidiana": { faction: "Neutral", glyph: "🐎", shortName: "CAV. OSSID.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "knight", gittata: 1, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: atterra spingendo indietro il difensore di 1 casella (+2 danni urto)." },
  "Picchiere Pesante": { faction: "Neutral", glyph: "🔱", shortName: "PICCA PES.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* (Gittata 2): infligge +1 danno contro nemici a cavallo o con Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*." },
  "Duellante d'Ossidiana": { faction: "Neutral", glyph: "🤺", shortName: "DUELL. OSSID.", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "Scatta di 2 passi diagonali; infligge 5 danni se attacca un nemico isolato." },
  "Lottatore da Trincea": { faction: "Neutral", glyph: "🥊", shortName: "LOTT. TRINC.", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Spinge indietro di 1 casella qualsiasi pezzo colpito in mischia." },
  "Balestriere a Cavallo Scelto": { faction: "Neutral", glyph: "🏇", shortName: "BAL. CAV. SC.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* e Gittata 2 ortogonale senza subire contrattacco difensivo." },
  "Monaco Eremita": { faction: "Neutral", glyph: "📿", shortName: "EREMITA", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Elemosina: fa pescare 2 carte al controllore se viene distrutto da un colosso." },
  "Custode della Voragine": { faction: "Neutral", glyph: "🗿", shortName: "CUST. VORAG.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Ancorato: le unità nemiche non possono spingerlo dentro Voragini." },
  "Arciere Composito": { faction: "Neutral", glyph: "🏹", shortName: "ARC. COMP.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 3, rarity: "C", isMiniature: true, desc: "Gittata 3 ortogonale lungo corridoi liberi; ignora le armature nemiche." },
  "Spadaccino con Scudo": { faction: "Neutral", glyph: "🛡️", shortName: "SPADA SCUDO", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Armatura fissa: riduce di -1 ogni danno subito da attacchi frontali." },
  "Cacciatore di Mostri": { faction: "Neutral", glyph: "🦁", shortName: "CACC. MOSTRI", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Ottiene +2 ATT extra se attacca colossi con costo 4 o superiore." },
  "Geniere da Demolizione": { faction: "Neutral", glyph: "🧨", shortName: "GEN. DEMOLIZ.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Infligge 5 danni contro qualsiasi struttura solida nemica." },
  "Assassino d'Ombra": { faction: "Neutral", glyph: "🗡️", shortName: "ASS. OMBRA", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "diag2", gittata: 1, slancio: true, rarity: "R", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* (diagonale): salta fino a 2 passi diagonali e attacca senza contrattacco." },
  "Medico da Campo Esperto": { faction: "Neutral", glyph: "💉", shortName: "MEDICO ESP.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "[1⚡]: cura 3 PV al Comandante o a un alleato adiacente." },
  "Ufficiale Veterano": { faction: "Neutral", glyph: "🎖️", shortName: "UFF. VET.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Tutte le truppe a costo 1 entro 2 passi ottengono +1 ATT e +1 movimento." },
  "Schermagliatore a Cavallo": { faction: "Neutral", glyph: "🏇", shortName: "SCHERM. CAV.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, rarity: "C", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: può ritirarsi di 1 casella dopo aver sferrato il suo attacco." },
  "Lanciere da Trincea": { faction: "Neutral", glyph: "🔱", shortName: "LANC. TRINC.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: impedisce alle truppe nemiche di compiere movimenti a doppio passo attorno a sé." },
  "Guerriero con Mazza Chiodata": { faction: "Neutral", glyph: "🔨", shortName: "MAZZA CHIOD.", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "I suoi colpi spaccano le armature nemiche rimuovendole permanentemente." },
  "Fanatico delle Rovine": { faction: "Neutral", glyph: "🔥", shortName: "FANATICO R.", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho2", gittata: 1, slancio: true, rarity: "C", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*: scatta di 2 caselle ortogonali per sferrare un attacco suicida." },
  "Balestriere Pesante Scelto": { faction: "Neutral", glyph: "🏹", shortName: "BALESTR. PES.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 ortogonale libera: 3 danni senza contrattacco." },
  "Guardia Giurata Reale": { faction: "Neutral", glyph: "🛡️", shortName: "G. REALE", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 6, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Assorbe i danni inflitti al Comandante se staziona entro 1 casella da lui." },
  "Cavaliere del Falco": { faction: "Neutral", glyph: "🦅", shortName: "CAV. FALCO", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "knight", gittata: 1, slancio: true, rarity: "U", isMiniature: true, desc: "Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*: muove come un cavallo e attacca subito nel turno di spawn." },
  "Duellante con Daga": { faction: "Neutral", glyph: "🗡️", shortName: "DAGA", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Contrattacca sempre per primo quando viene attaccato in mischia." },
  "Tiratore Scelto da Breccia": { faction: "Neutral", glyph: "🎯", shortName: "TIRAT. BRECCIA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3: i suoi tiri attraversano muri e strutture senza perdere potenza." },
  "Mercenario Senza Terra": { faction: "Neutral", glyph: "🪙", shortName: "SENZA TERRA", cost: 2, type: "unit", slot: "TACTIC", att: 3, pv: 3, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "+1 ATT se combatte nella metà campo avversaria." },
  "Scudiero delle Cripte": { faction: "Neutral", glyph: "🛡️", shortName: "SCUD. CRIPTE", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 5, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Immune a veleni e danni riflessi; protegge le strutture adiacenti." },
  "Pattinatore di Cenere": { faction: "Neutral", glyph: "⛸️", shortName: "PATTINATORE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "diag2", gittata: 1, rarity: "C", isMiniature: true, desc: "Muove di 2 passi diagonali gratis se transita su caselle occupate da macerie." },
  "Guerriero con Spadone": { faction: "Neutral", glyph: "⚔️", shortName: "SPADONE", cost: 3, type: "unit", slot: "TACTIC", att: 4, pv: 4, move: "ortho", gittata: 1, rarity: "U", isMiniature: true, desc: "Spazza: quando attacca in mischia danneggia anche le 2 caselle ai fianchi del bersaglio." },
  "Balestriere a Rotella": { faction: "Neutral", glyph: "🏹", shortName: "BAL. ROTELLA", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "ortho", gittata: 2, rarity: "C", isMiniature: true, desc: "Gittata 2: spara a distanza 2 e può muovere di 1 passo dopo aver attaccato." },
  "Picchiere a Cavallo": { faction: "Neutral", glyph: "🏇", shortName: "PICCA CAV.", cost: 3, type: "unit", slot: "TACTIC", att: 2, pv: 5, move: "knight", gittata: 2, rarity: "U", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* & Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*: salta ostacoli e colpisce a distanza 2 ortogonale." },
  "Veterano delle Tombe": { faction: "Neutral", glyph: "💀", shortName: "VET. TOMBE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 4, move: "omni", gittata: 1, rarity: "C", isMiniature: true, desc: "Guadagna +1 ATT ogni volta che un'altra truppa muore nel round." },
  "Cacciatore delle Fosse": { faction: "Neutral", glyph: "🪤", shortName: "CACC. FOSSE", cost: 2, type: "unit", slot: "TACTIC", att: 2, pv: 3, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: immobilizza per 1 round il bersaglio colpito." },
  "Duellante Sfregiato": { faction: "Neutral", glyph: "🤺", shortName: "DUELL. SFREG.", cost: 3, type: "unit", slot: "TACTIC", att: 3, pv: 4, move: "diag2", gittata: 1, rarity: "U", isMiniature: true, desc: "Contrattacca con 4 ATT se la sua salute è ridotta a metà." },
  "Alchimista da Trincea": { faction: "Neutral", glyph: "🧪", shortName: "ALCH. TRINC.", cost: 2, type: "unit", slot: "TACTIC", att: 1, pv: 4, move: "ortho", gittata: 2, rarity: "U", isMiniature: true, desc: "Gittata 2: scaglia fuoco liquido creando terreno dannoso sulla casella colpita." },

  // COLOSSI 4+M (15)
  "Golia d'Ossidiana": { faction: "Neutral", glyph: "🦾", shortName: "GOLIA OSSID.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Frantumatore: 8 danni contro strutture. Respinge indietro qualsiasi pezzo nemico." },
  "Titano di Faglia": { faction: "Neutral", glyph: "🏔️", shortName: "TITANO FAGLIA", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 10, move: "ortho", gittata: 1, rarity: "M", isMiniature: true, desc: "Inamovibile *(immune a spinte, urti e Voragini)*: immune a spinte; calpesta e cancella Voragini trasformandole in solido." },
  "Cavaliere del Dragone": { faction: "Neutral", glyph: "🐉", shortName: "CAV. DRAGONE", cost: 5, type: "unit", slot: "HEAVY", att: 4, pv: 9, move: "knight", gittata: 2, rarity: "R", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* e soffio a distanza 2 ortogonale senza subire contrattacco." },
  "Balista da Assedio a Doppia Corsa": { faction: "Neutral", glyph: "🎯", shortName: "BALISTA ASSED.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "ortho", gittata: 3, rarity: "R", isMiniature: true, desc: "Gittata 3 ortogonale: infligge 6 danni ad Altari e muri." },
  "Veterano Inviolabile": { faction: "Neutral", glyph: "🎖️", shortName: "INVIOLABILE", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Armatura pesante fissa: riduce di -1 tutti i danni subiti da ogni fonte." },
  "Juggernaut d'Assalto": { faction: "Neutral", glyph: "🚜", shortName: "JUGGER. ASS.", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "R", isMiniature: true, desc: "Travolgere *(spinge indietro il difensore e occupa la sua casella)*: spinge indietro il difensore e occupa istantaneamente la sua casella." },
  "Colosso Monolitico": { faction: "Neutral", glyph: "🗿", shortName: "COL. MONOLIT.", cost: 5, type: "unit", slot: "HEAVY", att: 3, pv: 11, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Conta anche come Altare (+1 Mana/turno); non può essere mosso contro la sua volontà." },
  "Behemoth di Roccia": { faction: "Neutral", glyph: "🦣", shortName: "BEHEMOTH R.", cost: 5, type: "unit", slot: "HEAVY", att: 5, pv: 9, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Quando attacca danneggia anche le caselle adiacenti al bersaglio principale." },
  "Catapulta da Faglia": { faction: "Neutral", glyph: "🪵", shortName: "CATAP. FAGLIA", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 6, move: "ortho", gittata: 3, rarity: "U", isMiniature: true, desc: "Gittata 3: se colpisce un Altare, distrugge anche un muro adiacente." },
  "Ogre delle Caverne": { faction: "Neutral", glyph: "👹", shortName: "OGRE CAVERNE", cost: 4, type: "unit", slot: "HEAVY", att: 5, pv: 7, move: "ortho", gittata: 1, rarity: "C", isMiniature: true, desc: "Forza devastante: 5 ATT fisici; subisce +1 danno da attacchi a distanza." },
  "Rinoceronte Corazzato": { faction: "Neutral", glyph: "🦏", shortName: "RINOC. CORAZ.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 8, move: "ortho2", gittata: 1, rarity: "U", isMiniature: true, desc: "Carica pesante: infligge +2 danni se muove di 2 passi prima di attaccare." },
  "Manticora d'Ossidiana": { faction: "Neutral", glyph: "🦁", shortName: "MANTICORA O.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "knight", gittata: 2, rarity: "R", isMiniature: true, desc: "Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* e Gittata 2: tira aculei velenosi che ignorano riduzioni di armatura." },
  "Condottiero Supremo": { faction: "Neutral", glyph: "👑", shortName: "CONDOTTIERO S.", cost: 4, type: "unit", slot: "HEAVY", att: 3, pv: 7, move: "omni", gittata: 1, rarity: "R", isMiniature: true, desc: "Tutti gli alleati entro 2 passi ottengono +1 ATT e +1 danno durante il contrattacco." },
  "Mastodonte delle Trincee": { faction: "Neutral", glyph: "🦣", shortName: "MAST. TRINCEE", cost: 5, type: "unit", slot: "HEAVY", att: 3, pv: 12, move: "ortho", gittata: 1, rarity: "R", isMiniature: true, desc: "Armatura titanica: subisce sempre -1 danno fisico da ogni fonte." },
  "Colosso delle Rovine": { faction: "Neutral", glyph: "🗿", shortName: "COL. ROVINE", cost: 4, type: "unit", slot: "HEAVY", att: 4, pv: 7, move: "ortho2", gittata: 1, rarity: "C", isMiniature: true, desc: "Spazza via: spinge di 2 caselle all'indietro qualsiasi unità che colpisce in mischia." },

  // SORTILEGI & REAZIONI (20)
  "Frantumare la Pietra": { faction: "Neutral", glyph: "🔨", shortName: "FRANTUMA", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Distrugge istantaneamente 1 Altare o Muro nemico entro 4 caselle dal Comandante." },
  "Marcia Forzata": { faction: "Neutral", glyph: "⚡", shortName: "MARCIA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove 1 truppa alleata di 1 casella ortogonale extra a costo 0 Azioni Tattiche." },
  "Carica Sfondante": { faction: "Neutral", glyph: "🦏", shortName: "CARICA SF.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Muove un'unità di 1 passo extra e le conferisce +1 ATT sul prossimo attacco." },
  "Salasso Crudele": { faction: "Neutral", glyph: "🩸", shortName: "SALASSO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "3 danni diretti a un'unità ferita o a costo <= 2 entro 3 caselle." },
  "Barricata Improvvisata": { faction: "Neutral", glyph: "🧱", shortName: "BARRICATA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Evoca un Muro di Detriti solido (0 ATT / 3 PV) su una casella libera entro 3 passi." },
  "Sguardo del Monolito": { faction: "Neutral", glyph: "👁️", shortName: "SGUARDO", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Blocca completamente movimento e attacchi di un nemico fino al prossimo turno." },
  "Pozza di Sangue": { faction: "Neutral", glyph: "🩸", shortName: "POZZA SANGUE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Incanta una casella: chiunque vi transiti conferisce 2 Sangue al controllore." },
  "Genio del Geniere": { faction: "Neutral", glyph: "🔧", shortName: "GENIERE", cost: 2, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Ripristina 3 PV a un Altare o Muro alleato entro 3 passi dal Comandante." },
  "Rito di Comunione": { faction: "Neutral", glyph: "🍷", shortName: "COMUNIONE", cost: 3, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Pesca 2 carte (pesca 3 carte se il Comandante ha meno di 10 PV rimasti)." },
  "Furia dei Relitti": { faction: "Neutral", glyph: "💥", shortName: "FURIA REL.", cost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Danni diretti pari alle unità morte in questo round a una truppa entro 3 passi." },
  "Spaccatura Terrestre": { faction: "Neutral", glyph: "🌋", shortName: "SPACCATURA", cost: 2, bloodCost: 3, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Apre una Voragine permanente su una casella libera entro 3 passi dal Comandante." },
  "Fendenti Incrociati": { faction: "Neutral", glyph: "⚔️", shortName: "FENDENTI", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Per questo turno, tutti gli attacchi con Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)* infliggono +2 danni extra." },
  "Giuramento Ancestrale": { faction: "Neutral", glyph: "👑", shortName: "GIURAMENTO", cost: 3, bloodCost: 5, type: "spell", slot: "SPELL", rarity: "M", isMiniature: false, desc: "Pesca 3 carte dal Grimorio e rigenera 4 PV al tuo Comandante." },
  "Contro-Urto": { faction: "Neutral", glyph: "🛡️", shortName: "CONTRO-URTO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione su attacco mischia: riduce di 2 il danno e respinge l'attaccante (+2 danni urto)." },
  "Tagliola da Campo": { faction: "Neutral", glyph: "🪤", shortName: "TAGLIOLA", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Trappola invisibile: il primo nemico che vi entra subisce 2 danni e si ferma." },
  "Passo Falso": { faction: "Neutral", glyph: "🦶", shortName: "PASSO FALSO", cost: 0, bloodCost: 3, type: "reaction", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Reazione: quando un nemico dichiara una mossa, riduci il suo movimento a 0 per il round." },
  "Rinvigorire": { faction: "Neutral", glyph: "🧪", shortName: "RINVIGORIRE", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Un'unità alleata che ha già agito in questo round può muovere di 1 casella extra." },
  "Saccheggio Rapido": { faction: "Neutral", glyph: "💰", shortName: "SACCHEGGIO", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Se hai distrutto una struttura nemica in questo round, incassi +2 Mana immediati." },
  "Nebbia di Guerra": { faction: "Neutral", glyph: "🌫️", shortName: "NEBBIA", cost: 2, type: "spell", slot: "SPELL", rarity: "U", isMiniature: false, desc: "Tutti gli attacchi a distanza sono impediti per 1 intero round di gioco." },
  "Provocazione": { faction: "Neutral", glyph: "🗣️", shortName: "PROVOCAZ.", cost: 1, type: "spell", slot: "SPELL", rarity: "C", isMiniature: false, desc: "Costringe una truppa nemica entro 2 caselle ad attaccare l'alleato bersaglio nel suo turno." }
};

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
  res = res.replace(/\[1\s*Azione\]/gi, '[1⚡]');
  res = res.replace(/\bconsuma\s+(\d+)\s*A\b/gi, 'consuma $1⚡');
  res = res.replace(/\bconsuma\s+(\d+)\s*S\b/gi, 'consuma $1🩸');
  res = res.replace(/\b(\d+)S,\s*(\d+)Az\b/gi, '$1🩸, $2⚡');
  res = res.replace(/\*\(([^)]+)\)\*/g, '<em class="reminder-text">*($1)*</em>');

  if (!res.includes('muoversi e attaccare')) {
    const slancioRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.slancio + '</em>';
    res = res.replace(/\bSlancio\s*&\s*Balzo a L\s*:/gi, 'Slancio ' + slancioRem + ' & Balzo a L <em class="reminder-text">' + KEYWORD_REMINDERS_MAP.balzo + '</em>:');
    res = res.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:/gi, 'Slancio ' + slancioRem + ' ($1):');
    res = res.replace(/\bSlancio\s+e\s+volo\s*:/gi, 'Slancio ' + slancioRem + ' & Volo <em class="reminder-text">*(scavalca pedine e ostacoli)*</em>:');
    res = res.replace(/\bSlancio\s*:(?!\s*<em)/gi, 'Slancio ' + slancioRem + ':');
    res = res.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*<em)/gi, '$1 Slancio ' + slancioRem);
  }

  if (!res.includes('traiettoria a L')) {
    const balzoRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.balzo + '</em>';
    res = res.replace(/\bBalzo a L\s*:(?!\s*<em)/gi, 'Balzo a L ' + balzoRem + ':');
    res = res.replace(/\bBalzo a L\s*(&|e)\s*(?!\s*<em)/gi, 'Balzo a L ' + balzoRem + ' $1 ');
    res = res.replace(/\b(con|a|da movimenti a)\s+Balzo a L\b(?!\s*<em)/gi, '$1 Balzo a L ' + balzoRem);
    res = res.replace(/\bBalzo a L\b(?!\s*<em)/gi, 'Balzo a L ' + balzoRem);
  }

  if (!res.includes('2 caselle in linea retta senza')) {
    const allungoRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.allungo + '</em>';
    res = res.replace(/\bAllungo\s*:(?!\s*<em)/gi, 'Allungo ' + allungoRem + ':');
    res = res.replace(/\bAllungo\s*&(?!\s*<em)/gi, 'Allungo ' + allungoRem + ' &');
    res = res.replace(/\bAllungo\b(?!\s*<em)/gi, 'Allungo ' + allungoRem);
  }

  if (!res.includes('bersaglio è ingaggiato anche')) {
    const flankingRem = '<em class="reminder-text">' + KEYWORD_REMINDERS_MAP.flanking + '</em>';
    res = res.replace(/\bFlanking\s*:(?!\s*<em)/gi, 'Flanking ' + flankingRem + ':');
    res = res.replace(/\bFlanking\b(?!\s*<em)/gi, 'Flanking ' + flankingRem);
  }

  return res;
}

export const COMMANDERS = {};
Object.entries(COMMANDERS_POOL).forEach(([key, raw]) => {
  const id = key.toLowerCase().replace(/\s+/g, '_');
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
