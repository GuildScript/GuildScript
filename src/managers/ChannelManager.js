const BaseChannel = require('../structures/BaseChannel');
const TextChannel = require('../structures/TextChannel');
const BaseManager = require('./BaseManager');

module.exports = class ChannelManager extends BaseManager {
    async fetch(guildID, channelID, cache = true, force = false) {
        if (!guildID) throw new Error('Must supply guid id.');
        if (!force && this.cache.has(channelID)) {
            return this.cache.get(channelID);
        }
        let data = await this.client.request({ path: `teams/${guildID}/channels`, method: 'get' });
        if (!data.ok) throw new Error(`${data.status} error fetching team data for ${channelID}!`);
        const { channels, categories } = data.res;
        if (cache) {
            channels.forEach(c => {
                if (c.contentType === 'chat') this.cache.set(c.channelId, new TextChannel(this.client, c));
                else this.cache.set(c.channelId, new BaseChannel(this.client, c));
            });
            return this.cache.get(channelID);
        }
        else {
            let res;
            let chn = channels.find(c => c.id === channelID);
            if (chn.contentType === 'chat') res = new TextChannel(this.client, chn);
            else res = new BaseChannel(this.client, chn);
            if(res) return res;
        }
        throw new Error('Channel not found.');
    }
};