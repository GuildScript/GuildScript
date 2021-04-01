const TextBasedChannel = require('../structures/TextBasedChannel');
const TextChannel = require('../structures/TextChannel');
const BaseManager = require('./BaseManager');

/**
 * Manages channels.
 * @module ChannelManager
 */
module.exports = class ChannelManager extends BaseManager {
    async fetch(guildID, channelID, cache = true, force = false) {
        if (!force && this.has(channelID))
            return this.get(channelID);
        let data;
        if (guildID) data = await this.client.request({ path: `teams/${guildID}/channels`, method: 'get' });
        else data = await this.client.request({ path: `users/${this.client.user.id}/channels`, method: 'get' });
        if (!data.ok) throw new Error(`${data.status} error fetching team data for ${channelID}!`);
        const { channels, categories } = data.res;
        if (cache) {
            channels.forEach(c => {
                if (c.contentType === 'chat') this.set(c.id, new TextChannel(this.client, c));
                else this.set(c.id, new TextBasedChannel(this.client, c));
            });
            return this.get(channelID);
        }
        else {
            let res;
            let chn = channels.find(c => c.id === channelID);
            if (chn.contentType === 'chat') res = new TextChannel(this.client, chn);
            else res = new TextBasedChannel(this.client, chn);
            if (res) return res;
        }
        throw new Error('Channel not found.');
    }
};