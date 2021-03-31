const BaseComponent = require('./BaseComponent');

/**
 * @module Embed
 */
module.exports = class Embed extends BaseComponent {
    constructor(data = {}) {
        super();
        this.type = 'embed';
        this.title = data.title ? data.title : null;
        this.description = data.description ? data.description : null;
        this.url = data.url ? data.url : null;
        this.timestamp = data.timestamp ? data.timestamp : null;
        this.colour = data.colour ? data.colour : null;
        this.footer = data.footer ? data.footer : null;
        this.image = data.image ? data.image : null;
        this.thumbnail = data.thumbnail ? data.thumbnail : null;
        this.author = data.author ? data.author : null;
        this.fields = data.fields ? data.fields : [];
    }

    /**
     * Set the title of the embed.
     * @param {string} title - The new title
     * @returns {this} The new embed.
     */
    setTitle(title) {
        if (typeof title !== 'string') throw new Error('The title must be a string');
        this.title = title;
        return this;
    }

    /**
     * Set the description of the embed.
     * @param {string} description - The new description
     * @returns {this} The new embed.
     */
    setDescription(description) {
        if (typeof description !== 'string') throw new Error('The description must be a string');
        this.description = description;
        return this;
    }

    /**
     * Set the url of the embed.
     * @param {string} url - The new url
     * @returns {this} The new embed.
     */
    setUrl(url) {
        if (typeof url !== 'string') throw new Error('The url must be a string');
        this.url = url;
        return this;
    }

    /**
     * Set the image of the embed.
     * @param {string} url - The new image url.
     * @returns {this} The new embed.
     */
    setImage(url) {
        if (typeof url !== 'string') throw new Error('The url must be a string');
        this.image = {url};
        return this;
    }

    /**
     * Set the timestamp of the embed.
     * @param {string} time - The new timestamp.
     * @returns {this} The new embed.
     */
    setTimestamp(time = Date.now()) {
        time = new Date(time);
        if (isNaN(time)) throw new Error('The time must be a valid date.');
        this.timestamp = time.toISOString();
        return this;
    }

    /**
     * Set the thumbnail of the embed.
     * @param {string} url - The new thumbnail url.
     * @returns {this} The new embed.
     */
    setThumbnail(url) {
        if (typeof url !== 'string') throw new Error('The url must be a string');
        this.thumbnail = { url };
        return this;
    }

    /**
     * Set the footer of the embed.
     * @param {string} text - The new footer text.
     * @param {string} icon - The new footer icon.
     * @returns {this} The new embed.
     */
    setFooter(text, icon) {
        if (typeof text !== 'string') throw new Error('The text must be a string');
        if (icon !== undefined && typeof icon !== 'string') throw new Error('The icon must be a string');
        this.footer = {
            text,
            icon_url: icon
        };
        return this;
    }

    /**
     * Add a field to the embed.
     * @param {string} name - The new field name.
     * @param {string} value - The new field value.
     * @param {boolean} inline - Weather the field should be inline or not..
     * @returns {this} The new embed.
     */
    addField(name, value, inline) {
        if (typeof name !== 'string') throw new Error('The name must be a string');
        if (typeof value !== 'string') throw new Error('The value must be a string');
        if (inline !== undefined && typeof inline !== 'boolean') throw new Error('The value must be a boolean');
        this.fields.push({
            name,
            value,
            inline
        });
        return this;
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     */
    toString() {
        return '';
    }

    /**
     * Convert to a JSON string like Guilded likes.
     * @returns {object}
     */
    toJSON() {
        return {
            object: 'block',
            type: 'webhookMessage',
            data: {
                embeds: [{
                    type: 'rich',
                    title: this.title,
                    description: this.description,
                    url: this.url,
                    footer: this.footer,
                    fields: this.fields,
                    image: this.image,
                    thumbnail: this.thumbnail
                }]
            },
            nodes: []
        };
    }
};