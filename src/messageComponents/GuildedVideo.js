const BaseComponent = require('./BaseComponent');

const GuildedVideo = class GuildedVideo extends BaseComponent {
    /**
     * Represents a video in a message.
     * @param {string} src - The source of the video.
     * @extends {BaseComponent}
     */
    constructor(src) {
        super();
        this.src = src;
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     * @private
     */
    toString() {
        return '';
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     * @private
     */
    toJSON() {
        return {
            object: 'block',
            type: 'video',
            data: {
                src: this.src
            },
            nodes: [ { object: 'text', leaves: [ { object: 'leaf', text: '', marks: [] } ] } ]
        };
    }
};

module.exports = GuildedVideo;