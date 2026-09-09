const fs = require('fs');

const tutorialHtml = fs.readFileSync('scratch/tutorial_content.html', 'utf8').trim();
const tutorialCss = fs.readFileSync('scratch/tutorial_styles.css', 'utf8').trim();

function applyUpdate(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace the old tutorial CSS
  const oldCssStart = '.tutorial-step-box {';
  const oldCssEnd = '.tutorial-step-box h3 { color: var(--gold-primary); font-size: 1.15rem; }';
  const sCss = content.indexOf(oldCssStart);
  const eCss = content.indexOf(oldCssEnd);

  if (sCss === -1 || eCss === -1) {
    throw new Error('Could not find old tutorial CSS in ' + filePath);
  }

  content = content.substring(0, sCss) + tutorialCss + content.substring(eCss + oldCssEnd.length);

  // 2. Replace old #pane-tutorial HTML
  const oldHtmlStart = '    <!-- TUTORIAL -->\r\n    <div id="pane-tutorial" class="pane">';
  const oldHtmlStartLf = '    <!-- TUTORIAL -->\n    <div id="pane-tutorial" class="pane">';
  const oldHtmlEnd = '    <!-- HOME -->';

  let sHtml = content.indexOf(oldHtmlStart);
  if (sHtml === -1) sHtml = content.indexOf(oldHtmlStartLf);
  const eHtml = content.indexOf(oldHtmlEnd);

  if (sHtml === -1 || eHtml === -1) {
    throw new Error('Could not find old tutorial HTML in ' + filePath);
  }

  content = content.substring(0, sHtml) + tutorialHtml + '\r\n\r\n    ' + content.substring(eHtml);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated', filePath);
}

applyUpdate('index.html');
applyUpdate('crownfall.html');

const f1 = fs.readFileSync('index.html', 'utf8');
const f2 = fs.readFileSync('crownfall.html', 'utf8');
console.log('Strict equality between index.html and crownfall.html:', f1 === f2);
console.log('File length:', f1.length);
