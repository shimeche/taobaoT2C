var cookieName = "taobaoconvert_chromeplugs";


function setIco(tab) {
    if (tab.url.indexOf("taobao.com") >= 0) {
        //cheack cookie
        if (getCookie(cookieName) == null) {
            chrome.browserAction.setIcon({ path: "icon.png" });
        } else {
            chrome.browserAction.setIcon({ path: "icon_2.png" });
        }


    } else {
        chrome.browserAction.disable(tab.id);
    }
}




function jump(tab) {

    if (tab.url.indexOf(".m.taobao.com") >= 0) {
        var id = getQueryStringByName(tab.url, "id");
        chrome.tabs.create({ url: "http://item.taobao.com/item.htm?id=" + id, selected: true });
        chrome.tabs.remove(tab.id);
    } else if (tab.url.indexOf(".m.tmall.com") >= 0) {
        var id = new RegExp(/i([0-9]+)/g).exec(tab.url)[1];
        chrome.tabs.create({ url: "http://detail.tmall.com/item.htm?id=" + id, selected: true });
        chrome.tabs.remove(tab.id);
    } else if (tab.url.indexOf("tw.taobao.com") >= 0) {
		// http://tw.taobao.com/item/42758807102.htm
        var id = tab.url.match("[0-9]+")[0];
//         var id = new RegExp(/i([0-9]+)/g).exec(tab.url)[1];
		if (id) {
	    	chrome.tabs.create({ url: "http://item.taobao.com/item.htm?id=" + id, selected: true });
        	chrome.tabs.remove(tab.id);
		};
    } else if (tab.url.indexOf("item.taobao.com") >= 0) {
		// http://tw.taobao.com/item/42758807102.htm
//         var id = tab.url.match("[0-9]+")[0];
        var id = getQueryStringByName(tab.url, "id");
//         var id = new RegExp(/i([0-9]+)/g).exec(tab.url)[1];
		if (id) {
	    	chrome.tabs.create({ url: "http://tw.taobao.com/item/" + id +".htm", selected: true });
        	chrome.tabs.remove(tab.id);
		};
    }


}


// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status == "loading") {
//         jump(tab);
//         setIco(tab);
//     }
// });


chrome.browserAction.onClicked.addListener(function (tab) {
    jump(tab);
    setIco(tab);
});




function getQueryStringByName(url, name) {
    var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}




function SetCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;


}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}