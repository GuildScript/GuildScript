const ParagraphComponent = require('./ParagraphComponent');

/**
 * @module Text
 */
module.exports = class Text extends ParagraphComponent {
    constructor(text, formatting = []) {
        super();
        if (!Array.isArray(formatting)) formatting = [formatting];
        this.type = 'text';
        this.text = text;
        this.formatting = formatting;
    }

    /**
     * Convert to a string.
     * @returns {string}
     */
    toString() {
        return this.text;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     */
    toJSON() {
        return {
            object: 'text',
            leaves: [{
                object: 'leaf',
                text: this.text,
                marks: this.formatting.map(type => {
                    return {
                        object: 'mark',
                        type,
                        data: {}
                    };
                })
            }]
        };
    }
};