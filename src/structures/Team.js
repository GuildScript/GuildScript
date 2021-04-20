const Role = require('./Role');
const User = require('./User');

/**
 */
const Team = class Team {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { id, name, subdomain, bio, timezone, type, rolesById: roles, createdAt, ownerId, measurements, memberCount, profilePicture: iconURL, isVerified, isPublic } = data;
        /**
         * The id of the team.
         * @type {number}
         */
        this.id = id;
        /**
         * The name of the team.
         * @type {string}
         */
        this.name = name;
        /**
         * The custom url of the team.
         * @type {string}
         */
        this.subdomain = subdomain;
        /**
         * The team bio
         * @type {?string}
         */
        this.bio = bio;
        /**
         * The timezone of the team.
         * @type {?string}
         */
        this.timezone = timezone;
        /**
         * The type of the team.
         * @type {?string}
         */
        this.type = type;
        /**
         * The roles in the team.
         * @type {Role[]}
         */
        this.roles = Object.values(roles).map(r => new Role(this.client, r));
        /**
         * The time the team was created.
         * @type {Date}
         */
        this.createdAt = new Date(createdAt);
        /**
         * The timestamp the team was created at.
         * @type {number}
         */
        this.createdAtTimestamp = this.createdAt.getTime();
        /**
         * The id of the owner of the team.
         * @type {string}
         */
        this.ownerId = ownerId;
        /**
         * The owner of the team.
         * @type {?User}
         */
        this.owner = this.client.users.cache.get(this.ownerId);
        /**
         * Various stats for the team
         * @type {Object}
         */
        this.measurements = measurements;
        /**
         * The member count of the team
         * @type {?number}
         */
        this.memberCount = memberCount;
        /**
         * The icon URL of the team
         * @type {string}
         */
        this.iconURL = iconURL;
        /**
         * Wether or not the team is verified
         * @type {bool}
         */
        this.isVerified = isVerified;
        /**
         * Wether or not the team is public
         * @type {bool}
         */
        this.isPublic = isPublic;
    }

    async update() {

    }
};



module.exports = Team;