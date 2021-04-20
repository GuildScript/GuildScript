const TextBasedChannel = require('../structures/TextBasedChannel');
const TextChannel = require('../structures/TextChannel');
const ThreadChannel = require('../structures/ThreadChannel');
const BaseManager = require('./BaseManager');

/**
 * Manages the caching and fetching of channels.
 * @extends {BaseManager}
 */
const ChannelManager = class ChannelManager extends BaseManager {
    /**
     * Fetch a channel from the api.
     * @param {string} channelID - Required. The id of the channel to fetch.
     * @param {object} [options] - The options for the fetch.
     * @param {string} [options.parentID] - The parent id. If the type is "thread" then this is the message id. Otherwise this is the guild id. If none is specified then it will get dm channels.
     * @param {'thread'} [options.type] - If it is "thread" then it will fetch a thread, otherwise it will fetch a channel.
     * @param {boolean} [options.cache=true] - If this is set to false the channel will not be cached.
     * @param {boolean} [options.force=false] - If this is false it will fetch it even if it's cached.
     * @returns {Promise<TextBasedChannel|ThreadChannel|TextChannel>}
     */
    async fetch(channelID, { parentID, type, cache = true, force = false } = {}) {
        if (!force && this.cache.has(channelID))
            return this.cache.get(channelID);
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
                if (c.threadMessageId) this.cache.set(c.id, new ThreadChannel(this.client, c));
                else if (c.contentType === 'chat') this.cache.set(c.id, new TextChannel(this.client, c));
                else this.cache.set(c.id, new TextBasedChannel(this.client, c));
            });
            const chn = this.cache.get(channelID);
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