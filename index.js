const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

const server = http.createServer((request, resp) => {
    // resp.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    // // 第一种 http/1.0的强缓存设置
    // const time = new Date();
    // // 时间戳计算n秒后
    // time.setTime(time.getTime() + 100 * 1000);
    // // GMT 时间格式
    // const expires = time.toUTCString();
    // // 设置强缓存，缓存时间10s
    // resp.setHeader('Expires', expires);

    // // http/1.1设置强缓存
    // // 会忽略Expires的设置
    // resp.setHeader('Cache-Control', 'max-age=40');

    // http/1.0设置协商缓存---etag/if-none-match
    const buffer = fs.readFileSync('./dist/index.html'); // 二进制文件流
    const hashTool = crypto.createHash('md5'); // 使用md5加密算法
    hashTool.update(buffer, 'utf-8'); // 注入二进制文件
    const md5 = hashTool.digest('hex'); // 生成md5加密的唯一标识

    const requestEtag = request.headers['if-none-match'];
    if(requestEtag && requestEtag == md5) {
        console.log('走浏览器缓存--etag');
        resp.statusCode = 304;
        resp.end();
        return;
    }

    // http/1.0设置协商缓存:Last-Modified/If-Modified-Since
    const requestModified = request.headers['if-modified-since'];
    const info = fs.statSync('./dist/index.html');
    const lastModified = info.mtime.toUTCString();

    if(requestModified && requestModified == lastModified) {
        console.log('浏览器走缓存');
        resp.statusCode = 304;
        resp.end();
        return;
    }

    console.log('不取缓存');
    resp.setHeader('Last-Modified', lastModified);
    resp.setHeader('etag', md5);
    const html = fs.readFileSync('./dist/index.html', 'utf-8');
    resp.end(html);
});

server.listen(8090);
console.log('this demo runing at http://localhost:8090');