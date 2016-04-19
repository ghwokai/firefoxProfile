// ==UserScript==
// @name           webSafe.uc.js
// @description    通过360检测被访问网页是否安全
// @author         AC
// @include      main
// @namespace      checkSafe
// @license        MIT License
// @charset        UTF-8
// @version        2015.12.1
// @version        1.0
// @reviewURL    http://bbs.kafan.cn/thread-1867072-1-1.html
// ==/UserScript==
var whiteList = new Array("baidu.com", "qq.com", "kafan.cn", "taobao.com", "sina.com", "sina.cn");
var SAFE = "#C9F7E8";
var UNKNOWN = "#D3ADFF"; //未知站点推荐值：#D3ADFF
var DANGEROUS_A = "#FFEAEA"; //普通危险
var DANGEROUS_Z = "#F99F9F"; //严重危险
var target = ".urlbar-input-box";
let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

Cu.import("resource://gre/modules/devtools/Console.jsm"); //使用了这个才能使用console
setColor(SAFE);
(function () {
    var map = {};
    var gcurTab;
    var addUrl;
    var container = gBrowser.tabContainer;
    container.addEventListener("TabSelect", func, false); //注意多次触发问题-选择
    gBrowser.addEventListener("DOMContentLoaded", func, false); // 载入事件
    container.addEventListener("TabClose", removefunc, false); //关闭事件-移除
    function func(e){
        addUrl = getMainUrl();
        //console.log("***"+addUrl+"***");
        if(addUrl != null && addUrl != ""){ //地址要正确才能继续查询
            var score = getMapScore(addUrl);
            //console.log(inWhiteList(addUrl));
            if(inWhiteList(addUrl)) score=100;
            if(score == -1){ // 没有找到
                var destURL = "http://tool.chinaz.com/webscan/?host="+addUrl;
                GetScore(destURL);
            }else{
                setColorWithScore(score);
            }
        }else{
            console.log("安全监测不支持:"+gcurTab.contentDocument.location.href);
        }
    }
    function removefunc(e){
        var removeUrl = getMainUrl();
        removefromMap(removeUrl);
    }
    function getMainUrl(){ // 当前URL转为域名URL【http//:www.baidu.com/xxx/x.x/xx.xxx】-->【www.baidu.com】
        gcurTab = gBrowser.getBrowserForTab(gBrowser.selectedTab);
        addUrl = gcurTab.contentDocument.location.href+"";
        setColor(SAFE); //先设定个默认值，如果查询出来了在改变就是了
        var regH = new RegExp("[^/]+//([^/]+)/"); // 地址中必须要有.的存在，否则不是http地址：about:config chrome://xxx/xxx
        regH.test(addUrl);
        if(addUrl.indexOf(".") > -1)
            return RegExp.$1;
        else
            return null;
    }
    function GetScore(dirURL){ // 在 不在map中的时候，请求获得分数，并且加入map
        console.log("start...with..."+addUrl);
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', dirURL, true);
        xhr2.onreadystatechange=function() {
            if(xhr2.readyState == 4){
                if(xhr2.status == 200){
                    var endhtmls = xhr2.responseText;
                    var reg = new RegExp("\"score\":([\\d]*)", "g");
                    var result = reg.exec(endhtmls); result = reg.exec(endhtmls); //第二次的才是真正结果
                    var score = result[1]; //第一个括号中的值
                    setColorWithScore(score, true);
                    addIntoMap(addUrl, score);
                }
                console.log("end..........");
            }
        }
        xhr2.send(); 
    }
    function addIntoMap(url, score){ //插入分数
        map[url] = score;
    }
    function getMapScore(url){ //查找map获得分数，没有返回-1
        if(map[url] == null)
            return -1;
        else
            return map[url];
    }
    function removefromMap(url){ //Tab关闭的时候remove掉
        map[url] = null;
    }
    function setColorWithScore(score, flag){ // 根据分数直接上色
        var outStr="";
        if(flag != null) outStr += "网页获取";
         if(score != ""){ // 正则成功=（1.有值（>30或者<30）2.空的string）
            if(score < 10){
                outStr += "成功， 分数："+score;
                setColor(DANGEROUS_Z);
            }
            else if(score < 30){
                outStr += "成功， 分数："+score;
                setColor(DANGEROUS_A);
            }else{
                outStr += "成功， 分数："+score;
                setColor(SAFE);
            }
        }else{
            outStr += "失败，没有改网站的数据";
            setColor(UNKNOWN);
        }
        console.log(outStr);
    }
})();
function inWhiteList(url){
    var length = whiteList.length;
    for(var i = 0; i < length; i++){
        if(url.indexOf(whiteList[i]) > -1)
            return true;
    }
    //console.log(url+" not  in ");
    return false;
}
function setColor(cccolor){ //上色
    var node = document.getElementById("urlbar");
    node.style = addStyle(target+"{border-radius: 13px;padding: 0 2px !important;margin: 0 !important;\
            background-color: "+cccolor+" !important; border: none !important;\
            border-right: 0px solid rgb(235, 235, 235) !important;}");
}
function addStyle(css) { //添加CSS的代码--copy的
    var pi = document.createProcessingInstruction(
        'xml-stylesheet',
        'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
    );
    return document.insertBefore(pi, document.documentElement);
}