const ChannelManager = require('./ChannelManager');
const request = require('../functions/request');
const wsManager = require('./wsManager');
const cookies = Symbol();

module.exports = class Client {
    constructor(options) {
        this.options = options;
        this.channels = new ChannelManager();
        this[cookies] = [];
    }

    async login (email, password) {
        const data = JSON.stringify({email, password});
        let {res, ok, status, cookies: cookie} = await request({
            data,
            cookies: this[cookies],
            path: 'login'
        });
        this[cookies] = cookie;
        if(!ok) throw new Error(`${status} error logging in!`);
        this.id = res.user.id;
        //todo data.
        this.ws = new wsManager(cookie);
    }

    getCookies() {
        return this[cookies];
    }
};