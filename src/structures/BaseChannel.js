/**
 * @private
 */
const BaseChannel = class BaseChannel {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    /**
     * 
     * @param {*} data 
     * @private
     */
    async apply(data) {
        
    }

    async update() {

    }
};



module.exports = BaseChannel;