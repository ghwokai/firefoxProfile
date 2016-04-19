// ==UserScript==
// @name	Google Favicons
// @description	Adds favicons to Google search results.
// @include	https://www.google.*/*
// @exclude	https://www.google.*/voice/*
// @exclude	https://www.google.*/maps/*
// @version	1.01
// @icon        http://i.imgur.com/ezjWmEO.png
// @namespace   https://greasyfork.org/users/14186
// ==/UserScript==

/**
 * CSS INFO
 * #res div.mnr-c div.g = In the news Favicon Position
 * #res div.mnr-c div.g img.favicon = In the news Non-Picture Results Favicon Alignment
 * div._OKe img.favicon = Special Results e.g. "Diamond Pushup”
 * #res div.mnr-c div.card-section = In the news Picture Result Block Adjustments
 * #res div.mnr-c div._K2 + div._I2 img.favicon = In the news First Result No Picture
 * #res div.mnr-c div._I2 img.favicon = In the news Picture Result Favicon Position
 * #res div._cnc img.favicon, #res div.card-section a._sQb img.favicon = News Tab Favicon Position
 * QUERY INFO
 * #res li.g div.rc h3 a = Normal Results
 * #res div.g div.rc h3 a = Sub Site Results e.g. "Apple"
 * #res div.intrlu div.g h3 a = Local Results e.g. "Hair Salon"
 * #res li.g div._cnc a = News Tab Results
 * #res div.mnr-c div.g a._Dk = In the news Results
 * #res div._cnc h3 a = News Tab Picture Results
 * #res div.card-section a._sQb = News Tab Sub Results
 */

(function(){

	(typeof GM_addStyle != 'undefined' ? GM_addStyle : function addStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement("style");
		style.type = "text/css";
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	})("#res img.favicon {\
        padding-right: 4px;\
        vertical-align: middle;\
        border: none;\
        left: -18px;\
        position: absolute;\
        top: 2px;\
        z-index: 9;\
}\
#res div.mnr-c div.g {\
        position: relative;\
}\
#res div.mnr-c div.g img.favicon {\
        top: 0;\
        left: 1px\
}\
#res div.mnr-c div.card-section {\
        padding-left: 25px;\
        left: -25px;\
        margin-right: -25px;\
}\
#res div.mnr-c div._K2 + div._I2 img.favicon {\
        margin-left: -168px;\
        padding-right: 152px;\
}\
div._OKe img.favicon {\
        display: none;\
}\
#res div.mnr-c div._I2 img.favicon {\
        position: static;\
        margin-left: -24px;\
        padding-right: 8px;\
        margin-top: -2px;\
}\
#res div._cnc img.favicon, #res div.card-section a._sQb img.favicon {\
        position: static;\
        left: 0px;\
        padding-right: 6px;\
        padding-bottom: 2.3px;\
}\
");

	var FAVICON_GRABBER = 'https://www.google.com/s2/favicons?domain='; // 'http://favicon.yandex.net/favicon/'
var QUERY = '#res li.g div.rc h3 a, #res div.g div.rc h3 a, #res div.intrlu div.g h3 a, #res li.g div._cnc a, #res div.mnr-c div.g a._Dk, #res div._cnc h3 a, #res div.card-section a._sQb';

/**
 * @param {NodeList} links
 */
function add_favicons_to(links) {
	for (var i=0; i<links.length; i++) {
		if (links[i].firstChild.className != 'favicon') {
			var host = links[i].href.replace(/.*https?:\/\//, '').replace(/\/.*$/,'');
			var img = document.createElement('IMG');
			img.src = FAVICON_GRABBER + host;
			img.width = '16';
			img.height = '16';
			img.className = 'favicon';
			links[i].insertBefore(img, links[i].firstChild);
		}
	}
}

add_favicons_to(document.querySelectorAll(QUERY));

/**
 * Debounce function from http://code.google.com/p/jquery-debounce/
 */
function debounce(fn, timeout, invokeAsap, context) {
	if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
		context = invokeAsap;
		invokeAsap = false;
	}
	var timer;
	return function() {
		var args = arguments;
		if(invokeAsap && !timer) {
			fn.apply(context, args);
		}
		clearTimeout(timer);
		timer = setTimeout(function() {
			if(!invokeAsap) {
				fn.apply(context, args);
			}
			timer = null;
		}, timeout);
	};
}

document.addEventListener('DOMNodeInserted', debounce(function handleNewFavicons(event){
		if (event.target.className != 'favicon') {
			add_favicons_to(document.querySelectorAll(QUERY));
		}
	}, 500)
, false);

})();
