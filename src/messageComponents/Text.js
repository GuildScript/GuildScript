const ParagraphComponent = require('./ParagraphComponent');

/**
 * @module Text
 */
module.exports = class Text extends ParagraphComponent {
    constructor(text, formatting = []) {
        super();
        if (!Array.isArray(formatting)) formatting = [formatting];
        this.type = 'text';
        this.text = text;
        this.formatting = formatting;
    }

    /**
     * Convert to a string.
     * @returns {string}
     */
    toString(options = {}) {
        if (options.text || !this.formatting || !this.formatting[0])
            return this.text;
        else {
            const list = {
                bold: '**',
                spoiler: '||',
                strikethrough: '~~',
                italic: '*',
                underline: '__',
                'inline-code-v2': '`'
            };
            let res = this.text;
            this.formatting.forEach(f => {
                let c = list[f];
                if(!c) return;
                res = c + res + c;
            });
            return res;
        }
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * @returns {object}
     */
    toJSON() {
        return {
            object: 'text',
            leaves: [{
                object: 'leaf',
                text: this.text,
                marks: this.formatting.map(type => {
                    return {
                        object: 'mark',
                        type,
                        data: {}
                    };
                })
            }]
        };
    }
};