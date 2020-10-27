const ParagraphComponent = require('./ParagraphComponent');

module.exports = class EmojiText extends ParagraphComponent {
    constructor(raw) {
        super();
        this.type = 'emoji';
        this.id = raw.data.reaction.id;
        this.name = raw.data.reaction.customReaction.name;
        this.image = raw.data.reaction.customReaction.png;
        // Get the emoji if cached.
    }

    toString() {
        return `:${this.name}:`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * Note: I still don't understand how these work so it might not work.
     */
    toJSON() {
        return {
            object: 'inline',
            type: 'reaction',
            data: {
                reaction: {
                    id: this.id,
                    customReactionId: this.id,
                    customReaction: {
                        id: this.id,
                        name: this.name,
                        png: this.image,
                        webp: this.image,
                        apng: null
                    }
                }
            },
            nodes: [{
                object: 'text',
                leaves: [{
                    object: 'leaf',
                    text: `:${this.name}:`,
                    marks: []
                }]
            }]
        };
    }
};