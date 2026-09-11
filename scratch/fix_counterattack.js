const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Approccio linea-per-linea
const lines = code.split('\n');

// Find the counterDmg assignment line
const counterDmgLine = lines.findIndex(l => l.includes('let counterDmg = def.att;'));
console.log('counterDmg at line:', counterDmgLine + 1, ':', lines[counterDmgLine]);

// Find the isRangedAttacker check
const isRangedLine = lines.findIndex(l => l.includes('const isRangedAttacker'));
console.log('isRangedAttacker at line:', isRangedLine + 1, ':', lines[isRangedLine]);

// Find the defCannotCounter line
const defCannotLine = lines.findIndex(l => l.includes('const defCannotCounter'));
console.log('defCannotCounter at line:', defCannotLine + 1, ':', lines[defCannotLine]);

// Find att.hp -= counterDmg
const attHpLine = lines.findIndex(l => l.includes('att.hp -= counterDmg'));
console.log('att.hp -= at line:', attHpLine + 1, ':', lines[attHpLine]);

// Find the "else" block that has "attacca a distanza"
const elseLine = lines.findIndex(l => l.includes('attacca a distanza senza subire contrattacco'));
console.log('else log at line:', elseLine + 1, ':', lines[elseLine]);

// Now do targeted replacements
let modified = code;

// Fix 1: Add defIsStructure after defCannotCounter line
const defCannotStr = lines[defCannotLine];
const defIsStructureStr = defCannotStr.replace(
  "const defCannotCounter = defDesc.includes('non può contrattaccare') || defDesc.includes('non contrattacca');",
  "const defCannotCounter = defDesc.includes('non può contrattaccare') || defDesc.includes('non contrattacca');\r\n        const defIsStructure = def.type === 'altar' || def.type === 'wall';"
);
modified = modified.replace(
  "const defCannotCounter = defDesc.includes('non pu\xF2 contrattaccare') || defDesc.includes('non contrattacca');",
  "const defCannotCounter = defDesc.includes('non pu\xF2 contrattaccare') || defDesc.includes('non contrattacca');\r\n        const defIsStructure = def.type === 'altar' || def.type === 'wall';"
);

// Fix 2: Add !defIsStructure to the if condition
modified = modified.replace(
  "if (!defCannotCounter && (!isRangedAttacker || def.range >= dist || def.cardId === 'halberdier'",
  "if (!defCannotCounter && !defIsStructure && (!isRangedAttacker || (def.range || 1) >= dist || def.cardId === 'halberdier'"
);

// Fix 3: Replace "let counterDmg = def.att;" with safe version
modified = modified.replace(
  "          let counterDmg = def.att;\r\n",
  "          // Forza counterDmg a numero valido (def.att undefined -> NaN silenzioso)\r\n          let counterDmg = typeof def.att === 'number' ? def.att : 0;\r\n"
);

// Fix 4: Replace the simple att.hp -= + log block with the guarded version
modified = modified.replace(
  `          att.hp -= counterDmg;\r\n          addLog(\`\${def.name} contrattacca infliggendo \${counterDmg} danni a \${att.name}\`, 'sys');\r\n          if (att.hp <= 0) {\r\n            handlePieceDefeated(from, def.owner);\r\n          }\r\n        } else {\r\n          addLog(\`\${att.name} attacca a distanza senza subire contrattacco!\`, 'sys');\r\n        }`,
  `          // Sanitize: sempre numero non-NaN\r\n          counterDmg = (isNaN(counterDmg) || counterDmg < 0) ? 0 : counterDmg;\r\n\r\n          if (counterDmg > 0) {\r\n            att.hp -= counterDmg;\r\n            addLog(\`\${def.name} contrattacca infliggendo \${counterDmg} danni a \${att.name}\`, 'sys');\r\n            showCollisionPopup(from, '⚔️ CONTRATTACCO!', \`\${def.name} inflicts \${counterDmg} dmg\`);\r\n            if (att.hp <= 0) {\r\n              handlePieceDefeated(from, def.owner);\r\n            }\r\n          } else if (def.att > 0) {\r\n            addLog(\`\${def.name} contrattacca ma 0 danni (armatura assorbe)\`, 'sys');\r\n          } else {\r\n            addLog(\`\${def.name} ATT=0, nessun contrattacco effettivo.\`, 'sys');\r\n          }\r\n        } else if (isRangedAttacker) {\r\n          addLog(\`\${att.name} attacca a distanza senza subire contrattacco!\`, 'sys');\r\n        }`
);

// Check if we actually made changes
if (modified !== code) {
  fs.writeFileSync('index.html', modified, 'utf8');
  console.log('SUCCESS: Counterattack fixes applied!');
} else {
  console.log('WARNING: No changes were made. Checking what matches...');
  
  // Try to find the exact strings
  const checks = [
    ["defCannotCounter check", "const defCannotCounter = defDesc.includes('non pu\xF2 contrattaccare') || defDesc.includes('non contrattacca');"],
    ["isRangedAttacker if", "if (!defCannotCounter && (!isRangedAttacker || def.range >= dist"],
    ["counterDmg def.att", "let counterDmg = def.att;\r\n"],
    ["att.hp block", "att.hp -= counterDmg;\r\n          addLog(`${def.name} contrattacca infliggendo"]
  ];
  
  checks.forEach(([name, str]) => {
    console.log(name + ':', code.includes(str) ? 'FOUND' : 'NOT FOUND');
  });
}
