const uuid = require('uuid').v4;
const BaseComponent = require('../messageComponents/BaseComponent');
const MessageBuilder = require('../messageComponents/MessageBuilder');
const ParagraphComponent = require('../messageComponents/ParagraphComponent');
const BaseChannel = require('./BaseChannel');

/**
 * Represents a Text based channel.
 * @extends {BaseChannel}
 */
const TextBasedChannel = class TextBasedChannel extends BaseChannel {
    constructor(client, data) {
        super(client, data);
        this.apply(data);
    }

    apply (data) {
        const { id, createdAt, createdBy, description, groupId, isPublic, name, teamId, updatedAt } = data;
        
        /**
         * The id of the channel.
         * @type {string}
         */
        this.id = id;
        /**
         * The id of the user who created the channel.
         * @type {String}
         */
        this.createdBy = createdBy;
        /**
         * The time the channel was created.
         * @type {Date}
         */
        this.createdAt = new Date(createdAt);
        /**
         * The timestamp the channel was created.
         * @type {number}
         */
        this.createdAtTimestamp = this.createdAt.getTime();
        /**
         * The description of the channel.
         * @type {?string}
         */
        this.description = description;
        /**
         * The id of the group the channel is in.
         * @type {string}
         */
        this.group = groupId;
        /**
         * Wether or not the channel is public.
         * @type {boolean}
         */
        this.public = isPublic;
        /**
         * The name of the channel.
         * @type {string}
         */
        this.name = name;
        /**
         * The team this channel is attached to.
         * @type {?Team}
         */
        this.team = this.client.teams.cache.get(teamId);
        /**
         * The time the channel was last updated at.
         * @type {Date}
         */
        this.updatedAt = new Date(updatedAt);
        /**
         * The timestamp of the last time the channel was updated.
         * @type {number}
         */
        this.updatedAtTimestamp = this.updatedAt.getTime();
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



module.exports = TextBasedChannel;