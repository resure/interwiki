# SCP Foundation InterWiki

InterWiki is a special sidebar block that renders links to other wikis that have translation of the current opened page. You can see it in action on many INT branches ([example](http://o.scp.su/682)).



## Integration
First step is universal for all branches: add following styles to the `component:theme` page after `@imports` (or in the end of the file, but before `[[/code]]`):

```css
div.scpnet-interwiki-wrapper {
    width: 17em;
    margin-left: -5px;
}

iframe.scpnet-interwiki-frame {
    height: 325px;
    width: 17em;
    border: none;
}

@media (min-width: 768px) {
    iframe.scpnet-interwiki-frame {
        height: 325px;
        width: 18em;
    }
    div.scpnet-interwiki-wrapper {
        width: 18em;
    }
}
```

ext step is little different for branches: add code block from below to your `nav:side` page (it's recommended to add that as the last block). You should replace `wiki` and `lang` parameters with ones matching to your wiki.

```
[[div class="scpnet-interwiki-wrapper"]]
[[module ListPages range="." limit="1"]]
      [[iframe http://interwiki.scpdb.org/?wiki=scp-wiki&lang=en&page=%%category%%:%%name%% class="scpnet-interwiki-frame"]]
[[/module]]
[[/div]]
```

For the full list of supported wikis and languages see [`config.ts`](https://github.com/resure/interwiki/blob/master/app/config.ts).


## Customization

Visual style of the InterWiki block is matching default theme for SCP wiki sites. However, we support some options for customization:

- `hideBorder` - set to `true` to hide borders altogether with inner padding and shadow around block
- `titleColor`, `linkColor`, `bgColor` - pass hex color values (6 symbols, without `#` in the begging, like `ce44cd` or `4444dd`) to override default colors for title, links and background accordingly

Examples of customization:

- [Just hidden border](https://interwiki.scpdb.org/?wiki=scp-ru&lang=ru&page=_default:scp-173&hideBorder=1)
- [Just custom colors](https://interwiki.scpdb.org/?wiki=scp-ru&lang=ru&page=_default:scp-173&titleColor=ce44cd&linkColor=ffffdd&bgColor=4444dd)
- [Hidden border, custom colors](https://interwiki.scpdb.org/?wiki=scp-ru&lang=ru&page=_default:scp-173&hideBorder=1&titleColor=ce44cd&linkColor=4444dd&bgColor=ffffdd)

