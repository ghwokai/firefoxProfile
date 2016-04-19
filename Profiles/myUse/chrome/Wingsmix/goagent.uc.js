// ==UserScript==
// @name         startGoagent
// @namespace  startGoagent@gmail.com
// @description  启动GoAgent
// @Author       kfwokai
// @charset       UTF-8
// ==/UserScript==
(function () {
    CustomizableUI.createWidget({
        id : "goa-button",
        defaultArea : CustomizableUI.AREA_NAVBAR,
        label : "GAE",
        tooltiptext : "启动GOAGENT",
        onClick : function (event) {
            switch (event.button) {
            case 0:
                // 左键：启动GoAgent
                var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
    file.initWithPath("D:\\GreenSoft\\g3\\goagent-3.0\\local\\goagent.exe");
    file.launch();
    return file;
                break;
          /*  case 2:
                // 右键：关闭GoAgent
     event.preventDefault();
     var file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
    file.appendRelativePath("Local\\CloseGAE.bat");
    file.launch();
    return file;
                break;*/
            }
        }
    });

  var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
        + '#goa-button .toolbarbutton-icon {'
        + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAS0lEQVQ4jWNgwAZm/v+PFRMNIBpC0fDwNQBXgCEwwgCsAYvdNmwY0wVEGoA7GvEYQFzc4zWA2MAmmOoIBTJuk4kQw++0oW8AkQEGACOWC2orj3r5AAAAAElFTkSuQmCC)'
        + '}}';
        var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
        var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
        sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();
