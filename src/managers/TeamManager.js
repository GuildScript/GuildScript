const BaseManager = require('./BaseManager');
const Team = require('../structures/Team');

/**
 * Manages Teams.
 * @module TeamManager
 */
module.exports = class TeamManager extends BaseManager {
    constructor(client) {
        super(client);
    }
    /**
     * Joins a team
     * @param  {String} id - invite id
     */
    async join(id) {
        if(id == null) throw new Error('You must supply an id!');
        if(typeof(id) != 'string') throw new Error('Id must be a string!');

        let data = await this.client.request({ path: `invites/${id}`, method: 'put' });
        if (!data.ok) throw new Error(`${data.status} error joining team ${id}!`);
        return data.res;
    }

    async fetch(id, cache = true, force = false) {
        if(!force && this.has(id)) {
            return this.get(id);
        }
        let data = await this.client.request({path: `teams/${id}`, method: 'get'});
        if (!data.ok) throw new Error(`${data.status} error fetching team data for ${id}!`);
        let team = new Team(this.client, data.res.team); 
        if(cache) this.set(id, team);
        return team;
    }
};