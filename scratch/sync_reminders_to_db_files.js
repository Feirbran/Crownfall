const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex rules to add *(...)* if not already present
  // 1. Slancio
  content = content.replace(/\bSlancio\s*&\s*Balzo a L\s*:(?!\s*\*\(può muoversi)/gi,
    'Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*:');
  content = content.replace(/\bSlancio\s+(diagonale|omnidirezionale|lineare)\s*:(?!\s*\*\(può muoversi)/gi,
    'Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* ($1):');
  content = content.replace(/\bSlancio\s+e\s+volo\s*:(?!\s*\*\(può muoversi)/gi,
    'Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)* & Volo *(scavalca pedine e ostacoli)*:');
  content = content.replace(/\bSlancio\s*:(?!\s*\*\(può muoversi)/gi,
    'Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*:');
  content = content.replace(/\(\s*1\/1\s+Slancio\s*\)(?!\s*\*\(può muoversi)/gi,
    '(1/1 con Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*)');
  content = content.replace(/\b(ottiene|conferendole|con|parola chiave)\s+Slancio\b(?!\s*\*\(può muoversi)/gi,
    '$1 Slancio *(può muoversi e attaccare nello stesso turno in cui entra in gioco)*');

  // 2. Balzo a L
  content = content.replace(/\bBalzo a L\s*:(?!\s*\*\(muove e salta)/gi,
    'Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*:');
  content = content.replace(/\bBalzo a L\s*(&|e)\s*(?!\s*\*\(muove e salta)/gi,
    'Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)* $1 ');
  content = content.replace(/\bBalzo a L\s*([;.,])(?!\s*\*\(muove e salta)/gi,
    'Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*$1');
  content = content.replace(/\b(con|a|da movimenti a)\s+Balzo a L\b(?!\s*\*\(muove e salta)/gi,
    '$1 Balzo a L *(muove e salta oltre pedine e ostacoli con traiettoria a L)*');

  // 3. Allungo
  content = content.replace(/\bAllungo\s*:(?!\s*\*\(può colpire)/gi,
    'Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*:');
  content = content.replace(/\bAllungo\s*&(?!\s*\*\(può colpire)/gi,
    'Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* &');
  content = content.replace(/\bAllungo\s+economico\s*:(?!\s*\*\(può colpire)/gi,
    'Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)*:');
  content = content.replace(/\bAllungo\s*\(\s*Gittata\s+2\s*\)\s*:(?!\s*\*\(può colpire)/gi,
    'Allungo *(può colpire a 2 caselle in linea retta senza subire contrattacco)* (Gittata 2):');

  // 4. Flanking
  content = content.replace(/\bFlanking\s*:(?!\s*\*\(infligge danni bonus)/gi,
    'Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*:');
  content = content.replace(/\(Flanking\)(?!\s*\*\(infligge danni bonus)/gi,
    '(Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*)');
  content = content.replace(/\bcon Flanking\b(?!\s*\*\(infligge danni bonus)/gi,
    'con Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*');
  content = content.replace(/\bFlanking\s*(?!\s*\*\(infligge danni bonus)(?=\s*[.,;:]|\s+infligge)/gi,
    'Flanking *(infligge danni bonus se il bersaglio è ingaggiato anche da un altro alleato)*');

  // 5. Presidio
  content = content.replace(/\bPresidio(\s+solido)?\s*:(?!\s*\*\(non compie)/gi,
    'Presidio *(non compie attacchi attivi; contrattacca solo se ingaggiata in mischia)*:');

  // 6. Sfondamento
  content = content.replace(/\bSfondamento(\s+devastante)?\s*:(?!\s*\*\(danni massicci)/gi,
    'Sfondamento *(infligge danni massicci ad Altari e Muri nemici)*:');

  // 7. Inamovibile / Massiccio
  content = content.replace(/\bInamovibile\s*:(?!\s*\*\(immune a spinte)/gi,
    'Inamovibile *(immune a spinte, urti e Voragini)*:');
  content = content.replace(/\bMassiccio\s*:(?!\s*\*\(immune a spinte)/gi,
    'Massiccio *(immune a spinte e urti)*:');

  // 8. Travolgere
  content = content.replace(/\bTravolgere\s*:(?!\s*\*\(spinge indietro)/gi,
    'Travolgere *(spinge indietro il difensore e occupa la sua casella)*:');

  // 9. Interposizione
  content = content.replace(/\bInterposizione\s*:(?!\s*\*\(i tiri a distanza)/gi,
    'Interposizione *(i tiri a distanza nemici contro alleati adiacenti deviano su questa unità)*:');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed', filePath);
}

processFile('cards_alpha.js');
processFile('cards_beta.js');
