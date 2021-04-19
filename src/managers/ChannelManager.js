const TextBasedChannel = require('../structures/TextBasedChannel');
const TextChannel = require('../structures/TextChannel');
const ThreadChannel = require('../structures/ThreadChannel');
const BaseManager = require('./BaseManager');

/**
 * Manages channels.
 */
const ChannelManager = class ChannelManager extends BaseManager {
    async fetch(channelID, { parentID, type, cache = true, force = false } = {}) {
        if (!force && this.has(channelID))
            return this.get(channelID);
        let channels;
        if (type === 'thread') {
            let data = await this.client.request({ path: `channels/${parentID}/threads`, method: 'get' });
            if (!data.ok) throw new Error(`${data.status} error fetching team data for ${channelID}!`);
            channels = data.res.threads;
        } else {
            let data;
            if (parentID) data = await this.client.request({ path: `teams/${parentID}/channels`, method: 'get' });
            else data = await this.client.request({ path: `users/${this.client.user.id}/channels`, method: 'get' });
            if (!data.ok) throw new Error(`${data.status} error fetching team data for ${channelID}!`);
            channels = [...data.res.channels, ...data.res.temporalChannels];
        }
        if (cache) {
            channels.forEach(c => {
                if (c.threadMessageId) this.set(c.id, new ThreadChannel(this.client, c));
                else if (c.contentType === 'chat') this.set(c.id, new TextChannel(this.client, c));
                else this.set(c.id, new TextBasedChannel(this.client, c));
            });
            const chn = this.get(channelID);
            if (chn) return chn;
        }
        else {
            let res;
            let chn = channels.find(c => c.id === channelID);
            // is a thread
            if (chn.threadMessageId) res = new ThreadChannel(this.client, chn);
            else if (chn.contentType === 'chat') res = new TextChannel(this.client, chn);
            else res = new TextBasedChannel(this.client, chn);
            if (res) return res;
        }
        throw new Error('Channel not found.');
    }
};

module.exports = ChannelManager;