const ParagraphComponent = require('./ParagraphComponent');

const EmojiText = class EmojiText extends ParagraphComponent {
    /**
     * Represents the a emoji in a message.
     * @extends {ParagraphComponent}
     */
    constructor(raw) {
        super();
        this.type = 'emoji';
        this.id = raw.data.reaction.id;
        this.name = raw.data.reaction.customReaction.name;
        this.image = raw.data.reaction.customReaction.png;
        // Get the emoji if cached.
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     * @private
     */
    toString() {
        return `:${this.name}:`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     * @private
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

module.exports = EmojiText;