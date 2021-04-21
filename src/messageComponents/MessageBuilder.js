const BaseComponent = require('./BaseComponent');
const Markdown = require('./Markdown');
const Paragraph = require('./Paragraph');
const ParagraphComponent = require('./ParagraphComponent');

/**
 */
const MessageBuilder = class MessageBuilder {
    /**
     * Used to build messages.
     * @param  {...BaseComponent|ParagraphComponent|string} components - The components to initialize with.
     */
    constructor(...components) {
        /**
         * The contents of the message.
         * @type {Array.<(BaseComponent|ParagraphComponent)>}
         */
        this.content = [];
        this.add(...components);
    }

    /**
     * Add a component to the message.
     * @param {BaseComponent|ParagraphComponent|string} component - The component to add.
     * @returns {this}
     */

    add(...inputs) {
        inputs.forEach(data => {
            if (data instanceof BaseComponent) {
                this.content.push(data);
            } else if (data instanceof ParagraphComponent) {
                let l = this.content[this.content.length - 1];
                if (l instanceof Paragraph) l.add(data);
                else this.content.push(new Paragraph(data));
            } else if (typeof data === 'string')
                this.content.push(new Markdown(data));
            else throw new Error('Please provide a valid component.');
        });
        return this;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     * @private
     */
    toJSON() {
        return {
            object: 'value',
            document: {
                object: 'document',
                data: {},
                nodes: this.content.map(c => c.toJSON())
            }
        };
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     * @private
     */
    toString(options = {}) {
        return this.content.map(c => c.toString(options)).filter(v => v).join('\n');
    }
};

module.exports = MessageBuilder;