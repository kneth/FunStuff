const http = require('node:http');
const net = require('node:net');
const { URL } = require('node:url');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
});

proxy.on('connect', (req, clientSocket, head) => {
    console.log("connect", req.url);
    // Connect to an origin server
    const { port, hostname } = new URL(`http://${req.url}`);
    const serverSocket = net.connect(port || 80, hostname, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                      'Proxy-agent: Node.js-Proxy\r\n' +
                      '\r\n');
      serverSocket.write(head);
      serverSocket.pipe(clientSocket);
      clientSocket.pipe(serverSocket);
    });
});

// Now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {
    console.log("Listen");
});
