const fs = require('fs');

const info = fs.statSync('./dist/index.html');
console.log(info);