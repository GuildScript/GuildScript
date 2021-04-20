const BaseComponent = require('./BaseComponent');

/**
 */
const Markdown = class Markdown extends BaseComponent {
    /**
     * Represents markdown text in a message.
     * @param {string} content - The content.
     * @extends {BaseComponent}
     */
    constructor(content) {
        super();
        this.content = content;
        this.type = 'markdown-plain-text';
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     * @private
     */
    toString() {
        return this.content;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     * @private
     */
    toJSON() {
        return {
            object: 'block',
            type: 'markdown-plain-text',
            data: {},
            nodes: [{
                object: 'text',
                leaves: [{
                    object: 'leaf',
                    text: this.content,
                    marks: []
                }]
            }]
        };
    }
};

module.exports = Markdown;