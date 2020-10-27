const ParagraphComponent = require('./ParagraphComponent');

module.exports = class Text extends ParagraphComponent {
    constructor(text, formatting = []) {
        super();
        if (!Array.isArray(formatting)) formatting = [formatting];
        this.type = 'text';
        this.text = text;
        this.formatting = formatting;
    }

    toString() {
        return this.text;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * Note: I still don't understand how these work so it might not work.
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