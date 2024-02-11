import express from 'express';
import https from 'https';
import ws, {WebSocketServer} from 'ws';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;
const wss = new WebSocketServer({
    noServer: true,
})

app.get('/', (req, res) => {
    res.send('root path');
});

const httpsServer = https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
}, (req, res) => {
    console.log('$$$$ https server');
    res.end('https end')
}).listen(3001);

wss.on('connection', (ws, request) => {
    console.log('!!!wss connection');
    console.log('total clients', wss.clients.size, wss.clients.entries())
});

const server = app.listen(port, () => {
    console.log('Server is up and running');
});

server.on('upgrade', (req, socket, head) => {
    console.log('upgrade', args);

    wss.handleUpgrade(req, socket, head, (wsClient, req) => {
        wss.emit('connection', wsClient, req);
    })
})