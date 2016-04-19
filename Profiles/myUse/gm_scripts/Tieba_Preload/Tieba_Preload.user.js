﻿// ==UserScript==
// @name        Tieba Preload
// @version     1.3.11
// @description 贴吧预加载，自动加载下一页内容，同时附带消灭贴吧自带 Lazy Load 功能
// @match       http://tieba.baidu.com/*
// @include     http://tieba.baidu.com/*
// @exclude     http://tieba.baidu.com/*tp=1*
// @exclude     http://tieba.baidu.com/*tab=*
// @exclude     http://tieba.baidu.com/photo/*
// @author      864907600cc
// @icon        http://1.gravatar.com/avatar/147834caf9ccb0a66b2505c753747867
// @grant       GM_registerMenuCommand
// @noframes
// @namespace   http://ext.ccloli.com
// ==/UserScript==

// 贴子判断方式由 kookxiang 提供
// 本脚本基于 GPLv3 协议开源 http://www.gnu.org/licenses/gpl.html‎
// (c) 86497600cc. Some Rights Reserved.

// 修复使用 GM 函数后脚本失效的问题，thanks to shyangs
var //window=unsafeWindow,
	_ = unsafeWindow._,
	PageData = unsafeWindow.PageData,
	Page = unsafeWindow.Page,
	$ = unsafeWindow.$,
	//forumlist=unsafeWindow.forumlist,
	no_refresh_url_prefix = (typeof unsafeWindow.no_refresh_url_prefix != 'undefined') ? unsafeWindow.no_refresh_url_prefix : null;
//is_firefox=navigator.userAgent.indexOf('Firefox')>=0?true:false;

var notification = document.createElement('div'),
	setting = (window.localStorage.getItem('tb_preload_setting') && window.localStorage.getItem('tb_preload_setting').indexOf('{') >= 0) ? JSON.parse(window.localStorage.getItem('tb_preload_setting')) : {},
	stylesheet = '@keyframes setting_panel_show{0%{top:100px;opacity:0}80%{top:-20px;opacity:1}100%{top:0px;opacity:1}}@-webkit-keyframes setting_panel_show{0%{top:100px;opacity:0}80%{top:-20px;opacity:1}100%{top:0px;opacity:1}}@keyframes setting_panel_hide{0%{top:0px;opacity:1}20%{top:-20px;opacity:1}100%{top:100px;opacity:0}}@-webkit-keyframes setting_panel_hide{0%{top:0px;opacity:1}20%{top:-20px;opacity:1}100%{top:100px;opacity:0}}.tb_preload_notification{position:fixed;right:10px;padding:5px;bottom:-50px;box-shadow:0 0 1px 5px rgba(0,0,0,0.5);background:rgba(0,0,0,0.5);font-size:12px;color:#fff;opacity:0;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;cursor:pointer;z-index:999999;pointer-events:none}.tb_preload_notification[show]{bottom:10px;opacity:1}.tb_preload_page{width:100%;font-size:14px;text-align:center}.tb_preload_page a{text-decoration:none;color:#333;margin:20px 0;display:block;font-size:14px}.tb_preload_setting{color:#2d64b3;cursor:pointer}.list_loading,.right_section [data-type="tb-datalazyload"]{display:none}.vpic_wrap img{max-height:90px}.tb_preload_setting_panel{width:600px;height:200px;margin:auto;position:fixed;top:0;bottom:0;left:0;right:0;z-index:999998;box-shadow:rgba(0,0,0,.5) 0 0 0 2500px,rgba(255,255,255,.75) 0 0 200px;background:rgba(255,255,255,.75);font-size:14px;-webkit-user-select:none;-moz-user-select:none;-webkit-animation:setting_panel_show 0.75s ease-in;animation:setting_panel_show 0.75s ease-in;font-family:"Hiragino Sans GB","Microsoft Yahei","WenQuanYi Micro Hei",Arial,Tahoma,sans-serif}.tb_preload_setting_panel[close]{-webkit-animation:setting_panel_hide 0.75s ease-out;animation:setting_panel_hide 0.75s ease-out}.tb_preload_setting_panel_bg{width:100%;height:100%;position:fixed;left:0;top:0;z-index:999997}.tb_preload_setting_panel span,.tb_preload_setting_panel a{display:block;cursor:pointer;height:20px;line-height:20px;margin:10px;-webkit-transition:all 0.25s linear;-moz-transition:all 0.25s linear;transition:all 0.25s linear}.tb_preload_setting_panel span{color:#F00;padding-left:50px}.tb_preload_setting_panel span:hover{text-shadow:#F00 0 0 1px}.tb_preload_setting_panel span[active]:hover,.tb_preload_setting_panel a:hover{text-shadow:#7fb900 0 0 1px}.tb_preload_setting_panel span::before{content:"×";display:inline-block;width:20px}.tb_preload_setting_panel span[active]{color:#7FB900}.tb_preload_setting_panel span[active]::before{content:"√"}.tb_preload_setting_panel p{margin:20px;font-size:20px;height:24px;line-height:24px;cursor:default;font-family:"Segoe Script"!important;text-shadow: #000 0 0 2px}.tb_preload_setting_panel a{color:#7FB900;font-family:"Segoe Script"!important;text-align:center}.tbui_follow_fixed{display:block!important}img[origin-src]{display:none!important}',
	setting_panel = false,
	ss = document.createElement('style'),
	notification_timer = null;
ss.textContent = stylesheet;
document.head.appendChild(ss);
notification.className = 'tb_preload_notification';
document.body.appendChild(notification);
if (setting.thread_preload == null) setting.thread_preload = 1;
if (setting.thread_list_lazyload == null) setting.thread_list_lazyload = 1;
if (setting.notification_1_3_4 = null) {
	setting.notification_1_3_4 = 1;
	alert('Tieba Preload Notification\n\n1. 自该版本起添加 @namespace，若出现重复安装的情况请删除旧脚本；\n2. Firefox 下不翻页 bug 已临时使用定时器解决，为保证楼中楼完全加载，请注意在载入页面完成后不要在 1s 内滚动到页面底部 = = 关于该 bug 引起的具体原因仍旧不明，不知道是不是 Firefox 特有的 bug……\n3. 现可以通过在贴子页的“开启/关闭自动加载”处单击鼠标右键打开设置界面，原开启设置界面的方式保留；\n4. 1.3.5 版本起按住 Ctrl 键鼠标左键点击页面内的“开启/关闭自动加载”可设置仅当前页生效。');
	window.localStorage.setItem('tb_preload_setting', JSON.stringify(setting));
}

function set_function(v, k) {
	if (k == null) k = true;
	switch (v) {
		case 1:
			if (setting.thread_preload == 1) {
				setting.thread_preload = 0;
				if (setting_node) {
					setting_node.textContent = '开启自动加载';
					setting_node_2.textContent = '开启自动加载';
				}
				if (PageData.product == 'pb' && typeof loader != 'undefined' && loader != null) {
					clearInterval(loader);
					loader = null;
				}
				show_notification(1, '已关闭自动加载......');
				notification.setAttribute('show', 'true');
				notification_timer = setTimeout(function() {
					notification.removeAttribute('show')
				}, 5000);
			}
			else {
				setting.thread_preload = 1;
				if (setting_node) {
					setting_node.textContent = '关闭自动加载';
					setting_node_2.textContent = '关闭自动加载';
				}
				if (PageData.product == 'pb' && typeof loader != 'undefined' && loader == null) preload_listener();
				show_notification(1, '已开启自动加载......');
			}
			break;
		case 2:
			if (setting.thread_list_preload == 1) {
				alert('当开启首页贴子列表预加载时，该项不能关闭。');
			}
			else if (setting.thread_list_lazyload == 1) {
				setting.thread_list_lazyload = 0;
				if (PageData.product == 'frs' && typeof loader != 'undefined' && loader != null) {
					clearInterval(loader);
					loader = null;
					if (document.getElementById('frs_list_pager')) document.getElementById('frs_list_pager').onclick = null;
				}
				show_notification(1, '已禁用自动去除首页 lazyload......');
			}
			else {
				setting.thread_list_lazyload = 1;
				//setting_node.textContent='禁用自动去除首页 lazyload';
				if (PageData.product == 'frs' && typeof loader != 'undefined' && loader == null) {
					kill_tieba_lazyload_listener();
				}
				show_notification(1, '已开启自动去除首页 lazyload......');
			}
			break;
		case 3:
			if (setting.thread_list_preload == 1) {
				setting.thread_list_preload = 0;
				if (PageData.product == 'frs' && typeof loader != 'undefined' && loader != null) {
					clearInterval(loader);
					loader = null;
					if (document.getElementById('frs_list_pager')) document.getElementById('frs_list_pager').onclick = null;
				}
				show_notification(1, '已关闭自动加载......');
			}
			else {
				setting.thread_list_preload = 1;
				setting.thread_list_lazyload = 1;
				if (PageData.product == 'frs' && typeof loader != 'undefined' && loader == null) {
					preload_listener();
				}
				show_notification(1, '已开启自动加载......');
			}
			break;
	}
	if (k == true) window.localStorage.setItem('tb_preload_setting', JSON.stringify(setting));
	update_setting_panel();
}

function call_setting() {
	if (setting_panel == false) {
		setting_panel = true;
		var panel = document.createElement('div'),
			panel_bg = document.createElement('div');
		panel_bg.className = 'tb_preload_setting_panel_bg';
		panel.className = 'tb_preload_setting_panel';
		panel_bg.onclick = function() {
			panel.setAttribute('close', true);
			setTimeout(function() {
				panel.parentElement.removeChild(panel);
			}, 700);
			panel_bg.parentElement.removeChild(panel_bg);
			setting_panel = false;
		}
		panel_bg.setAttribute('title', '点击以关闭设置界面');
		panel.innerHTML = '<p align="center">Tieba Preload Setting</p><span class="tbpreload_setting_panel_thread_preload">自动加载贴子下一页</span><span class="tbpreload_setting_panel_thread_list_lazyload">去除贴吧首页 lazyload</span><span class="tbpreload_setting_panel_thread_list_preload">自动加载贴子列表下一页</span><a href="http://tieba.baidu.com/p/2939166340">Feedback</a>';
		document.body.appendChild(panel);
		document.body.appendChild(panel_bg);
		var panel_thread_preload = document.getElementsByClassName('tbpreload_setting_panel_thread_preload')[0],
			panel_thread_list_lazyload = document.getElementsByClassName('tbpreload_setting_panel_thread_list_lazyload')[0],
			panel_thread_list_preload = document.getElementsByClassName('tbpreload_setting_panel_thread_list_preload')[0];
		panel_thread_preload.onclick = function() {
			set_function(1);
		}
		panel_thread_list_lazyload.onclick = function() {
			set_function(2);
		}
		panel_thread_list_preload.onclick = function() {
			set_function(3);
		}
		update_setting_panel();
	}
}

function update_setting_panel() {
	var panel_thread_preload = document.getElementsByClassName('tbpreload_setting_panel_thread_preload')[0],
		panel_thread_list_lazyload = document.getElementsByClassName('tbpreload_setting_panel_thread_list_lazyload')[0],
		panel_thread_list_preload = document.getElementsByClassName('tbpreload_setting_panel_thread_list_preload')[0];
	if (setting.thread_preload == 1) panel_thread_preload.setAttribute('active', 'true');
	else if (panel_thread_preload.hasAttribute('active')) panel_thread_preload.removeAttribute('active');
	if (setting.thread_list_lazyload == 1) panel_thread_list_lazyload.setAttribute('active', 'true');
	else if (panel_thread_list_lazyload.hasAttribute('active')) panel_thread_list_lazyload.removeAttribute('active');
	if (setting.thread_list_preload == 1) panel_thread_list_preload.setAttribute('active', 'true');
	else if (panel_thread_list_preload.hasAttribute('active')) panel_thread_list_preload.removeAttribute('active');
}

function show_notification(n, c) {
	notification.textContent = c;
	notification.setAttribute('show', 'true');
	if (notification_timer != null) {
		clearTimeout(notification_timer);
		notification_timer = null;
	}
	if (n == 1) {
		notification_timer = setTimeout(function() {
			notification.removeAttribute('show');
			notification_timer = null;
		}, 5000);
	}
}

if (typeof PageData != 'undefined' && PageData && (PageData.product == 'pb' || PageData.product == 'frs')) { // 判断是否载入
	var loading = false,
		loader = null,
		pager_timer = null;

	// 以下语句中代码来自 Kill Tieba Lazy Load (by 864907600cc, Licence: WTFPL)

	function kill_tieba_lazyload() {
		//console.log(1);
		var codearea = document.getElementById('pblistCodeArea') || document.getElementById('frslistCodeArea') || null;
		if (codearea != null) {
			//document.getElementById('list_loading').outerHTML=document.getElementById('pblistCodeArea').value;
			//document.getElementById('pblistCodeArea').parentElement.removeChild(document.getElementById('pblistCodeArea'));
			var lazyload_t_nodes = codearea.childNodes;
			for (var i = 0; i < lazyload_t_nodes.length; i++) {
				if (lazyload_t_nodes[i].nodeType == 8) {
					codearea.outerHTML = lazyload_t_nodes[i].data;
					//lazyload_nodes[i].parentElement.removeChild(lazyload_nodes[i])
					break;
				}
			}
		}
		if (document.querySelectorAll('img[data-tb-lazyload]')) {
			var lazyload_i_nodes = document.querySelectorAll('img[data-tb-lazyload]');
			for (var i = 0; i < lazyload_i_nodes.length; i++) {
				lazyload_i_nodes[i].setAttribute('src', lazyload_i_nodes[i].getAttribute('data-tb-lazyload'));
				lazyload_i_nodes[i].removeAttribute('data-tb-lazyload');
			}
		}
		if (document.querySelectorAll('img[onloadfun="listimg"][original]')) {
			var lazyload_i_nodes = document.querySelectorAll('img[onloadfun="listimg"][original]');
			for (var i = 0; i < lazyload_i_nodes.length; i++) {
				lazyload_i_nodes[i].setAttribute('src', lazyload_i_nodes[i].getAttribute('original'));
				//lazyload_i_nodes[i].setAttribute('immediate', '');
				//lazyload_i_nodes[i].addEventListener('load', function(){loadPic(this,0,{"width":400,"height":90});});
			}
		}
		if (PageData.product == 'pb') {
			//_.Module.use("pb/widget/ForumListV3", {});
			_.Module.use('pb/component/NoAutoVideo', [{
				text_videofrom: '视频来自: '
			}]);
			//rebind_image();
			//Page.bindOpenImg();
			//console.log('触发强制显示楼中楼');
			//if(typeof window.forumlist=='object'&&typeof window.forumlist._loadSubList=='object'){
			/*if(is_firefox)setTimeout(function(){kill_lzl();},500);
				else*/
			kill_lzl();
			//}
			//else var k=setInterval(function(){if(typeof window.forumlist=='object'&&typeof window.forumlist._loadSubList=='object')clearInterval(k);kill_lzl();},1000)
			//console.log('触发强制显示楼中楼完成');
		}
		if (PageData.product == 'frs' && document.cookie.match(/batch_delete_mode=(\w{4,5})/) && document.cookie.match(/batch_delete_mode=(\w{4,5})/)[1] == 'true') {
			var tls = document.getElementsByClassName('j_thread_list');
			for (var i = 0; i < tls.length; i++) {
				if (!tls[i].getElementsByClassName('batch_delete')[0]) {
					var s = '<div class="batch_delete j_batch_delete"><div class="batch_delete_text">勾选</div><input type="checkbox" class="batch_delete_select j_batch_delete_select"></div>';
					var t = document.createElement('div');
					tls[i].appendChild(t);
					t.outerHTML = s;
				}
			}
		}
	}

	function show_lzl(c) {
		var t = document.createElement('iframe');
		t.style.cssText = 'width:0;height:0;position:absolute'
		t.setAttribute('onload', c);
		document.body.appendChild(t);
		// kill_lzl();
		//document.body.removeChild(t); // 取消自动移除 iframe，因为该操作可能导致在 Firefox 下无法运行
	}

	function kill_lzl() {
		// Fuck LZL Thanks To 8qwe24657913 
		//console.log('执行强制显示楼中楼');
		/*		var a = document.getElementsByClassName('hideLzl'),
					b = window.forumlist._loadSubList,
					c = a.length;
				/*while (--c > -1) {
					console.log(a)
					console.log('开始处理 - '+(c+1));
					b.showLzlPost(a[c]);
					console.log('showLzlPost - '+(c+1));
					a[c].setAttribute('class',a[c].getAttribute('class').replace(/ ?hideLzl/,''));
					console.log('处理完成 - '+(c+1));
				}*/
		//for(var i=0;i<c;i++){
		/*		while(a[0]){
					console.log(a)
					//console.log('开始处理 - ');
					console.log(a[0])
					b.showLzlPost(a[0]);
					//console.log('showLzlPost - ');
					a[0].setAttribute('class',a[0].getAttribute('class').replace(/ ?hideLzl/,''));
					//console.log('处理完成 - ');
				}
				//console.log('楼中楼处理完成！');
				/*for(var i=0;i<c.length;i++){
					b.showLzlPost(a[i]);
					a[i].className=a[i].className.replace(/ ?hideLzl/,'');
				}*/
		// Fuck LZL Thanks To 网络孤独行客
		/*(function($){
			$(document).ajaxSuccess(function(e,xhr,s){
				(s.url.search("pn") !== -1) && lazyload();
			});
			
			var lazyload = function lazyload() {*/
		if ("undefined" !== typeof unsafeWindow.datalazyload) {
			if (unsafeWindow.datalazyload.userConfig.diff === 500) {
				unsafeWindow.datalazyload.userConfig.diff = 99999;
				return window.scrollTo(0, (document.body.scrollTop || document.documentElement.scrollTop) - 1);
			}
			else return setTimeout( /*lazyload*/ kill_lzl, 200);
		}
		else setTimeout(kill_lzl, 200);
		/*
						setTimeout(lazyload,200);
					}
					lazyload();
			   /})(unsafeWindow.jQuery);*/
	}

	// 以下语句中代码基于 Tieba Preload 修改 (by 864907600cc, Licence: GPLv3 | http://ccloli.com/201212/tieba-preload-source/)

	function whether_fetching() {
		//console.log('whether_fetching');
		var getscroll = document.documentElement.scrollTop || document.body.scrollTop,
			scroll_psi = document.body.scrollHeight - getscroll,
			psi = PageData.product == 'pb' ? 5000 : PageData.forum.version == 2 ? 2500 : 1500;
		if (scroll_psi <= psi && loading == false) {
			if (cur_page < total_page) {
				loading = true;
				fetch_next_page();
			}
			//else window.onscroll=null;
			else {
				clearInterval(loader);
				loader = null
			}
		}
	}

	function fetch_next_page() {
		//console.log('fetch_next_page');
		kill_lzl();
		switch (PageData.product) {
			case 'pb':
				var url = page_url + '?see_lz=' + see_lz + '&pn=' + next_page;
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						var str = xhr.responseText;
						if (PageData.page == 'v1') var data = str.split('"p_postlist"')[1].split('<div class="p_thread')[0].match(/>([\s\S]+)/)[1]; // 旧版贴吧
						else var data = str.split('"p_postlist"')[1].split('"right_section')[0].match(/>([\s\S]+)<\/div>[\s\S]*<\/div>[\s\S]*<div/)[1]; // 先 split 再 match 减少资源消耗（>20s → <1s）
						var node = document.getElementsByClassName('p_postlist')[0],
							t_node = document.createElement('div'),
							p_node = document.createElement('div');
						p_node.className = 'tb_preload_page';
						p_node.innerHTML = '<a href="' + url + '">第 ' + next_page + ' 页，共 ' + total_page + ' 页</a>';
						node.appendChild(p_node);
						node.appendChild(t_node);
						t_node.outerHTML = data;

						if (str.match(/<script>.*(_.Module.use\("pp?b\/widget\/postList",[\s\S]+?)<\/script>/)) {
							var lzl = str.match(/<script>.*(_.Module.use\("pp?b\/widget\/postList",[\s\S]+?)<\/script>/)[1];
							show_lzl(lzl);
						}
						kill_tieba_lazyload();
						++cur_page;
						++next_page;
						PageData.pager.cur_page = cur_page;
						see_lz = window.location.href.match(/see_lz/) ? window.location.href.match(/see_lz=(\d)/)[1] : PageData.special.lz_only;
						loading = false;
						if (cur_page == total_page) {
							clearInterval(loader);
							loader = null;
						}
						notification.removeAttribute('show');
					}
				}
				xhr.open('GET', url);
				xhr.send();
				notification.setAttribute('show', 'true');
				show_notification(0, '正在加载第 ' + next_page + ' 页......');
				break;
			case 'frs':
				var url = page_url + '&pn=' + next_page;
				if (PageData.forum.version == 2) {
					var xurl = page_url + '&apage=1&pn=' + next_page;
				}
				else {
					if (location.hash.indexOf('#!') >= 0) {
						var hash_data = location.hash.match(/#\!\/(.)/)[1];
						if (hash_data != last_hash_data) {
							switch (hash_data) {
								case 'm':
									page_url = page_url.replace(/f.+kw=/, 'f?kw=');
									last_hash_data = 'm';
									cur_page = 0;
									next_page = cur_page + 50;
									total_page = document.querySelector('a.last').href.match(/pn=(\d+)/)[1];
									break;
								case 'n':
									page_url = page_url.replace(/f.+kw=/, 'f/good?kw=');
									last_hash_data = 'n';
									cur_page = 0;
									next_page = cur_page + 50;
									total_page = document.querySelector('a.last').href.match(/pn=(\d+)/)[1];
									break;
								case 'v':
									page_url = page_url.replace(/f.+kw=/, 'f/vote?kw=');
									last_hash_data = 'v';
									cur_page = 0;
									next_page = cur_page + 50;
									total_page = document.querySelector('a.last').href.match(/pn=(\d+)/)[1];
									break;
							}
						}
					}
					var xurl = page_url + '&ajax=1&pn=' + next_page
				}
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						var str = xhr.responseText;
						if (PageData.forum.version == 2) {
							var data = str.match(/<ul id="thread_list"[\s\S]*?>([\s\S]+)<\/ul>/)[1],
								node = document.getElementById('thread_list');
							p_node = document.createElement('div'),
								context = '<a href="' + url + '">第 ' + (parseInt(next_page / 50) + 1) + ' 页，共 ' + (parseInt(total_page / 50) + 1) + ' 页</a>';
						}
						else {
							var data = JSON.parse(str).data.content.split('<tbody>')[1].split('</tbody>')[0], //str.split('<tbody>')[1].split('</tbody>')[0],
								node = document.querySelector('#thread_list tbody'),
								p_node = document.createElement('tr'),
								context = '<td colspan="5"><a href="' + url + '">第 ' + (parseInt(next_page / 50) + 1) + ' 页，共 ' + (parseInt(total_page / 50) + 1) + ' 页</a></td>';
						}
						var //node=document.getElementById('thread_list'),
							t_node = document.createElement('div')
							/*,
														p_node=document.createElement('div')*/
						;
						p_node.className = 'tb_preload_page';
						p_node.innerHTML = context;
						node.appendChild(p_node);
						node.appendChild(t_node);
						t_node.outerHTML = data;
						kill_tieba_lazyload();
						cur_page += 50;
						next_page += 50;
						loading = false;
						if (cur_page == total_page) {
							clearInterval(loader);
							loader = null;
						}
						notification.removeAttribute('show');
					}
				}
				xhr.open('GET', xurl);
				xhr.send();
				notification.setAttribute('show', 'true');
				show_notification(0, '正在加载第 ' + (parseInt(next_page / 50) + 1) + ' 页......');
				break;
		}
	}

	function preload_listener() {
		if (cur_page != total_page) {
			//console.log('aaa');
			//window.onscroll=function(){ // 改用定时器以节省资源
			loader = setInterval(function() {
				whether_fetching()
			}, 1000);
			//}
		}
	}

	function kill_tieba_lazyload_listener() {
		kill_tieba_lazyload();
		if (document.getElementById('frs_list_pager')) document.getElementById('frs_list_pager').onclick = function() {
			datalazyload.userConfig.diff = 99999;
			if (loader == null) loader = setInterval(function() {
				/*if (document.getElementById('frslistCodeArea')) {
					//kill_tieba_lazyload();
					clearInterval(loader);
					loader = null;
					kill_tieba_lazyload_listener();
				}*/
				if (datalazyload.userConfig.diff === 500) {
					kill_tieba_lazyload();
					clearInterval(loader);
					loader = null;
					kill_tieba_lazyload_listener();
				}
			}, 1000);
		}
	}

	function rebind_image() {
		var imglist = document.querySelectorAll('.d_post_content img[pic_type="0"]'); //.BDE_Image
		$(imglist).unbind();
		Page._bindOpenImg();

	}

	function bind_pager() {
		var pager1 = document.querySelectorAll('.pb_list_pager,.jump_btn_bright');
		var pager2 = document.querySelectorAll('.jump_input_bright');
		for (var i = 0; i < pager1.length; i++) {
			pager1[i].addEventListener('click', rebind_pager);
		}
		for (var i = 0; i < pager2.length; i++) {
			pager2[i].addEventListener('keypress', function(e) {
				if (e.keyCode == 13) rebind_pager();
			});
		}
	}

	function rebind_pager() {
		if (pager_timer == null) {
			pager_timer = setInterval(function() {
				if (PageData.pager.cur_page != cur_page) {
					clearInterval(pager_timer);
					pager_timer = null;
					kill_tieba_lazyload();
					bind_pager();
					cur_page = PageData.pager.cur_page;
					next_page = cur_page + 1;
					total_page = PageData.pager.total_page;
					if (loader == null && setting.thread_preload == 1) preload_listener();
					inner_setting();
				}
			}, 1000)
		}
	}

	function inner_setting() {
		setting_node = document.createElement('li');
		page_node = document.getElementsByClassName('l_posts_num');
		setting_node.textContent = setting.thread_preload == 1 ? '关闭自动加载' : '开启自动加载';
		setting_node.className = 'tb_preload_setting';
		setting_node_2 = setting_node.cloneNode(true);
		setting_node.onclick = function(e) {
			if (e.ctrlKey) set_function(1, false);
			else set_function(1);
		};
		setting_node_2.onclick = function(e) {
			if (e.ctrlKey) set_function(1, false);
			else set_function(1);
		};
		setting_node.oncontextmenu = function() {
			call_setting();
			return false
		};
		setting_node_2.oncontextmenu = function() {
			call_setting();
			return false;
		};
		if (page_node[0]) page_node[0].insertBefore(setting_node, page_node[0].getElementsByClassName('l_pager')[0].nextSibling);
		if (page_node[1]) page_node[1].insertBefore(setting_node_2, page_node[1].getElementsByClassName('l_pager')[0].nextSibling);
	}

	//notification.onclick=function(){set_function(1)};

	if (PageData.product == 'frs') {
		/*if(document.getElementsByClassName('th_footer_l')[0]){
			var setting_node=document.createElement('a'),
				page_node=document.getElementsByClassName('th_footer_l')[0];
			setting_node.textContent=setting.thread_list_lazyload==1?'禁用自动去除首页 lazyload':'开启自动去除首页 lazyload'; // 好长 _(:з」∠)_
			setting_node.className='tb_preload_setting';
			setting_node.onclick=function(){set_function(2)};
			page_node.appendChild(setting_node);
		}*/
		notification.style.pointerEvents = 'none';
		var xhr = new XMLHttpRequest(),
			page_url = no_refresh_url_prefix ? ('//tieba.baidu.com' + no_refresh_url_prefix) : location.href.replace(/&?pn=\d+/, ''),
			cur_page = location.href.match(/pn=(\d+)/) ? parseInt(location.href.match(/pn=(\d+)/)[1]) : 0,
			next_page = cur_page + 50,
			total_page = PageData.forum.thread_num - PageData.forum.thread_num % 50 || document.querySelector('a.last').href.match(/pn=(\d+)/)[1],
			last_hash_data = '';
		if (setting.thread_list_preload == 1) {
			kill_tieba_lazyload();
			preload_listener();
		}
		else if (setting.thread_list_lazyload == 1) kill_tieba_lazyload_listener();
	}
	else if (PageData.product == 'pb' && PageData.pager) {
		//Page._bindOpenImg=Page.bindOpenImg;
		//Page.bindOpenImg=rebind_image;
		kill_tieba_lazyload();
		// 以下语句中部分判断代码来自 Chrome 扩展程序 KK 贴吧工具箱 (by kookxiang | https://chrome.google.com/webstore/detail/bcmemjlkdbeephmnklgimfnjlmfhfdgi)
		/*cur_page=0,
		total_page=0,
		page_url='',
		see_lz=0,*/
		var xhr = new XMLHttpRequest(),
			page_url = PageData.thread_url ? '//tieba.baidu.com' + PageData.thread_url : location.href.match(/\/\/tieba\.baidu\.com\/p\/\d+/)[0],
			see_lz = window.location.href.match(/see_lz/) ? window.location.href.match(/see_lz=(\d)/)[1] : PageData.special.lz_only,
			cur_page = PageData.pager.cur_page,
			total_page = PageData.pager.total_page,
			next_page = cur_page + 1,
			setting_node,
			setting_node_2,
			page_node;
		if (setting.thread_preload == 1) preload_listener();
		bind_pager();
		inner_setting();
		/*for(var i in document.scripts){
			if(document.scripts[i].textContent.indexOf('ForumListV3')>=0){
				var lzl=document.scripts[i].textContent;
				show_lzl(lzl);
				break;
			}
		}*/
	}
}

typeof GM_registerMenuCommand != 'undefined' && GM_registerMenuCommand('Tieba Preload Setting', call_setting);
