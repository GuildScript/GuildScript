const fetch = require('node-fetch');
const baseURL = 'https://www.guilded.gg/api';

/**
 * Make a request to the api.
 * @param {Object} options - The options for the request.
 * @param {string} options.path - The path to go request.
 * @param {*} options.data - The data to send.
 * @param {string} [options.method='post'] - The method.
 * @param {object} options.cookies - The cookies to send.
 * @param {boolean} [options.json=true] - If you want to receive a JSON response.
 * @param {boolean} [options.hardError=false] - Whether or not to throw an error if the request fails.
 * @returns {Promise<object>} The response from the server.
 * @private
 */
const request = async (options = {}) => {
    let {
        path,
        cookies,
        data: body = {},
        method = 'post',
        json = true,
        hardError = false
    } = options;
    let data = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookies.join(', ')
        }
    };
    if (method === 'post') data.body = body;
    try {
        let res = await fetch(`${baseURL}/${path}`, data);
        cookies = res.headers.raw()['set-cookie'];
        let fin = {
            res: json ? await res.json() : await res.text(),
            cookies,
            ok: res.ok,
            status: res.status
        };
        return fin;
    } catch (e) {
        if (hardError)
            throw new Error(`There was an ${e.name || 'Error'} making a ${method} request to ${path}.`);
        else return {
            res: json ? {message: e.message} : e.message,
            cookies,
            ok: false,
            status: e.name
        }
    }
};

module.exports = request;