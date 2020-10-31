const BaseComponent = require("./BaseComponent");
/**
 * @module CodeBlock
 */
module.exports = class CodeBlock extends BaseComponent {
    constructor(code, lang = 'unformatted') {
        super();
        this.content = code;
        this.language = lang;
        this.type = 'codeBlock';
    }

    /**
     * Converts the message into a string-like format.
     * @returns {string}
     */
    toString() {
        return `${'```'}${this.language}\n${this.content}\n${'```'}`
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
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
                }
            })
        };
    }
};