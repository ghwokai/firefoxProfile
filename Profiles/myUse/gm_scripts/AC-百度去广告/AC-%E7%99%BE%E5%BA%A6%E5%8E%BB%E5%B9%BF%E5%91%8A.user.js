// ==UserScript==
// @name AC-百度去广告
// @namespace ACNoAdd
// @description 去掉百度的推广链接
// @include http://www.baidu.com/*
// @include https://www.baidu.com/*
// @version 1.0
// @grant none
// @author AC
// @icon            https://coding.net/u/zb227/p/zbImg/git/raw/master/img0/icon.jpg
// @run-at document-end
// ==/UserScript==
mo = new MutationObserver(function(allmutations) {
//alert();
    removeAD();
});
var targets = document.body;
mo.observe(targets, {'childList': true,'characterData':true,'subtree': true});

function removeAD(){
    document.getElementById("content_right").remove();
    var text = document.getElementById("content_left").innerHTML;
    var reg = new RegExp("<a class=\"([^\"]+)\"[^<]+>推广链接</a>", "igm");
    var matchs = null;
    do{
    matchs = reg.exec(text);
    //alert(matchs[1]);
    var node  = document.getElementsByClassName(matchs[1])[0].parentNode;
    node.remove();
    }while(matchs != null)
}


