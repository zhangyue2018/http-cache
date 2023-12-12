const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    const html = fs.readFileSync('./dist/index.html', 'utf-8');
    response.end(html);
});

server.listen(8090);
console.log('this demo runing at http://localhost:8090');