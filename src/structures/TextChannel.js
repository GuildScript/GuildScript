const uuid = require('uuid').v4;
const BaseComponent = require('../messageComponents/BaseComponent');
const MessageBuilder = require('../messageComponents/MessageBuilder');
const ParagraphComponent = require('../messageComponents/ParagraphComponent');
const BaseChannel = require('./BaseChannel');

/**
 * @module TextChannel
 */
module.exports = class TextChannel extends BaseChannel {
    constructor(client, data) {
        super(client, data);
        this.client = client;
        this.apply(data);
    }

    apply (data) {
        const { id, createdAt, createdBy, description, groupId, isPublic, name, teamId, updatedAt } = data;
        
        this.id = id;
        this.createdBy = createdBy;
        this.createdAt = new Date(createdAt);
        this.createdAtTimestamp = this.createdAt.getTime();
        this.description = description;
        this.group = groupId;
        this.public = isPublic;
        this.name = name;
        this.team = teamId;
        this.updatedAt = new Date(updatedAt);
        this.updatedAtTimestamp = this.updatedAt.getTime();
    }
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

