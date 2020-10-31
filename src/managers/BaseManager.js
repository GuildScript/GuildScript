const Collection = require('@discordjs/collection');

/**
 * The base of managers. 
 * @module BaseManager
 * @private
 */
module.exports = class BaseManager {
    constructor(client) {
        this.client = client;
        this.cache = new Collection();
    }
};