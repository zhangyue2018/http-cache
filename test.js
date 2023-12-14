// const fs = require('fs');

// const info = fs.statSync('./dist/index.html');
// console.log(info);

const crypto = require('crypto');
const fs = require('fs');

const buffer = fs.readFileSync('./dist/index.html'); // 二进制文件流
const hashTool = crypto.createHash('md5'); // 使用md5加密算法

hashTool.update(buffer, 'utf-8'); // 注入二进制文件
const md5 = hashTool.digest('hex'); // 生成md5加密的唯一标识

console.log(md5);
