const CodeBlock = require('./messageComponents/CodeBlock');
const MessageBuilder = require('./messageComponents/MessageBuilder');
const Paragraph = require('./messageComponents/Paragraph');
const GuildedImage = require('./messageComponents/GuildedImage');
const GuildedVideo = require('./messageComponents/GuildedVideo');
const Embed = require('./messageComponents/Embed');
const Markdown = require('./messageComponents/Markdown');
const RawComponent = require('./messageComponents/GuildedImage');

/**
 * Parses the raw messages sent from guilded into a much more manageable form.
 * @param {Object} dom - The raw dom of the message.
 * @returns {MessageBuilder}
 * @private
 */
const parseDom = (dom) => {
    dom = dom.document.nodes;
    let message = new MessageBuilder();
    dom.forEach(node => {
        switch (node.type) {
            case 'paragraph': {
                message.add(new Paragraph(node, { raw: true }));
                break;
            }

            case 'code-container': {
                let code = '';

                node.nodes.forEach(line => {
                    code += line.nodes[0].leaves[0].text + '\n';
                });

                code = code.substring(0, code.length - 1);
                message.add(new CodeBlock(code, node.data.language));
                break;
            }

            case 'image': {
                message.add(new GuildedImage(node.data.src));
                break;
            }

            case 'video': {
                message.add(new GuildedVideo(node.data.src));
                break;
            }

            case 'webhookMessage': {
                node.data.embeds.forEach(e => message.add(new Embed(e)));
                break;
            }

            // case 'block-quote-container': {
            //     break;
            // }

            case 'markdown-plain-text': {
                message.add(new Markdown(node.nodes[0].leaves[0].text));
                break;
            }

            // case 'unordered-list': {
            //     break;
            // }

            // case 'ordered-list': {
            //     break;
            // }

            // case 'form': {
            //     break;
            // }
            default: {
                message.add(RawComponent(node));
                break;
            }
        }
    });
    return message;
};

module.exports = parseDom;