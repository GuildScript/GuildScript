const BaseManager = require('./BaseManager');
const User = require('../structures/User');

/**
 * Manages users.
 * */
const UserManager = class UserManager extends BaseManager {
    constructor(client) {
        super(client);
    }
    
    async fetch(id, { cache = true, force = false } = {}) {
        if(!force && this.has(id)) {
            return this.get(id);
        }
        let data = await this.client.request({path: `users/${id}`, method: 'get'});
        if (!data.ok) throw new Error(`${data.status} error fetching user data for ${id}!`);
        let user = new User(this.client, data.res.user); 
        if(cache) this.set(id, user);
        return user;
    }
};

module.exports = UserManager;