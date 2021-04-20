// const Channel = require('./');

/**
 * Typing info. 
 */
const TypingEvent = class TypingEvent {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { type, channelId, userId } = data;
        this.type = type;
        this.channel = channelId;
        this.user = await this.client.users.fetch(userId);
    }

    async update() {

    }
};



module.exports = TypingEvent;