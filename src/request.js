const fetch = require('node-fetch');
const baseURL = 'https://api.guilded.gg';

/**
 * Make a request to the api.
 * @param {Object} options - The options for the request.
 * @param {string} options.path - The path to go request.
 * @param {*} options.data - The data to send.
 * @param {string} [options.method='post'] - The method.
 * @param {object} options.cookies - The cookies to send.
 * @param {boolean} [options.json=true] - If you want to receive a JSON response.
 * @returns {Promise<object>} The response from the server.
 * @module
 * @private
 */
module.exports = async (options = {}) => {
    let {
        path,
        cookies,
        data: body = {},
        method = 'post',
        json = true
    } = options;
    let data = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookies.join(', ')
        }
    };
    if(method === 'post') data.body = body;
    let res = await fetch(`${baseURL}/${path}`, data);
    cookies = res.headers.raw()['set-cookie'];
    let fin = {
        res: json ? await res.json() : await res.text(),
        cookies,
        ok: res.ok,
        status: res.status
    };
    return fin;
};