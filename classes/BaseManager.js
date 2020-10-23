const Collection = require('@discordjs/collection');

/**
 * The base of managers. 
 */
module.exports = class BaseManager {
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }
};