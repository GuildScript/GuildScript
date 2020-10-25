const BaseMessage = require('./BaseMessage');

module.exports = class Text extends BaseMessage {
    constructor (content) {
        super(content, {format: 'text', type: 'text'});
    }

    
};