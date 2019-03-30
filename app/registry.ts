import log from 'scpdb-logger';
import { sites } from './config';

const WikidotKit = require('wikidot-kit');
const fs = require('fs');

const cacheFilePath = process.env.INTERWIKI_FILE_CACHE_PATH;

if (!process.env.WIKIDOT_API_TOKEN) {
  throw new Error('No WIKIDOT_API_TOKEN found, exiting');
}

const wk = new WikidotKit({
  token: process.env.WIKIDOT_API_TOKEN,
});

let pages: { [name: string]: string[] } = {};
if (cacheFilePath) {
  try {
    pages = JSON.parse(fs.readFileSync(cacheFilePath));
  } catch {
    // noop
  }
}

async function updatePagesRegistry() {
  try {
    log('Updating page lists');

    const requests = Object.keys(sites).map(siteName => wk.fetchPagesList({ wiki: siteName }));

    const pageLists: Array<Array<string>> = await Promise.all(requests);

    pages = {};

    pageLists.forEach((pageList, i) => {
      const wikiName = Object.keys(sites)[i];

      pageList.forEach((pageName) => {
        if (pages[pageName]) {
          pages[pageName].push(wikiName);
        } else {
          pages[pageName] = [wikiName];
        }
      });
    });

    if (cacheFilePath) {
      try {
        fs.writeFileSync(cacheFilePath, JSON.stringify(pages));
      } catch (error) {
        console.error('Error writing cache file', error);
      }
    }

    log('Page lists updated');
  } catch (error) {
    log(`Error updating page lists: ${error}`);
  }
}

export function init() {
  if (process.env.INTERWIKI_DISABLE_PERIODIC_UPDATES) {
    log('Periodic updates are disabled');
  } else {
    updatePagesRegistry().catch(console.error);
    setInterval(updatePagesRegistry, 1000 * 60 * 60); // 60 min
  }
}

export function getWikiListByPageName(pageName: string): string[] {
  return pages[pageName] || [];
}
