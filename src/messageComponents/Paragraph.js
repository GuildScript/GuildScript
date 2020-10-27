const BaseComponent = require('./BaseComponent');
const ChannelMention = require('./ChannelMention');
const EmojiText = require('./EmojiText');
const ParagraphComponent = require('./ParagraphComponent');
const Text = require('./Text');
const UserMention = require('./UserMention');

module.exports = class Paragraph extends BaseComponent {
    constructor(data, options = {}) {
        super();
        const {raw}  = options;
        this.content = [];
        this.type = 'paragraph';
        if(raw)
            data.nodes.forEach(p => {
                switch (p.object) {

                case 'text': {
                    p.leaves.forEach(l => {
                        this.content.push(new Text(l.text, l.marks.map(m => m.type)));
                    });
                    break;
                }

                case 'inline': {
                    switch (p.type) {

                    case 'reaction': {
                        //todo: take an emoji object
                        this.content.push(new EmojiText(p));
                        break;
                    }

                    case 'mention': {
                        this.content.push(new UserMention(p));
                        break;
                    }

                    case 'channel': {
                        this.content.push(new ChannelMention(p));

                        break;
                    }

                    }
                    break;
                }

                }
            });
        else {
            if(typeof data === 'string') this.content.push(new Text(data));
            else if(Array.isArray(data)) this.content = data.filter(v => v instanceof ParagraphComponent); 
        }
    }

    toString() {
        return this.content.map(c => c.toString()).join('');
    }

    add(data) {
        if (!(data instanceof ParagraphComponent) && typeof data !== 'string') throw new Error('Please provide a valid component.');
        if (data instanceof ParagraphComponent) {
            this.content.push(data);
            return this;
        } else {
            this.content.push(new Text(data));
            return this;
        }
    }

    /**
 * Convert to a  JSON string like Guilded likes.
 * Note: I still don't understand how these work so it might not work.
 */
    toJSON() {
        return {
            object: 'block',
            type: 'paragraph',
            data: {},
            nodes: this.content.map(c => c.toJSON())
        };
    }
};