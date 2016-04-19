// ==UserScript==
// @name         TabsBackFrontToggle2
// @namespace  TabsBackFrontToggle2@gmail.com
// @description  切换新标签页前后台打开方式
// @Author       kfwokai
// @charset       UTF-8
// ==/UserScript==


(function () {
	CustomizableUI.createWidget({
		id : "back-front-button2",
		defaultArea : CustomizableUI.AREA_NAVBAR,
		label : "前后台切换",
		tooltiptext : "左键前台|右键后台 ",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				
				gPrefService.setBoolPref("browser.tabs.loadInBackground",false);gPrefService.setBoolPref("browser.tabs.loadDivertedInBackground",false);gPrefService.setBoolPref("browser.tabs.loadBookmarksInBackground",false);
				break;
			/*case 1:
			break;*/
			case 2:
				event.preventDefault();
				gPrefService.setBoolPref("browser.tabs.loadInBackground",true);
				gPrefService.setBoolPref("browser.tabs.loadDivertedInBackground",true);
				gPrefService.setBoolPref("browser.tabs.loadBookmarksInBackground",true);

				break;						                                       
			
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#back-front-button2 .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4jWNgoBqY+f8/SRirAaRYNogMINXvGGFBis1YXYLNAJLE0CVwRRVRBsDY6DRJLsClEaehxPgXr7eoHoikALgBFCUkCgEAkvfeu6LiNGoAAAAASUVORK5CYII=)'
		 + '}}';
var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr),null, null), sss.USER_SHEET);
})();
