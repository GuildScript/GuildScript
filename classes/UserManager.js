const BaseManager = require('./BaseManager');
const User = require('./User');

module.exports = class UserManager extends BaseManager {
    constructor(client) {
        super(client);
    }
    
    async fetch(id, cache = true) {
        let data = await this.client.request({path: `users/${id}`, method: 'get'});
        if (!data.ok) throw new Error(`${data.status} error fetching user data for ${id}!`);
        let user = new User(this.client, data.res.user); 
        if(cache) this.cache.set(id, user);
        return user;
    }
};