const ChannelManager = require('./ChannelManager');
const request = require('../functions/request');
const wsManager = require('./wsManager');
const EventEmitter = require('events');
const UserManager = require('./UserManager');
const cookies = Symbol();

module.exports = class Client extends EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.channels = new ChannelManager(this);
        this.users = new UserManager(this); 
        this[cookies] = [];

        this.on('raw', this.raw);
        this.on('connected', this.connected);
    }

    async login(email, password) {
        const data = JSON.stringify({ email, password });
        let { res, ok, status, cookies: cookie } = await this.request({
            data,
            path: 'login'
        });
        this[cookies] = cookie;
        if (!ok) throw new Error(`${status} error logging in!`);
        this.id = res.user.id;
        //todo data.
        this.ws = new wsManager(cookie, this);
    }

    getCookies() {
        return this[cookies];
    }

    raw(msg) {
        if (!Array.isArray(msg)) return;
        const [type, data] = msg;
        console.log(type, data);
        if (type === 'chatMessageDeleted') {
            let { channelId, message } = data;
            let channel = this.channels.cache.get(channelId);
            if (!channel) return;
            let msg = this.messages.cache.get(message.id);
            if (!msg) return;
            this.emit('messageDelete', message);
        }
    }
    connected() {
        // Get all the data
        // Client User

        // after thats all done fire ready
        this.emit('ready');
    }

    /**
     * Make a request to the api.
     * @param {Object} options - The options for the request.
     * @param {string} options.path - The path to go request.
     * @param {*} options.data - The data to send.
     * @param {string} [options.method='post'] - The method.
     * @param {boolean} [options.json=true] - If you want to receive a JSON response.
     * @returns {Promise<object>} The response from the server.
     * @private
     * @example
     * // get request
     * client.request({path: 'path/to/request', method: 'get'})
     * 
     * // post request
     * client.request({path: 'path/to/request', data: 'data to post'})
     */
    request(options = {}) {
        options.cookies = this[cookies];
        return request(options);
    }
};