const ParagraphComponent = require('./ParagraphComponent');

/**
 */
const ChannelMention = class ChannelMention extends ParagraphComponent {
    constructor(raw) {
        super();
        this.type = 'channelMention';
        this.id = raw.data.channel.id;
        this.name = raw.data.channel.name;
        this.channel = null;
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     */
    toString() {
        return `#${this.name}`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     */
    toJSON() {
        return {
            object: 'inline',
            type: 'channel',
            data: {
                channel: {
                    name: this.name,
                    id: this.id,
                }
            },
            nodes: [{
                object: 'text',
                leaves: [{
                    object: 'leaf',
                    text: `#${this.name}`,
                    marks: []
                }]
            }]
        };
    }
};

module.exports = ChannelMention;