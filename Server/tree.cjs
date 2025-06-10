const fs = require('fs');
const path = require('path');

function printTree(dir, prefix = '') {
  const files = fs.readdirSync(dir).filter(f => f !== 'node_modules');
  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    console.log(prefix + (isLast ? '└─ ' : '├─ ') + file);
    if (stats.isDirectory()) {
      printTree(filePath, prefix + (isLast ? '   ' : '│  '));
    }
  });
}

printTree(process.cwd());

