const BaseComponent = require('./BaseComponent');

const GuildedImage = class GuildedImage extends BaseComponent {
    constructor(src) {
        super();
        this.src = src;
    }

    /**
     * Converts the message into a string-like format.
     * @returns {String}
     */
    toString() {
        return '';
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
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