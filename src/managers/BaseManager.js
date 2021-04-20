/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/collection/master/class/Collection}
 */
const Collection = require('@discordjs/collection');

/**
 * The base of managers. 
 * @private
 */
class BaseManager {
    constructor(client) {
        this.client = client;
        /**
         * The cache of data.
         * @type {Collection}
         */
        this.cache = new Collection();
    }
};

module.exports = BaseManager;