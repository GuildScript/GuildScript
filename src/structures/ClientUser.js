const User = require('./User');

module.exports = class ClientUser extends User {
    constructor(client, data) {
        super(client, data);
    }

    async setPresence(type) {
        let status;
        if(typeof type === 'number') status = type;
        let valid = ['online', 'idle', 'dnd', 'invisible'];
        status = valid.findIndex(v => v === type) + 1;
        if(status > 4 || status < 1) throw new Error(`Invalid status. Please choose one of ${valid.join(', ')}.`);
        let {ok, status: res } = await this.client.request({path: 'users/me/presence', data: JSON.stringify({status})});
        if(!ok) throw new Error(`${res} error while trying ot change status!`);
        return true;
    }
};