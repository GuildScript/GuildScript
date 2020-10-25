module.exports = class BaseMessage {
    constructor(options = {}) {
        const { format, type} = options;
        this.format = format || 'text';
        this.type = type || 'misc';
    }
}