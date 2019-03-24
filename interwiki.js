'use strict';

const {init: initRegistry, getWikiListByPageName} = require('./registry');
const {render: renderTemplate} = require('./template');

module.exports = {
    init: function init() {
        initRegistry();
    },

    render: function render({wiki, page, lang}) {
        const preparedPageName = page
            .replace('forum:category', 'forum:start')
            .replace('forum:thread', 'forum:start')
            .replace(/^sandbox:/, '');

        const list = getWikiListByPageName(preparedPageName)
            .filter(pageWiki => pageWiki !== wiki);

        console.log('list', list);

        return renderTemplate(list, lang, preparedPageName);
    }
};
