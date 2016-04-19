// ==UserScript==
// @Name         论坛帖子按发布时间排序
// @namespace    http://www.52pojie.cn/
// @version      0.2
// @description  wndflb Auto Sort by time
// @author       anonymity
// @create       2015-08-05
// @lastmodified 2015-08-05
// @include      */forum.php?*
// @include      */forum-*
// @icon         
// @require      http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.9.0.min.js
// @grant        none
// ==/UserScript==

// @0.2           重构代码；解决Discuz的common.js中function $(id)和JQuery冲突的问题；

jQuery.noConflict()(function() {
    // 使用 jQuery 的代码
    //var jq = jQuery.noConflict();
   
    var CONSTANTS = {
        'version': '0.2',
        'lc': window.location,
        'localurl': window.location.href,
        'regOrder': /orderby=/gi, // 用于检测是否已经设置排序规则的正则表达式
        'regHTML': /-(\d*)-.*html$/gi, // 用于匹配HTML页面的正则表达式
        'regPHP': /(fid=\d*)$/gi, // 用于匹配PHP页面的正则表达式
        'orderby': '&filter=author&orderby=dateline', // 排序规则（按作者分组日期排序）
        'htmlsuffix': '.php?mod=forumdisplay&fid=$1', // HTML页面添加参数
        'phpsuffix': '$1', // PHP页面添加参数
    };
   
    var MAIN = {
        hasOrder: function(){
            return CONSTANTS.regOrder.test(CONSTANTS.localurl);
        },
        isHTMLMode: function(){
            return CONSTANTS.regHTML.test(CONSTANTS.localurl);
        },
        isPHPMode: function(){
            return CONSTANTS.regPHP.test(CONSTANTS.localurl);
        },
        HTMLRedirect2PHP: function(){
            var localurl = CONSTANTS.localurl;
            CONSTANTS.lc.href = localurl.replace(CONSTANTS.regHTML, CONSTANTS.htmlsuffix + CONSTANTS.orderby);
        },
        PHPRedirect: function(){
            var localurl = CONSTANTS.localurl;
            CONSTANTS.lc.href = localurl.replace(CONSTANTS.regPHP, CONSTANTS.phpsuffix + CONSTANTS.orderby);
        },
        WriteLog: function Log(msg){ //调试专用
            console.log(msg);
        },
        AutoSort: function(){
            var hasOrder = this.hasOrder();
            var isHTMLMode = this.isHTMLMode();
            var isPHPMode = this.isPHPMode();
            if (hasOrder){
                return; // 不影响已经设置的排序规则
            }
            if (isHTMLMode){
                this.HTMLRedirect2PHP(); // 将HTML页面重定向到添加排序参数后的动态页面
            }
            else if (isPHPMode){
                this.PHPRedirect(); // 在URL后面添加参数实现排序
            }
                }
    };
    MAIN.AutoSort();
});
// 其他库(如Discuz的common.js)使用 $ 做别名的代码
