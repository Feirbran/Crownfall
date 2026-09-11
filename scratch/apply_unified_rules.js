// Unified Rules Engine Applicator for Crownfall
const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');

// 1. Add getOrthAdjs and getDiagAdjs after getAdjs
const oldAdjs = `    function getAdjs(idx) {
      const r = Math.floor(idx / 8), c = idx % 8;
      const res = [];
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
      });
      return res;
    }`;

const newAdjs = `    function getAdjs(idx) {
      const r = Math.floor(idx / 8), c = idx % 8;
      const res = [];
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
      });
      return res;
    }

    function getOrthAdjs(idx) {
      const r = Math.floor(idx / 8), c = idx % 8;
      const res = [];
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
      });
      return res;
    }

    function getDiagAdjs(idx) {
      const r = Math.floor(idx / 8), c = idx % 8;
      const res = [];
      [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
      });
      return res;
    }`;

if (!originalHtml.includes(oldAdjs)) {
  console.error("Could not find oldAdjs in index.html!");
  process.exit(1);
}

console.log("Found oldAdjs, preparing replacements...");
