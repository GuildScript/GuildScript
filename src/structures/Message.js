// const Team = require('./Team');
// const Channel = require('./Channel');

module.exports = class Message {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    apply(data) {
        const { channelId, teamId, message: { id, content, createdAt }, createdBy: authorId  } = data;

        this.channel = channelId;
        this.team = teamId;
        this.id = id;
        this.content = content;
        this.createdAt = new Date(createdAt);
        this.createdAtTimestamp = this.createdAt.getTime();
        this.author = authorId;
    }

    async update() {

    }
};

