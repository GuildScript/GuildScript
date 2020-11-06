const Collection = require('@discordjs/collection');

/**
 * The base of managers. 
 * @module BaseManager
 * @private
 */
module.exports = class BaseManager extends Collection {
    constructor(client) {
        super();
        this.client = client;
    }
};