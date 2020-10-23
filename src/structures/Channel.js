module.exports = class Team {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    async apply(data) {
        
    }

    async update() {

    }

        isTyping(user) {
        return this.client.typers;
    }
};

