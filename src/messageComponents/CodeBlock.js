const BaseComponent = require('./BaseComponent');

/**
 */
const CodeBlock = class CodeBlock extends BaseComponent {
    /**
     * Represents a codeblock in a message.
     * @param {string} code - The code in the codeblock.
     * @param {string} lang - The language of the codeblock.
     * @extends {BaseComponent}
     */
    constructor(code, lang = 'unformatted') {
        super();
        this.content = code;
        this.language = lang;
        this.type = 'codeBlock';
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     * @private
     */
    toString() {
        return `${'```'}${this.language}\n${this.content}\n${'```'}`;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     * @private
     */
    toJSON() {
        return {
            object: 'block',
            type: 'code-container',
            data: {
                language: this.language
            },
            nodes: this.content.split('\n').map(text => {
                return {
                    object: 'block',
                    type: 'code-line',
                    data: {},
                    nodes: [{
                        object: 'text',
                        leaves: [{
                            object: 'leaf',
                            text,
                            marks: []
                        }]
                    }]
                };
            })
        };
    }
};

module.exports = CodeBlock;