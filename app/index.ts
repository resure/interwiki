import { IncomingMessage, ServerResponse } from 'http';
import log from 'scpdb-logger';

require('dotenv').config();
import { init, renderTemplate } from './interwiki';

const query = require('micro-query');

const PAGE_NAME_REGEXP = /^[\w-:]*$/;

init();

const COLOR_REGEXP = /^[0-9abcdef]{6}$/;
function parseColor(input: string = ''): string {
  const color = input.toLowerCase();
  if (color === 'transparent' || COLOR_REGEXP.test(input)) {
    return color;
  }
  return '';
}

module.exports = (req: IncomingMessage, res: ServerResponse) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const client = req.headers['user-agent'] || '';

  const params = query(req);
  const wiki = params.wiki || 'scp-wiki';
  const lang = params.lang || 'en';
  const page = (params.page || '').replace(/^_default:/, '');

  const styles = {
    linkColor: parseColor(params.linkColor),
    titleColor: parseColor(params.titleColor),
    borderColor: parseColor(params.borderColor),
    bgColor: parseColor(params.bgColor),
    hideBorder: params.hideBorder === '1',
  };

  if (!page || !PAGE_NAME_REGEXP.test(page)) {
    return '';
  }

  log('', {
    type: 'request',
    addr: ip as string,
    client,
    s1: wiki,
    s2: lang,
    s3: page,
  });

  return renderTemplate(wiki, page, lang, styles);
};
