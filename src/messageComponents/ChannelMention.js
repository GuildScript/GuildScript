const ParagraphComponent = require('./ParagraphComponent');

module.exports = class ChannelMention extends ParagraphComponent {
    constructor(raw) {
        super();
        this.type = 'channelMention';
        this.id = raw.data.channel.id;
        this.name = raw.data.channel.name;
        this.channel = null;
    }

    toString() {
        return `#${this.name}`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * Note: I still don't understand how these work so it might not work.
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