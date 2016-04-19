// ==UserScript==
// @name SmartScrollbar.uc.js
// @namespace http://d.hatena.ne.jp/Griever/
// @include main
// @version 0.0.5
// @note 0.0.5 Remove E4X
// @note CSS を微調整
// @note SmartScrollbar に改名

// @note 滚动条样式修改


// ==/UserScript==
// thx! http://www.geocities.jp/adsldenet/past/sample.html

(function(){
  const HIDE_START = true;
  const HIDE_ALL = true; // falseならコンテンツの一番外側のスクロールバーのみ有効
  const HIDE_SCROLLBAR = false;

  // 色、太さは適宜調整
  var css = '\
html|html > scrollbar[orient="vertical"] > slider > thumb\
{\
max-width: 5px !important;\
min-width: 5px !important;\
}\
\
html|html > scrollbar[orient="horizontal"] > slider > thumb\
{\
max-height: 5px !important;\
min-height: 5px !important;\
}\
\
html|html > scrollbar > slider > thumb\
{\
-moz-appearance: none !important;\
border: none !important;\
background-color: #0c6 !important;\
}\
\
html|html > scrollbar > scrollbarbutton,\
html|html > resizer\
{\
display: none !important;\
}\
';

  if (HIDE_SCROLLBAR)
    css = 'html|html > scrollbar { visibility: collapse !important; }';
  var NS = '@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");';
      NS += '@namespace html url("http://www.w3.org/1999/xhtml");';
  css = NS + css;

  if (HIDE_ALL)
    css = css.replace(/html\|html > /g, 'html|*:not(html|select) > ');
  
  var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));

  var p = document.getElementById('devToolsSeparator');
  var m = document.createElement('menuitem');
  m.setAttribute('label', "\u30B9\u30AF\u30ED\u30FC\u30EB\u30D0\u30FC\u3092\u8868\u793A\u3057\u306A\u3044");
  m.setAttribute('type', 'checkbox');
  m.setAttribute('autocheck', 'false');
  m.setAttribute('checked', HIDE_START);
  p.parentNode.insertBefore(m, p);

  m.addEventListener('command', command, false);

  if (HIDE_START) {
    sss.loadAndRegisterSheet(uri,sss.AGENT_SHEET);
  }


  function command(){
    if (sss.sheetRegistered(uri, sss.AGENT_SHEET)){
      sss.unregisterSheet(uri, sss.AGENT_SHEET);
      m.setAttribute('checked', false);
    } else {
      sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
      m.setAttribute('checked', true);
    }
  }
  
})();