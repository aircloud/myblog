function IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function is_mobile() {
    var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    var u = navigator.userAgent;
    if (null == u) {
        return true;
    }
    var result = regex_match.exec(u);

    if (null == result) {
        return false
    } else {
        return true
    }
}
if(is_mobile()&&(window.location.pathname.indexOf("index.html")>0)){
    location.assign("mobile2.html");
}
else if(!is_mobile()&&(window.location.pathname.indexOf("mobile2.html")>0)){
    location.assign("index.html");
}


// if((window.innerWidth<1000)&&(window.location.pathname.indexOf("index.html")>0)){
//   location.assign("mobile2.html");
// }

// if((window.innerWidth>=1000)&&(window.location.pathname.indexOf("mobile2.html")>0)){
//   location.assign("index.html");
// }
