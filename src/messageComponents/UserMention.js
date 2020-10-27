const ParagraphComponent = require('./ParagraphComponent');

module.exports = class UserMention extends ParagraphComponent {
    constructor(raw) {
        super();
        this.type = 'userMention';
        this.id = raw.data.mention.id;
        this.name = raw.data.mention.name;
        this.user = null;
    }

    toString() {
        return `@${this.name}`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * Note: I still don't understand how these work so it might not work.
     */
    toJSON() {
        return {
            object: 'inline',
            type: 'mention',
            data: {
                mention: {
                    type: 'person',
                    name: this.name,
                    id: this.id,
                }
            },
            nodes: [{
                object: 'text',
                leaves: [{
                    object: 'leaf',
                    text: `@${this.name}`,
                    marks: []
                }]
            }]
        };
    }
};