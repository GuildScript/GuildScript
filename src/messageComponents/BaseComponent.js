
/**
 * Represents a component in a message.
 */
module.exports = class BaseComponent {
    constructor(rawData) {
        this.raw = rawData;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     */
    toJSON() {
        // when extending this you might want to add your own logic to it.
        return this.rawData;
    }
};