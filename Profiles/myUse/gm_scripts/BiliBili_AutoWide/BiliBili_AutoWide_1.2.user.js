// ==UserScript==
// @name	BiliBili AutoWide
// @author	googleGuard
// @version	1.2
// @include	http://www.bilibili.com/video/av*
// @include	https://secure.bilibili.com/secure,*
// @run-at	document-end
// @grant	none
// ==/UserScript==

(function(f) {
	document.documentElement.appendChild(document.createElement('script')).textContent = '(' + f + ')()'
})(function(){
	window.onload = function() {
		var e = document.querySelector('EMBED#bofqi_embed') || document.querySelector('OBJECT.player');
		e && (e.getAttribute('flashvars') ? e.setAttribute('flashvars', e.getAttribute('flashvars') + '&as_wide=1') : (e.querySelector('[name="flashvars"]').value += '&as_wide=1'));
		e && e.parentNode.replaceChild(e.cloneNode(true), e)
	}
})
