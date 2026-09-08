const fs = require('fs');

let html = fs.readFileSync('../index.html', 'utf8');

// Patch 1: useWeaponRiteP1 to check actions
const useWeaponRiteOld = `    function useWeaponRiteP1() {
      const role = getMyRole();
      if (!battleState || battleState.turn !== role) return showToast("Attendi il tuo turno!");
      const comm = battleState[role].commander;
      if (!comm) return;
      if (comm.id === 'kaelen') {
        startKaelenRiteSelection(role);
      } else {
        executeRiteAction(role, true);
      }
    }`;
const useWeaponRiteNew = `    function useWeaponRiteP1() {
      const role = getMyRole();
      if (!battleState || battleState.turn !== role) return showToast("Attendi il tuo turno!");
      const comm = battleState[role].commander;
      if (!comm) return;
      if (battleState[role].actions < 1) return showToast("Azioni insufficienti! Il Rito d'Armi richiede 1 Azione Tattica.");
      
      if (comm.id === 'kaelen') {
        startKaelenRiteSelection(role);
      } else {
        executeRiteAction(role, true);
      }
    }`;
html = html.replace(useWeaponRiteOld, useWeaponRiteNew);

// Patch 2: executeRiteAction deducts actions
const executeRiteActionOld = `      battleState[player].blood -= comm.riteCost;
      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di \${comm.name}!\`, player);`;
const executeRiteActionNew = `      battleState[player].blood -= comm.riteCost;
      battleState[player].actions--;
      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di \${comm.name}!\`, player);`;
html = html.replace(executeRiteActionOld, executeRiteActionNew);

// Patch 3: handleKaelenRiteClick removes local deduction
const handleKaelenRiteClickOld = `        const comm = battleState[role].commander;
        battleState[role].blood -= comm.riteCost;
        battleState.kaelenRiteState = null;
        clearHighlights();
        executeKaelenSwap(firstIdx, idx, role, true);`;
const handleKaelenRiteClickNew = `        battleState.kaelenRiteState = null;
        clearHighlights();
        executeKaelenSwap(firstIdx, idx, role, true);`;
html = html.replace(handleKaelenRiteClickOld, handleKaelenRiteClickNew);

// Patch 4: executeKaelenSwap deducts blood and actions
const executeKaelenSwapOld = `    function executeKaelenSwap(firstIdx, secondIdx, player = getMyRole(), isOriginator = true) {
      const p1 = battleState.grid[firstIdx];
      const p2 = battleState.grid[secondIdx];
      if (!p1 || !p2) return;

      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di Kaelen: scambia di posizione \${p1.name} e \${p2.name}!\`, player);`;
const executeKaelenSwapNew = `    function executeKaelenSwap(firstIdx, secondIdx, player = getMyRole(), isOriginator = true) {
      const p1 = battleState.grid[firstIdx];
      const p2 = battleState.grid[secondIdx];
      if (!p1 || !p2) return;

      const comm = battleState[player].commander;
      battleState[player].blood -= comm.riteCost;
      battleState[player].actions--;

      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di Kaelen: scambia di posizione \${p1.name} e \${p2.name}!\`, player);`;
html = html.replace(executeKaelenSwapOld, executeKaelenSwapNew);

fs.writeFileSync('../index.html', html, 'utf8');
console.log("Done patch Kaelen");
