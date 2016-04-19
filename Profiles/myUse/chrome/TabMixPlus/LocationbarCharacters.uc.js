/* LocationbarCharacters.uc.js */

function initLocationBarCharacters() {
    var urlbar = window.document.getElementById("urlbar"),
        textBox = window.document.getAnonymousElementByAttribute(urlbar, "anonid", "textbox-input-box"),
        cxmenu = window.document.getAnonymousElementByAttribute(textBox, "anonid", "input-box-contextmenu"),
        separator = document.createElement("menuseparator"),
        menu = document.createElement("menu"),
        popup = document.createElement("menupopup"),
        i,
        labelArray = [
		"^ 历史 history",
		"* 书签 bookmarks",
		"+ 选择页面 taggedpages ",
		"% 目前打开的标签 currently open tabs",
		"~ 进入网页 typed pages",
		"# 页面标题 page titles",
		"@ 网站地址 addresses"
        ],
		insertCharacters = function(sym) {
		    var urlbar = window.document.getElementById("urlbar"),
		        urlbarText = urlbar.value,
		        pos,
		        urlbarFocus = window.document.getElementById("Browser:OpenLocation");

		    urlbarFocus.doCommand();

		    if (urlbarText.length === 0) {
		        urlbarText = sym + " ";
		    } else if (urlbarText.slice(-1) === " ") {
		        urlbarText = urlbarText + sym + " ";
		    } else {
		        urlbarText = urlbarText + " " + sym + " ";
		    }
		    urlbar.value = urlbarText;

		    pos = urlbarText.length;
		    urlbar.setSelectionRange(pos, pos);
		},
        makeMenuItem = function(label) {
	        var sym = label.slice(0, 1),
		        node = document.createElement("menuitem");
		    node.setAttribute("label", label);
		    node.addEventListener("command", function() { insertCharacters(sym); }, false);
		    popup.appendChild(node);
        };

    menu.setAttribute("label", "search char (^ * + % ~ # @)" );
    menu.appendChild(popup);
    for (i = 0; i < labelArray.length; i += 1) {
	    makeMenuItem(labelArray[i]);
	}
    cxmenu.appendChild(separator);
    cxmenu.appendChild(menu);
}

initLocationBarCharacters();