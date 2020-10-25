// Notes while making a message component
// It must extend this!!!
// The format will affect the behaviour.
// Methods all must have:
// output should return what the will be sent to guilded. 
// 'text' only:
// Must have toText and toPureText format.
// toText returns the format that will show up in markdown.
// toPureText should return the text with no formatting.
// 'misc' only:
// Uhh i can't think of any



/**
 * Represents a component in a message.
 */
module.exports = class BaseMessage {
    /**
     * Represents a component in a message.
     * @param {Object} [options] - The options for the component.
     * @param {'misc'|'text'} [options.format] - The format of the message. This must be 'misc' or 'text'. Misc are for formats that can't be converted to text (such as images, files and embeds). Things that can be converted to text (in MD) should use text.
     * @param {string} [options.type] - The type of the option. This should be what your thing is called. E.G. text, emoji, embed, bold, codeBlock, etc.
     */
    constructor(options = {}) {
        const { format, type } = options;
        this.format = format || 'misc';
        this.type = type || 'unknown';
        this.content = null;
    }
};