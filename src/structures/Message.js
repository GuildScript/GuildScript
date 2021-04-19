// const Team = require('./Team');
// const Channel = require('./Channel');
const parseDom = require('../parseDom');
const externalPromise = require('../externalPromise');
const UnknownChannel = require('./UnkownChannel');

/**
 * */
const Message = class Message {
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
            try {
                this.channel = await this.client.channels.fetch(channelId, { parentID: teamId });
            } catch (e) {
                if (e.message === 'Channel not found.')
                    // This happens in some rare situations where there is a thread
                    // but I'm not participating and its not cached. To fetch it would 
                    // require me to loop through every channel and get all threads 
                    // but I'm lazy so instead I just got a dummy channel. 
                    // Guilded please fix your api!
                    this.channel = new UnknownChannel(this.client, channelId);
                // Otherwise the error is an error that we don't have to worry about.
                else throw e;
            }
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


module.exports = Message;