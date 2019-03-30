'use strict';

import { sites, titlesByLang } from './config';

function generateWikiLink(wikiName: string, pageName: string) {
  const url = `${sites[wikiName].url}/${pageName}`;
  const language = sites[wikiName].title;
  return `<div class="interwiki__entry"><a href="${url}">${language}</a></div>`;
}

export default function render(list: string[], lang: string, pageName: string) {
  if (!list.length) {
    return '';
  }

  const sortedList = list.sort((a, b) => (sites[a].name > sites[b].name ? 1 : -1));

  return `

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>SCPNET Interwiki</title>
    <base target="_parent" />
    <style>
    body {
        margin: 0;
        padding: 5px;
        font-size: 0.80em;
    }
    /* width: 217px; */
    .interwiki {
        font-family: Verdana, Arial, Helvetica, sans-serif;
        padding: 10px;
        border: 1px solid #660000;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(102,0,0,.5);
        background: #fff;
        margin: 0;
        box-sizing: border-box;
        width: 16.25em;
    }
    .interwiki__title {
        color: #600;
        border-bottom: solid 1px #600;
        padding-left: 15px;
        margin-top: 10px;
        margin-bottom: 5px;
        font-size: 8pt;
        font-weight: bold;
    }
    .interwiki__entry {
        position: relative;
        margin: 2px 0;
    }
    .interwiki__entry:before {
        content: "■";
        font-size: 7px;
        color: #b01;
        position: relative;
        margin: 0 7px 0 5px;
        bottom: 3px;
    }
    .interwiki__entry a, .interwiki__entry a:visited {
        font-weight: bold;
        color: #b01;
        text-decoration: none;
        background: transparent;
    }
    .interwiki__entry a:hover {
        text-decoration: underline;
    }
    @media (min-width: 14.375em) {
        .interwiki {
            width: 17em;
        }
    }
    </style>
</head>
<body>
    <div class="interwiki">
        <div class="interwiki__title">${titlesByLang[lang] || 'Unknown language'}</div>
        ${sortedList.map(wikiName => generateWikiLink(wikiName, pageName)).join('\n')}
    </div>
    <!-- SCP Foundation Russia Networks -->
</body>
</html>

    `.trim();
}
