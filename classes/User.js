module.exports = class User {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    apply(data) {
        const { id, name, subdomain, joinDate, userStatus: status, aboutInfo: about, profilePicture, lastOnline } = data;
        this.id = id;
        this.name = name;
        this.subdomain = subdomain;
        this.joinTime = new Date(joinDate);
        this.joinTimestamp = this.joinTime.getTime();
        this.status = status;
        this.about = about;
        this.lastOnline = new Date(lastOnline);
        this.lastOnlineTimestamp = this.lastOnline.getTime();
        this.avatarURL = profilePicture;
        this.lastUpdated = Date.now();
    }

    async update() {
        let data = await this.client.request({ path: `users/${this.id}`, method: 'get' });
        if (!data.ok) throw new Error(`${data.status} error fetching user data for ${this.id}!`);
        this.apply(data.res.user);
        return this;
    }
};

