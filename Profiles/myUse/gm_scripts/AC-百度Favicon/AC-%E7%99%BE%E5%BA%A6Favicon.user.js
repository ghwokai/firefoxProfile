// ==UserScript==
// @name AC-百度Favicon
// @namespace BlockKafanTopicinGoogle
// @include        http://www.baidu.com/*
// @include        https://www.baidu.com/*
// @include /^https?\:\/\/encrypted.google.[^\/]+/
// @include /^https?\:\/\/www.google.[^\/]+/
// @icon    https://coding.net/u/zb227/p/zbImg/git/raw/master/img0/icon.jpg
// @author       AC
// @version 0.3.5
// @connect https?://[\S]+
// @description 百度Favicon、谷歌Favicon
// @grant none

// ==/UserScript==

//===================================================普通规则变量定义=======================================================

//===================================================主入口=======================================================

mo = new MutationObserver(function(allmutations) {
//alert();
    blockKafanBaidu();
});
var targets = document.getElementById("content_left");
if(location.href.indexOf('www.google') > -1){
    targets = document.getElementById("res");
}
var fatherName = new Array(
    "result c-container ",
    "rc"
);
mo.observe(targets, {'attributes':false, 'childList': true,'characterData':true,'subtree': false});

//document.addEventListener('DOMNodeInserted',blockKafanBaidu,false);
function blockKafanBaidu() {
    var isBaidu = (location.href.indexOf('.baidu.com') > -1);
    var citeList;
    if(isBaidu){
        citeList = document.getElementsByClassName('c-showurl');
            //之前取的是g，但这个标签在google中是最大的标签，导致谷歌页面卡住，所以先判断是baidu站点
        deal(citeList)
    }else{
        citeList = document.getElementsByClassName('_Rm');
            //之前取的是g，但这个标签在google中是最大的标签，导致谷歌页面卡住，所以先判断是baidu站点
        deal(citeList)
    }
}

// 传入nodelist，然后查找两个列，查看是否一致，一致则删除
function deal(citeList){

    for (var index = 0; index < citeList.length; index++) {
        var url = replaceAll(citeList[index].innerHTML);
        if(citeList[index].getAttribute("deal") == null){
            citeList[index].setAttribute("deal", "1");
            if(!(url.indexOf("www.example.com") > -1))//不显示FAVICON网站
                deal_fatherNode(citeList[index], getFaviconUrl(url));
        }
    }
}

function deal_fatherNode(node, faviconUrl){
    faviconUrl = "http://"+faviconUrl+"/cdn.ico?defaulticon=http://soz.im/favicon.ico";
    var curNode = node;
    for(II = 0; II <= 5; II++){
        curNode = curNode.parentNode;
        if(isInUrlList(curNode.className)){
            break;
        }
    }
    if(II <= 5){
        var imgHTML = "<img class=\"faviconT\" style=\"vertical-align:sub;\" src=\"http://g.soz.im/"+faviconUrl+"\" height=16 width=16>&nbsp;";
        curNode.firstChild.innerHTML = imgHTML + curNode.firstChild.innerHTML;
    }

}
/*去掉网址中的<xxx>*/
function replaceAll(sbefore){
	var send;
	send = sbefore.replace(/<[^>]*>/g ,"");
	return send;
}
function getFaviconUrl(citeUrl){
    var citeUrl = citeUrl.replace(/https?:\/\//g,"");
    var citeUrl = citeUrl.replace(/( |\/).*/g,"");
    return citeUrl+"/favicon.ico";
}
function isInUrlList(url){
    var leng = fatherName.length;
    for(var i = 0; i < leng; i++){
        if(url == fatherName[i]){
            return true;
        }
    }
    return false;
}
