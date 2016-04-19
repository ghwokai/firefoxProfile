// ==UserScript==
// @include chrome://browser/content/browser.xul
// @description 复制图片增加复制GIF的能力
// ==/UserScript==

(function () {
	// copy gif
	var copyimage = document.querySelector("#context-copyimage-contents");
	copyimage.addEventListener("command", function() {
		var selection = content.getSelection();
		var ranges = [];
		for (var i = 0; i < selection.rangeCount; i++)
			ranges.push(selection.getRangeAt(i));

		var range = document.createRange();
		range.selectNode(document.popupNode);
		selection.removeAllRanges();
		selection.addRange(range);
		goDoCommand("cmd_copy");
		selection.removeAllRanges();
		
		for (i in ranges)
			selection.addRange(ranges[i]);
	}, false);
})()