// ==UserScript==
// @name        PCONLINE
// @namespace   ZPP
// @description 自动跳转到全部页面显示
// @include     http://*.pconline.com.cn/*
// @include     http://*.zol.com.cn/*/*.html
// @include     http://www.pcpop.com/doc/*

// @version     1
// @grant       none
// ==/UserScript==
var patt = new RegExp(/(\d+)(\.s?html?)/i);
var lt = window.location.href;
var pt = new RegExp(/(全文浏览|在本页浏览全文|本页阅读全文|整组浏览)/i);
if (patt.test(lt))
{
	var ellength = document.links.length;
	for (i=0; i<ellength; i++)
	{
		if (pt.test(document.links[i].innerHTML))
		{
			window.location.assign(document.links[i].href);
			break;
		}
	}
}
