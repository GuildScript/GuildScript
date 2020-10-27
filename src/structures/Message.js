// const Team = require('./Team');
// const Channel = require('./Channel');
const parseDom = require('../parseDom');

module.exports = class Message {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { channelId, teamId, message: { id, content, createdAt }, createdBy: authorId  } = data;

        this.channel = this.client.channels.cache.get(channelId);
        this.team = teamId;
        this.id = id;
        this.content = parseDom(content);
        this.rawContent = content;
        this.createdAt = new Date(createdAt);
        this.createdAtTimestamp = this.createdAt.getTime();
        this.author = authorId;
    }

    async update() {

    }
};
