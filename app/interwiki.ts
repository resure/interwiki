import { init as initRegistry, getWikiListByPageName } from './registry';
import render from './template';

export function init() {
  initRegistry();
}

export function renderTemplate(wiki: string, page: string, lang: string) {
  const preparedPageName = page
    .replace('forum:category', 'forum:start')
    .replace('forum:thread', 'forum:start')
    .replace(/^sandbox:/, '');

  const list = getWikiListByPageName(preparedPageName)
    .filter(pageWiki => pageWiki !== wiki);

  return render(list, lang, preparedPageName);
}
