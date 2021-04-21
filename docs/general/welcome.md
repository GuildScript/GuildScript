# GuildScript
A discord.js-like client for Guilded.

**WARNING:** GuildScript is in an early beta right now and as such features might be missing, incomplete, not documented and/or changed.

Guilded's api is also not public so things might break unexpectedly.

## Installation

to install GuildScript run 
```bash
yarn add guildscript
# or
npm install guildscript
```
## Usage
**Note:** Usage might change as this is in early development.
```js
const Guilded = require('guildscript');
const client = new Guilded.Client();

client.on('ready' () => {
    console.log(`Logged in as ${client.user.name}.`);
});

client.on('message' () => {
    let content = message.content.toString();
    if(content === '!ping') message.channel.send('pong!');
});

client.login('email', 'username');
```

If you wish you can view an example bot [here](https://github.com/WilsontheWolf/WilsonBot).