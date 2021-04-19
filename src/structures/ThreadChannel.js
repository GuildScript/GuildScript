const TextBasedChannel = require('./TextBasedChannel');
/**
 * */
const ThreadChannel = class ThreadChannel extends TextBasedChannel {
    constructor(client, data) {
        super(client, data);
    }
};



module.exports = ThreadChannel;