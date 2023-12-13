const http = require('http');
const fs = require('fs');

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

    // http/1.1设置协商缓存:Last-Modified/If-Modified-Since
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
    const html = fs.readFileSync('./dist/index.html', 'utf-8');
    resp.end(html);
});

server.listen(8090);
console.log('this demo runing at http://localhost:8090');