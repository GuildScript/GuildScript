const TextBasedChannel = require('./TextBasedChannel');
/**
 * */
const TextChannel = class TextChannel extends TextBasedChannel {
    constructor(client, data) {
        super(client, data);
    }
};



module.exports = TextChannel;