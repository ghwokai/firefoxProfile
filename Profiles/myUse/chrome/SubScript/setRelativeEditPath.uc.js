
//2015.04.25 Cache相對位置
//2015.03.29 Software分離，相應Path修改
//2015.03.06 移动文件夾
//2014.08.27 添加油猴Greasemonkey外部编辑器
location == 'chrome://browser/content/browser.xul' && (function(){

    // var PATH1 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\Notepad2\\Notepad2.exe";
    var PATH1 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\..\\..\\..\\..\\SublimeText3\\sublime_text.exe";
    var PATH2 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\..\\FX-Cache";

    var handleRelativePath = function (path) {
        if (path) {
        path = path.replace(/\//g, '\\').toLocaleLowerCase();
        var ProfD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties)
                .get("ProfD", Ci.nsILocalFile).path;
        if (/^(\\)/.test(path)) {
            return ProfD + path;
        } else {
            return path;
            }
        }
    };

//Firefox自带全局编辑器和Greasemonkey編輯器
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH1));
    if (file.exists()) {
        gPrefService.setCharPref('view_source.editor.path', file.path);
        gPrefService.setCharPref('extensions.greasemonkey.editor', file.path);
    }


//Cache位置
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH2));
    if (file.exists()) {
        gPrefService.setCharPref('browser.cache.disk.parent_directory', file.path);
        gPrefService.setCharPref('browser.cache.offline.parent_directory', file.path);
    }

})()
