
const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const startStr = '<!-- OVERLAY COMBATTIMENTO DINAMICO SOVRAIMPRESSIONE -->';
const endStr = '      </div>\r\n    </div>';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const fullHtml = code.substring(startIdx, endIdx + endStr.length);
  code = code.replace(fullHtml, '');
  code = code.replace('</body>', fullHtml + '\n</body>');
  fs.writeFileSync('index.html', code);
  console.log('Fixed overlay');
} else {
  console.log('Could not find overlay html. startIdx: ' + startIdx + ' endIdx: ' + endIdx);
}
