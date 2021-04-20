const WebSocket = require('ws');
const url = 'wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket';
const maxTries = 5;
/**
 * Manages ws events.
 * @private
 */
const wsManager = class wsManager {
    constructor(cookie, client) {
        this.reconnect = true;
        this.tries = 0;
        cookie = cookie.map(v => v.split(' ')[0]).join('');
        this.connect(cookie, client);
    }

    connect(cookie, client) {
        if (!this.reconnect) return;
        this.tries++;
        if(this.tries > maxTries) return client.emit('wsFail');
        this.ws = new WebSocket(url, { headers: { cookie } });
        

        this.ws.on('open', () => {
            client.emit('connected');
            this.tries = 0;
            this.interval = setInterval(this.heartbeat, 10000, this.ws, client);
        });

        this.ws.on('error', () => {
            // this is just here to prevent errors from crashing the processes. It auto reconnects
        });

        this.ws.on('message', (msg) => {
            msg = msg.replace(/^\d+/, '');
            if (!msg.length) return;

            msg = JSON.parse(msg);
            client.emit('raw', msg);
        });

        this.ws.on('close', () => {
            clearInterval(this.interval);
            client.emit('disconnect');
            // attempt to reconnect
            this.connect(cookie, client);
        });
    }

    heartbeat(ws, client) {
        if (!ws) return;
        if (ws.readyState !== 1) return;
        ws.send('2');
        client.request({ path: 'users/me/ping', method: 'put' }).catch(() => { });
    }

    close() {
        this.ws.close(1000);
        this.reconnect = false;
        clearInterval(this.interval);
    }
};

module.exports = wsManager;