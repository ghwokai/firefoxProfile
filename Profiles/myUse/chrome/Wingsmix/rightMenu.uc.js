// ==UserScript==
// @name         rightMenu
// @namespace  rightMenu@gmail.com
// @description  修改一些扩展菜单。
// @Author       kfwokai
// @charset       UTF-8
// ==/UserScript==

if (location == "chrome://browser/content/browser.xul") {
	//TileView扩展下拉三角菜单改到右键菜单，配合CSS隐藏三角
    //#tileview-buttonmenu > .toolbarbutton-menubutton-dropmarker { display:none !important; }
	(function (doc) {
		var tileviewBtnMenu = doc.getElementById('tileview-buttonmenu');
		if (!tileviewBtnMenu )
			return;
		var menupopup = tileviewBtnMenu.firstChild;
		tileviewBtnMenu.addEventListener("click", function (e) {
			if (e.button == 2) {
				e.preventDefault();
				menupopup.openPopup(this, "after_pointer", 0, 0, false, false);
			}
		}, false);
	})(document);
    //油猴GreaseMonkey，配合CSS隐藏三角
    //#greasemonkey-tbb > .toolbarbutton-menubutton-dropmarker { display:none !important; }
    //修改下拉三角菜单到左键，原来的左键功能改到右键
    (function (doc) {
		var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
		if (!greasemonkeyTBB)
			return;
		var menupopup = greasemonkeyTBB.firstChild;
		greasemonkeyTBB.addEventListener("click", function (e) {
			if (e.button == 0) {
				e.preventDefault();
				menupopup.openPopup(this, "after_pointer", 0, 0, false, false);
			}//左键
			else if (e.button == 2) {
				e.preventDefault();
				GM_util.setEnabled(!GM_util.getEnabled()); GM_BrowserUI.refreshStatus();
			}//右键
		}, false);
	})(document);
}
