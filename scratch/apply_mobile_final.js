const fs = require('fs');

function fixPhaseUI(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  const regex = /if\s*\(\s*phase\s*===\s*1\s*\)\s*\{[\s\S]*?btn\.innerHTML\s*=\s*`Fine Turno ⏳`;[\s\S]*?btn\.className\s*=\s*"btn btn-crimson";\s*\}/;

  if (!regex.test(content)) {
    console.error('Regex not matched in ' + filename);
    return false;
  }

  const replacement = `if (phase === 1) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 2: Azioni ⚔️</span><span class="phase-label-short">Fase 2: Azioni ⚔️</span>';
            btn.className = "btn btn-gold btn-hud-action";
          } else if (phase === 2) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 3: Mantenimento 💧</span><span class="phase-label-short">Fase 3: Mant. 💧</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          } else if (phase === 3) {
            btn.innerHTML = '<span class="phase-label-full">Passa a Fase 4: Fine Turno ⏳</span><span class="phase-label-short">Fase 4: Fine ⏳</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          } else {
            btn.innerHTML = '<span class="phase-label-full">Fine Turno ⏳</span><span class="phase-label-short">Fine Turno ⏳</span>';
            btn.className = "btn btn-crimson btn-hud-action";
          }`;

  content = content.replace(regex, replacement);

  fs.writeFileSync(filename, content, 'utf8');
  console.log('updatePhaseUI successfully updated in ' + filename);
  return true;
}

fixPhaseUI('index.html');
fixPhaseUI('crownfall.html');
