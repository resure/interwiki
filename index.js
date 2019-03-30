'use strict';

require('dotenv').config();
const query = require('micro-query');
const logToClickHouse = require('scpdb-ch-logger');
const {init, render} = require('./interwiki');

const PAGE_NAME_REGEXP = /^[\w-:]*$/;

init();

module.exports = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const client = req.headers['user-agent'] || '';

    const params = query(req);
    const wiki = params.wiki || 'scp-wiki';
    const lang = params.lang || 'en';
    const page = (params.page || '').replace(/^_default:/, '');

    if (!page || !PAGE_NAME_REGEXP.test(page)) {
        return '';
    }

    const message = `wiki=${wiki} lang=${lang} page=${page}`;
    logToClickHouse({
        type: 'request',
        message,
        addr: ip,
        client
    });
    console.log(message);

    return render({wiki, page, lang});
};
