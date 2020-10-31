const CodeBlock = require('./messageComponents/CodeBlock');
const MessageBuilder = require('./messageComponents/MessageBuilder');
const Paragraph = require('./messageComponents/Paragraph');

/**
 * Parses the raw messages sent from guilded into a much more manageable form.
 * @param {Object} dom - The raw dom of the message.
 * @module parseDom
 * @private
 */
module.exports = (dom) => {
    dom = dom.document.nodes;
    let message = new MessageBuilder();
    dom.forEach(node => {
        switch (node.type) {
        case 'paragraph': {
            message.add(new Paragraph(node, {raw: true}));
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
            // message.lines.push({
            //     type: 'image',
            //     link: node.data.src
            // });
            // message.attachments.push(node.data.src);
            break;
        }

        case 'block-quote-container': {
            break;
        }

        case 'markdown-plain-text': {
            break;
        }

        case 'unordered-list': {
            break;
        }

        case 'ordered-list': {
            break;
        }

        case 'form': {
            break;
        }
        }
    });
    return message;
};