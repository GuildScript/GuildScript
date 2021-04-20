const TextBasedChannel = require('./TextBasedChannel');
/**
 * Represents a plain old text channel.
 * @extends {TextBasedChannel}
 */
const TextChannel = class TextChannel extends TextBasedChannel {
    constructor(client, data) {
        super(client, data);
    }
};



module.exports = TextChannel;