const BaseManager = require('./BaseManager');
const User = require('../structures/User');

/**
 * Manages users.
 * @extends {BaseManager}
 */
const UserManager = class UserManager extends BaseManager {
    constructor(client) {
        super(client);
    }
    
    /**
     * Fetch a user from the api.
     * @param {string} id - Required. The id of the user to fetch.
     * @param {object} [options] - The options for the fetch.
     * @param {boolean} [options.cache=true] - If this is set to false the user will not be cached.
     * @param {boolean} [options.force=false] - If this is false it will fetch it even if it's cached.
     * @returns {Promise<User>}
     */
    async fetch(id, { cache = true, force = false } = {}) {
        if(!force && this.cache.has(id)) {
            return this.cache.get(id);
        }
        let data = await this.client.request({path: `users/${id}`, method: 'get'});
        if (!data.ok) throw new Error(`${data.status} error fetching user data for ${id}!`);
        let user = new User(this.client, data.res.user); 
        if(cache) this.cache.set(id, user);
        return user;
    }
};

module.exports = UserManager;