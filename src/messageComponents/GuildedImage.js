const BaseComponent = require('./BaseComponent');

module.exports = class GuildedImage extends BaseComponent {
    constructor(src) {
        super();
        this.src = src;
    }

    /**
     * Converts the message into a string-like format.
     * @returns {null}
     */
    toString() {
        return null;
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