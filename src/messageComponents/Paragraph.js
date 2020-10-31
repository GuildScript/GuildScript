const BaseComponent = require('./BaseComponent');
const ChannelMention = require('./ChannelMention');
const EmojiText = require('./EmojiText');
const Link = require('./Link');
const ParagraphComponent = require('./ParagraphComponent');
const Text = require('./Text');
const UserMention = require('./UserMention');

/**
 * @module Paragraph
 */
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
                        if(l.text == '') return;
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

                    case 'link': {
                            this.content.push(new Link(p.data.href, p.nodes[0].leaves[0].text));
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
            else if(data instanceof ParagraphComponent) this.content.push(data);
        }
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     */
    toString() {
        return this.content.map(c => c.toString()).join('');
    }

    /**
     * Add a component to the paragraph.
     * @param {ParagraphComponent|string} component - The component to add.
     * @returns {this}
     */
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
     * @returns {object}
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