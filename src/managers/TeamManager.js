const BaseManager = require('./BaseManager');
const Team = require('../structures/Team');

/**
 * Manages Teams.
 * @extends {BaseManager}
 */
const TeamManager = class TeamManager extends BaseManager {
    constructor(client) {
        super(client);
    }
    /**
     * Joins a team
     * @param  {String} id - invite id
     */
    async join(id) {
        if(id == null) throw new Error('You must supply an id!');
        if(typeof(id) != 'string') throw new Error('ID must be a string!');

        let data = await this.client.request({ path: `invites/${id}`, method: 'put' });
        if (!data.ok) throw new Error(`${data.status} error joining team ${id}!`);
        return data.res;
    }

    /**
     * Fetch a team from the api.
     * @param {string} id - Required. The id of the team to fetch.
     * @param {object} [options] - The options for the fetch.
     * @param {boolean} [options.cache=true] - If this is set to false the team will not be cached.
     * @param {boolean} [options.force=false] - If this is false it will fetch it even if it's cached.
     * @returns {Promise<Team>}
     */
    async fetch(id, { cache = true, force = false } = {}) {
        if(!force && this.cache.has(id)) {
            return this.cache.get(id);
        }
        let data = await this.client.request({path: `teams/${id}`, method: 'get'});
        if (!data.ok) throw new Error(`${data.status} error fetching team data for ${id}!`);
        let team = new Team(this.client, data.res.team); 
        if(cache) this.cache.set(id, team);
        return team;
    }
};

module.exports = TeamManager;