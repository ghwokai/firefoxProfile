//**************v2015-11-25*************************//


//===========================
/*
二级菜单分割线ID
常用 common-use-sep
视频 videos-sep
图片 images-sep
其他引擎 other-search-sep
知识 knowledge-sep
资源 down-sep
其他 other-sep
 */
//================项目模板====================
/*
		{
			label:"",
			where : "tab",
			url:"",
			image:""
		},
*/
//===============指定站点指定菜单测试=========================
//
/*var testMenu = PageMenu({
    label: '测试子菜单',
    onpopupshowing: function (event){
        Array.slice(event.target.children).forEach(function(elem){
            if(elem.id == "mtest-video"){
                elem.hidden = content.location.host.indexOf("youku") == -1
            }
        });
    }
});
testMenu([
    {
        id: "mtest-video",
        label: "测试视频链接",
        hidden: true
    }
]);*/

/*page({
    label: '插入 code 代码',
    id: 'addMenu-insert-bbcode',
    condition:"input",
    insertBefore: "context-undo",
    oncommand: function() {
        var str = addMenu.convertText('[code]%P[/code]');
        addMenu.copy(str);
        goDoCommand('cmd_paste');
    },
    onshowing: function(menuitem) {
        var isHidden = !(content.location.host == 'bbs.kafan.cn');
        this.hidden = isHidden;
    },
})*/
//=====================隐藏相同项。必须，不能删除==================
function syncHidden(event) {
    Array.slice(event.target.children).forEach(function(elem){
        var command = elem.getAttribute('command');
        if (!command) return;
        var original = document.getElementById(command);
        if (!original) {
            elem.hidden = true;
            return;
        };
        elem.hidden = original.hidden;
        elem.collapsed = original.collapsed;
        elem.disabled = original.disabled;
    });
};
//====================================================================//
// command 屬性からオリジナルの hidden 等を連動させる関數
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
			elem.hidden = true;
			return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};

/**
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 */

// 既存の menupopup をサブメニューとして利用する関數
// menu に subpopup 屬性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var {screenY, screenX, width} = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};


//
// =============@label menu@添加标签页右键菜单项==================
tab([

    /*
     {
        id:"greasemonkey-tbb",//需要移动的图标ID
        insertBefore:"copyFav64",//插入位置的ID
        // clone: false,  // 不克隆，直接改在原来的菜单上面
    },
    */
    {
		label: "FavBase64复制|保存|URL",
		id:"copyFav64",
        tooltiptext: "左键:base64|中键:保存图标|右键:URL",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAGxsfGLkG0COczEMQGcTciL1DUB3LtkuwCc2BA0gOmpJso0cBUQZQFHGoQAAAGcot+LmGeY+AAAAAElFTkSuQmCC",
	  	onclick: function(e){
			switch(e.button){
				case 0:
					addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));
					break;
				case 1:
					saveURL(gBrowser.mCurrentTab.image, content.document.title || gBrowser.currentURI.spec, null, true, true, undefined, document);
					break;
				case 2:
					addMenu.copy(addMenu.convertText("%FAVICON%"));
					break;
			        	}
	        	}
	},
    {
        label: "复制页面标题|URL|标题+URL",
	  	tooltiptext: "左键:标题|中键:URL|右键:标题+URL",
	  	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUyEAaF4MDUNIMa5eL2A3Tb8TqSFAaSFMoYBeBUMXQNIikaibSNHAZHJloKMQwEAAER25NfppgiHAAAAAElFTkSuQmCC",
	   	onclick: function(e){
			switch(e.button){
				case 0:
					addMenu.copy(addMenu.convertText("%TITLE%"));
					break;
				case 1:
					addMenu.copy(addMenu.convertText("%URL%"));
					break;
				case 2:
					addMenu.copy(addMenu.convertText("%TITLE%\n%URL%"));
					break;
			}
	  	 }
	},
	{
		label:"复制域名|跳转到域名",
		tooltiptext:"左键:复制域名xxx.yyy.zzz|右键:新标签页打开域名xx.yyy.zzz",
		onclick:function(e){
			switch(e.button){
				case 0:
					addMenu.copy(addMenu.convertText("%HOST%"));
					break;
				case 2:
					var url = addMenu.convertText("%HOST%");
					gBrowser.addTab(url);
					break;
			}
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC"
	},
	{
        label: "复制所有标签标题+地址",
        class: "copy",
        oncommand: function(){
            var text = "";
            var tabs = gBrowser.mTabContainer.childNodes;
            for (var i = 0, l = tabs.length, doc; i < l; i++) {
                doc = tabs[i].linkedBrowser.contentDocument;
                text += doc.title + "\n" + doc.location.href + "\n";
            }
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(text);
        }
	},
	{},
	{
		label:"查看页面源代码(V)",
		command:"context-viewsource",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVQ4jWNgGGZg2n91hpn/63HKz/xfzzDtvzo+zf9RFMz8/x+OcanBq5koi0jRjNWQGf/3M0z774nmV/wGQAzxZJjxfz8VXECqN0gOSKJiAdUQMtPByAUAsvt85lizn10AAAAASUVORK5CYII="
	},
	{
		label:"在隱私窗口打開",
		oncommand: "openLinkIn(content.location, 'window',{private:true});",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
	},
	{
		label: "更改标签标题",
		//insertBefore: "context_reloadAllTabs",
		oncommand: function () {
		          	var tab = document.popupNode;
		                  var Tdocument = gBrowser.getBrowserForTab(tab).contentWindow.document;
		                  title = window.prompt("\u8BF7\u6307\u5B9A\u4E00\u4E2A\u65B0\u7684\u6807\u9898\uFF0C\u7A7A\u6807\u9898\u4E0D\u4F1A\u6539\u53D8\u3002", "");
		                  if (title!=null && title!="") {
		                  Tdocument.title = title;}
		            }
	},
	/*
	{
	            label: "切换编码（gbk、utf-8）",
	            accesskey: "e",
	            oncommand: function () {
	                var charset = gBrowser.mCurrentBrowser._docShell.charset;
	                BrowserSetForcedCharacterSet(charset == "gbk" ? "utf-8" : "gbk");
	            }
       	 },*/

/*
	{	label: "重新启动",
	       	//insertBefore: "appmenu_newTab",
	       	oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
	       	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAARZJREFUOE9jYKAmqK+vZ3JycooA4o1A/AqI/4NoR0fHTUAcBZKH2QcUr0ex28XFRRWo6CxUE0gjBgbJOzs7q4E0g+ThBgAFlYCSL0GCQPohEGe6uroq+vj4cNnb2yuA+CBxqKHfYIaDDYA6+zRUcIeHhwcftmCxsrLiBaq5jewysDqgyZFQwftAb/DjClOYs7EZsAnq9DRSNMPDAMh4DuK4ubnJkhWjQC/8ARkADCwWcg14S6kLNkPDIJVcF0TBYgFXFCIbDPTyYRCGi0HTwXlYOgDFN650ANS4Heraq8bGxqxwdcAAVIGlfUIpESj/FqQewxKghDIQXySQFy6B8gzOsIJ6JwZoyFagYS+gzv0AdXoMtqgGAM/OuAzeM9UHAAAAAElFTkSuQmCC"
	},
	{},*/
]);

//==================@add icons@页面右键菜单项目添加图标=====================
page([
	{ //链接另存为
	  	id: 'context-savelink',
	  	clone :false,
	  	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATElEQVQ4jWNgGNxg5v//owaQasDM//UM0/6rYzVg2n91hpn/6/EbAFH0H24IzAB0caINQaeJBjBNMIxXM7JCUjGKP0kF1DWAIi9QCADZJ5fmCkH8LAAAAABJRU5ErkJggg=="
	},

	{ //图像另存为
		id: 'context-saveimage',
		clone :false,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATElEQVQ4jWNgGNxg5v//owaQasDM//UM0/6rYzVg2n91hpn/6/EbAFH0H24IzAB0caINQaeJBjBNMIxXM7JCUjGKP0kF1DWAIi9QCADZJ5fmCkH8LAAAAABJRU5ErkJggg=="
	},
	{
		id:'nosquint-menu-settings',
		clone:false,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIUlEQVQ4jW2RXWibdRTGH5K8//czryXKDApDVPzKhXapLbWNlPKyuFbZhxuI2FmnSBi4mwluQ8vrLsRJVlilvXATBYf2ImR+rB/G2VmXtkmWZlnStN3o0iWNydKkTTunSA0cLzTShD23z/P8zuEcoEbrKizxp59yhXZs90w3bQtHLXIoaeY9hXt41xJgqc1XKfPgvd2X9J7l0Ush+i40Q96pKJ33XVzte+N1d0Dms0GZzaTNXPddyyuqcPzCh3p5fDZJM+kcRZIZGk8kyRNMkL+vv/yVKnz9JmD5SWKeuMw+qirfUdlrg7bHM5NX58rZ1XW6WSjR9VsrFF/KU2QxS4ldO6n/8OEQAIMNYOMK80zI/21SAuqCCpv9uOf9M/FUjuJLeUoV1yhVKNHcbwW6Fo7SLw31NDT260ZXV9cWAOgFLCGZxXTAgltm4cBnoqn301On9GSuSPPZAsXSeZpezFJwIUOJo8fo3HvHaGwy+D8AAKYUpn8vcQcxr7Cz75rQ7nK52mevXadc6Talimt0I79K85k8XX22nsYnL9PQ8EgEgKkC8Etcg09iXlxReP/LwMMADAMDA8OF1RKt//4HFdfWqTgyQhd2vkSXr0Q3dF1/cfPdLsqwjslcGGGF9x/4F4Cmpib1pNs9ODEx8dfCwo1y6pW95D70Du3ZvdtX+7WEDOvPMhdGROa+PC2Y2jebTqfz0ZP79nWP1Ek3m5ub/3Q4HBt2u33b5kxO5Bq9IvsWfpG9OiZzvbUTiip/sI8ZelpbWwc0TaOWlhZPFUAVjp/gDYfQDyghmcU+l/BAxdQBQ8zMAtuBJ+x2+1ZN0+5omlZubGxsAIDbZtw3pbBZG2AFAJyTjLtiCu/7AhAAYMUsPueV2DAAAwA4HI7ezs5OamtrO0+AkFb50SOc8e2qlX8QTUfmFH50UYY1bebPHGXGvRXPZrNZnU7nWkdHR3nofkvgE97krsCrdJoZ94RkFosq/PK0bHqBRHEr1QkP/V0nPH/iycciXfXPLO+XhLfuWq5oB6D2Ccb9Xpk765O4wI8SF/hG5AY/4AyuR4Attfl/AICLVTC7fGDbAAAAAElFTkSuQmCC",
	},



]);

//=========================@bookmarks@书签右键====================
/*爲書籤右鍵添加 移動 功能*/
page({
    label: '移动...',
    accesskey: "M",
    insertAfter: "placesContext_newSeparator",
    command: "placesCmd_moveBookmarks",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4jcXST0vCcBzH8T2EorL806hd8tAziOgQgSBIghCE0PPoUgRJVKKryENBwQopkgRByRhJRkFlUVhhTuaPtaA8qAiKRX46CA6ZxS7RF96MDb4vfvwYRf31dKw+ks61J7RKE9DOPtA6NkmYg3cMnn010q08aAMoiqLaF67pbs9dYYCvwByrwhyrosd7rwBOXuad/Ct+amj3GTSXBRMtgYkUwURLMLhvFGDyWMb2B1o2FZdh2kjBePgG45aAPncCxm0BpsUrBZg4esFmGarxxiUY1pPQ7dWfTl7CeIig13VOaNeFAjjCEnzF5mX2lEDP3qKNE6Bnb+GJEfiKgCMswTB7TPfPxUkDsIcI2JyynC9/YNhzgS42gR73JbwnYh3NAfYQUd++LZjFktx8ArlQwcjyGVg+0/i2JAO2YFYNWAMi5kXgE83lK59N7/MiYA2IasCyn8FMqoZSDb82k6rBsp9RA2N+AdPJqqbG/IIaGOXSkdGdNDTFpSOt/tb/m2/dZssonB/5IgAAAABJRU5ErkJggg==",
})

//====================@add uc icons@UC脚本管理器项目加图标=================
page([

	{
		id: 'addMenu-rebuild',
		clone :false,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAADqgBDpgBDrgBHqgBC4EiCnAAAABXRSTlMAtIBM0/JYR5sAAAAySURBVAjXY0AAZmUGBiMDIMNR0YFFSAQoIMAgbMjAaMDApMCgpAQk4SIwNXBdlGqHAwBizgiBTuo5AQAAAABJRU5ErkJggg=="
	},
	{	id: 'webDeveloperMenu',
		insertAfter: 'InspectElement-menuitem',
		clone :false,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAARzm4QzW4AyHoRzW0RzW0Rzm4SzW0RzW4RzW4RzW4QzW4RzW4RzW4Rzm4SzW0PzXETz28RynMYznAA/wARzW4RzW4QzW4RzW4RzW4SzW8SzW4RzW8RzW4NyWsRzW5YX5rXAAAAH3RSTlMA74kE1M6nKPXgxa2hSTs3IRoOCgHn2X5wQr28mGsTWFFC1QAAAH5JREFUGNONjlkOxCAMQ8MOhQIFus2W+99yCgj1t0+KEkuOZXjCMuV+MOvbLuIDECMAnRg0FDkEoviuy3iaNV6Q845RL6Lpb6i8C998nKa6g7EGNyc3NHIN1X6Cw4aEOUCDYoOOkEh41Zyorst7T45omw6ee/VakF1TpIcH/AGCbAb0U6xBSQAAAABJRU5ErkJggg=="
	},
	{	id: 'abp-menuitem',
		insertAfter: 'webDeveloperMenu',
		clone :false,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD7v5q5AAAAKnRSTlMAT3ArBMZ0RxrdJdPAnIx6YQjgsn9oNBbMua6mn5aQiYNtQz43JxxXVUoZ8OJlAAAAn0lEQVQY0z2JRwKDMBADZXCl2vReQkny/w8GA2EOK2kWF5sQGx4oV34U+YrTa5dskjZlxs6kjOPGqQyAieOBj4BRFDkDiN/0BU0MRArUoQvioPS9hiCf4fZLZAXiOXfA34gGnVArRv2K8QkpEyIkh5BVqTV2dVh4oWCtI9F6QFrgwUvtUe5/m+Cs3+Q2e0Cu4gZ1XMhlsP+bNeu6bIXlBx8CCFaO0BZLAAAAAElFTkSuQmCC"
	},
	{	id: 'gm_general_menu',
		insertAfter: 'abp-menuitem',
		clone :false,
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAACdVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbizk5WjAAAAG3RSTlMAINjQJxDJNfznTYgXBgH1u4At8NzFmmNSRNLmvcDFAAAAdklEQVQY003PSQ7DIBBE0cIYusHM8ZTc/6CRWiD1X75FSQVEbyXfEyQbd4k4fAU2A8l9SEQBKCQNHELtCopzbvwmPDeedhHMNuHwhvubNLh6EhRc2Bu/C0pudx75PBYMDkSVvVlQUgGyg9qQBOa5VbSY92c+4g+UswS9qFScSQAAAABJRU5ErkJggg=="
	}
]);

//======================复制链接文本地址====================
new function () {
	var items = [
	{
		label:"复制链接URL",
		command:"context-copylink",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC"
	},
	{
		label: "复制文本+URL|BBCode|文本",
		tooltiptext: "左键:标题+URL|中键:BBCode|右键:文本",
		onclick: function(event) {
		        var formats = [
		            "%RLT_OR_UT%\n%RLINK_OR_URL%",
		            "[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
		            "%LINK_TEXT%",
		        ];
		        var str = addMenu.convertText(formats[event.button]);
		        addMenu.copy(str);
		        if (event.button === 1) { // 中键点击后自动关闭菜单
		            document.getElementById("contentAreaContextMenu").hidePopup();
		        }
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC"
	},
	{},
    {
        label: "生成短网址is.gd|百度",
        tooltiptext: "生成短网址到剪切板（is.gd）|短网址到剪切板(百度)",
        onclick: function(e) {
            switch(e.button) {
                case 0:
                    var url = "http://is.gd/api.php?longurl=" + encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%"));
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.onload = function() {
                        addMenu.copy(xhr.responseText);
                    }
                    xhr.send(null);
                    closeMenus(this);
                    break;
                case 2:
                    var url = addMenu.convertText("%RLINK_OR_URL%");
                    var form = new FormData();
                    form.append('url', url);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://dwz.cn/create.php", true);
                    xhr.onload = function() {
                        var obj = JSON.parse(xhr.responseText);
                        addMenu.copy(obj.tinyurl);
                    }
                    xhr.send(form);
                    closeMenus(this);
                    break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASElEQVQ4jWNgGHgw8/9/ijCEoMByuAFwExkYsNI45dEFcRmAk6aqARR5gZBNONWR7XRCXiDkJawuIBVgdQHRKZCqLqAoL1AIAGqpJ06jqlriAAAAAElFTkSuQmCC",
    },
	{
        label: "查看google链接快照",
        url: "http://webcache.googleusercontent.com/search?q=cache:%l",
        condition: "link",
        where : "tab",
        insertBefore: "context-selectall",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFElEQVQ4ja3TsUvDQBTH8dD/4wYXF7c6CeI/4h9xYnEopLVSRHB1cGu3DoKCSGIsVmMcBCcbOWpBSM0UKmKWVoyYr4NYIlJjiD9403EfePfeadr/pFYQ0tCFNJWQppdSSkhD17RaYXJdSEMXKyaZShp6AjBVdsBUScD7OljevWanfc+ZGhKEL7Su/GmA9wMoVk6J45hkLDeg1OpS3rul1Ooys3o8HVjYOAfgsv9I48IjjmMsNyAcRzyPXtk6umN27SQdWD9QNByPm4cQyw2oH/bYNvqE44j5aicdqO4rms4A1/8E/KfRpKU/AXZvSNMZfGsBIHp7Z67czv6Ii3WbpU2bYqXz+xTyjDHvIuVc5dyfKU8+AGFT89bPn6ZlAAAAAElFTkSuQmCC"
    }
	];
	var menu = PageMenu({
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC",
        condition:'link',
        insertBefore:'context-openlink',
        onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//=======================复制文本============================
new function () {
	var items = [
	{
		label:"复制",
		command:"context-copy",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC"
	},
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgoBmY+f8/QUzQAErksSpAthlFnhznYhiATwGyrThdgE/BqAsocAHRUYvNBThtwwaokmwpyjgUAAD2rN676t3LHAAAAABJRU5ErkJggg=="
	},
	{
		label: "保存选中文本",
		condition: "select",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC",
		oncommand: function() {
		if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");
		if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");

		goDoCommand('cmd_copy');
		var data = readFromClipboard();

		var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
		fp.init(window, "另存爲", Ci.nsIFilePicker.modeSave);
		fp.appendFilter("文本文件", "*.txt");
		fp.defaultString = content.document.title + '.txt';

		var res = fp.show();
		if (res != Ci.nsIFilePicker.returnCancel) {
		var aFile = fp.file;

		var ostream = FileUtils.openSafeFileOutputStream(aFile);

		var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		converter.charset = "gbk";
		var istream = converter.convertToInputStream(data);

		NetUtil.asyncCopy(istream, ostream, function(status) {
		if (!Components.isSuccessCode(status)) {
		// Handle error!
		return;
		}

		aFile.launch();
		});
		}
		}
	},
	{
		label:"复制BBCode",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAAARzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW4RzW7vBzEjAAAAHHRSTlMAQKAngHMYkBvz3HdtUwHGvZghzo1dMw8I065GJ4RV2gAAAH9JREFUGNNVzlkOwyAMRVFIgIaxgWbo8Pa/ztoySMmVsOTzgay4U/eKkjR637dAM81xwMqyP6RYvMdMMIVoqYqpaIFVcQeQblAWYzo8aYSsVLoCkjsvEDyAage81C9jy4e1A2iA/rBmF/jQiDM9U70c5tzCbYY2Bow6zHrUaPsDm1cIbWEeA8kAAAAASUVORK5CYII=",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	}
	];
		    //onpopupshowing: syncHidden,
	var menu = PageMenu({
        condition:'select',
        insertBefore:'context-paste',
        /*onshowing: function(menuitem) {
		        var sel = getBrowserSelection(16);
		        if (sel && sel.length > 15)
		            sel = sel.substr(0,15) + "...";
		        this.label = '复制: ' +  sel;
		    },*/
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAErk4Qpw2YxiADlOxDCAYhcgKybGj6MuINIFRKdEbC7AaRtB55AhT3nGoQAAAFvV5oAA/dnIAAAAAElFTkSuQmCC"  });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
	if (it.command)
	css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }');
	});
};

//========================复制图片地址 二级菜单========================
new function () {
	var items = [
	{
	   	label:"复制图片地址",
		class: "context-copyimage",
		oncommand: "gContextMenu.copyMediaLocation();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGBxg5v//GOyZ//+jYHR1RBmAT2ykGEBxIKJrIMsL2OToawAuMQwD8AUYvoClHKCbSiqmFAAAAMXPMY0Lo7MAAAAASUVORK5CYII="
	},
	{
		label:"复制图像",
		command:"context-copyimage-contents",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBmY+f8/QUzQAErkURRgsxXFAGKciJePzTmjBpARC4RcgFcelwFEp0SqpjqyDaAo41AAAKYlunmTbibTAAAAAElFTkSuQmCC"
	},
	{},
	{
		label:"复制图片Base64",
		text:"%IMAGE_BASE64%",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgoBmY+f8/QUzQAGxsfGLkG0COczEMQGcTciL1DUB3LtkuwCc2BA0gOmpJso0cBUQZQFHGoQAAAGcot+LmGeY+AAAAAElFTkSuQmCC"
	},
	{
		label: '解析图像QR码',
		oncommand: "qrReaderOnline.getClickHandler()",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEUAAADVIEzSH03XH0vXIEvdH0LWH0vWIEvWIErXIErWIErWIEvXIEjWIErXIEvWH0vWH0vWH0vXH0vWIErYIUz/AGfWH0vWIEvWIEvWIEvWIEzWIEzWIErWIUvWIUrVH0zTIU7WIEup3wsZAAAAIXRSTlMAgBCJmAj56ZF7b00gpmg4gzHSsCoC8+/s5NjHwLx1WxfsRM4uAAAAgklEQVQY043NSQ7DIAxAUYyhwRCmNOk8cf9L1kDLqov+hZGehC1+pCW3bXXqBocdZ1OdlwaFHUFZIebpA3tXwfkBUVaQ8QuIeE3qjqg6BACgNRM/zwZguJzRPKTtX4jolkwpy1jqXrx0Op5hnI39rFcdpNYMYV5lbHAqXKAA3i3ij95qqgazU3anIQAAAABJRU5ErkJggg==",
	},
	{
		label: '用PS打开',
		oncommand: function () {
		var psPath = 'D:\\Program Files\\PhotoshopCC2015\\Adobe Photoshop CC 2015\\Photoshop.exe';
		var psfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		psfile.initWithPath(psPath);
		if (!psfile.exists()) {
		  alert('PS路径出错，请检查配置');
		  return;
		}
		var url = gContextMenu.mediaURL || gContextMenu.imageURL;
		if (url.match(/(\.jpe?g|\.png|\.gif|\.jpg)/i)) var extension = RegExp.$1;
		else var extension = '.jpg';
		//图片下载地址，配置文件夹里，手动创建“PS临时文件”这个文件夹
		var imgPath = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('ProfD', Ci.nsIFile).path + '\\PS临时文件\\PS临时图片_' + new Date().getTime() + extension;
		var imgfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		imgfile.initWithPath(imgPath);
		Cc['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Ci.nsIWebBrowserPersist).saveURI(Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).newURI(url, null, null), null, null, null, null, null, imgfile, null);
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
		var arg = [imgPath];
		process.init(psfile);
		process.runw(false, arg, arg.length);
		}
	},
/*	{ // 替换 openImgRar.uc.js
		label: "打开图像RAR",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5wAu5w4Awa8AAAAE3RSTlMA+AjxAtjRet7K5LuPaUpEKyYZQCNKKQAAAFpJREFUGNOdzzkOwCAMRFEMmC175v53jeQhcuq8Cn4xkgPdIwanMK3mQEUMsPKfo8k7BkOD0YjEABIGn+gz+AbDnw23QedoSQaobxARiChvoYojfJwdkOWy9wP0jAU7GZtzsAAAAABJRU5ErkJggg==",
		oncommand: function(){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache2\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache2\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}
	},*/
	{
		label:"查看图像信息",
		command:"context-viewimageinfo",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAABWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+RWq+T46xURAAAAHnRSTlMA9+/z0s2PRCnp5tq0Wk0E/cmkc2Y9GBAC4JmDHhz7O7iTAAAAeklEQVQY022O6Q7CMAyD0/RgrO3YxRiX3/8xgblDqjT/cfJZiiNHuoXB+rD892sL4yy02/PWTKuss9U3QcC0ecZIMJgLh3ukWy9U6pk4LSCW5IG8+QlPgpdqx/K9Nxu40ffAuSmkSYoYZkNCLb8jFRESJzXRJLW+n30A5RIFKTAVsU8AAAAASUVORK5CYII="
	},
	{
		label: "OCR文字識別",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOElEQVQ4jaXTsS6EURQE4I9lJYpNREdIVEo2EonH4Dk8AFES1WpXxRNsQrUkGqJSaKhFiEpJRSQUZve/Catxkyn+c2Ymc+9/DrzgAzeYVp0h1IOhoj4d7ke03rCFZYyigVXsoxvsp9YIZzmaN3FbiXsTJ7hHB9tBJ7WTcERz04s0ksYtjrGIWhG7ltpxOM1o+lduJOoRJlMbw1xQT20ynG40/bOGuyLeLA7xhHNMFdxmuGulQTv3rOWRDvEZXMVgJklq4bZ74noi7eR7Dg+FwTuucZmecLu9q43jFLsYxjweC4MeHtMbDvc0Wh08h3CGC7z+YvCa3lm4z9Fa9z0Ue4m2iY0B2AxnL5r18h1aOMCEwWcinJbq1/YHaUk1SAt+DtKCapCWFIP071EetExt1TK1/bFM/1rnL0aZaKARA/d3AAAAAElFTkSuQmCC",
		oncommand: function() {
		//打開http://apistore.baidu.com/apiworks/servicedetail/146.html，填入apikey
		var apikey = " 78f99be8bc452c23c858e9a073f503ab";

		var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
		xmlHttp.setRequestHeader("apikey", apikey);
		var formData = new FormData();
		for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
		formData.append.apply(formData, d.split('=', 2));
		xmlHttp.send(formData);
		xmlHttp.onload = function() {
		if (xmlHttp.status == 200) {
		var data = JSON.parse(xmlHttp.responseText);
		if (data.errNum != 0)
		alert("错误：" + data.errMsg);
		else {
		var str = "";
		for (var i in data.retData) str += data.retData[i].word;
		alert(str);
		}
		}
		};

		function img2base64(imgsrc) {
		if (typeof imgsrc == 'undefined') return "";

		const NSURI = "http://www.w3.org/1999/xhtml";
		var img = new Image();
		var that = this;
		var canvas,
		isCompleted = false;
		img.onload = function() {
		var width = this.naturalWidth,
		height = this.naturalHeight;
		canvas = document.createElementNS(NSURI, "canvas");
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0);
		isCompleted = true;
		};
		img.onerror = function() {
		Components.utils.reportError("Count not load: " + imgsrc);
		isCompleted = true;
		};
		img.src = imgsrc;

		var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
		while (!isCompleted) {
		thread.processNextEvent(true);
		}

		var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
		canvas = null;
		return data;
		}
		}
	}
	];
	var menu = PageMenu({
        condition:'image',
		insertBefore:'context-saveimage',
        icon:'image',
        onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
		});
};

/*=======================图片右键 以图搜图 二级菜单====================*/
var imagesub = PageMenu(
	{
		label: "以图搜图",
		accesskey: "I",
		condition: "image",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVQ4jWNgIARm/v+PgYkGuBQTZQiyImy24zUEn0KiDIFJEPLCEDAAmyKyA5LkWMCXaEjSTFJKJCu5DnHNyIaQCQCXOqCTXeiUkgAAAABJRU5ErkJggg==",
		where: "tab",
		insertBefore: "context-viewimage",
	});
	imagesub([
	{
		label: 'Google搜图',
		url: 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
		image: "https://www.google.com/favicon.ico",
		where: 'tab',
		accesskey: "G"
	},
	{
		label: 'Baidu搜图',
		url: 'http://image.baidu.com/n/pc_search?queryImageUrl=%IMAGE_URL%',
		image: "http://www.baidu.com/favicon.ico",
		where: 'tab',
		accesskey: "B"
	},
	{
		label: '360搜图',
		url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
		image: "http://st.so.com/favicon.ico",
		where: 'tab',
		accesskey: ""
	},
	{
		label: 'sougou搜图',
		url: 'http://pic.sogou.com/ris?query=%IMAGE_URL%',
		image: "http://logo.www.sogou.com/images/logo2014/new/favicon.ico",
		where: 'tab',
		accesskey: ""
	},
	{
		label: 'Bing搜图',
		url: 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
		image: "http://cn.bing.com/s/a/bing_p.ico",
		where: 'tab'
	},
	{
		label: 'Tineye搜图',
		url: 'http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=%IMAGE_URL%',
		image: "http://www.tineye.com/favicon.ico",
		where: 'tab'
	},
	{
		label: "多引擎搜图片",
		condition: "image",
		where:"tabshifted",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAACdVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbhbizUrAAAAEHRSTlMA4OggEAjlm1PGi3Fr+dcxv/2xqwAAAFRJREFUGNOFztEOgCAIhWEoRU2r8/5PGyzbYF34X3DxjQ1oHYcUsPsMaAspILlgQOMaNHtBIBE691yqA6LUwFnxg5sBlAbJelShnpgdtq7T9X9+2QMClwR6qJ6QpwAAAABJRU5ErkJggg==",
		oncommand: function() {
		        var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
		        gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
		        gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
		        gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
		        gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
		        gBrowser.addTab('http://st.so.com/stu?imgurl=' + url);
		        gBrowser.addTab('http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=' + url);

		}
	},
	{
		label: 'IQDB',
      		url : 'http://iqdb.org/?url=%IMAGE_URL%',
      		where:"tab",
      		image:"http://iqdb.org/favicon.ico"
	},
	{
		label: 'Regex',
      		url : 'http://regex.info/exif.cgi/?url=%IMAGE_URL%',
      		where:"tab",
      		image:"http://regex.info/favicon.ico"
	},
	{
		label: 'saucenao',
      		url : 'http://saucenao.com/search.php?db=999&url=%IMAGE_URL%',
      		where:"tab",
      		image:"http://saucenao.com/favicon.ico"
	},
]);

//=====================图片另存为 二级菜单======================
/*new function() {
	var items = [
	{
		command: 'context-saveimage'
	},
	{
		label: "析取本页面图像",
		accesskey: "",
		oncommand: function() {
		gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
		},
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII="
	},
	];
	var menu = PageMenu({
			condition: 'image',
			insertBefore: 'context-viewimage',
			icon: 'image',
			onpopupshowing: syncHidden
		});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
		});
};*/

/*========================輸入框右鍵==========================*/

//快捷回复，打造多級菜單
new function() {
	var  QuickReplySub = PageMenu({
		label: "快速回复",
		condition: "input noselect",
		accesskey: "W",
		insertBefore: "spell-undo-add-to-dictionary",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWNgGHgw8/9/ijCEoMByuAEk24xuwKgLRl1AsQsoygsUAgCedSdO80DdTAAAAABJRU5ErkJggg==",
		//跟进depft更新
		oncommand: function(event) {
			var input_text = event.target.getAttribute('input_text');
			if (input_text) {
			addMenu.copy(input_text);
			setTimeout(function() {
			goDoCommand("cmd_paste");
			}, 100);
			}
		},
		/*onpopupshowing: function (event){
			Array.slice(event.target.children).forEach(function(elem){
			if(elem.id == "Physics-Symbols"|elem.id == "Math-Symbols"){
			elem.hidden = !/tttttbbs.kafan.cn/.test(content.location.host)//可排除多個網站
			}
			});
		},*/
	});
	QuickReplySub([
		{id: "QuickReply-sep", style: "display:none;"},
/*		{
            label: "Email地址",
            accesskey: "E",
            tooltiptext: "左鍵：163郵箱\n中鍵：QQ郵箱\n右鍵：Gmail郵箱",
            insertBefore: "QuickReply-sep",
            onclick: function(e) {
                switch(e.button) {
                case 0:
                    addMenu.copy(addMenu.convertText('……@163.com'));
                    goDoCommand('cmd_paste');
                    closeMenus(this);
                    break;
                case 1:
                    addMenu.copy(addMenu.convertText('……@qq.com'));
                    goDoCommand('cmd_paste');
                    closeMenus(this);
                    break;
                case 2:
                    addMenu.copy(addMenu.convertText('……@gmail.com'));
                    goDoCommand('cmd_paste');
                    closeMenus(this);
                    break;
                }
            },
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jc3SIQ7CQBCF4S8hQWCQKBQah+sJENwAj0UiuQAGjeQEWCwai8RhUPgmRXRICpRCMTDJbHY2+/55mV3+IcZIkdXMFEO4RHZrNJ3giJOgTXFA5wPxKIS90OYL5tijXSHu44xB1HcAWGKLVom4G7ZHhbMnAKyxQaNw1gp3s4e7pYBmANZRN6JelrgqBdw67rAK0PbB0VsA+TAXka8GWwn4JDLyN02+ECehNYxN3a98Cu2P4wq1e0SOXg0ncwAAAABJRU5ErkJggg=="
		},*/
		{label:"感谢分享", input_text: "非常感谢分享!要的就是这个！",accesskey: "1",image:" "},
		{label:"亲，要的就是", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "2",image:" "},
		{label:"感谢楼主~~~", input_text: "感谢楼主，好人一生平安……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "3",image:" "},
		{label:"收藏备用~~~", input_text: "看起来很不错哦，收藏之~~~\n谢谢啦！！！",accesskey: "4",image:" "},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！",accesskey: "5",image:" "},
		{},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众路过……ʅ（´◔౪◔）ʃ",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
	]);
	var QuickReplySubMenu1 = PageMenu({
		label: "颜文字",
		accesskey: "A",
		condition: "input",
		insertBefore: "QuickReply-sep",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArElEQVQ4ja2TwRWEIAxE58CZamwHarEGLyT1UIDtcJs96NMg6PrYzY3AHzIJAH+PmQ6JAcoMYYGwQJmRGDDTPcPCaYciFvojv9BDGPe96R5WrhV4jYUeyrUVmekgLI9wXU2p7SQGCONX+Kw2IjGcCWU+blcSSjaQzW9WslUs3YN3AlemXry2YRhr4U00FnpNtOVeLTVNvBtjrx/dMW6qPzwkKzL8lK2d4c80EB8TFbgZNCJAzgAAAABJRU5ErkJggg==",
	});
	QuickReplySubMenu1([
		{label: "^_^", input_text:"^_^"},
		{label: "-_-|||", input_text:"-_-|||"},
		{label: "Orz", input_text:"Orz"},
		{label: "-_,-", input_text:"-_,-"},
		{label: "╯﹏╰", input_text:"╯﹏╰"},
		{label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
		{label: "、(￣.￣)", input_text:"、(￣.￣)"},
		{label: "O(∩_∩)O~", input_text:"O(∩_∩)O~"},
		{label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
		{label: "(￣３￣)", input_text:"(￣３￣)"},
		{label: " o(>< )o", input_text:" o(>< )o"},
		{label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
		{label: "(・(ｪ)・)", input_text:"(・(ｪ)・)"},
		{label: "￣へ￣", input_text:"￣へ￣"},
		{label: "╮(╯_╰)╭", input_text:"╮(╯_╰)╭"},
	]);
	/*var QuickReplySubMenu2 = PageMenu({
		label: "物理符號",
		id: "Physics-Symbols",
		accesskey: "B",
		condition: "input",
		insertBefore: "QuickReply-sep",
		image: "",
	});
	QuickReplySubMenu2([
		{label: "°", input_text:"°", accesskey: "1",},
		{label: "°C", input_text:"°C", accesskey: "2",},
		{label: "Ω", input_text:"Ω", accesskey: "3",},//ohm
		{label: "Φ", input_text:"Φ", accesskey: "4",},//diameter
		{label: "m²", input_text:"m²", accesskey: "5",},
		{label: "cm²", input_text:"cm²", accesskey: "6",},
		{label: "km²", input_text:"km²", accesskey: "7",},
	]);
	var QuickReplySubMenu3 = PageMenu({
		label: "數學符號",
		id: "Math-Symbols",
		accesskey: "C",
		condition: "input",
		insertBefore: "QuickReply-sep",
		image: "",
	});
	QuickReplySubMenu3([
		{label: "±", input_text:"±", accesskey: "1",},
		{label: "≥", input_text:"≥", accesskey: "2",},
		{label: "≤", input_text:"≤", accesskey: "3",},
		{label: "×", input_text:"×", accesskey: "4",},
		{label: "÷", input_text:"÷", accesskey: "5",},
		{label: "≠", input_text:"≠", accesskey: "6",},//is not equal to
		{label: "≈", input_text:"≈", accesskey: "7",},//is approximately equal to
		{label: "√", input_text:"√", accesskey: "8",},
		{label: "∞", input_text:"∞", accesskey: "9",},//infinity
	]);*/
	page({
		label: "14字数补丁",
		accesskey: "e",
		input_text: "绝对没有十五字的一个良心回复",
		image: " ",
		insertBefore: "QuickReply-sep",
	});
	};

//====================粘贴 二级菜单===================
/*new function() {
	var items = [{
		command: 'context-paste',
	},
	{
		label: "標點符號置換(中轉英)",
		condition: "input",
		accesskey: "E",
		oncommand: function() {
		    goDoCommand("cmd_copy");
		    var sel = getBrowserSelection();
		    var txt = addMenu.convertText('%p');
		    addMenu.copy(txt.replace(/(\s，\s|\s，|，\s|，)+/g, ", ")
		    .replace(/(\s。\s|\s。|。\s|。)+/g, ". ")
		    .replace(/(\s？\s|\s？|？\s|？)+/g, "? ")
		    .replace(/(\s！\s|\s！|！\s|！)+/g, "! ")
		    .replace(/(\s；\s|\s；|；\s|；)+/g, "; ")
		    .replace(/(\s：\s|\s：|：\s|：)+/g, ": ")
		    .replace(/(\s（\s|\s（|（\s|（)+/g, " (")
		    .replace(/(\s）\s|\s）|）\s|）)+/g, ") ")
		    .replace(/(\s—\s|\s—|—\s|—)+/g, " - ")
		    .replace(/(\s＆\s|\s＆|＆\s|＆)+/g, " & ")
		    .replace(/(\s…\s|\s…|…\s|…)+/g, "... ")
		    .replace(/(\s、\s|\s、|、\s|、)+/g, ", ")
		    .replace(/(\s’\s|\s’|’\s|’)+/g, "'")
		    );
		    if (sel) {goDoCommand("cmd_paste");}
		},
	},
	{
		label: "插入BBCode",
		id: "BBCode",
		condition: "input",
		accesskey: "I",
		insertAfter: "context-paste",
		oncommand: function() {
		var str = addMenu.convertText('[code]%P[/code]');
		addMenu.copy(str);
		goDoCommand('cmd_paste');
		},
	},
	];
	var menu = PageMenu({
		condition: 'input',
		insertBefore: 'context-copy',
		icon: 'input',
		onpopupshowing: function (event){
		Array.slice(event.target.children).forEach(function(elem){
		if(elem.id == "BBCode"){
		elem.hidden = /bbs.kafan.cn/.test(content.location.host)//可排除多個網站
		}
		});
		},
	});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
		css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{ display: none !important; }')
	});
	};*/

//========================搜索所选文本==================
new function () {
	var items = [
        {id:"test-submenu",style:"display:none;"},
       /* {
            label:"默认搜索",
            id:"default-search",
            accesskey:"",
            oncommand: function () {var str = addMenu.convertText('%SEL%');BrowserSearch.loadSearchFromContext(str);}
        },*/
		{
			label:"google(G)",
			where : "tab",
            accesskey:"g",
			url:"https://www.google.com/search?q=%s",
			image:"https://www.google.com/favicon.ico"
		},
		{
			label:"baidu(B)",
			where : "tab",
            accesskey:"b",
			url:"http://www.baidu.com/baidu?wd=%s",
			image:"http://www.baidu.com/favicon.ico"
		},

		{
			label:"百度地图",
			where:"tab",
			url:"http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D%s",
            accesskey:"e",
		},
      		{
			label:"微博综合",
			where : "tab", accesskey:"w",
			url:"http://s.weibo.com/weibo/%s&Refer=index",
			image:"http://s.weibo.com/favicon.ico"
		},
		{
			label:"G翻译所选英文",
            where:"tab",
            accesskey:"T",
			url:"http://translate.google.com/#auto/zh-CN/%s",
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEVBntj4+PjW1tb+/v719fUAAAAAcbn///8AcLdCn9oBbbEDY6ABa68BaKkDZ6YKYJcDVYsHSnTvBI/JAAAABnRSTlP++Ob+4gAZfLU0AAAAaElEQVQY012OWw6AIAwE62uXAiLe/7IWUZowP20n2U2FWqIqFZ0oxGWTxIeJNAnNk+AcabsS8Rd2GHYOkZtKwUXESbK40HWl4aVLzTfciBIt5aLXZTlGB4Jxym6zIVtNJSAtXvoyPg0PsvYG8OW0hOwAAAAASUVORK5CYII="
		},
		{id:"other-search-sep"},//其他综合搜索插入处
		{
			label:"Bilibili(L)",
			where : "tab",
            accesskey:"l",
			url:"http://www.bilibili.tv/search?keyword=%s",
			image:"http://static.hdslb.com/images/favicon.ico"
		},
		{
			label:"Youku(Y)",
			where : "tab",
            accesskey:"y",
			url:"http://www.soku.com/search_video/q_%s",
			image:"http://static.youku.com/v1.0.1065/index/img/favicon.ico"
		},
		{
			label:"Youtube(U)",
			where : "tab",
            accesskey:"u",
			url:"http://www.youtube.com/results?search_query=%s",
			image:"https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png"
		},
		{id:"videos-sep"},//其他视频搜索插入处

		{
			label:"google images",
			where : "tab",
			url:"https://www.google.com/search?newwindow=1&hl=en&authuser=0&site=imghp&tbm=isch&source=hp&biw=1575&bih=798&q=%s&btnG=Search+by+image&oq=&gs_l=",
			image:"https://www.google.com/favicon.ico"
		},
		{
			label:"baidu images",
			where : "tab",
			url:"http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%s",
			image:"http://image.baidu.com/favicon.ico"
		},
		{id:"images-sep"},//其他图像搜索插入处

		{
			label:"知乎(Z)",
			where : "tab",
            accesskey:"z",
			url:"http://www.zhihu.com/search?q=%s",
			image:"http://www.zhihu.com/favicon.ico"
		},
		{
			label:"w3schoolCN(C)",
			where : "tab",
            accesskey:"c",
			url:"https://www.google.com.hk/search?sitesearch=w3school.com.cn&as_q=%s&gws_rd=ssl",
			image:"http://www.w3school.com.cn/favicon.ico"
		},
		{
			label:"w3schools.com",
			where : "tab",
			url:"https://www.google.com.hk/search?num=20&newwindow=1&safe=off&q=%s+site%3Aw3schools.com&oq=%s+site%3Aw3schools.com",
			image:"http://www.w3schools.com/favicon.ico"
		},
		{
			label:"中文维基(K)",
			where : "tab",
            accesskey:"k",
			url:"https://zh.wikipedia.org/wiki/%s",
			image:"http://bits.wikimedia.org/favicon/wikipedia.ico"
		},
		{
			label:"英文维基",
			url:"https://en.wikipedia.org/wiki/%s",
			image:"https://en.wikipedia.org/static/favicon/wikipedia.ico",
			where: 'tab'
		},
		{
			label:"百度百科",
			where : "tab",
			url:"http://baike.baidu.com/search/word?word=%s",
			image:"http://baike.baidu.com/favicon.ico"
		},
		{
			label:"百度知道",
			where : "tab",
			url:"http://zhidao.baidu.com/q?word=%s&ct=17&pn=0&pt=monline_ik&tn=ikaslist&rn=10",
			image:"http://zhidao.baidu.com/favicon.ico"
		},
		{id:"knowledge-sep"},//其他知识搜索插入处

		{
			label:"BT天堂",
			where : "tab",
			url:"http://www.bttiantang.com/s.php?q=%s&sitesearch=www.bttiantang.com&domains=bttiantang.com&hl=zh-CN&ie=UTF-8&oe=UTF-8",
			image:"http://www.bttiantang.com/favicon.ico"
		},
		{
			label:"BTDigg",
			where : "tab",
			url:"http://btdigg.org/search?info_hash=&q=%s",
			image:"http://btdigg.org/favicon.ico"
		},
		{
			label:"天天美剧(en)",
			where : "tab",
			url:"http://www.ttmeiju.com/search.php?keyword=%s&range=0",
			image:"http://www.ttmeiju.com/favicon.ico"
		},
		{id:"down-sep",style:"dispaly:none;"},//其他资源下载搜索插入处
        {id:"other-sep",style:"dispaly:none;"},//其他搜索插入处
	];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		label: "搜索选中文本/剪贴板文字",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVQ4jWNgIARm/v+PgYkGuBQTZQiyImy24zUEn0KiDIFJEPLCEDAAmyKyA5LkWMCXaEjSTFJKJCu5DnHNyIaQCQCXOqCTXeiUkgAAAABJRU5ErkJggg==",
/*		onpopupshowing: function (event){
			Array.slice(event.target.children).forEach(function(elem){
			if(elem.id == "TVC-1"){	//id处插入选项ID
			elem.hidden = !/ic.sjlpj.cn|tieba.com|tvc-mall.com|secu-star.com/.test(content.location.host)//可排除多個網站
			}
			else if(elem.id == "TVC-2"){
			elem.hidden = !/ic.sjlpj.cn/.test(content.location.host)//可排除多個網站
			}
			});
		},*/
		onshowing: function(menu) {
			var sel = getBrowserSelection(16);
			if (sel && sel.length > 15)
				sel = sel.substr(0,15) + "...";
			this.label = '搜索: ' +  sel;
		},	//动态显示标题菜单项
	});
	menu(items);
	// css("#context-searchselect{ display: none; }");
    	// css("#default-search{ display: none; }");
//=================二级菜单化====================
//二级菜单化模板
/* var MenuSubTest= PageMenu({
		label: "",
		accesskey: "",
		condition: "select",
        insertBefore:"",
		image: "",
	});
	MenuSubTest([
		        	]);*/
	var MenuOtherSearch= PageMenu({
        label: "其他综合搜索",
        insertBefore:"other-search-sep",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4ja2TvRmEIBBEJzC2DRuwHWjlrMFA2HoowHbI3gV6/nFnILfRAt+bbwYW6e810CjgZCRFsiJZRlLAaaC5hyP9CnmNtNv+SKuIX8/637Axn8BrjbQy5lJkoFEkb7Dx0kRX9LubfI4TcIr4bT3RyUAT3anf3XoF3C5gpML6ncgSJR3z56+ZP+C1L5hqgeoI1ZdY/YyLasUgHUUej/IxzuPP9KDehgzqFYh9FcEAAAAASUVORK5CYII=",
		});
	MenuOtherSearch([
		{
			label:"Bing",
			where : "tab",
			url:"http://www.bing.com/search?q=%s&pc=MOZI",
			image:"http://cn.bing.com/s/a/bing_p.ico"
		},
		{
			label:"Duckduckgo",
			where : "tab",
			url:"https://duckduckgo.com/?q=%s",
			image:"https://duckduckgo.com/favicon.ico"
		},
		{
			label:"Yahoo",
			where : "tab",
			url:"https://search.yahoo.com/search;_ylt=A0LEVyRgVo9Vc1wAZAKl87UF?p=%s&fr=sfp&fr2=",
			image:"https://search.yahoo.com/favicon.ico"
		},
    ]);

	var MenuVideos = PageMenu({
        label: "其他视频搜索",
        insertBefore:"videos-sep",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4ja2TvRmEIBBEJzC2DRuwHWjlrMFA2HoowHbI3gV6/nFnILfRAt+bbwYW6e810CjgZCRFsiJZRlLAaaC5hyP9CnmNtNv+SKuIX8/637Axn8BrjbQy5lJkoFEkb7Dx0kRX9LubfI4TcIr4bT3RyUAT3anf3XoF3C5gpML6ncgSJR3z56+ZP+C1L5hqgeoI1ZdY/YyLasUgHUUej/IxzuPP9KDehgzqFYh9FcEAAAAASUVORK5CYII=",
		});
	MenuVideos([
		{
			label:"acfun",
			where : "tab",
			url:"http://www.acfun.tv/search.aspx#query=%s",
			image:"http://www.acfun.tv/favicon.ico"
		},
		{
			label:"soku",
			where : "tab",
			url:"http://www.soku.com/v?keyword=%s",
			image:"http://www.soku.com/favicon.ico"
		},
		{
			label:"google videos",
			where : "tab",
			url:"https://www.google.com/search?tbm=vid&hl=zh-CN&source=hp&biw=&bih=&q=%s&btnG=Google+%E6%90%9C%E7%B4%A2&oq=&gs_l=",
			image:"https://www.google.com/favicon.ico"
		},
		{
			label:"baidu videos",
			where : "tab",
			url:"http://v.baidu.com/v?word=%s&ct=301989888&rn=20&pn=0&db=0&s=0&fbl=800&ie=utf-8",
			image:"http://v.baidu.com/favicon.ico"
		}
    ]);
    /*var MenuImages= PageMenu({
 		label: "其他图片搜索",
		accesskey: "",
		condition: "select",
        insertBefore:"images-sep",
		image: "",
	});
	MenuImages([
		        	]);*/
	var MenuKnowledge= PageMenu({
        label: "其他知识搜索",
        accesskey: "",
        condition: "select",
        insertBefore:"knowledge-sep",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4ja2TvRmEIBBEJzC2DRuwHWjlrMFA2HoowHbI3gV6/nFnILfRAt+bbwYW6e810CjgZCRFsiJZRlLAaaC5hyP9CnmNtNv+SKuIX8/637Axn8BrjbQy5lJkoFEkb7Dx0kRX9LubfI4TcIr4bT3RyUAT3anf3XoF3C5gpML6ncgSJR3z56+ZP+C1L5hqgeoI1ZdY/YyLasUgHUUej/IxzuPP9KDehgzqFYh9FcEAAAAASUVORK5CYII=",
    });
	MenuKnowledge([
		{
			label:"Stack Overflow",
			where : "tab",
			url:"http://stackoverflow.com/search?q=%s",
			image:"http://cdn.sstatic.net/stackoverflow/img/favicon.ico?v=6cd6089ee7f6"
		},
		{
			label:"有道词典",
			where : "tab",
			url:"http://dict.youdao.com/search?q=%s&keyfrom=dict.index",
			image:"http://dict.youdao.com/favicon.ico"
		},
		{
			label:"海词词典",
			where : "tab",
			url:"http://dict.cn/search.php?q=%s",
			image:"http://dict.cn/favicon.ico"
		},
		{
			label:"金山词霸",
			where : "tab",
			url:"http://www.iciba.com/search?s=%s",
			image:"http://www.iciba.com/favicon.ico"
		},
		{
			label:"汉典查寻",
			where : "tab",
			id:"handian",
			url:"http://www.zdic.net/search?lb=1&q=%s",
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVDhPTZNrTJNXHMb7ZR/3abdkY0vmIlumyy4CKqszBtHAihM0wBxDB1IRlMiGy9yi2wyKSmHlYvv2Sgd2OlEWDSNDcWFrjKKRFC/0QilYLa2lpoKiMpi/nb66bB/e9z3vyTm/8/z/z3MUBvctJE+U+gBoR2eQvFGM7hCSmG+fBLP/DgZ3BGVGFmVao/yvuzaGwROR1yiahu5gHxjkQlcjvb/b+al/gGbfJLrL11meX0hNzwU6gaT0DLK3fMGRGDIgvjkOURgGg0hDMSJNabBNgddejuHaTWyBu7y5IIW1lV+xvcXOK3MTeUe5lPSPC9l/uk9Woh8MofjBf5+T53sJSlnMfv00Y9Y8zAPDrK2oIvHtd1m5Xk1pnZ55C5LZ2XGaurNXxcb/lSC5RA/8UWyDIziPf8/Z3wy0XXJiHJ2kVHOQ/O07KTnQTFruJxyJzNIaFn16Il8uwTh0i8Zzt4XsCMZADO3wQ3SecSwjEzT2eUic/xbzklLYUq8nZUUmJfsasAp4XL4MaBsPUaW5T5ZqlpqOKIfCE5TVG1jxaTG72k+Qvm4D769aQ023g4RX58iAlsC9/wCSN4zJNY7qw0cUqB+ILs/wTfspFmeuEpvOkCq+SgHYprOhKirF7Is+LuFfF/RCumkkjPaPCLWdM2iu/EKD00nJ3iaqzIdZuFLFEgHYuKeeXce6MQ3H0LvCSOKRAfFXXI7ZL2p2O6joVXMo9DcH+318LgBvCCuVWTl8truWbztOIYm1+qtBzE9ACkmkTi/kWLyTFJxYzI5OI9W/XqLSZKe8wUTCa3NZtiafnK1VpKqyef29ZOYnL2JvlwOryIpCL2xs80NRVzbF3ZlU1LaxLDdfPrFo9wGeefY5MtYVonFcZv+fA9Sdc1Enxk39foy+2yjMngDlPWpSbQo0zjO0XJ/GFpyS47s0J4+N+xr50vozq8sqOToBxqF4E4Xl4s7IQbK4vaTZn+KjY3NEGTER6wjNzlGW5xXwgWiexR+jNfiAhSIDytW5wrEQrWPT8ukyoNX/iD0XD7PDUY1tZJrqkz1kb9rKJpHCH29OPbbMO45BxPf5F1/ihYSXKRaOaPvcYl64oHMFsfoe0uL7S1xrYed5F7Yb9zh6F5qv3JD9jt8+i0if7qKHzOLNJKUqUX9XI5RN8Q9zteNcnUu7SgAAAABJRU5ErkJggg=="
		},
		{
			label:"Urbandictionary",
			where : "tab",
			url:"http://www.urbandictionary.com/define.php?term=%s",
			image:"http://a.udimg.com/favicon.ico"
		},
		{
			label:"thefreedictionary",
			where : "tab",
			url:"http://www.thefreedictionary.com/_/search.aspx?tab=1&SearchBy=0&Word=%s&TFDBy=0",
			image:"http://img.tfd.com/favicon.ico"
		},
    ]);

	var MenuDown= PageMenu({
			label: "其他资源搜索",
			accesskey: "",
			condition: "select",
            insertBefore:"down-sep",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4ja2TvRmEIBBEJzC2DRuwHWjlrMFA2HoowHbI3gV6/nFnILfRAt+bbwYW6e810CjgZCRFsiJZRlLAaaC5hyP9CnmNtNv+SKuIX8/637Axn8BrjbQy5lJkoFEkb7Dx0kRX9LubfI4TcIr4bT3RyUAT3anf3XoF3C5gpML6ncgSJR3z56+ZP+C1L5hqgeoI1ZdY/YyLasUgHUUej/IxzuPP9KDehgzqFYh9FcEAAAAASUVORK5CYII=",
		});
	MenuDown([
		{
			label:"動漫花園",
			where : "tab",
			url:"http://share.dmhy.org/topics/list?keyword=%s",
			image:"http://share.dmhy.org/favicon.ico"
		},
        {
			label:"google搜索百度云资源",
			where : "tab",
			url:"https://www.google.com/search?q=site:pan.baidu.com%20%s",
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFZUlEQVRYhc2Xe1BUdRTHr1lNzahNM06Opck0UabjIwgDxcdampo6KBJqM5YlMyI0oqD4SjQJFU2dBPFJCIoKkpikoqRjaj5G5S24azwXdtlllwsLu5d9ffpjfcFCQpn2nTn//H7nd87n3vmde88RhEcE9AJWAlcAFaB7QqYFcoHtwFChLQFTASX/vUzAqtbJJwOWp5D8UUU9+tpVTzn5fY0TgFXPKDnAOQG41tlTd3Rw9A7EZkPsLUgphiLdPwLQC4C6o95aI2y+bmf2CTsz0u18dtxhfumOtY1X7aibOg+g74inqtFOUKaVqakWZqZb8T9mwTfNwvQ0C/7pVmYdt+Jz1ErgaSvKhg4D6AQcdfq3stggPKuZTw6Y8E2RmJQs4XdUIjzLzPLfzMxMk5h0SMI3VWJiskToWTPN1icIcL7Uwsi9BiYkGhizz0BwhpG7OtuD/TLRxpJME7J4A5OSGhm1z0CmokNV3TGA5acNuP2ow2uHngnxdagNNicf0WTHJ0lkeFwdHjF6lpxsfDIAVmBKQh2uG9S8HVVNeIbYrm9UVgOuG9QMiFYxZZ8Wm83+LwEsZsxaHT6binljRSnPr6ghJMPQPkCmnlfC/qTP6nJkMWpqGu08hqFtAG2jlctnstHPD8YyZQq68ZO5PdGfuGmr+GLNFeraiGSz2vDZo2LYDj3TU03MOm5h3ikrYeesJObb0LRdns4AF8rM+KUZGXlYInDbNXSjP8Y4WoY0WgYjh6PxHEX5rkTMrSIl5jQz/mATvj9L+KSamHrEyKeHjUxINvLRASP+aUYuljuVRkuAS+XNjNhXj3d8PbKEBtz2N3FzzDTEQUPRuHuhHTEW/YgxNLi5k7J0N2vPNhJ9soaAFB2jfmpAllCPLEHEc08dHrsd5rVXZGyCiHe8yMh4kcsV5rYBRJONCQm1DI7RMixOS/9YPQsPllKfmIzxcCq1i8KpHOqJ8gNv1B7elA725M3pmQiLyxly74z7Di2DYzQs/LWew3kmknKMBKSLDNquwSPOsTdxvw7RZHMGSLppoM96JQO3VtMvuoqIs3XYrC3LrS7xEPJ33ZAPGU69qyvrZqyn7w4DA7dW039LFS4blSTeall+djtEna/HZaOSAVur6bNeyYHsRmeAuUdq6Lm2lNcjy/CKUSK18ym7OzsARS8XfvlwOv2/l9N3o5J+UWW8GlHCD7+3dT2h2Wpn9M4qekeW0XNtKV+lapwBxu2qpNtKBS8vVxBwpLrNQACaqGgyer/PWyvz6BFZyWsRd3kxXE7YCU27ZwDmpah5aZmcbisVyOIqnAFksWV0DSuiS2gR0+Ir2g1U8G0078zJoGtEBd2XFyGEFOKfpMT6mILfckGHEFSAsCCfOclVzgBzkysRgvLosqiAHksLKVSZnII0GZrwXHEdIUzOC6H5CAtyGbW9BIPk/GluLcliZ9uFWiJO1aAxPPhPPATIKKhHCMxBCMlDCMphYFQxf5Q0gs0G2FCojEyKLUEILnD4BGYzIOoONQ3/qpV8CGC12xm3swRhfg7C4nyEb3J5bnE+7pvleG2V031ZIUJwrmMvOJfeq4u4o5E6nEmUIOaGhciLzZSLLcvwQUNSKZp5b/NdhJB8hGW3EcILEULv2dJCx9qiAnquKeZaRedany0XDbhuUuOyXsncQzUtAFq0ZCqDBb/UarqsUyBEyBHWKBwWoUD4TsHYhEry1B1/8vuKzKxFCMhG+PIGPrvL7y/r221Kr6okVl8V+fxMLbMya1l6qY6scmOnE9+XaLIRekzF14eqKNE/uDf6/0Vb3otOdMZPWOOe/Wj2DIZTidbD6VMYzzU4xvMYWo3nfwES3RBaYmrGDgAAAABJRU5ErkJggg=="
		},
		{
			label:"zimuku",
			where : "tab",
			url:"http://www.zimuku.net/search?q=%s",
			image:""
		},
    ]);

	var MenuOther= PageMenu({
			label: "其他各种搜索",
			accesskey: "",
			condition: "select",
	       		insertBefore:"other-sep",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4ja2TvRmEIBBEJzC2DRuwHWjlrMFA2HoowHbI3gV6/nFnILfRAt+bbwYW6e810CjgZCRFsiJZRlLAaaC5hyP9CnmNtNv+SKuIX8/637Axn8BrjbQy5lJkoFEkb7Dx0kRX9LubfI4TcIr4bT3RyUAT3anf3XoF3C5gpML6ncgSJR3z56+ZP+C1L5hqgeoI1ZdY/YyLasUgHUUej/IxzuPP9KDehgzqFYh9FcEAAAAASUVORK5CYII=",
		});
	MenuOther([
		{
			label:"淘宝搜索",
			url:"https://s.taobao.com/search?&q=%s",
			image:"https://s.taobao.com/favicon.ico",
			where: 'tab'
		},
		{
			label:"京东搜索",
			url:"http://search.jd.com/Search?keyword=%s&enc=utf-8",
			image:"http://search.jd.com/favicon.ico",
			where: 'tab'
		},
		{
            label: "greasyfork.org",
            tooltiptext: "左鍵：greasyfork.org搜尋選取文字 (新分頁前景)\n右鍵：greasyfork.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSUlEQVQ4jZXTv8qCUBgG8OegVEOhkiS0NJzJewi6qMCpqZtwkybvoDvoAlqFoOjPoBBRikPDeb5Fpb7S6oGz+Ofne17fA7xGAvABRADuxYqKa/LN808JxuMxO50OAdStoO7lNQC6rsvD4UBd15uQ9cuXAXCz2bDdblNK+Q1SVSInkwlHoxEdx+F2u62Q/X7/CZEA4FuWxSRJOBwOORgMuNvtqGka5/M5T6cTW61WHeCj6DB7vV6F9Pt9Ho9Hllkul3VAhOI3sUTiOOZsNuNjFotFHXB/Akrker1SKVUBcRyz2+3WAtH/G4ZhcLVaMQxDns9nKqV4uVxoWdbbLfgNXaZpmsyyjEop3m43mqZJIcRTE2UTAIC2bTPP8wp52E412kETIISgbdtM05QkOZ1O3470+lMlhmHQ8zzquv4yyl9Vgg+HqcxPx/kP9hE33f0JJs0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://greasyfork.org/zh-TW/scripts/search?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
		},
        {
            label: "userstyles.org",
            tooltiptext: "左鍵：userstyles.org搜尋選取文字 (新分頁前景)\n右鍵：userstyles.org搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jWXQ3U9TBxjH8ZNFRJ1UYAi0pz0lDba09Ch7ZWEyQtjktS6zHaask4zAgCYytkRbIFumnaKj2TQxc3QM416MI4EwozhTLzBLll4wFtGadWYTEbqNhKwsWbkp57sraWW/P+Dz5PkKgiAIGzduIE+9lXz1VvLVGag1mYiaHLRiHtlZKnK2bEbKeBxpWwa6LBW67EzS09IQHq7QmMv3M26u3XITvN1FKHKSqfB5Ll3+jFf3VWLT5jJR+RR3DtiIvNPCXd9hinWaJGAyq5l+cJTp+aP8PNfPkYHXsTts9PT04PP58Hg8NOzZQ4O5kImW14ie6EOWxCRgNkv8+tcX3JkP0NppIxgMsrq6SuoURSEajeJutBPtXwcUWwz88XeQgVPdjIxcBGB5eRm/3097ezsej4dQKEQsFuOgs5Fof++jgLXYxD//Rqirr2J2dhaAiatXqKqx0tzyEhV6DbYSGYfdzpt11USPe5GllAaSVsPpj0+yU7YQDocBWFlZIfB5ALe7A9sLz+PZ/QxfN9Zzra2J+eO9yKkRt2dvw7W3gpryEvr6ev/3fyKRIBQKYa+r5dtWJ/P+D9ZFNIj8fv00v1z1IxslhoaGSCQSrN/CwgKuynIenPkIq6RNAkUFGiLf9XNj2MuBht08XaKirKwId2cbZ89+yuLi4hri7XiLPwc/QdanACZ9PuEL71O2y4jD4WDfXhX3bj7Gb1MbaHVtoaa6eu2tN5xOakqsPKHKSAJGXR63hr2UykZisRiTk5N0d7XQ3PQs+x1VjI6OoigK8XicipdreXdgELVO/yhwc+gQpfIOlpaWUBRlLd7Dy/F4nEOHPbQdOcWFn+YoMFlSgVxmznkZ7nHxYumTdL99kEBgkPHxccbGxvjw2DGqX7Hz3vkrfDM9x+WZWQqMqYCUT3jER2TsBN2uWro6y/nxRgcXv2rC6XiO+v3NDP5wly+n7nNp5j7Xb99DbzQngc3paVgMIhaDiDonE1GdxU6rll1WEVGdxfbcPAqMFgwmM4VFFoxFZtI3bUIQBOE/EDAl6FFoKc0AAAAASUVORK5CYII=",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(getBrowserSelection()) + "&sort=updated_date&sort_direction=desc");
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("http://userstyles.org/styles/browse?as=1&search_terms=" + encodeURIComponent(readFromClipboard()) + "&sort=updated_date&sort_direction=desc");
                        break;
                }
            },
		},
		{
            label: "Firefox 附加元件",
            tooltiptext: "左鍵：Firefox 附加元件搜尋選取文字 (新分頁前景)\n右鍵：Firefox 附加元件搜索剪貼簿文字 (新分頁前景)",
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4klEQVQ4jY2Sa0hTcRjGD/7P2Fo2Vw1CsKyYlUn0YdnmOafstq6GWXZRmFS2OdCp2zlnXrI1IrxglJRF0ZUKEu26Sh25NC9b5gSrTxnZivpQUSHOClGfPiyLMKTnywMvPD9e3vehqAmky6dmMyJxMzzpZwXylRXJzXgbNXOizF9a75je5e29i8Dn53jx4Qmq6i0jnCh5/N8ATpC8dfWcxBGPAYcak3HJ6wAnSt/9NyDBFpZvuZD4/WB9Ehz3NyDnfOJ3nTXMPGGIyadXMQIJMDwNhqeRUhY1WN1qxvFHJqSURQ2OzRmBBJh8etU4ACuQvtJ76Tjns+F0hwUn2kzIqp0HY00MjjbvRlVLJqpaMlF8fRNYgfSN34CncbYzD6lXZUi9OumXy5B6RYZtl2XYekmKlItSVD5MB8PToDR51CzOLuleV6L6mMCH5TE8jVNPjEirkyOtbnLIa+XYVSvHzho5jLeiUexOxLE2QwjAiuTmre4Toy8/+XHNVzmUXB45WNW5CwZXODJcU5DhCofhTjgMt8ORdS8KzsYNo5tLI4MMTw+xAvlCsQL5Wu3dh9KOjTjcsQYVnUnI86ix163AXndEyBsV2NOgQEmrDlvKIgcYK9mjMVFytYWSUoxA+ivbt8PknoH97fGo8K+HrU0NU7MSWS1TkdWihKlZCaNHCYdPB71DGUywUkv/lMVON2Rf0Yw4m9bCcCbmW1K5arC8ZzWyvdOQ45sOsWsunN1L4PBrUOhbCHNd3NCKIvk3lic/GJEEqHgbNZO1063LCiSvdXyYheFplD1bjtwuFYqeqmFrWDysdyqCeqdiIPv2gmG7NxZ863zYPHGhI/7rjYd6liK3S4WDzxdhzQF5UMvTei1P61cWy4LW9jnIfBCBnKbofwO4Qskr443ZKPLHotgfhwQbGf0DJ8PZzVEwN83AjotKcAXk1TiAlqe4ZQWS3rHKsnby5ndLRfJ+bM7ZJb1anuJ+AlaseBXu6wE/AAAAAElFTkSuQmCC",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(getBrowserSelection()));
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab("https://addons.mozilla.org/zh-TW/firefox/search/?q=" + encodeURIComponent(readFromClipboard()));
                        break;
                }
            },
		},
		{
            label: "多引擎BT搜索",
            tooltiptext: "左鍵：BT搜尋選取文字\n右鍵：BT搜索剪貼簿文字",
            image: "",
            onclick: function(e) {
                switch (e.button) {
                    case 0:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(getBrowserSelection()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(getBrowserSelection()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(getBrowserSelection()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(getBrowserSelection()));//海盜灣
                        break;
                    case 2:
                        gBrowser.addTab("https://rarbg.to/torrents.php?search=" + encodeURIComponent(readFromClipboard()) + "&order=seeders&by=DESC");//RARBG
                        gBrowser.addTab("http://kat.cr/usearch/" + encodeURIComponent(readFromClipboard()) + "/");//KickassTorrents
                        gBrowser.addTab("http://seed2peer.com/search/" + encodeURIComponent(readFromClipboard()) + "/");//Seed2Peer
                        gBrowser.addTab("https://thepiratebay.vg/search/" + encodeURIComponent(readFromClipboard()));//海盜灣
                        break;
                }
            },
		},
		{
			label:"Github",
			where : "tab",
			url:"https://github.com/search?utf8=%E2%9C%93&q=%s",
			image:"https://assets-cdn.github.com/favicon.ico"
		},
		{
			label:"微博找人",
			where : "tab",
			url:"http://s.weibo.com/user/%s&Refer=pic_user",
			image:"http://s.weibo.com/favicon.ico"
		},
		{
			label:"卡饭_站内搜索",
			where : "tab",
			url:"http://bds.kafan.cn/cse/search?q=%s&s=15563968344970452529&nsid=0",
			image:"http://bbs.kafan.cn/favicon.ico"
		},
		{
			label:"谷歌站内搜索",
			where : "tab",
			url:"http://www.google.com/search?q=site:%HOST% %s",
			image:"https://www.google.com/favicon.ico"
		},
		{
			label: '百度站內搜索',
			where : "tab",
			image:"http://www.baidu.com/favicon.ico",
			oncommand:function () {
				gBrowser.loadURI(
					"javascript:(function(){ p=prompt('%E5%9C%A8 '+document.location.href.split('/')[2]+' %E4%B8%AD%E6%90%9C%E7%B4%A2',''); if(p){ document.open('http://www.baidu.com/s?wd=site:'+document.location.href.split('/')[2]+' '+p,'','')} })();"
                )
			}
		},
		/*{
			label: "Everything本地文件搜索",
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAACJklEQVRIicWWoY6tMBCG99WaoCqaII5E1VRh8E1IFU+AQmFJ0IiqKjRPsG+AnIQm/4qbNnDOXih378lOUtV2Pvj7z7Qf+KX4OJtc1xXOORhjoJQC5xyccyilYIyBtRbruv4/8LZtcM5BSgnG2OmQUsI5h23bfgYmInRdd0guhICUEmVZoixLSCkhhDis6boORPRvYO/9C1RrDefcQdJwBFrrw9q2bZP//ACe5zkmyfMcfd+fJvLeYxgGPB6PuM85dw9MRPFMOecYxzEpAQBM0xSlL4oiyXARvP9bY8wts3jv0TRN3G+tTQeHjUKIZLn2Mc8z8jwHYwx1XV9+eAQHmaWUt9wZgoiglAJjDI/H4zJHBIevLcvyNjREVVVgjCHLst8Bc87TwUFqpdSPpS6KIh1sjIn1O8/zbfCyLLGetdbp5nouJ+/9LfC+nKZpulwfweu6oiiKWFIpm0NYa6NHbjcQAHDOHVrmMAyXLXMcx0PLTGkeL2DvPdq2PTT+uq7hnDuYhYgwzzOMMciy7LC+aRoMw5Burn3SZ3ie51BKoaoqVFUFpVSU9ruRZRm01qfwbx8CRARrbTzzs1EUBay1B3Ptr9S/wS+fPtM0QWsNKWWUVUoJrTWmaYpGGobhRfYz+Ck4xLZtIKLDeDYdEb08DPY+eYYngVPjDG6MwbIs7wFfwZVS7wOfwYUQ7wUHeOj/wZB9378fDPy5OJRSEEKg73t8fn7GuS9r1uZ2luZFHQAAAABJRU5ErkJggg==",
			oncommand: function(){
			        var str = addMenu.convertText('%s');
			        addMenu.exec("D:\\Green2016\\Everything\-1\.4\.0\.713b\.x64\.Multilingual\\Everything.exe, ['-search', str]);
			        //自定义EVERYTHING路径
			}
		}*/
    ]);
};


//=======================多功能 菜单======================
// pagesub({ ... }) 里面可以添加子菜单
var pagesub = PageMenu({
		label: "多功能菜单",
		id:"duogongneng",
		accesskey: "z" ,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJ0lEQVQ4jWNgGHgw8/9/ijCEoMBy6hlAstOp7oJRLwx5L1CUFygEAGMD6RcCSPsKAAAAAElFTkSuQmCC",
	});
pagesub([
	{id:"duogongneng-sep",style:"display:none;"},
    {
        label : "查看当前页面的源代码",
        url   : "view-source:%u",
        where : "tab",
        accesskey: "s",
        where : "tab",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVQ4jaXLzUoCURjG8VcEQRh09EgdaAIF2/gVBz1gNtggDASitGkT1rKQQGhhNDegDrQe8gqmpFtIaBt4BwXdydMmB0fGAmfxg/c8fw6ZpolWq7UV0zRBhmEgDGo2mwiDdF3Hfy4eXjY2qtfr+IuQOuzZ98ZOUkqsGrufvvfk+QuyVoWUNYzWmpQSJISAEAJHZ0NY0wVOrx0sNyEErOnCu4fOB6zpAsWq4W2kaRpuJm/o23NUKhWfUrmE28d333ZYLqBvz9G359A0DcT5LtoDF927GTjnnmw2i/P7Vxzk88jlcr7WHrhoD1xwzkGMMTDG0Lh00Og5yLAUvK3neDdjDOnMDho9B8dXT95GqqpiKaFJFDqj33cSxe7Ea2oygUJnhKSawuofUhQFQfZOLCiJdGBbRfF4HIFS+8H7GorFYgiDotEowiAiQiQS2QoR4QdkBIWgxWFeqgAAAABJRU5ErkJggg==",
    },
    {
        label:"复制decode地址",
        oncommand:"Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(decodeURIComponent(gContextMenu.linkURL));",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAqpRUqpRUqpRUqpRXOcSRkAAAABHRSTlMAgDbD2dd/ZQAAADRJREFUCNdjYGBxAQEHBhYRXAyQGmclE4iIE4MKKgMihWKOEYMyhKHAwARhMDAwoKrBxQAAkOYXUkSJqx8AAAAASUVORK5CYII=",
    },
	{
		label:"解除右键和复制限制",
		url:"javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)",
		accesskey:"u",
		image :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVQ4jY2MoU7EQBRF34agVvMDKMJXLPwHIPgHLBJRiSqiDe28ZjNicIwdO6qiTU2zyYoVs2JNBQJz8cyDvJscc3PvIVJmWRaklJBSwjRN0P6IiGgYBvxmHEedZJ5n9H2fjaVOTIwRMcZsLHViQggIIWRjqRPjvYf3PhtLnRjnHJxz/4+/PwlaRMHXB0GLKFi2BC2i4PRO0CIKjm8ELaLg8ErQIgr2BUFLdi7L8nz3QtDQtu09M98YY66ttRcAVlQUxbrruquqqm6NMQ9N0zwx8/MfPDLzXV3XG2a+tNae/QDLll73lGVxhQAAAABJRU5ErkJggg==',

	},
	{
		label:"查看当前UA",
		url:"javascript:var%20x=navigator.userAgent;%20var%20y='%';%20for%20(var%20i=0;i<x.length;i++)%7B%20y+=x.charCodeAt(i).toString(16)+'%';%20%7D%20y=unescape(decodeURI(y.replace(/\%$/,'')));%20alert(x+'\n'+y);%20void(0);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg==",
	},
	{
		label:"谷歌站內搜索",
		url:"javascript:var%20ax=prompt('%E8%B0%B7%E6%AD%8C%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2\n%E8%AF%B7%E8%BE%93%E5%85%A5%E6%90%9C%E7%B4%A2%E5%85%B3%E9%94%AE%E5%AD%97','');if(ax.length>0){window.open('http://www.google.com/search?hl=zh-CN&client=opera&q=site:'+encodeURIComponent(location.hostname)+'%20'+encodeURIComponent(ax))};void(0)",
		accesskey:"g",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
	},
	{
		label:"百度站內搜索",
		url:"javascript:(function(){ p=prompt('%E5%9C%A8 '+document.location.href.split('/')[2]+' %E4%B8%AD%E6%90%9C%E7%B4%A2',''); if(p){ document.open('http://www.baidu.com/s?wd=site:'+document.location.href.split('/')[2]+' '+p,'','')} })();",
		accesskey:"b",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWklEQVQ4jZ2TzUuUURTGf2dmnFHLpCh1kSa0yV2k1iZokRURRNAiSrDAlZFhSUQgRBYGRX+BEFQEISJBENW2hRUlgaLpjBPqaI7mt+i877z3nhbjfKi7Dlw4zzn3Hp77nHOEh4MKgFVQCxYwJoWNBWtT2Ev7Odh4BAC0rYr/Man/iA+r2xLhEUc72md1oD+hAJGwo9GIu/2i8fBh7aaY6yrPO5fk1ctlnj6eJxpxaWyYprkpTjTibilgNzNYXDAEg4I1sLvIL/lBkfk5Q2LdijEq83NmcwHPEMCkGIyPJXnQNqv5BT7qzhTK4rzhcHWImmMFXGsszryZGE9SXpGXYQB3+1RVtev1oh4oGbHHa39bVdXRsKOJdatpGw07evliTC9dmLB/ppKqqsrZLs1oUHkwSHlFnpSUBuT9u1UAbt2Y5nbzNNGIS0/3CtFRlx/fEhIbT2603hLApv51pKaAljt7dCbucagqKC3X4/pryCGU75OZuNH2jn3ypXeNsrKA7i3x52jgpRj4/XDu/E6Zinm0NscZHnIwHrK2aun9vC73Wmf0ybNSiU0kqawMSrYLXlbZ0XCSm01xBgdcPA/JFXx4yJVH9/+yvyJPMhlj8KW7oAo9b5a1/6ejyeT2mVlYsPr9a4KJsZyktQQwWQZ5IcFxFL8f1KLWKj6/iN+HKrC2Zpma9HIGSbMaiMCVq8UyGfMYGXbZVeSTE3WFALztXpGlRUt1bYiTp3dILgOh4ZPqi1PpkAJ9wJaZzVgQqE4DOdqJUP9B8bzsmhq7saobvjXgaWqVM0cz6/8PC5Bp7zdzt94AAAAASUVORK5CYII=",
	},
	{
        label:"为本站google搜索油侯脚本",
        url: "https://www.google.com/search?q=site:greasyfork.org%20%HOST%",
        where: "tab",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII="
	},
	{
        label: "查看google网页快照",
        url: "http://webcache.googleusercontent.com/search?q=cache:%u",
        condition: "noselect nolink nomailto noimage nomedia noinput",
        where : "tab",
        insertAfter: "context-openlinkintab",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFElEQVQ4ja3TsUvDQBTH8dD/4wYXF7c6CeI/4h9xYnEopLVSRHB1cGu3DoKCSGIsVmMcBCcbOWpBSM0UKmKWVoyYr4NYIlJjiD9403EfePfeadr/pFYQ0tCFNJWQppdSSkhD17RaYXJdSEMXKyaZShp6AjBVdsBUScD7OljevWanfc+ZGhKEL7Su/GmA9wMoVk6J45hkLDeg1OpS3rul1Ooys3o8HVjYOAfgsv9I48IjjmMsNyAcRzyPXtk6umN27SQdWD9QNByPm4cQyw2oH/bYNvqE44j5aicdqO4rms4A1/8E/KfRpKU/AXZvSNMZfGsBIHp7Z67czv6Ii3WbpU2bYqXz+xTyjDHvIuVc5dyfKU8+AGFT89bPn6ZlAAAAAElFTkSuQmCC"
	},
	{
        label: "查找相似页面",
        url: "https://www.google.com/search?q=related:%u",
        condition: "noselect nolink nomailto noimage nomedia noinput",
        where : "tab",
        insertBefore: "context-back",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jbWST0hTARzHvzzd2PSJj8wt3uytV285fGvpWHO255j4cD63lm0dXOZcI0Iq+kdUhyDEOlkQQYcwu0T071DQH09BUIe62CHKpD9QJOJBwkNIRHw79Ie0ix36XH98vj9+P77A/8Dv9ycMwzgTiUTW/rPsdDojqqrOmqZJwzBGZVmuWLKs67oSDoc/WZbFnp4eJhIJ+v3+ry0tLTOqqh4GgI6OjnQ4HJ5yu937/gqIxWIPTNNkKpWiZVlMJpM0TZOtra0MBoPMZDJzzc3NdLlcdDgc9xbIoii6dF2fzeVyzOfzDIVCDAQCjEajjEajTCQStCyLXV1djMfjlCRpakGALMvXDcNgoVBgd3c3fT4fa2pqJnVdv+L1eue9Xi/XNzYyk8kw0dbGQCAw8VuWJCnr8/mYTqdZKpVomiY9Hs+kIAhHABy32+3DssfzJRaLsa+vj6lUinWKcgEAUFdXtyyWLk0fvXiX+85dY1d+JyMbNlCSpDMABgDsEkVxaI2mMZlMslgsMh6P0+PxXJUkSYKmrd597OZTjjz/yMsvpjg4Ns56velLWVlZGoACYLnb7b6zLhhkNptlf38/G5uaWF1dfcrhcGyHqqrb2/ac5sDT9yw9ecfC2AQbNnY+EgRh2Gaz7XU6ndlVmv5587adLO7aw1wuxzWa9q28vHwMQAgApIYG/dmmHcfYe2KEnb0H5iorKw8IgjBos9mKsiyPHhx9yBuvpjn2ZoYnL93iSmXVHICNv34oAOgURXGotrb2vCAIhwAEAVQACCmKMrJ1+BYPjX9g6fFrDtx/SX9j+53FHSoHIAPwA1jxMxQAYLfbe+qDLW+3nBj92nv2Ntvz++c1TetYWrd/sAJAweVynVcUZaSqqirz54KlIvw8ybF48B3eROGQdPM9mgAAAABJRU5ErkJggg=="
    },
    {
        label: 'Flvcd視頻分析',
        oncommand: function() {
            gBrowser.loadURI('http://www.flvcd.com/parse.php?kw='+ encodeURIComponent(addMenu.convertText("%RLINK_OR_URL%")) + '&flag=one&format=real');
        },
        insertBefore: "spell-check-enabled",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jXXRz0/TYBjA8f2LArogCIyZ6MHEiydPXDUcCEuEgUNEXFzBX9FgpgcPxkFAwM3MjXbttnZjZW3XdiuBLCZfD8uolfEkn9P7PN/LGwoNmBlBYZBBu4GJpXViaZ2K5eF1u5z96fG6XarWKf33K48752d0zs/Q3TZVy0ExeqqWg+62L94vRfrHuttBbtqUTmxKzZ6y6aLaHVTHQ3U8DO/0ciSW1tHbHaQTO0AxXQqmx6dyG0F0eV9y2T32qLc7fmBGUDhUTRTD4ajRQtTtC5LRRijYzO2bxLIt5g8tYvsm32ttPmZ1xmfzhGYEhZJhIzZsisetC5Jus6c5zO+ZPMk6LORcFnIOsYMWSwcmnyXLD8imw++aRb7uE3WbrYLF40yTub2W70eL2UyTZM70A/t1m11ZZ1tqsC012JEaZGsmj77Wib7TuLd1HHD3Q42Hac0PbPwyyDZsdmSdbVnnsGbxRTS5nZKZ2lSJvtECpl+rTKdkPxB5ViD50yCj2nyr2Gxkm9zflAk/l5hKVZh8FTS9WfUD/Z+YfCkxligwligyEs8zslxk7IUStKZwc03hztuaf9wPRAWNW0mFa/EiI8si4ZVST0IinJC4kZC4/lQikqoSSVWDgVAoFHqwkiMqaEQFjfBKieG4yNDiEUOLRwzHRcKJElFBG3zcn9ElkdElkYlVhch6mUiy0rNeZmJVYXw2f/Xxv9Nf/N+g3b/3UqHdPGBmngAAAABJRU5ErkJggg==",
        condition: "nolink",
        onshowing: function(menuitem) {
            var url = addMenu.convertText("%RLINK_OR_URL%");
            var urlt1 = !/tv\.sohu\.com\/(.*)\.shtml/.test(url);
            var urlt2 = !/tv\.sohu\.com\/s(.*)\/(.*)\//.test(url);
            var urlt3 = !/v\.youku\.com\/v\_show\/(.*)\.html/i.test(url);
            var urlt4 = !/www\.iqiyi\.com\/(a|v)\_(.*)\.html/.test(url);
            var urlt5 = !/www\.tudou\.com\/albumplay\/(.*)\.html/.test(url);
            var urlt6 = !/(www|comic)\.letv\.com\/(comic|ptv|zt|izt)\/(.*)\.(html|shtml)/.test(url);
            this.hidden = urlt1 && urlt2 && urlt3 && urlt4 && urlt5 && urlt6;
		},
	},
    {
        label: "显示所有图片",
        condition: "noselect nolink nomailto noimage nomedia noinput",
        insertAfter: "context-back",
        where:"tab",
		oncommand: function () {gBrowser.loadURI("javascript:n='';for(i=0;i<document.images.length;i++){n+='<img%20src='+document.images[i].src+'><br>'+'\u56FE\u50CF\u5C3A\u5BF8\uFF1A'+document.images[i].width+'x'+document.images[i].height+'%20\u50CF\u7D20'+'<br><br>'};if(n!=''){document.write('<body%20style=background-color:#777;><p%20align=center%20style=font-size:14px;font-family:Tahoma,\u5FAE\u8F6F\u96C5\u9ED1,\u65B0\u5B8B\u4F53;>'+n+'</p></body>');void(document.close())}else{alert('Sorry,%20find%20no%20image!')}");},
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADK0lEQVQ4jQXB209aBwDA4fOn7WFLlq7RNUszN13tRbOlpslefOsetmR7mFuy1k57QywFAVEBQVqgTKJ4VwQrXhiCcrgeOFwEzgEG/PZ9wvjpGbfcHj5xufjMu8ot5xaDKwfcdYR54DvlS+8efe51vrW6MF3lKHahVlGh1aZbqyLcdfu44/XzjX+D255NBhzb3DZv0Kf10Wfwc2PRz80lL8NWD892jxFb0AE6Shs6XYRRq4e/E0Xe5No8TzTQZUFXAE0eDApoa/CqADPJBq9CcY7r0ACkVAmaIDxc8mIrw1yszuPlIOPOj/xgDzO0uMeI+4QxzxkPXUHGljcZ1TuYWN1lp1And92h1wPhjtHGUqWH5iDF2GsP9w1++t/6+FTv48bCBp/PuOmbfU+/zsnXFheDCzb+DB8RB8QeCEMGCy4FHKKKNpzDUIQpGSbb8BLQtsHcg9kWzAK/JK/4/TJBGDgGhBGTmeWqwlJSRhfNMp0o8CgQ5H7gkO/Wggw6A3y/esDIP1vc8wcY+uBhwL7IT+vrmNMZhHGzEW+pjCOVYzGZ4/lpnAfzNgaMS/Tr5vnqjYXhBReDJhtfvNAwardzz2xi+LWGlXIFYX5tjQmjibGnT9hvquiCYRbP4niyMvZkHodUxZ4r48qWsMdEfIkcvssMc/uHmEJHCLLSICRe8YfVxG6tgO0ozIdojM1EirBcZeUigVdMsyeVCaVkkkWFS1nBfXSC5SCIUG83qQPWyDar8iXO0xCRcpEzSSJWqRJp1ImoChcNlfOURD5fQyqpeI4j6Lc3EWSlxjVgDK3xq1PPj1MT+OMnyPSQeh3OlWuirTpJRSWazlMoNSg3u6xe/Mvc4Q5ChQ4VIEGLfUVi0mdnuySSByK1AknaSEAFKAFVIA8441Gmd9cRVCBZqZJqqhQBy/4GfjFGHpCBTEul0GpT7va4rDeItVTCjRoL5yfoI2EEOkAL+A/ogiuwxaTZyM8vp/ltagqddo63L/ToZ0w80+j5a8HKk/fveLryjvmDQ4Sm3IMmoAB1SGUrXFVqHGXSiHIZKZZH+igixQpELzLspPP4M1kCYg4R+B+Et1zo35zIagAAAABJRU5ErkJggg=="
    },
    {
        label: "显示所有图片2",
        condition: "noselect nolink nomailto noimage nomedia noinput",
        insertAfter: "context-back",
        where:"tab",
        oncommand: function () {gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");},
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADK0lEQVQ4jQXB209aBwDA4fOn7WFLlq7RNUszN13tRbOlpslefOsetmR7mFuy1k57QywFAVEBQVqgTKJ4VwQrXhiCcrgeOFwEzgEG/PZ9wvjpGbfcHj5xufjMu8ot5xaDKwfcdYR54DvlS+8efe51vrW6MF3lKHahVlGh1aZbqyLcdfu44/XzjX+D255NBhzb3DZv0Kf10Wfwc2PRz80lL8NWD892jxFb0AE6Shs6XYRRq4e/E0Xe5No8TzTQZUFXAE0eDApoa/CqADPJBq9CcY7r0ACkVAmaIDxc8mIrw1yszuPlIOPOj/xgDzO0uMeI+4QxzxkPXUHGljcZ1TuYWN1lp1And92h1wPhjtHGUqWH5iDF2GsP9w1++t/6+FTv48bCBp/PuOmbfU+/zsnXFheDCzb+DB8RB8QeCEMGCy4FHKKKNpzDUIQpGSbb8BLQtsHcg9kWzAK/JK/4/TJBGDgGhBGTmeWqwlJSRhfNMp0o8CgQ5H7gkO/Wggw6A3y/esDIP1vc8wcY+uBhwL7IT+vrmNMZhHGzEW+pjCOVYzGZ4/lpnAfzNgaMS/Tr5vnqjYXhBReDJhtfvNAwardzz2xi+LWGlXIFYX5tjQmjibGnT9hvquiCYRbP4niyMvZkHodUxZ4r48qWsMdEfIkcvssMc/uHmEJHCLLSICRe8YfVxG6tgO0ozIdojM1EirBcZeUigVdMsyeVCaVkkkWFS1nBfXSC5SCIUG83qQPWyDar8iXO0xCRcpEzSSJWqRJp1ImoChcNlfOURD5fQyqpeI4j6Lc3EWSlxjVgDK3xq1PPj1MT+OMnyPSQeh3OlWuirTpJRSWazlMoNSg3u6xe/Mvc4Q5ChQ4VIEGLfUVi0mdnuySSByK1AknaSEAFKAFVIA8441Gmd9cRVCBZqZJqqhQBy/4GfjFGHpCBTEul0GpT7va4rDeItVTCjRoL5yfoI2EEOkAL+A/ogiuwxaTZyM8vp/ltagqddo63L/ToZ0w80+j5a8HKk/fveLryjvmDQ4Sm3IMmoAB1SGUrXFVqHGXSiHIZKZZH+igixQpELzLspPP4M1kCYg4R+B+Et1zo35zIagAAAABJRU5ErkJggg=="
    },
	{},
	{
		label:"繁体转简体",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUAAADTIXvTIXuT0ZBWAAAAAnRSTlMAEGsk3VwAAAAcSURBVAjXY0ACWqtWQAmGTAZ0QmsFjGBqwEMAALnpDJVFI8EHAAAAAElFTkSuQmCC",
		oncommand: function(){
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";
			content.document.documentElement.appendChild(content.document.createElement("style")).textContent = 'body { font-family: "微软雅黑" }';
		}
	},
	/*{
		label:"惠惠购物",
		url:"javascript:(function() {var version = '3.1';var optionNode = document.getElementById('youdaoGWZS_options');if(!optionNode) {optionNode = document.createElement('span'); optionNode.id = 'youdaoGWZS_options'; optionNode.style.display = 'none';optionNode.innerHTML = 'position=down;vendor=youdao;browser=firefox;version=' + version; var wr = document.createElement('span'); wr.id = 'youdao_gouwu';wr.style.display = 'none'; var conf = document.createElement('span'); conf.id = 'youdaoGWZS_config'; conf.innerHTML = encodeURIComponent('{}'); wr.appendChild(conf); wr.appendChild(optionNode); document.body.appendChild(wr); } var daogw_s = document.createElement('script');daogw_s.charset = 'UTF-8';daogw_s.type = 'text/javascript';daogw_s.id = 'youdao_gouwu_assistant';daogw_s.src = 'https://shared-https.ydstatic.com/gouwuex/ext/script/extension_' + version.replace('.', '_') + '.js?vendor=youdao&browser=firefox&version=' + version;    document.getElementsByTagName('head')[0].appendChild(daogw_s);})();",
	},
	{
		label:"购物党",
		url:"javascript:(function(){var s = document.createElement('script');s.setAttribute('src','https://browser.gwdang.com/get.js?f=/js/gwdang_extension.js');document.body.appendChild(s);})();",
	},*/
	{
        label:"买家秀",
        id:"maijiaxiu",
        url:"javascript:(function(){location.href='http://just998.com/xiu/photo'+window.location.search})()",
    },
	{
        label: "上下|左右分屏",
        tooltiptext: "左键:上下分屏|右键:左右分屏",
        onclick: function(e) {
            switch(e.button) {
                case 0:
                    gBrowser.loadURI("javascript:document.write('<HTML><HEAD></HEAD><FRAMESET ROWS=\"50%,*\"><FRAME SRC=' + location.href + '><FRAME SRC=' + location.href + '></FRAMESET></HTML>')")
                    closeMenus(this);
                    break;
                case 2:
                    gBrowser.loadURI("javascript:document.write('<HTML><HEAD></HEAD><FRAMESET COLS=\"50%,*\"><FRAME SRC=' + location.href + '><FRAME SRC=' + location.href + '></FRAMESET></HTML>')")
                    closeMenus(this);
                    break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALElEQVQ4jWNgoBjM/P+fIgwhKLCcKANwqRlOLoAZQhY9TMJgGLiAosxEIQAANUWwHZYnSOsAAAAASUVORK5CYII=",
	},
	/*{
		label: "Google 快照",
		url: "http://webcache.googleusercontent.com/search?q=cache:%u",
		condition: "nolink",
		accesskey: "c",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
		where:"tab",
	},*/
	// {
	// 	label:"网页设计测量组件",
	// 	url:"javascript:function%20fnStartDesign(sUrl)%20{var%20nScript%20=%20document.createElement('script');nScript.setAttribute('language','JavaScript');nScript.setAttribute('src',sUrl);document.body.appendChild(nScript);}fnStartDesign('http://www.sprymedia.co.uk/design/design/media/js/design-loader.js');",
	// 	accesskey:"d",
	// 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLUlEQVQ4jZ3SvUpDQRCG4a+yEIIg2ChqoYWiFgqChWAn2HoPWngTxs5KBItAEIsUSQxGiwgKWghaiCncIhoFgxHxGs5aZF+rc2LM+QkOLCwsPMx8s5IkczqFKU9gTsYxpWHSm/2Y4iCmOIAppDCFFOmNvuDun9UFbcsv97WO+1zDNVdwjUXc2xzudRL3Moarj4SeDuA/SBcQhpjjoY5xWs+j8UAY8vvNq01HABfv9IJ4tZkAWJ71AdNCj6DzZiLiPc0HmbQ7eLCoCroHleMRr74UBNs5wq1Fd6AbUP4jFvG30x3ilUXXoEvQ1mEiEr6FikUV0BkoE99JO8S/VbKoBMqD9qK3E/kPJEk5i3KgI9BueLDxgCRlLcqCMqCdRheSDEjSgUX734Q99QYk1A9UH4uEpb0JIwAAAABJRU5ErkJggg==",
	// },
	// {
	// 	label:"鼠标处看字体",
	// 	url:"javascript:(function(){var%20d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(s)})();",
	// 	accesskey:"f",
	// 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4jWPg3vX/PyWYgWID/qMBDAUMDDgx1+avlBnAwMBAAwPQDUFx8rr3mHJUMQAmQMgAnF5ANwBZjKoGEB0GyIbgMwBrQiLFAAYGBsykjM8ArBjdgFXPUQ0h2QC650YAqCiBbcJjt1wAAAAASUVORK5CYII=",
	// },
	// {
	// 	label:"Mouseover DOM Inspector",
	// 	url:"javascript:prefFile='';void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/v2.0/modi_v2.0.js');void(z.id='modi');",
	// 	accesskey:"m",
	// 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBklEQVQ4jZ3QT0iTARjH8SciUlf2FnQx6RqN6FJCXqot6ZC02WjQstnyMMgaexcbWUpRUNTKVpSTyjkwc/lWvptmzjlm5hzyutJ3K/+wLcIdKis0CAJh+3Xt0N6V3/vz4Xkeoj86NcrpDcE2V6WvqVbLcSvpX2OH3IxV9OFqzI+Gsedgg+2oH+zAtlt1t/MOn00NrrOIXnjED9jq4FHmfIF97gCujwQht59EaeMxXhKwiHx0KZOB3MFjZ3MvlG0BaJ68Qq0vgqdxEZsajmIDe6g8J2CN9aD9bQo7mnuhcA2gqnMIBu8o2EAUl8JxlJzTodhc9S0nYJ8NwTk2gz2tfqg6Q6jhwzAPjOPiSAyONzO4M9wHhlUj9wkT3sT8z19QPw5B3x2GyS/gwmsRTdFptL5PwTMpSAPm+LPtWWSh7w7jdL+AxmERN8en8fBdCl3JOdh4lzRARGSMeDgAuBudhV2YwoN4Ep7EHPrSn8Cwaqw3qzhJgIjoSH9L18Tnj5j8uoD49x9ILi5go+0wGFYNk/tAdvMjm/QWREQdiZfFZS3WyJZrxsWS87p55oxKkU5zhWvvGVHqssAQdEF2v25/XuhvyS7rILtSjRM9Tqy5cfzLspDVpspMkeUgyh0WFNVrQFpt4X8jBdW7hYIaBeRsBRijcmlZm6zS7DIprXvzP1UqACuIiH4DWHAhfVADxQEAAAAASUVORK5CYII=",
	// },
	// {
	// 	label:"查看星号密码",
	// 	url:"javascript:(function()%7bvar%20s,F,j,f,i;%20s%20=%20%22%22;%20F%20=%20document.forms;%20for(j=0;%20j%3cF.length;%20++j)%20%7b%20f%20=%20F%5bj%5d;%20for%20(i=0;%20i%3cf.length;%20++i)%20%7b%20if%20(f%5bi%5d.type.toLowerCase()%20==%20%22password%22)%20s%20+=%20f%5bi%5d.value%20+%20%22\n%22;%20%7d%20%7d%20if%20(s)%20alert(%22Passwords%20in%20forms%20on%20this%20page:\n\n%22%20+%20s);%20else%20alert(%22There%20are%20no%20passwords%20in%20forms%20on%20this%20page.%22);%7d)();",
	// 	//accesskey:"s",
	// 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAADNklEQVRIie1VW2gTQRQd4s7ih/ql0I8Wiij6IUET64+axkLVqlWxTXbxgX1oRfAt1CoIovjAKrWN21lrKYL6oSgoKkJEfIRiUxFbEaxSQUStVYs01lSt2eNHGpPd7G42sfTLgcPszp2Zc+49M7uExJtNB2S04kaTRyVuNnE04rrqYr1RKUcy/r8RQozLZPju5ZlXpI1VSSAsN4P9rBN7qDRToPITgco/RV6GwDOIvBwFZRB59lrgpKNucmDsvwgxbCLPrguUQaBsmDCRPPosUAaBZ0et7mkjhNiQw9U+L5iMjsKppnjktsdJeRlb5uzH/sIW1diwoNclxDedmJ/2+Hgkh6utrymC1JCP5iYTyG40HFz2FzeuLUS3X0LzhNXvRcoiiSK8lFVoEzUUFMnmauv3LkJXVx4AJxTF8bdXFGfCs0MVHwy78OH+KSCbqxao3GciILUFMQGKEicAkvvEeExA2yTHVS8nf9cRkIYFwwJ+hOz4Fl6AoH8tfg/Nw9u+AgBOhL44EAoV4WnAi9DAfPQNzMVg2IU39yRIE8pVZ0CgrLOYnJiYkQX9H+y4yPKxffd2MN98XAhUAnDimd+OQ3WlqK1ZiSNnK/Dq02IMhl1o2nZa5xA2Vlkpv4EFeegI2FHlWYmrt5bi41cXAAdCvTNx+ZILe8qK4Q8ug6LkQSrfpUfe6SFSlmnGZhZ8fjUNj9pWwHd4K14+X4CWB5uiFbg7C4H2UpyvX487rSJuPVyjd/06V5GGbKNELVkQPeV56HlTCEWZo7oFQ7/m4tO7AiiKE/LGnUmZD3+K02oZ3YKu1iVJ2WsOnTZrcwsSBUSzjZFqEa2GVoBAmc9NDnAmhCks0AhIBa0AL8eqLWSrG7cRQmyRJAvUhLGxGHq63dg545hWgGVSXQtuNlfi3dsN+NJrDS8e70D77RoEmxi6s3KrUxCmtiBUuRz9m0st42bZcZxcfQV1K87hzPh1/2ZBuotErnGf9hZ4xsilVtcnxHUnpyyhwMsvVbeAlyHy7LrV9WllqxcXqFqAqBaQ1v4ZWeAh0hRVFSgLeog0LoOkdCdbKqFIWG4J9c0uob7ZFn4+I2vBSMX/AJAiTbydFGu1AAAAAElFTkSuQmCC",
	// },
    {
        label: "删除|查看Cookies",
        tooltiptext: "左键:删除网站Cookies|右键:查看网站Cookies",
        onclick: function(e) {
            switch(e.button) {
                case 0:
                    gBrowser.loadURI('javascript:(function(){C=document.cookie.split(";%20");for(d="."+location.host;d;d=(""+d).substr(1).match(/\..*$/))for(sl=0;sl<2;++sl)for(p="/"+location.pathname;p;p=p.substring(0,p.lastIndexOf("/")))for(i%20in%20C)if(c=C[i]){document.cookie=c+";%20domain="+d.slice(sl)+";%20path="+p.slice(1)+"/"+";%20expires="+new%20Date((new%20Date).getTime()-1e11).toGMTString()}})()')
                    closeMenus(this);
                    break;
                case 2:
                    gBrowser.loadURI("javascript:alert('Cookies%20stored%20by%20this%20host%20or%20domain:\n\n'%20+%20document.cookie.replace(/;%20/g,'\n'));")
                    closeMenus(this);
                    break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4ja2TvQ3CMBCFX4moKCmyRDqaDMBQSEgZIBJSzF3BEjAEHUPQp2CCj4IQcIgJAp5kS3fWvXd/lv6ODZmclYyTjEt7TnJW2pClA9dM5OxkHBRYyJl2b85UgYWMg5yd1kzi4IqZjLMCReR3eBEKFDLOqpg9nMZRW/Jkdn2iLbmM451xKaMcVe77jVKBpWTsVTNPqqdQM5exl5ymY+4rj9tNe42knyJymvclpHoRlTDUxE+IuibejHiMY1OIxiilF2mIbHCRpB9X+Rlff6YvcQWMMsQB/IeuVQAAAABJRU5ErkJggg==",
    },
    {
        label: "多种截图方式",
        tooltiptext: "左键:页面可见区域截图|中键:浏览器界面截图|右键:页面所有区域截图",
        onclick: function(e) {
            switch(e.button) {
                case 0:
                    var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
					canvas.width = content.innerWidth;
					canvas.height = content.innerHeight;
					var ctx = canvas.getContext("2d");
					ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
					saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);

                    closeMenus(this);
                    break;
                case 1:
                    var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                    canvas.width = innerWidth;
                    canvas.height = innerHeight;
					var ctx = canvas.getContext("2d");
					ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
					saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
                    closeMenus(this);
                    break;
                case 2:
                    var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
					canvas.width = content.document.documentElement.scrollWidth;
					canvas.height = content.document.documentElement.scrollHeight;
					var ctx = canvas.getContext("2d");
					ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
					saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
                    closeMenus(this);
                    break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAY0lEQVQ4jcWTSwrAIAwFnwf2AN4kOaRnmC5EF6UVa0o7EBeBTD6g9D8OoWhPoPkQDOPitFuC6QRnjCynyqky8jOBkWUUiSSRZJRLya3Aqa24Q2q5zwThFbpk+4irvCcI/YUgBysg0oQ40kZHAAAAAElFTkSuQmCC",
    },
	{},
	{
		label: "复制扩展清单",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAV1BMVEUAAADqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBDqgBD6DeBIAAAAHHRSTlMA4L83Z7YH6ElA+O5oYloqIR7dMjHSxaKci2xPAUiosAAAAHFJREFUGNONzssWgjAMRdELSKwvoIjv/P93epqlKDP2JCtnkFZ/zLQwjIezkFqc2Cv3KLVjVGanTJ9Q6e6hnsNuH6Gbg1Ip3NJzi4dKYV/omxjWwKTM6IWb46rBi6TfKxGOq0LruGj6/kt5A86/GJ3pDcoLDDovGsHTAAAAAElFTkSuQmCC",
		oncommand: function() {
		        Application.getExtensions(function(extensions) {
		            var actives = [],
		                unActives = [];
		            extensions.all.forEach(function(item) {
		                var arr = item._item.isActive ? actives : unActives;
		                arr.push(item._item.name);
		            });

		            var str = '目前启用的：\n';
		            str += actives.map(function(name, i) {
		                return i + 1 + ": " + name;
		            }).join('\n');
		            str += '\n\n目前禁用的：\n';
		            str += unActives.map(function(name, i) {
		                return i + 1 + ": " + name;
		            }).join('\n');

		            addMenu.copy(str);
		        });
		}
	},
	{
		label: "复制用户脚本清单",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAACdVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbidVbizk5WjAAAAG3RSTlMAINjQJxDJNfznTYgXBgH1u4At8NzFmmNSRNLmvcDFAAAAdklEQVQY003PSQ7DIBBE0cIYusHM8ZTc/6CRWiD1X75FSQVEbyXfEyQbd4k4fAU2A8l9SEQBKCQNHELtCopzbvwmPDeedhHMNuHwhvubNLh6EhRc2Bu/C0pudx75PBYMDkSVvVlQUgGyg9qQBOa5VbSY92c+4g+UswS9qFScSQAAAABJRU5ErkJggg==",
		oncommand: function() {
		        Cu.import("resource://gre/modules/AddonManager.jsm");

		        AddonManager.getAddonsByTypes(['greasemonkey-user-script', 'userscript'], function(aAddons) {
		            var downURLs = [];
		            aAddons.forEach(function(aAddon) {
		                var name, downURL;
		                if (aAddon._script) { // Greasemonkey
		                    name = aAddon._script.name;
		                    downURL = aAddon._script._downloadURL;
		                } else { // Scriptish
		                    name = aAddon._name;
		                    downURL = aAddon._downloadURL;
		                    if (!downURL && item._updateURL) {
		                        downURL = item._updateURL.replace(/\.meta\.js$/, '.user.js');
		                    }
		                    if (!downURL && item._homepageURL) {
		                        downURL = item._homepageURL;
		                    }
		                }

		                downURLs.push(name + '\n' + downURL);
		            });
		            Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).
		            copyString(downURLs.join('\n\n'));
		        });
		 }
	},
	/*{
		label: "批量安装 GM 脚本",
	            tooltiptext: "从剪贴板中的多个网址安装，是覆盖安装",
	            oncommand: function() {
	            if (!window.GM_BrowserUI) return;

	            var scope = {};
	            Cu.import('resource://greasemonkey/remoteScript.js', scope);

	            var install_GM_script = function(url) {
	                var rs = new scope.RemoteScript(url);
	                rs.download(function(aSuccess, aType) {
	                    if (aSuccess && 'dependencies' == aType) {
	                        rs.install();
	                    }
	                });
	            };

	            var data = readFromClipboard();
	            var m = data.match(/(https?:\/\/.*?\.user\.js)/g);
	            if (m) {
	                m.forEach(function(url) {
	                    // 处理下 userscripts 的问题
	                    url = url.replace(/^https?:\/\/userscripts\.org\//, 'http://userscripts.org:8080/');

	                    install_GM_script(url);
	                })
	            }
	    	}
	},*/
	{},

	{
		label: "重新加载配置",
		accesskey: "r",
		oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABi0lEQVQ4jZ2TSSiEcRjGHzSh5EQpspTLGGNfxgxDQ3anaS6DRJaUpUG2NIOsKTm44KLmiKOEHJyUlKU+M431mzHmwoELDjwulPIxw+/4/t/f2/vU+wd8pKJ/j772SqLpshFAxF+c4O6lc3ZaPawcOWJ+v4MFg2cE4OdNDMhpF6gxnTK32055s0BF6ymTOuxMNTlonLD9GsVf1S4wtvqQ8fUnTGgRqGyzM8XkYEbvBbMHr6g2iwQQLmlHGQ4oN6y9AAj+Ws8auKTGIlI7dkPd1C0BRH+Tg2KK4wBESsyV5Y26qOoTCCDMW/7vW+WbywCE/FkEAEXttvgvsWNRZPmMmwAypd4TG3ePpep+Q8tu6iyXLJlwsnLWQwChXxtSW/ef2nZIAEFSA2TagTPqhq9YOuli1ZyH+oV7Gq0PrF15YsP6K5u3SADJP66uMG6wcPiaReMu6qZvWT5/R/3yI2tWn9m0+fa7/El6zznVZpFJDbusmnay2GIjgDQAMq/yB4Ef1yaZ0yeUdTs+f91320Ovot7exOwAAAAASUVORK5CYII="
	}
]);

//====================外部应用程序 菜单==========================
var execute = PageMenu({
    label: "外部应用程序",
    accesskey: "E",
    class: "exec" ,
    id:"extend-exec",
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOUlEQVQ4jWNgoBjM/P+fIgwh8FoQigcTbcB/nDT1XECy36F6UDlEglEDaGkARdFIDoAbQFFmohAAACJyGMPRKNRjAAAAAElFTkSuQmCC"
});
execute([
	/*{
	        label:"启动Goagent",
	        id:"Goagent",
	        onclick: function(){
	            FileUtils.getFile('UChrm',['Local', 'goagent', 'goagent.exe']).launch();//goagent在chrome/Local/goagent/goagent.exe
	        },
	        insertBefore: 'addMenu-rebuild',
	        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAWrOMXrOQXq+MXq+IYq+MXq+MarOYXquMXq+MYq+Mgn98Xq+QVquMXreQXq+MXquMXrOQXrOMXq+MWqeIXq+MWq+QXrOUVrOUXrujjurMdAAAAGnRSTlMAkanIWD/RKHmIgAhwSDjguqCHZCLAXk0xFjseAw0AAABlSURBVBjThc1JDoAgDEBRWgqi4gQ43f+iQgE3mPgWbfIXrWgFVYQSYOsZDjXMeU9vAMO21VqrYriICB0xAyIbprznFA5E1DuyNQWgjnmI4/764rSUOlqWOExztIZzZKoGLwsr/j07PAPlXmXzxAAAAABJRU5ErkJggg=="
	 },*/
	/*{
		label: "侧边栏打开当前链接",
		condition: "noselect nomedia noinput nomailto",
		accesskey: "s",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJElEQVQ4jWNgGHgw8/9/ijCEwGIosZaPGjBqwCAygKK8QCEAAFdcqFiYtLAPAAAAAElFTkSuQmCC",
		oncommand: function(event) {
			var title = gContextMenu.onLink? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
			var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
			openWebPanel(title, url);
		},
	},*/
	{
        label: "靠左中窗",
        oncommand: function(e) {window.resizeTo(1334, 1040); window.moveTo(0, 0);},// 位置window.moveTo(屏幕分辨率-窗口大小)/2=居中
        image:""
    },
    {
		label:"编辑_addmenu.js",
		exec:"\\chrome\\Local\\_addmenu.js",
	},
	{
		label:"打开\\chrome\\Local",
		exec:"\\chrome\\Local",
	},
	{
        label: "打开\\Chrome",
        exec: "\\chrome" , // 打开当前配置下的Chrome文件夹
        accesskey:"c",
	},
	{
		label:"打开\\Profiles",
		exec:"\\..",
		accesskey:"p",
	},
	{
		label:"打开\\Media",
		exec:"F:\\Media",
		accesskey:"m",
	},
/*	{
		label: "VMware",
		accesskey: "v",
		exec: "D:\\Program Files\\VMware\\VMware Workstation\\vmware.exe"
	},*/
/*	{
		label: "sublime_text",
		accesskey: "s",
		exec: "D:\\SublimeText3\\sublime_text.exe"
	},*/
	{
		label: "用 Internet Explorer 打开当前链接",
		text: "%l",
		accesskey: "I",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
	},
	{
		label: "Chrome打开当前链接",
		text: "%l",
		// exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
		exec: "C:\\Users\\P\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
		accesskey: "C",
	},
	{
		label: "用IE打开当前页面",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		accesskey: "I",
		condition: "nolink"
	},
    {
        label: "Chrome打开当前页面",
        text: "%u",
        // exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
        exec: "C:\\Users\\P\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
        accesskey: "C",
        condition: "nolink"
    },
	{
		label: "Chrome禁用扩展打开",
		text: '%u -disable-extensions',//禁用扩展
		exec: "C:\\Users\\p\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
		   //exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe" 默认路径
		   //exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).parent.parent.path + "\\xxx\\xx\\xxx.exe"; 相对路径
        condition: "nolink"
	},
	{
		label: "用360极速打开当前页面",
		text: "%u",
		// exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
		exec: "D:\\Program Files\\360Chrome\\Chrome\\Application\\360chrome.exe",
		condition: "nolink"
	},
]);

//==================添加右键菜单 项目========================
 page([
		{
			label: "粘贴并确定",
			accesskey:"a",
			condition: "input",
			insertAfter: "context-paste",
			oncommand: function(event) {
				function $(id) document.getElementById(id)
				// 给原输入框增加空格
				var input = gContextMenu.target;
				input.value = input.value + " ";
				// $('context-selectall').doCommand();  // 全选
				// $('context-cut').doCommand();  // 剪切
				// $('context-copy').doCommand();  // 复制
				$('context-paste').doCommand();  // 粘贴
				// 回车键
				window.QueryInterface(Ci.nsIInterfaceRequestor)
					.getInterface(Ci.nsIDOMWindowUtils)
					.sendKeyEvent("keypress", KeyEvent.DOM_VK_ENTER, 0, 0);
			}
		},
		/*{
			label:"书签栏",
			id:'bookmarksMenu',
			insertAfter:"myBookmark",
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgGHgw8/9/ijCEYEDQyAYTY/kgNGDm/1BKDcDuIqIMgOBQRAiT4wIUSVIMIAdQzwCqpMSBcwGFAADsld/+tpNGiwAAAABJRU5ErkJggg==",
			//clone:true
		},*/
		{
            label: "收藏到|打开有道云笔记",
            id:"youdaoNote",
            tooltiptext:"左键:收藏到有道云笔记|右键:打开有道云笔记",
            insertAfter:"context-inspect",
            onclick : function(e){
                switch(e.button){
                    case 0:
                        gBrowser.loadURI("javascript:(function(){CLIP_HOST='http://note.youdao.com/yws';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=CLIP_HOST+'/YNoteClipper.js?'+(new%20Date().getTime()/100000);x.charset='utf-8';document.getElementsByTagName('head')[0].appendChild(x);}catch(e){alert(e);}})();")
                        break;
                    case 2:
                        gBrowser.selectedTab = gBrowser.addTab('http://note.youdao.com/web/list');
                        break;
				}
			},
            image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVQ4jd2RvRGCQBCFH2MHVkBMbCtoTCdUYHq7JVwJxA6N2ANjJJ8B/gDDn4buzCW3+7739k764zIyGVFOI6eREWVkW8WFnEqB9H0XSOVUMop1Z6ea7XeQhSRGHDiPK5DKiPMAp1mOODVjHOTUcloZ9+8AnfiiM/tVofRZwclftHqzeAgqFThKTjs7lLObbpDIOMmx3xNIT/PxG2yC9RNI41+4ymHl3BQoJZKfkvfrAaJGjX3VqaHdAAAAAElFTkSuQmCC"
		},
		/*{
			label:"收藏到|打开百度云",
			tooltiptext:"左键:收藏到百度云|右键:打开百度云",
			id:"baidushoucang",
			insertAfter:"youdaoNote",
			onclick : function(e){
				switch(e.button){
					case 0:
						gBrowser.loadURI("javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));")
						break;
					case 2:
						window.open("http://pan.baidu.com/disk/home?#render-type=grid-view&path=%252F%25E7%2599%25BE%25E5%25BA%25A6%25E4%25BA%2591%25E6%2594%25B6%25E8%2597%258F%252F%25E5%259B%25BE%25E7%2589%2587","_blank");
						gBrowser.selectedTab = gBrowser.addTab('http://pan.baidu.com/disk/home?#render-type=grid-view&path=%252F%25E7%2599%25BE%25E5%25BA%25A6%25E4%25BA%2591%25E6%2594%25B6%25E8%2597%258F%252F%25E5%259B%25BE%25E7%2589%2587');

						break;
				}
			},
			image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4jbVP2wnAMAi8JTNG9onL5vLTkrSNVos9EEG8F5COxgphR2M1byqE/bK1238JPiHisP3d9y4Q8phi/j5UT/IkTRFX2pVs3VTyGvle6ZXsMQg5u5O4O2q/KQKRycIABuShjVi20mAAAAAASUVORK5CYII=",
		},*/
		/*{
			  label: "收藏到|打开百度相册",
			    tooltiptext:"左键:收藏到百度相册|右键:打开百度相册",
			    insertAfter:"youdaoNote",
			    onclick : function(e){
				switch(e.button){
					case 0:
						// gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();void(function(g,d,m,s){if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new%20Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'));")
						gBrowser.loadURI("javascript:void(function(g,d,m,s){if(location.protocol=='https:'){if(document.getElementById('pic_ext_overlay')){return}var%20t=d.createElement('div'),q=d.createElement('a');t.setAttribute('style','font-size:16px;text-align:center;line-height:110px;position:fixed;_position:absolute;width:570px;height:110px;z-index:2147483646;background-color:#fff;left:%2050%;top:%2050%;margin-left:-285px;font-weight:bold;color:#333;margin-top:-100px;');t.innerHTML='%E4%B8%BA%E4%BA%86%E6%82%A8%E7%9A%84%E5%AE%89%E5%85%A8%EF%BC%8C%E8%AF%A5%E7%BD%91%E7%AB%99%E6%9A%82%E6%97%B6%E4%B8%8D%E6%94%AF%E6%8C%81%E5%9B%BE%E7%89%87%E6%94%B6%E8%97%8F%E3%80%82';q.setAttribute('href','#');q.setAttribute('style','width:11px;height:11px;_font-size:0;position:absolute;background:url(http://xiangce.baidu.com/static/images/bdXC_closeWindow.png);position:absolute;left:545px;top:12px;');s=d.createElement('div');s.setAttribute('id','pic_ext_overlay');s.setAttribute('style','background-color:%20#000;%20%20opacity:%200.7;%20%20width:100%;height:100%;filter:%20alpha(opacity=70);position:fixed;left:0;z-index:2147483645;top:0;_position:absolute%20!important;_bottom:auto%20!important;_top:expression(eval(document.documentElement.scrollTop))!important;');t.appendChild(q);d.body.appendChild(s);d.body.appendChild(t);s.onclick=q.onclick=function(){t.parentNode.removeChild(t);s.parentNode.removeChild(s);};return}if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new%20Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'));")
						break;
					case 2:
						gBrowser.selectedTab = gBrowser.addTab('http://xiangce.baidu.com/u/942670595');

						break;
				}
			},
			     image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4jbVP2wnAMAi8JTNG9onL5vLTkrSNVos9EEG8F5COxgphR2M1byqE/bK1238JPiHisP3d9y4Q8phi/j5UT/IkTRFX2pVs3VTyGvle6ZXsMQg5u5O4O2q/KQKRycIABuShjVi20mAAAAAASUVORK5CYII="
		},*/
	]);

//========================翻译与转换 菜单=================================

var pagesub = PageMenu({
    label:"翻译与转换",
	id:"translateMenu",
	accesskey:"T",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVQ4jWNgGHgw8/9/ijCEoMByDANIMZBkA2b+D8VuAF4/ImmGiIViGoDNZmyaYeIwQzC8gNswIg3AFQa41JDgAuxhQ0IYEHABrqgjZDj1UiJFeYFCAABvr/aSk/L+XwAAAABJRU5ErkJggg==",
});
pagesub([
	/*{
		label: "谷歌全文翻译",
		accesskey: "g",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsElEQVQ4jZXTsWsTYRjH8Zf+AYX+HTd0cM9SyOoglXLg1ryDU5Fwi90iWsiikFaOOEkGl2IsSEGwoggh8JLUJSC14qB3yZWQXlKTJrn3vg7JncmZqn3ggXf5fXjeh/cVQggh0ln+qxdWOstVFQI6hEDDMAivQBYA15sonYXdXTg4iMPXmyidhaMjWFqCfP7vwDQ8CkL6o1kAYHsblpcXAitbdYRUfPreZzAOGYxCepcJQJjGpBOA/eEMIRU3HjTYfP6NwXgSPu/r34AwDWqdErVOCWEac8C6fcq6fcrDQ5eVrToXw0m4/TMCpuFCJUOhkiG1sxYjJ94QIRVP35/F58dvW7QvNF5vCtQ6JYpKUqhksKsWdtWKkUeHLkIqWt0x/VHIaq7Bzb0veD1NqzszgTANikpy98WteBfRdYRUf/SJN6TZTewgCRSVjJFXxz4v6+c8+9hGSMX9soPrJ4Dcmzvc27/Nux82r78+ia9jVy2EaeD1NE1fk8p/ZjXXwPWD+dcoTIPUzlrcVnkDq7wR76Ppa1xf4/gaxw9w5oCoorcwg0VhJxFeDMx8sCj8r8/0C7G+ixTa1p4GAAAAAElFTkSuQmCC",
		oncommand: function(){
			var tab = document.getElementById('content');
			var win = tab.selectedBrowser.contentWindow.top.window;
			//var cur_url = win.location.href;
			d=win.document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:\"\"},\"google_translate_element\");}';p.setAttribute('type','text/javascript');b.appendChild(p);
		},
	},*/
	{
		label:"有道翻译JS",
		url:"javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())",
		accesskey:"y",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
	},
	/*{
		label:"Bing划词翻译",
		url:"javascript:(function(a,b){a.getElementById('bing_cw')||(b=a.createElement('script'),b.id='bing_cw',b.onload=function(){BingCW.Init({MachineTranslation:true,WebDefinition:true})},b.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js',a.head.appendChild(b))}(document))",
		accesskey:"B",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
	},*/
	{
		label:"Bing全文翻译JS",
		url:"javascript:(function(a,b){a.getElementById('bing_cw')||(b=a.createElement('script'),b.id='bing_cw',b.onload=function(){BingCW.Init({MachineTranslation:true,WebDefinition:true})},b.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js',a.head.appendChild(b))}(document))",
		accesskey:"n",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVQ4jWP4v5PhPyWYAZnzfQsz+Qb828nwPyAg4H9OovP/1W3q5BsQEBDwPzXWjTIDAgICqGNAWbr9/+UtGv/vLuUnz4AplYZwfkqM+/+ZNXr/L8wVI80LkaE+KOIBAQH//5FiwNfNrP87isxIMyA30fn//50M/+8u5f/fnGdJmgvS41z/X5wr+r+nxOR/IJrG5Bj3/4enyuAOg7wkp/8Ty43/BwX6o2gMDvL7v6hRG2tKRUnKfaXGGM5tzLX6/2QlD3F54f9Ohv8Hp8j+jwrz+Z8a4/7/+HQp0jITDP/axvz/7w5G0nMjORgALS2D1pyznwIAAAAASUVORK5CYII=",
	},
	{
		label:"繁简互转",
		tooltiptext: "左键：繁体转简体\n右键：简体转繁体",
		onclick: function(e){
		           switch(e.button){
		               case 0:
		                   gBrowser.loadURI("javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();")
		               break;
		               case 2:
		                   gBrowser.loadURI("javascript:(function(){var%20s=document.getElementById(%22tongwenlet_tw%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_tw.js%22;s.id=%22tongwenlet_tw%22;document.body.appendChild(s);%20})();")
		               break;
		           }
		       },
		accesskey:"j",
		image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADNUlEQVQ4jY3TX0xTZxgG8CMEZvkrBEQ2GyBUMylUN2J0hQCntZW2lhYowjm1lLQd0tFKsZRaKLSJk242tegWITGkyp+uRVTsMl1kihpEN6MzXnhB5EJNdrdl02SLMX7PLtYYWDTxTX6Xz5PvTd6PolaMrkeQeiSqtYfmXdfHb7rvH418Pmrsk5ZS7zNNzvLM0Tnr4sxDLzm12I7RBQOm7jkQvjPwot3LqB3HIlJX8GzDPtuR/LcWeMLqQOhOJ/FfUcE/p4Z/To2jV1QIXm1CaNHzOnzrKQkv/EbOzC39tb8/yKwKl5dTScM/6p54YlXwxKrh/b4a3lg1PLEqDF6sxIl5Fl/O/oSh2WUMXVhGYObXP2vkTRveFOyQZWf4Yg0v7NFS2KNl6JkWoGdaAHu0DAcjfAxdroUrcg59kSW4vlvC4fOPiZIxq1c+Yo3ztPhnW7gEnRPFsMR1ThTDMl4Mz0UZLKHbsIQeoXPsEXrPPHglUjZ8umqNFuc2tm+mgnSMFWKl7qkyYgn1E23gLtjAXeiP3yPN3cdjFEUlrCqQ6vJS249tvW8NfQzTCBemk1yYRrjomhAS1h8jMvc8ZO551B9eIHWOyWs04+S/Ce/tL6pqGy5cMo0UkLbhD6EP5kMfzEdrMB+Gbzei7Rs+5AMDqLD+AKHlEoSWS6g0T/9epTBtoRrs3O3ar/OeM74cML5csL5csF/9h/HlgvHloGUoB4wvD2K7A58YZ7HNcAFb285hh8Y9SmlcGy43DqyDZjALGk8WNN5sNMVpvNnQeLLQOLgO9f2ZULkKIGidRKk2ipLmKWzf45iklAczl+t606Fyxh3KgDpO5UxHXW86lI40KHvSILelQMAGsLk+BF6t72WFpFFO1Zqzf5Ed4EBuS4HClgJFd5wtBXIbB/IuDmRdHMisa7GrI5UU1NgJr9r6bKe4WUtRFEXt1hXpdu1Pei01J0P6xf+YkyExJ0PSkQSRKZFItJtufEarxXw+P23VEUnZIrfYmPySNiZCtAJtTARtSABtSCQSlntDKBSsf+dvrFSUlYtbCsZE+7Ke0a2cv2n92n9oXcYfIuajazUKgZ7H433wtty/EmGelA1I/y4AAAAASUVORK5CYII=",
	},
]);

//=================常用书签 菜单=======================
var pagesub = PageMenu({
		label: "常用书签",
		accesskey: "1",
		id:"myBookmark",
		insertAfter:"tm-content-undoCloseList",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVQ4jWNgGHgw8/9/ijCEYEDQyAYTY/kgNGDm/1BKDcDuIqIMgOBQRAiT4wIUSVIMIAcMJwMoygsUAgDJw7u8uuydqgAAAABJRU5ErkJggg==",
		});
pagesub([
	{
		label:"微博",
		url:"http://weibo.com",
		where:"tab",
		accesskey: "w",
		images:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVQ4jb1SW0gUYRQ+TAsSZA+xL5Lu7R9nptBIzJJQKCFKicAHo4cowi5gkBCtbMXiPvQQbJnrziAVCUW91IN0ISiCTXYLglYSfIkC3ZnFWt3LjLZ5a/+vB1stCiGCDhwO/Od83/l+zkf0v0IPUlU2RCfTIWqNdNC6vyawVLpmqTRqaZS1VJrKqrT/j4N9RCUJJh3VPYo6zqTm4nuASMhq1JC5ShWWRt3TGs2memnLL+BxJ9utM3lM90jcEBUkmPSx2Bs6tLbCDNGwqZKZDVGDpdJjK0y3l8GGW243RGXREBUUU2fKqCFKxw1RfmBI0otkneOgeVnoslS6Z4WpY1qjESIiSrjlNoPJheLmVeq7SW/JvlyYOk2VLlgqvaLhMrfTEOVpQ1SQ3FqLrL8b+SdPMfc2jtloDNb1G/i0p3lJkagMfdixYT0R0UQPbTPD1EQJJt/UPRKfPHIM36bSPJfLQdM0HggEEI/HOQDwhQWeOdf1Q4k8Ne5kO1f+LirpiYZdKOTzSKVScLlcICIIggCbzYZYLAYAKMx8gbGpuqjk5YpBRGU+0+XjABAMBnljYyP6+/t5S0sLiIj7/X5wzjlfXESyumbpOh7p+U8E8qPPB1rBCwUMDAzA6/UiEonAZrNBEAREo1EAwMydu0vXYXJhzCXuXSZ4XV6+UffI7zPnL2LBtLjP50NlZSWvr6/H4OAgL+S/wupTuSFtRoLJ8wkmnfjNfQ/t9lKdyZeSNdtT6c6zMHt6YV7pQfr0GSRr6qCL8pwhyvdHKljVqn5vI1rzrMxRG3e4D8cd7NSw093+xsmabtntpasC/yW+A9uHY8MWzyGVAAAAAElFTkSuQmCC",
	},
	{
		label:"关键时刻",
		url:"https://www.youtube.com/user/ettvCTime/videos",
		where:"tab",
		image:"https://s.ytimg.com/yts/img/favicon_144-vflWmzoXw.png",
	},
	{
		label:"卡饭",
		url:"http://bbs.kafan.cn/forum-215-1.html",
		where:"tab",
		image:"http://bbs.kafan.cn/favicon.ico",
		accesskey: "k",
	},
	{
		label:"BiliTech",
		url:"http://www.bilibili.com/video/technology.html",
		where:"tab",
		image:"http://static.hdslb.com/images/favicon.ico",
		accesskey: "B",
	},
	{
		label : "Youku",
		url   : "http://www.youku.com/",
		where : "tab",
		image:"http://static.youku.com/v1.0.1067/index/img/favicon.ico",
		accesskey: "y",
	},
	{
		label:"知乎",
		url:"http://www.zhihu.com/",
		where:"tab",
		image:"http://static.zhihu.com/static/favicon.ico",
		accesskey: "z",
	},
    {
        label:"ghwokai",
        url:"https://github.com/ghwokai",
        where:"tab",
    },
	{},
	{
		label : "QQ Mail",
		url   : "https://mail.qq.com/",
		accesskey: "q",
		where : "tab",
		image:"https://mail.qq.com/zh_CN/htmledition/images/favicon/qqmail_favicon_96h.png"
	},
	{
		label : "163 Mail",
		url   : "http://mail.163.com/",
		accesskey: "1",
		where : "tab",
		image:"http://mail.163.com/favicon.ico"
	},
]);

//=======================菜单项移动====================
//注意菜单的生成顺序，不能插入到后生成的ID前后。
//所以移动操作放到脚本最后
page([


	{
        id: 'readLater-addList',
        insertAfter: 'duogongneng-sep',
        //style: 'margin-top:5px;margin-bottom:5px;',
        clone: false
	},
	{
		id:"nosquint-menu-settings",
		insertAfter: 'readLater-addList',
		clone:false

	},
	{
        id:'AddToUpdateScan',
		insertAfter:'nosquint-menu-settings',
		clone:false
	},
  /*  {
        id: 'snaplinksMenuEntry',
        insertAfter: 'snaplinksMenuEntry',
        // style: 'margin-top:5px;margin-bottom:5px;',
        // insertAfter:"AddToUpdateScan",
        clone:false
    },*/
	/*{
		id:'ExternalSubMenuID',
		insertAfter:'AddToUpdateScan',
		clone:false
	},*/

]);


//横排菜单示例
// var openMenu = GroupMenu({
//     label: '打开...',
//     condition: 'noinput noselect nomailto nocanvas nomedia',
//     insertBefore: 'context-sep-navigation'
// });
// openMenu([
//     {
//         label:"复制文本+链接",
//         text:"%RLT_OR_UT%\n%RLINK_OR_URL%",
//         image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg=="
//     },
//     {
//         label:"在隐私窗打开",
//         oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});",
//         image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC"
//     },
//     {
//         label: "在 IE 中打开",
//         text: "%RLINK_OR_URL%",
//         exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
//     },
//     {
//         label: "在 Chrome 中打开",
//         text: '%RLINK_OR_URL%',
//         exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
//     },
//     // {
//     //     label: "在 Opera 中打开",
//     //     text : "%RLINK_OR_URL%",
//     //     exec : "D:\\Program Files\\Opera\\opera.exe",
//     // },
// ]);

/*page({
	    label: "下載腳本檔案鏈接到指定位置",
	    tooltiptext: "下載鏈接到指定位置 (不彈窗)\nUC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 UserCSSLoader 資料夾\nJavaScript 下載到 local 資料夾\nExtension 下載到 xpi 資料夾",
	    condition:'link',
	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jd2RsWoCURBFFwIJSUrFQuyUx8Luu+dCyAeIQmp/IB8k6bQx+UFLCxGirKZZQ7I+Y9Lmwq3ezJk787KsIUn3wMz21vah9haYSbpv1p+oLMs+sPzSfLB9AJZlWfYvAoBge9UE2F4B4b8CiqK4jjE+AENJz8A6ccR1/TYsiuJxMBjcfAJ6vd6tpCnwDuwT04+QfV3z0u12776lyPO8BSwa/9/0Fljked5KrnIB8nPzUSGEdgKyBRYhhHbq6hNJnTNJdrZ3qcmSOsAkAypJo1QSSVNJ09RkSSOgyoAqxjg+s9FV7RPFGMdAldneSHqVNPqtgSfbb7Y3GTC3vQGqP3hf98w/AHA+wuIFFjTgAAAAAElFTkSuQmCC",
	    onshowing: function(menuitem) {
	    var url = addMenu.convertText("%RLINK_OR_URL%");
	    var urlt = !/\.(js$|xul$|css$|xpi)/.test(url);
	    var urlt2 = /\/blob\/master\//i.test(url);
	    this.hidden = urlt2 || urlt;
	    },
	    onclick: function(e) {
	        var url = addMenu.convertText("%RLINK_OR_URL%"),
	            uri = Components.classes["@mozilla.org/network/io-service;1"].
	        getService(Components.interfaces.nsIIOService).newURI(url, null, null)

	        var file = Components.classes["@mozilla.org/file/directory_service;1"].
	        getService(Components.interfaces.nsIProperties).
	        get("ProfD", Components.interfaces.nsIFile);

	        // 添加哪个文件夹名
	        file.append("chrome");
	        if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

	        } else if (url.endsWith("user.js")) {
	            file.append("UserScriptLoader");
	        } else if (url.endsWith(".js")) {
	            file.append("local");
	        } else if (url.endsWith(".css")) {
	            file.append("UserCSSLoader");
	        } else if (url.endsWith(".xpi")) {
	            file.append("xpi");
	        } else if (/latest\.xpi/i.test(url)) {
	            file.append("xpi");
	        }

	        // 添加文件名
	        file.append(getDefaultFileName(null, uri));
	        internalSave(null, null, null, null, null, null, null, {
	            file: file,
	            uri: uri
	        }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
	    }
});*/

//===================================
