const Collection = require('@discordjs/collection');

/**
 * The base of managers. 
 * @private
 */
class BaseManager extends Collection {
    constructor(client) {
        super();
        this.client = client;
    }
};

module.exports = BaseManager;