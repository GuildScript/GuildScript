const WebSocket = require('ws');
const url = 'wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket';

/**
 * Manages ws events.
 * @module wsManager
 */
module.exports = class wsManager {
    constructor(cookie, client) {
        cookie = cookie.map(v => v.split(' ')[0]).join('');
        this.ws = new WebSocket(url, { headers: { cookie } });
        
        this.ws.on('open', () => {
            client.emit('connected');
            this.interval = setInterval(this.heartbeat, 10000, this.ws, client);
        });

        this.ws.on('message', (msg) => {
            msg = msg.replace(/^\d+/, '');
            if (!msg.length) return;

            msg = JSON.parse(msg);
            client.emit('raw', msg);
        });

        this.ws.on('close', (data) => {
            clearInterval(this.interval);
            console.log('disconnected', data);
        });
    }

    heartbeat(ws, client) {
        if (!ws) return;
        if (ws.readyState !== 1) return;
        ws.send('2');
        client.request({path: 'users/me/ping', method: 'put'});
    }

    close() {
        this.ws.close(1000);
        clearInterval(this.interval);
    }
};