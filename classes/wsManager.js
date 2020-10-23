const WebSocket = require('ws');
const url = 'wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket';

module.exports = class wsManager {
    constructor(cookie) {
        cookie = cookie.map(v => v.split(' ')[0]).join('');
        this.ws = new WebSocket(url, { headers: { cookie } });
        this.pReady = {};
        this.pReady.p = new Promise((resolve, reject) => {
            this.pReady.resolve = resolve;
            this.pReady.reject = reject;
        });

        this.ws.on('open', () => {
            console.log('websocket connected');
            this.pReady.resolve();
            this.heartbeat(this.ws);
        });

        this.ws.on('message', function incoming(msg) {
            msg = msg.replace(/^\d+/, '');
            if (!msg.length) return;

            msg = JSON.parse(msg);
            console.log(msg, msg[0]);
            // this.MessageReceived(msg);
        });

        this.ws.on('close', function close(data) {
            console.log('disconnected', data);
        });
    }

    /**
     * A promise that resolves when the WS is ready.
     * @returns {Promise<void>}
     */
    get ready() {
        return this.pReady.p;
    }

    heartbeat(ws) {
        if (!ws) return;
        if (ws.readyState !== 1) return;
        ws.send('2');
        console.log('sent heartbeat');
        setTimeout(() => this.heartbeat(ws), 10000);
    }
};