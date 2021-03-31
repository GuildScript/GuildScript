// const Team = require('./Team');
// const Channel = require('./Channel');
const parseDom = require('../parseDom');
const externalPromise = require('../externalPromise');

/**
 * @module Message
 */
module.exports = class Message {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { promise, resolve, reject } = externalPromise();
        this.ready = promise;
        try {
            const { channelId, teamId, message: { id, content, createdAt }, createdBy: authorId } = data;

            this.author = await this.client.users.fetch(authorId);
            this.channel = this.client.channels.get(channelId);
            this.team = teamId;
            this.id = id;
            this.content = parseDom(content);
            this.rawContent = content;
            this.createdAt = new Date(createdAt);
            this.createdAtTimestamp = this.createdAt.getTime();
            resolve();
        } catch (e) {
            reject(e);
        }
    }

    async update() {

    }
};
