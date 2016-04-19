// ==UserScript==
// @name         restart
// @namespace  restart@gmail.com
// @description  重启
// @Author       kfwokai
// @charset       UTF-8
// ==/UserScript==
(function () {
        CustomizableUI.createWidget({
                id : "ReStartBtn",
                defaultArea : CustomizableUI.AREA_NAVBAR,
                label : "重启",
                tooltiptext : "左键重启;中鍵：重新啟動但停用附加元件;右键重启并清除缓存",
                onClick : function (event) {
                        switch (event.button) {
                        case 0:
                                Application.restart();
                                break;
                        case 1:
                                safeModeRestart();
                                break;
                        case 2:
                                // 右键：重新启动并清除缓存
                                event.preventDefault();
                                Services.appinfo.invalidateCachesOnRestart() || Application.restart();
                                break;
                        }
                }
        });

        var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
                 + '#ReStartBtn .toolbarbutton-icon {'
                 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjElEQVQ4jd2SsQ3EIAxFXaRKnR0yCwtRZwqQd2MW3jUIBSIb5ZqTzg0y+H9//C3yh6Hsr+5vBYhCzy+24VSqJE4fPJOMNYco9alkBnskiSCZaKkoJvD+LaVYBNUFL+uU0gf2lYJMlERwCRYz2NuUD+PdcGHscDa/w7AHieDvwawkE5srVZTS8sUm/io+PKl7d76KTN4AAAAASUVORK5CYII=)'
                 + '}}';
        var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
        var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
        sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();
