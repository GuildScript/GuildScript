const uuid = require('uuid').v4;
const BaseComponent = require('../messageComponents/BaseComponent');
const MessageBuilder = require('../messageComponents/MessageBuilder');
const ParagraphComponent = require('../messageComponents/ParagraphComponent');

/**
 * A dummy channel with a few methods for rare situations where I don't get data.
 * This is to fix an issue and will be removed in the future.
 */
const UnknownChannel = class UnknownChannel  {
    constructor(client, id) {
        this.client = client;
        this.id = id;
    }
    /**
     * Send a message to the channel.
     * @param {BaseComponent|ParagraphComponent|string|MessageBuilder} data - The content to send to the channel.
     * @param {object} options - The options to send. Currently none.
     */
    async send(data, options = {}) {
        if (data instanceof BaseComponent || data instanceof ParagraphComponent || typeof data === 'string')
            data = new MessageBuilder(data);
        if (!(data instanceof MessageBuilder)) throw new Error('Please provide a valid component.');
        const id = uuid();
        let res = await this.client.request({
            path: `channels/${this.id}/messages`,
            data: JSON.stringify({
                messageId: id,
                content: data.toJSON()
            })
        });
        if (!res.ok) throw new Error(`${res.status} error sending message ${id}!
${JSON.stringify(res.res)}`);
    }
};



module.exports = UnknownChannel;