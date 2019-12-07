(function() {
  document.addEventListener('DOMContentLoaded', () => {
    if(typeof HTMLDialogElement == 'undefined') {
      const polyfillScript = document.createElement('script');
      polyfillScript.src = "js/polyfills/dialog-polyfill.js";
      document.head.appendChild(polyfillScript);
      document.head.insertAdjacentHTML('beforeEnd', '<link rel="stylesheet" type="text/css" href="css/polyfills/dialog-polyfill.css" media="screen">');
      polyfillScript.addEventListener('load', () => {
        dialogPolyfill.registerDialog(document.querySelectorAll('dialog')[0]);
        dialogPolyfill.registerDialog(document.querySelectorAll('dialog')[1]);
      })
    }
  })
})();
