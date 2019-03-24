'use strict';

const {sites} = require('./config');
const logToClickHouse = require('scpdb-ch-logger');
const WikidotKit = require('wikidot-kit');

if (!process.env.WIKIDOT_API_TOKEN) {
    throw new Error('No WIKIDOT_API_TOKEN found, exiting');
}

const wk = new WikidotKit({
    token: process.env.WIKIDOT_API_TOKEN
});

let pages = {};

async function updatePagesRegistry() {
    try {

        console.log('Updating page lists');
        logToClickHouse({
            type: 'event',
            message: 'Updating page lists',
        });

        const requests = Object.keys(sites).map(siteName => {
            return wk.fetchPagesList({wiki: siteName});
        });

        const pageLists = await Promise.all(requests);

        pages = {};

        pageLists.forEach((pageList, i) => {
            const wikiName = Object.keys(sites)[i];

            pageList.forEach(pageName => {
                if (pages[pageName]) {
                    pages[pageName].push(wikiName);
                } else {
                    pages[pageName] = [wikiName];
                }
            });
        });

        console.log('Page lists updated');
        logToClickHouse({
            type: 'event',
            message: 'Page lists updated',
        });

    } catch (error) {

        console.error('Error updating page lists', error);
        logToClickHouse({
            type: 'error',
            message: `Error updating page lists: ${error}`,
        });

    }
}

module.exports = {
    init: function () {
        updatePagesRegistry();
        setInterval(updatePagesRegistry, 1000 * 60 * 60); // 60 min
    },

    getWikiListByPageName: function (pageName) {
        return pages[pageName] || [];
    }
};
