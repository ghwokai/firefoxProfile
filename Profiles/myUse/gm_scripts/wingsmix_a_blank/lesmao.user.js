// ==UserScript==
// @name        wingsmix a_blank
// @description 链接强制新标签页打开
// @namespace   a-blank-pic
// @include     http://www.lesmao.com/*
// @include     http://www.99e.cc/*
// @include     http://www.lsm.me/*
// @include     http://userstyles.org/*
// @include     http://www.aisinei.com/*
// @include     http://hrtsea.com/*
// @include     http://www.lsmo.cc/*
// @require      http://cdn.staticfile.org/jquery/1.8.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
$(
    function() {

        $("a").attr("target", "_blank");

    }
);
