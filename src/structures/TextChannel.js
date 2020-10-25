const uuid = require('uuid').v4;
const BaseChannel = require('./BaseChannel');

module.exports = class TextChannel extends BaseChannel {
    constructor(client, data) {
        super(client, data);
        this.client = client;
        this.apply(data);
    }

    send(content) {
        throw new Error('This doesn\'t work at all');
        //TODO: Parse content
        const id = uuid();
    }
};

