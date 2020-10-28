const ParagraphComponent = require('./ParagraphComponent');

module.exports = class Link extends ParagraphComponent {
    constructor(url, content) {
        super();
        this.type = 'link';
        this.url = url;
        this.content = content || url;
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
            object: 'inline',
            type: 'link',
            data: {
                href: this.url
            },
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