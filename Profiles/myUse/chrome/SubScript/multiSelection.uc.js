// ==UserScript==
// @name           multiSelection.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @include        main
// @description    alt+鼠标选择断开的文本
// @author         Alice0775
// @version        2013/09/13 00:00 Bug 856437 Remove Components.lookupMethod
// @version        2009/06/05 18:00 デザインモードなときは無視
// @version        2008/07/23 18:00
// @note           selectLinkTextWithAltKey.uc.jsもあると尚良い
// ==/UserScript==
var multiSelection = {
  kCARET: "accessibility.browsewithcaret",
  selRange: [],

  init: function(){
    gBrowser.addEventListener('load', this, true);
    window.addEventListener('unload', this, false);
    gBrowser.mPanelContainer.addEventListener('mouseup', this, false);
    //gBrowser.mPanelContainer.addEventListener('keyup', this, true);
  },
  uninit: function(){
    gBrowser.removeEventListener('load', this, true);
    gBrowser.mPanelContainer.removeEventListener('mouseup', this, false);
    //gBrowser.mPanelContainer.removeEventListener('keyup', this, true);
  },
  handleEvent: function(event){
    switch(event.type){
      case "load":
        this.detach();
        break;
      case "unload":
        this.uninit();
        break;
      case "mouseup":
        if (event.button == 0 &&
            event.altKey && !event.ctrlKey && !event.shiftKey ){
          this.getSelection(event);
        } else {
          this.detach();
        }
        break;
      case "keyup":
        var doc = event.originalTarget.ownerDocument;
        if(doc.contentType != 'text/plain'
           && doc.contentType != 'text/html'
           && doc.contentType != 'application/xml'
           && doc.contentType != 'application/xhtml+xml')
          return;

        //designModeなら何もしない
        if (doc.designMode == 'on')
          return;

        if (this.getPref(this.kCARET, 'bool', false))
          return

        if (event.altKey &&
            (event.keyCode == KeyEvent.DOM_VK_LEFT ||
             event.keyCode == KeyEvent.DOM_VK_RIGHT ||
             event.keyCode == KeyEvent.DOM_VK_UP ||
             event.keyCode == KeyEvent.DOM_VK_DOWN ||
             event.keyCode == KeyEvent.DOM_VK_PAGE_DOWN ||
             event.keyCode == KeyEvent.DOM_VK_PAGE_UP ) ){
          this.getSelection(event);
        } else {
          this.detach();
        }
        break;
    }
  },
  getFocusedWindow: function(){ //現在のウインドウを得る
    var focusedWindow = document.commandDispatcher.focusedWindow;
    if (!focusedWindow || focusedWindow == window)
      return window.content;
    else
      return focusedWindow;
  },
  getSelection: function(event){

    var doc, selectionRange, flg, selRange, selCon;
    var targetWindow = this.getFocusedWindow();
    var selection = targetWindow.getSelection();
    for (var i = 0; i < selection.rangeCount; i++){
      selectionRange = selection.getRangeAt(i);
      flg = false;
      for (var j = 0; j < this.selRange.length; j++){
        if (this.selRange[j] == selectionRange){
          flg = true;
          break;
        }
      }
      if (!flg)
        this.selRange.push(selectionRange);
    }
    for (var i = 0; i < this.selRange.length; i++){
      selRange = this.selRange[i];
      doc = selRange.startContainer.ownerDocument
      selCon = this.getSelconForDoc(doc);
      if (!selCon)
        continue;
      selection = selCon.getSelection(selCon.SELECTION_NORMAL);
      selection.addRange(selRange);
    }
  },
  detach: function(){
    this.selRange =[];
  },

  getSelconForDoc: function getSelconForDoc(doc){
    var docShell = this.getDocShellForFrame(doc.defaultView);
    try {
      var selCon = docShell
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsISelectionDisplay)
        .QueryInterface(Components.interfaces.nsISelectionController);
      return selCon;
    } catch (e) {
      return null;
    }
  },

  getDocShellForFrame: function getDocShellForFrame(aFrame){
    return aFrame
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShell);
  },

  getPref: function(aPrefString, aPrefType, aDefault){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch2);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.getComplexValue(aPrefString, Components.interfaces.nsILocalFile); break;
        case 'str':
          return xpPref.getCharPref(aPrefString).toString(); break;
        case 'int':
          return xpPref.getIntPref(aPrefString); break;
        case 'bool':
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    }catch(e){
    }
    return aDefault;
  }
}
multiSelection.init();
