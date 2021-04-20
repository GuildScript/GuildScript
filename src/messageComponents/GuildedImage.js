const BaseComponent = require('./BaseComponent');

const RawComponent = class RawComponent extends BaseComponent {
    /**
     * Represents an unknown component in a message.
     * @param {*} content - The content.
     * @extends {BaseComponent}
     */
    constructor(content) {
        super();
        /**
         * The source of the image.
         * @type {string}
         */
        this.content = content;
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
        return this.content;
    }
};

module.exports = RawComponent;