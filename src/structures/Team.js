const Role = require('./Role');
const User = require('./User');

/**
 * */
const Team = class Team {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        const { id, name, subdomain, bio, timezone, type, rolesById: roles, createdAt, ownerId, measurements, memberCount, profilePicture: iconURL, isVerified, isPublic } = data;
        this.id = id;
        this.name = name;
        this.subdomain = subdomain;
        this.bio = bio;
        this.timezone = timezone;
        this.type = type;
        this.roles = Object.values(roles).map(r => new Role(this.client, r));
        this.createdAt = new Date(createdAt);
        this.createdAtTimestamp = this.createdAt.getTime();
        this.ownerId = ownerId;
        this.owner = new User(this.client, this.ownerId);
        this.measurements = measurements;
        this.memberCount = memberCount;
        this.iconURL = iconURL;
        this.isVerified = isVerified;
        this.isPublic = isPublic;
    }

    async update() {

    }
};



module.exports = Team;