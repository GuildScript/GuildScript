const BaseComponent = require('./BaseComponent');

/**
 * @module Markdown
 */
module.exports = class Markdown extends BaseComponent {
    constructor(content) {
        super();
        this.content = content;
        this.type = 'markdown-plain-text';
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     */
    toString() {
        return this.content;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
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