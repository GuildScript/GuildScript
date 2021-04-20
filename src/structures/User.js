/**
 * Represents a user on guilded.
 */
const User = class User {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    apply(data) {
        const { id, name, subdomain, joinDate, userStatus: status, aboutInfo: about, profilePicture, lastOnline } = data;
        /**
         * The id of the user
         * @type {string}
         */
        this.id = id;
        /**
         * the name of the user
         * @type {string}
         */
        this.name = name;
        /**
         * The user's profile URL
         * @type {?string}
         */
        this.subdomain = subdomain;
        /**
         * The time the user joined Guilded.
         * @type {Date}
         */
        this.joinTime = new Date(joinDate);
        /**
         * The timestamp the user joined Guilded.
         * @type {string}
         */
        this.joinTimestamp = this.joinTime.getTime();
        /**
         * User status object
         * @see https://guildedapi.com/resources/user/#user-status-object
         * @type {object}
         */
        this.status = status;
        /**
         * The users bio and tagline
         * @type {object}
         */
        this.about = about;
        /**
         * The date the user was last online.
         * @type {Date}
         */
        this.lastOnline = new Date(lastOnline);
        /**
         * The timestamp the user was last online.
         * @type {number}
         */
        this.lastOnlineTimestamp = this.lastOnline.getTime();
        /**
         * The url of the user's avatar
         * @type {string}
         */
        this.avatarURL = profilePicture;
        /**
         * The timestamp the user's info was last updated
         * @type {string}
         */
        this.lastUpdated = Date.now();
    }

    /**
     * Updates the user's info.
     * @returns {Promise<this>}
     */
    async update() {
        let data = await this.client.request({ path: `users/${this.id}`, method: 'get' });
        if (!data.ok) throw new Error(`${data.status} error fetching user data for ${this.id}!`);
        this.apply(data.res.user);
        return this;
    }
};



module.exports = User;