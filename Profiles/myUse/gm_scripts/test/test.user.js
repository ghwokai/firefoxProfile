// ==UserScript==
// @name        lesmao create links
// @namespace   lesmao create links
// @include     http://www.lesmao.net/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzklEQVQ4jVWSXUhUCRiGnzNnzjnjoKOTVs7oqK1NTBpYCWvtlsGyFdUWRbYXUREVXoRMP1AXQRTsbix1ERVRUovLslA0JNF/tNEGEvRD0UWLmE0/VmZ/0s+kg+XbRUc5+8J3930P7/d9LwCSDL5qDPAr0Az8DaSA/cASIOz2ICk4PCMpnMlkosCPQBt+/4AZzJM1YpSckgrlVFYpMCbxMZiYdNIeW10lKSRpmaRSSQaSfNFodCbQ5c8rkFVULHt0iZxIbBiQX/eDwvVzVTR/2aVNB1vi/wMAASCFYcgw/cIwBAyXzzBkBwIybEfWyOgnM5i3WpLlWZsE8Mg7BCiUG1ROwFFhQUhVY8s1Ij9XAdsS0NrY2BiUVDgEmVIRK30dcBwVhUNaNPN7bU2u1J+7t+vogd916q+9+vf4YV1KHdKR5l2qq5/x4LtZ8yZIqpHkJxwOT9u+OdlbEYuqqjKmk4d26Mr5lNrv3tSHnrQG33cr2/tE6fv/6eLFc2ratuMekfHleFTTtGZF99TaGuUGc7Rva1LXT6X09GGnPr5/q65rV/Wmo10D2azednZr/aqmNiDPCygcH//mWsOC2TJDBZpeW6s7e5r1+fF9ferL6MYv+5U+fUGS1PHPrcHKSHkGWAv4hgCm6fMdW9owX/HEuEFAMxLVajvSrL7nHcp2dmqg56l6Xz7ThqZkGngOvAHmeV0cLi0p7ppVP6UV6AdUHa/Q7TMtyj6+3d9x8/KLnxcvlGVZ7UCL+6nLQCEAPsv+A9PfZzrOAuA3IFsWLb6avnF+i/pf/jR54sT1wCDwDNgIfADeAXMALDsSO2GPLpEdLd/pBms58K3H4UqgHTjqWu9xgUmACIZxxzD9wjTPugAkjZJU7YalACgGcoAyYC+wDogDNAAZ4BXQCuS7gJikOkmOpDJJQ1c3vB8AmOruvRvYBwRdgCHJ51bIm32vvgAKMW4f4GmDZAAAAABJRU5ErkJggg==
// @version     0.1.1
// @grant       none
// ==/UserScript==
var createLinksBtn = document.createElement("button");
createLinksBtn.type = "button";
createLinksBtn.id = "create2";

var current_href = location.href
var nos =current_href.substring(29,34);

var createLinksBtn_text = document.createTextNode("生成链接");
createLinksBtn.appendChild(createLinksBtn_text);

var place = document.getElementsByClassName("ls-content-down-data");
place[0].appendChild(createLinksBtn);
var myNodes = place[0].childNodes;
var tempText = place[0].innerText;
var vNo = tempText.substring(14,17);
var pages = Math.ceil(Number(vNo)/ 5);

//create linksDiv
var linksDiv = document.createElement("div");
linksDiv.id = "linksDiv";
// linksDiv.style.float = "right";
// linksDiv.style.clear = "both";
linksDiv.style.backgroundColor = "#000000";
linksDiv.innerText = "links here";
insertAfter(linksDiv,createLinksBtn);

var listPlace = document.getElementById("linksDiv");

//按钮绑定
var eCreate = document.getElementById("create2");
eCreate.onclick = function () {
    clearAllNode(listPlace);
    //cPages();
    //preLink();
    makeList();
};


function getElementsByClassName(fatherId,tagName,className){
    node = fatherId&&document.getElementById(fatherId) || document;
    tagName = tagName || "*";
    className = className.split(" ");
    var classNameLength = className.length;
    for(var i=0,j=classNameLength;i<j;i++){
        //创建匹配类名的正则
        className[i]= new RegExp("(^|\\s)" + className[i].replace(/\-/g, "\\-") + "(\\s|$)");
    }
    var elements = node.getElementsByTagName(tagName);
    var result = [];
    for(var i=0,j=elements.length,k=0;i<j;i++){//缓存length属性
        var element = elements[i];
        while(className[k++].test(element.className)){//优化循环
            if(k === classNameLength){
                result[result.length] = element;
                break;
            }
        }
        k = 0;
    }
    return result;
}

//insertAter()
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement.parentNode) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

//ul-li-a
function makeList() {
    makeUl = document.createElement("ul");
    if (pages <= 5) return false;
    for (var i = 6;i < pages + 1 ;i++) {
        var linksString = "http://www.lesmao.net/thread-" + nos + "-" + i + "-1.html";
        var makeLi = document.createElement("li");
        var makeA = document.createElement("a");
        makeA.setAttribute("target","_blank");
        var makeA_text = document.createTextNode(linksString);
        makeA.href = linksString;
        makeA.appendChild(makeA_text);
        makeLi.appendChild(makeA);
        makeUl.appendChild(makeLi);
    }
    listPlace.appendChild(makeUl);
}
function clearAllNode(parentNode){
    while (parentNode.firstChild) {
        var oldNode = parentNode.removeChild(parentNode.firstChild);
        //alert("oldNode:" + oldNode);
        oldNode = null;
    }
}


