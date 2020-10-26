const baseComponent = require('../messageComponents/BaseComponent');

module.exports = class MessageBuilder {
    /**
     * Used to build messages.
     * @param  {...baseComponent} components - The components to initialize with.
     */
    constructor(...components) {
        this.components = components;
    }

    /**
     * Add a component to the message.
     * @param {baseComponent} component - The component to add.
     * @returns {this}
     */
    add(component) {
        if(!(component instanceof baseComponent)) throw new Error('You must provide a message component.');
        this.components.push(component);
        return this;
    }

    /**
     * Convert to a  JSON string like Guilded likes.
     * Note: I still don't understand how these work so it might not work.
     */
    toJSON() {
        return {
            object: 'value',
            document: {
                object: 'document',
                data: {},
                nodes: this.components.map(c => c.toJSON())
            }
        };
    }
};