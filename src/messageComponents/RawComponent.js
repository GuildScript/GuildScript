const BaseComponent = require('./BaseComponent');

const GuildedImage = class GuildedImage extends BaseComponent {
    /**
     * Represents an image in a message.
     * @param {string} src - The source of the image.
     * @extends {BaseComponent}
     */
    constructor(src) {
        super();
        /**
         * The source of the image.
         * @type {string}
         */
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
            type: 'image',
            data: {
                src: this.src
            },
            nodes: [ { object: 'text', leaves: [ { object: 'leaf', text: '', marks: [] } ] } ]
        };
    }
};

module.exports = GuildedImage;