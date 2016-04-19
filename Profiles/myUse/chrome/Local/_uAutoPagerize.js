// uAutoPagerize2.uc.js 的配置文件。

var prefs = {
    pauseA: true, // 快速停止翻页开关，需要刷新页面
    Pbutton: [0, 0, 0], // 需要按住的键.....0: 不按住任何键;1: shift鍵;2: ctrl鍵; 3: alt鍵;(同时按3个键.就填 1 2 3)(一个都不按.就填 0 0 0)
    mouseA: false, // 按住鼠标左键..否则.双击;
    Atimeout: 200, // 按住左键时..延时.多少生效..(单位:毫秒);
    stop_ipage: true, // 如果在连续翻页过程中暂停.重新启用后.不在继续..连续翻页..
    // 下一页图片的修正，是 image 的属性
    lazyImgSrc: 'zoomfile|file|original|load-src|_src|imgsrc|real_src|src2|data-lazyload-src|data-ks-lazyload|data-lazyload|data-src|data-original|data-thumb|data-imageurl|data-defer-src|data-placeholder',
};

// 自定义站点，优先级最高
var MY_SITEINFO = [{
        name: 'easyicon.net',
        url: '^http://www\\.easyicon\\.net/iconsearch/*',
        nextLink: 'id("result_right_layout")/div[@class="page_nav units-row"]/div[@class="pages_all"]/a[text()="下一页>"]',
        pageElement: 'id("result_right_layout")',
        exampleUrl: 'http://www.easyicon.net/iconsearch/feed/&color=black',
    }, {
        name: '天猫',
        url: '^http://list\\.tmall\\.com//search_product\\.htm\\?q=*',
        nextLink: '//a[@class="ui-page-next"]',
        pageElement: 'id("J_ItemList")',
        exampleUrl: 'http://list.tmall.com//search_product.htm?q=%D2%F4%CF%E4&type=p&cat=all',
    }, {
        name: 'User scripts on Greasy Fork',
        url: '^https://greasyfork\\.org/*',
        nextLink: '//div[@class="pagination"]/a[@class="next_page"]',
        pageElement: 'id("browse-script-list")',
        exampleUrl: 'https://greasyfork.org/scripts',
    }, {
        name: 'iconarchive',
        url: '^http://www\\.iconarchive\\.com/search\\?q=*',
        nextLink: 'id("layout-search-content")/div[@class="pagination-bar"]/div[@class="pagination"]/a[@class="next"]',
        pageElement: 'id("layout-search-content")',
        exampleUrl: 'http://www.iconarchive.com/search?q=pin',
    }, {
        name: 'Find Icons',
        url: '^http://findicons\\.com/search/',
        nextLink: '//div[@class="pages"]/a[contains(text(), "Next")]',
        pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
        exampleUrl: 'http://findicons.com/search/earth',
    }, {
        name: 'findicons',
        url: '^http://findicons\\.com/search/*',
        nextLink: 'id("search_con")/div[@class="info_page"]/div[@class="box_page right"]/div[@class="pages"]/a[text()="下一页 >"]',
        pageElement: 'id("search_con")/div[@class="icon_list icon_list_165"]',
        exampleUrl: 'http://findicons.com/search/player',
    }, {
        name: 'IconPng.com',
        url: '^http://www\\.iconpng\\.com/search/*',
        nextLink: 'id("searchresults")/div[@class="paging"]/a[text()="下一页"]',
        pageElement: 'id("searchresults")',
        exampleUrl: 'http://www.iconpng.com/search/tag=download',
    }, {
        name: 'iconarchiveShow',
        url: '^http://www\\.iconarchive\\.com/show/*',
        nextLink: 'id("allcontent")/div[@class="contentbox"]/div[@class="pagination-bar"]/div[@class="pagination"]/a[text()="Next >"]',
        pageElement: 'id("allcontent")/div[@class="contentbox"]',
        exampleUrl: 'http://www.iconarchive.com/show/icons8-metro-style-icons-by-visualpharm.2.html',
    },



    //   示例：ipages 参数的使用。打开百度后立即加载3页。
    {
        // 通过更改 pageElement 解决清爽百度的问题
        name: '百度搜索',
        url: "^https?://www\\.baidu\\.com/(?:s|baidu)\\?",
        nextLink: '//p[@id="page"]/a[contains(text(),"下一页")][@href]',
        pageElement: 'css;div#content_left',
        stylish: '.autopagerize_page_info { margin-bottom: 10px; }',
        ipages: [true, 3]
    }, {
        name: 'POCO图片广场',
        url: '^http://photo\\.poco\\.cn/like/.+',
        nextLink: '//a[text()="下一页"]',
        pageElement: '//ul[@class="re clearfix listPic"]',
        exampleUrl: 'http://photo.poco.cn/like/index-upi-p-2-tpl_type-new-channel_id-0.html#list',
    }, {
        name: '贴库',
        url: '^http://www\\.tieku001\\.com/',
        nextLink: '//a[text()="下一页"]',
        pageElement: 'id("content")/div[@class="content_c"]',
        exampleUrl: 'http://www.tieku001.com/206437/944.html',
    }, {
        name: 'w3school.cn',
        url: '^http://www\\.w3school\\.com\\.cn/.*/.*\\.asp',
        nextLink: 'id("bpn")/ul[@class="prenext"]/li[@class="next"]/a',
        pageElement: 'id("maincontent")/div',
        exampleUrl: 'http://www.w3school.com.cn/xpath/xpath_operators.asp',
    }, {
        siteName: '新动漫',
        url: /http:\/\/www\.xindm\.cn\/mh\/.+/i,
        siteExample: 'http://www.xindm.cn/mh/shishangzuiqiangdizi/58784.html',
        preLink: {
            startAfter: '?page=',
            inc: -1,
            min: 1,
        },
        nextLink: {
            startAfter: '?page=',
            mFails: [/http:\/\/www\.xindm\.cn\/mh\/.+\.html/i, '?page=1'],
            inc: 1,
            isLast: function(doc, win, lhref) {
                var pageLink = doc.querySelector('.pageLink');
                if (pageLink) {
                    if (pageLink.selectedIndex == pageLink.options.length - 1) return true;
                };
            },
        },
        autopager: {
            pageElement: '//div[@class="mh_box"]',
            useiframe: true,
        }
    }, {
        name: '宅男女神',
        url: '^http://www\\.zngirls\\.com/g/.*/',
        nextLink: '//a[text()="下一页"]',
        pageElement: '//ul[@id="hgallery"]',
        ipages: [true, 15],
        exampleUrl: 'http://www.zngirls.com/g/16129/',
    }, {
        name: 'MyGirl美媛馆 No.179 熊吖BOBO - MyGirl - 蕾丝猫',
        url: '^http://www\\.lesmao\\.net/.*\\.html',
        nextLink: '//a[contains(text(), "下一页")]',
        pageElement: '//div[@id="ls-content-pic-post"]/ul',
        exampleUrl: 'http://www.lesmao.net/thread-12586-1-1.html',
        ipages: [true, 15],
    }, {
        name: '美女图片_宅男女神',
        url: '^http://.*\\.zngirls\\.com/.*',
        nextLink: '//a[@class="next"]',
        pageElement: '//div[@class="ck-list-wrap"]',
        exampleUrl: 'http://m.zngirls.com/g/17521/1.html',
        ipages: [true, 15],
    },
];

// 本体に組み込まれている MICROFORMAT を利用するか？
USE_MICROFORMAT = true;
