(function() {
  const breakPoints = {
    "md": "568px" ,
    "lg": "1024px"
  };

  const deferredStyles = {
    "screen": [
      'css/variables/palette.css',
      'css/variables/filters.css',
      'css/variables/times.css',
      'css/themes/theme-light.css',
      'css/components/dialog.css',
      'css/components/form.css'
    ],
    "screen_md": [
      'css/components/dialog_md.css',
      'css/components/form_md.css',
    ],
    "screen_lg": [
      'css/page/header_lg.css',
      'css/page/navbar_lg.css',
      'css/page/content_lg.css',
      'css/page/footer_lg.css'
    ],
    "theme_print": 'css/page/page-print.css',
    "theme_dark": 'css/themes/theme-dark.css'
  };

  const addStyleSheetToHead = (href, media) => {
    const styleHTML = `<link rel="stylesheet" type="text/css" href="${href}" media="${media}">`;
    document.head.insertAdjacentHTML('beforeEnd', styleHTML)
  };

  window.addEventListener('DOMContentLoaded', () => {
    deferredStyles.screen.forEach(style => addStyleSheetToHead(style, 'screen'));
    deferredStyles.screen_md.forEach(style => addStyleSheetToHead(style, `screen and (min-width: ${breakPoints.md})`));
    deferredStyles.screen_lg.forEach(style => addStyleSheetToHead(style, `screen and (min-width: ${breakPoints.lg})`));
    addStyleSheetToHead(deferredStyles.theme_dark, 'screen and (prefers-color-scheme: dark)');
    addStyleSheetToHead(deferredStyles.theme_print, 'print');
  });
})();
