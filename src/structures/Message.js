// const Team = require('./Team');
// const Channel = require('./Channel');
const parseDom = require('../parseDom');
const externalPromise = require('../externalPromise');
const UnknownChannel = require('./UnkownChannel');

/**
 */
const Message = class Message {
    /**
     * Represents a message.
     */
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { promise, resolve, reject } = externalPromise();
        /**
         * @private
         * @type {Promise}
         */
        this.ready = promise;
        try {
            const { channelId, teamId, message: { id, content, createdAt }, createdBy: authorId } = data;

            /**
             * The user who sent the message
             * @type {User}
             */
            this.author = await this.client.users.fetch(authorId);
            try {
                /**
                 * The channel the message was in.
                 * @type {TextBasedChannel|ThreadChannel|TextChannel|UnknownChannel}
                 */
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
            /**
             * The team the message was in. 
             * @type {?Team}
             */
            this.team = teamId;
            /**
             * The id of the channel
             * @type {string}
             */
            this.id = id;
            /**
             * The content of the message. Keep in mind this is a MessageBuilder. If you want it as a string run .toString() on it.
             * @see {@link MessageBuilder}
             * @type {MessageBuilder}
             */
            this.content = parseDom(content);
            /**
             * The raw content as a string
             * @type {*}
             */
            this.rawContent = content;
            /**
             * The date it was created at.
             * @type {Date}
             */
            this.createdAt = new Date(createdAt);
            /**
             * The timestamp it was created at.
             * @type {number}
             */
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