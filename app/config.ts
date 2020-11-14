'use strict';

export const titlesByLang: {[lang: string]: string} = {
  ru: 'На других языках',
  en: 'Languages',
  pl: 'W innych językach',
  de: 'In anderen Sprachen',
  cn: '其他语言',
  es: 'En otros idiomas',
  it: 'In altre lingue',
  th: 'ภาษาอื่น',
  ko: '다른 언어',
  jp: '他言語版',
  fr: 'Dans d’autres langues',
  ua: 'Іншими мовами',
  pt_br: 'Em outros idiomas',
  cs: 'V jiných jazycích',
  zh_tr: '其他語言',
};

interface InterWikiBranch {
  title: string;
  name: string;
  url: string;
}

export const sites: {[name: string]: InterWikiBranch} = {
  'scp-int': {
    title: 'International',
    name: 'International',
    url: 'http://scp-int.wikidot.com',
  },
  'scp-ru': {
    title: 'Русский',
    name: 'Russian',
    url: 'http://scpfoundation.net',
  },
  'scp-wiki': {
    title: 'English',
    name: 'English',
    url: 'http://www.scp-wiki.net',
  },
  'scp-wiki-de': {
    title: 'Deutsch',
    name: 'German',
    url: 'http://scp-wiki-de.wikidot.com',
  },
  'scp-pl': {
    title: 'Polski',
    name: 'Polish',
    url: 'http://scp-wiki.net.pl',
  },
  fondationscp: {
    title: 'Français',
    name: 'French',
    url: 'http://fondationscp.wikidot.com',
  },
  lafundacionscp: {
    title: 'Español',
    name: 'Spanish',
    url: 'http://lafundacionscp.wikidot.com',
  },
  fondazionescp: {
    title: 'Italiano',
    name: 'Italian',
    url: 'http://fondazionescp.wikidot.com',
  },
  'scp-wiki-cn': {
    title: '中文',
    name: 'Chinese',
    url: 'http://scp-wiki-cn.wikidot.com',
  },
  scpko: {
    title: '한국어',
    name: 'Korean',
    url: 'http://ko.scp-wiki.net',
  },
  'scp-jp': {
    title: '日本語',
    name: 'Janapese',
    url: 'http://ja.scp-wiki.net',
  },
  'scp-th': {
    title: 'ภาษาไทย',
    name: 'Thai',
    url: 'http://scp-th.wikidot.com',
  },
  'scp-ukrainian': {
    title: 'Українська',
    name: 'Ukrainian',
    url: 'http://scp-ukrainian.wikidot.com',
  },
  'scp-pt-br': {
    title: 'Português',
    name: 'Portugese',
    url: 'http://scp-pt-br.wikidot.com',
  },
  'scp-cs': {
    title: 'Česky',
    name: 'Czech',
    url: 'http://scp-cs.wikidot.com',
  },
  'scp-zh-tr': {
    title: '繁體中文',
    name: 'Traditional Chinese',
    url: 'http://scp-zh-tr.wikidot.com',
  },
};
