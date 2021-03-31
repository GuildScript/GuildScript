const TextBasedChannel = require('./TextBasedChannel');
/**
 * @module TextChannel
 */
module.exports = class TextChannel extends TextBasedChannel {
    constructor(client, data) {
        super(client, data);
    }
};

