import { IncomingMessage, ServerResponse } from 'http';
import log from 'scpdb-logger';

require('dotenv').config();
import { init, renderTemplate } from './interwiki';

const query = require('micro-query');

const PAGE_NAME_REGEXP = /^[\w-:]*$/;

init();

module.exports = (req: IncomingMessage, res: ServerResponse) => {
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
  log(message, {
    type: 'request',
    addr: ip as string,
    client,
    s1: wiki,
    s2: lang,
    s3: page
  });

  return renderTemplate(wiki, page, lang);
};
