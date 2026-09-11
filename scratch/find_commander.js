const lines = require('fs').readFileSync('index.html','utf8').split('\n');
lines.forEach((l,i) => {
  if(l.includes("type: 'commander'") || l.includes('type:"commander"') || l.includes('type: "commander"')) {
    console.log(i+1, l.trim());
  }
});
