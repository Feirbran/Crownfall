const fs = require('fs');

function fixDeclarationOrder(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const wasCRLF = content.includes('\r\n');
  let c = content.replace(/\r\n/g, '\n');

  // Extract KEYWORD_REMINDERS_MAP and formatCardDesc block from after getCardCostPipsHtml
  const formatBlockStart = '    // Helper per formattare descrizioni con testo esplicativo in corsivo per parole chiave (es. Slancio, Balzo a L) stile Magic';
  const formatBlockEnd = '      return res;\n    }';

  const startIdx = c.indexOf(formatBlockStart);
  const endIdx = c.indexOf(formatBlockEnd, startIdx);

  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find formatCardDesc block in', filePath);
    return;
  }

  const formatBlock = c.substring(startIdx, endIdx + formatBlockEnd.length);

  // Remove the block from its current location
  c = c.substring(0, startIdx) + c.substring(endIdx + formatBlockEnd.length);

  // Place it before COMMANDER_SET_MAPPING
  const targetBefore = '    const COMMANDER_SET_MAPPING = {';
  if (!c.includes(targetBefore)) {
    console.error('Could not find targetBefore in', filePath);
    return;
  }

  c = c.replace(targetBefore, `${formatBlock}\n\n${targetBefore}`);

  const finalContent = wasCRLF ? c.replace(/\n/g, '\r\n') : c;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log('Fixed declaration order in', filePath);
}

fixDeclarationOrder('crownfall.html');
fixDeclarationOrder('index.html');
