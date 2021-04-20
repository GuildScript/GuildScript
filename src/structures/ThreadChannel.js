const TextBasedChannel = require('./TextBasedChannel');
/**
 * Represents a thread.
 * @extends {TextBasedChannel}
 */
const ThreadChannel = class ThreadChannel extends TextBasedChannel {
    constructor(client, data) {
        super(client, data);
    }
};



module.exports = ThreadChannel;