/**
 * Parses the raw messages sent from guilded into a much more manageable form.
 * @param {Object} dom - The raw dom of the message.
 */
module.exports = (dom) => {
    dom = dom.document.nodes;
    console.log(dom);
    let message = {
        lines: [],
        attachments: [],
        text: ''
    };

    dom.forEach(node => {
        switch (node.type) {

        case 'paragraph': {
            let line = {
                text: '',
                nodes: []
            };
            node.nodes.forEach(p => {
                switch (p.object) {

                case 'text': {
                    p.leaves.forEach(l => {
                        let text = l.text;
                        if (text != '') {
                            line.nodes.push({
                                type: 'text',
                                text: text.replace(/\r/g, ''),
                                formatting: l.marks.map(m => m.type)
                            });
                            line.text += text;
                        }
                    });
                    break;
                }

                case 'inline': {
                    switch (p.type) {

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

        case 'code-container': {
            let code = '';

            node.nodes.forEach(line => {
                code += line.nodes[0].leaves[0].text + '\n'; 
            });

            code = code.substring(0, code.length - 1);

            message.lines.push({
                type: 'code',
                language: node.data.language,
                code: code
            });

            message.text += '```' + node.data.language + '\n' + code + '\n```\n';
            break;
        }

        case 'image': {
            message.lines.push({
                type: 'image',
                link: node.data.src
            });
            message.attachments.push(node.data.src);
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
    message.text = message.text.replace(/\r/g, '').substring(0, message.text.length - 1);
    return message;
};