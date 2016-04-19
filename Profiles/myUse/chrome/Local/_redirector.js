rules = [
/*{
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},*/
//單獨網站

// {
// name: "Google搜索en-US,safe=off",
// from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
// to: "https://www.google.com/$1$2&hl=en-US&safe=off",
// exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
// regex: true
// },
//設置Google搜索語言爲英文，關閉安全搜索功能，使用新版界面
// {
// name: "Google搜索en-US,safe=off,sclient=psy-ab",
// from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
// to: "https://www.google.com/$1$2&hl=en-US&safe=off&sclient=psy-ab",
// exclude: /^https?:\/\/www\.google\.com\/.*\&hl=en-US&safe=off&sclient=psy-ab(.*)/i,
// regex: true
// },
// {
// name: "google.com.hk >> google.com慢速版",
// from: /^https?:\/\/www\.google\.com\.hk\/search\?(.*)/i,
// to: "https://www.google.com/ncr#$1&hl=en-US&safe=off",
// exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
// regex: true
// },
// {
// name: "反Google搜索验证码",
// from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
// to: "https://www.google.com/ncr#$1",
// regex: true
// },
// {
// name: "Google搜圖去跳轉",
// from:/^https?:\/\/www\.google\.com\/(.*)imgurl=(.*)&imgrefurl=(.*)\&h=(.*)/i,
// to: "$3",
// regex: true
// },
// {
// name: "反百度搜索验证码",
// from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
// to: "http://www.baidu.com/s?wd=$1",
// regex: true
// },
// {
// name: "职友集去跳转",
// from:/^http:\/\/www\.jobui\.com\/.*\link=(.*)/i,
// to: "$1",
// regex: true
// },
{
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name: "sourceforge下载 >> ftp镜像站点",
from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
/*to: "ftp://ftp.jaist.ac.jp/pub/sourceforge/$3/$2/$1/$4",*/
to: "http://nchc.dl.sourceforge.net/project/$1/$4",
regex: true
},


// {
// name: "The Economist加/print",
// from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
// to: "http://www.economist.com/$1/$2/print",
// exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
// regex: true
// },
// {
// name: "般若文海article >> books",
// from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
// to: "http://book.bfnn.org/books$1",
// regex: true
// },

//原始大圖系列
/*{
name: "tradingfloor 原始大圖",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: "https://www.tradingfloor.com/images/article/original/$1",
regex: true
},*/

// {
// name: "500px >> 原始大圖",
// from: /^https?:\/\/(.*)\.(edgecastcdn|500px)\.(net|org)\/(.*)\/[\d].jpg(.*)?/i,
// to: "https://$1.$2.$3/$4/2048.jpg",
// exclude: /^https?:\/\/(.*)\.(edgecastcdn|500px)\.(net|org)\/(.*)\/(1|2).jpg(.*)?/i,//排除頭像縮略圖
// regex: true
// },
// {
// //測試：http://i11.topit.me/m/201103/12/12998645416093.jpg, http://f8.topit.me/8/69/94/11889296294ef94698m.jpg
// name: "topit.me >> 原始大圖",
// from: /^https?:\/\/(.*)\.topit\.me\/(.*)?m(.*)?\.jpg$/,
// to: "http://$1.topit.me/$2l$3.jpg",
// regex: true
// },
// {
// name: "designspiration >> 原始大图",
// from: /^https?:\/\/(.*)\.dspnimg\.com\/data\/g\/(.*)g\.jpg+(\/.*)?/i,
// to: "http://$1.dspnimg.com/data/l/$2l.jpg",
// regex: true
// },
{
//http://bbs.kafan.cn/thread-1801036-1-1.html
name: "flickr >> 原始大图",
from: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_[^\._]+)(_[a-z])?(\.jpg)$/,
exclude: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_\w+)_b(\.jpg)$/,
to: "$1_b$3",
regex: true
},
{
name: "twitter.com/widgets.js >> github",
from: /^https?:\/\/platform\.twitter\.com\/widgets.js(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/twitter/widgets.js",
regex: true
},

//Google服務轉國內鏡像
// {
// name: "ajax/fonts >> 360 useso",
// from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
// to: "http://$1.useso.com/$2",
// regex: true
// },
/*{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "ajax/fonts >> 科大博客提供",
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.lug.ustc.edu.cn/$2",
regex: true
},*/
// {
// name: "themes >> 科大博客",
// from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
// to: "http://google-themes.lug.ustc.edu.cn/$1",
// regex: true
// },
// {
// name: "fonts-gstatic >> 科大博客",
// from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
// to: "http://fonts-gstatic.lug.ustc.edu.cn/$1",
// regex: true
// },
// {
// name: "Gravatar头像 >> 多说",
// from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
// to: "http://gravatar.duoshuo.com/avatar/$1",
// regex: true
// },
// {
// name: "Google统计和tag >> mingto.tk",
// from: /^https?:\/\/(.*?)(google-analytics|googletagmanager|googletagservices|googleadservices)\.com\/([\w]+\/)*([\w]+(\.[\w]+)?)/i,
// to: "http://minggo.coding.io/cdn/google/$4",
// regex: true
// },
// {
// name: "apis.google.com/js/api.js和plusone.js重定向",
// from: /^https?:\/\/apis\.google\.com\/js\/(api|plusone).js(.*)/i,
// to: "https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/$1.js",
// regex: true
// },


//百度系
/*{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/link >> share/link",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
to: 'http://pan.baidu.com/share/link$3',
regex: true
},*/
/*{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/album/file >> pcloud/album/file",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
to: 'http://pan.baidu.com/pcloud/album/file$2',
regex: true
},*/
/*{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/share/home >> share/home",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
to: 'http://pan.baidu.com/share/home?$3',
regex: true
},*/
{
name: "百度貼吧|百科 >> 原始大圖",
from: /^http:\/\/(imgsrc|[\w]?\.hiphotos)\.baidu\.com\/(forum|baike)\/[\w].+\/sign=[^\/]+(\/.*).jpg/i,
to: "http://$1.baidu.com/$2/pic/item$3.jpg",
regex: true
},
// 包含手机版界面
// {
// name: "百度随心听音质320",
// from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
// to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
// regex: true
// },
{
    name: "AcFun >> 网页全屏",
    from: /^http:\/\/www\.acfun\.tv\/(a|v)\/a(b|c)([\w]+)(.*)?/i,
    exclude: /acfun\.tv\/(a|v)\/a(b|c).*#fullscreen=1$/i,
    to: "http://www.acfun.tv/$1/a$2$3#fullscreen=1",
    regex: true
},
// ,{
//     name: "tumblr看视频",
//     from: /^https?:\/\/.*\.tumblr\.com\/video_file\/(.*)/i,
//     exclude:/^https?:\/\/www\.tumblr\.com\/video_file\/(.*)/i,
//     to: "https://www.tumblr.com/video_file/$1",
//     regex: true:
// },
{
    name: "wiki繁 >> 简",
    from: /^(https?:\/\/zh\.wikipedia\.org)\/(wiki|zh|zh((?!\-cn)[^\/])+)\/(.*)/i,
    to: "$1/zh-cn/$4",
    regex: true,
},
//{
//    name: "BiliBili",
//    from: /^http:\/\/www\.bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?(.*)?/i,
//    exclude: /bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?#alist$/i,
//    to: "http://www.bilibili.com/video/av$1/$2#alist",
//    regex: true
//},


];
