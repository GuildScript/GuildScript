// const Team = require('./Team');
// const Channel = require('./Channel');

module.exports = class Message {
    constructor(client, data) {
        this.client = client;
        this.apply(data);
    }

    apply(data) {
        const { channelId, teamId, message: { id, content, createdAt }, createdBy: authorId  } = data;

        this.channel = channelId;
        this.team = teamId;
        this.id = id;
        this.content = this.parseDom(content);
        this.createdAt = new Date(createdAt);
        this.createdAtTimestamp = this.createdAt.getTime();
        this.author = authorId;
    }

    parseDom(dom) {
        dom = dom.document.nodes;
        let message = {
            lines: [],
            text: ''
        };

        dom.forEach(node => {
            switch(node.type) {

            case 'paragraph': {
                let line = {
                    text: '',
                    nodes: []
                };
                node.nodes.forEach(p => {
                    switch(p.object) {

                    case 'text': {
                        p.leaves.forEach(l => {
                            let text = l.text;
                            if(text != '') {
                                line.nodes.push({
                                    type: 'text',
                                    text: text.replace(/\r/g,'')
                                });
                                line.text += text;
                            }
                        });
                        break;
                    }

                    case 'inline': {
                        switch(p.type) {

                        case 'reaction': {
                            line.nodes.push({
                                type: 'emoji',
                                emoji: {
                                    id: p.data.reaction.id,
                                    name: p.data.reaction.customReaction.name,
                                    image: p.data.reaction.customReaction.png
                                }
                            });
                            line.text += `${p.nodes[0].leaves[0].text}`;
                            break;
                        }

                        case 'mention': {
                            line.nodes.push({
                                type: 'mention',
                                user: p.data.mention.id
                            });
                            line.text += `@${p.data.mention.name}`;
                            break;
                        }

                        case 'channel': {
                            line.nodes.push({
                                type: 'channel',
                                channel: p.data.channel.id
                            });
                            line.text += `#${p.data.channel.name}`;
                            break;
                        }

                        }
                        break;
                    }

                    }
                });
                message.lines.push(line.nodes);
                message.text += line.text + '\n';
                break;
            }

            case 'block-quote-container': {
                break;
            }

            case 'markdown-plain-text': {
                break;
            }

            }
        });
        message.text = message.text.replace(/\r/g,'').substring(0, message.text.length - 1);
        return message;
    } 

    async update() {

    }
};
