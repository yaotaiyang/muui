/**
 * Created by yaoxy on 2017/3/20.
 */
(function ($) {
    var hashObj = {};
    muui.hash = {
        hasHash: function (e,url) {
            hashObj = splitHash(url || location.href);
            if (typeof e == 'string' && !!hashObj[e]) {
                return true
            }else if(e instanceof RegExp){
                var res = false;
                for(var key in hashObj){
                    if(key.match(e) && key.match(e)[0]==key){
                        res = true;
                        break;
                    }
                }
                return res;
            } else {
                return false
            }
        }, getHash: function (e) {
            hashObj = splitHash(location.href);
            return hashObj[e]
        }, setHash: function (e, f,url) {
            var curHash=null;
            if(!url){
                curHash = hashObj = splitHash(location.href);
            }else{//url存在表示处理url
                curHash = splitHash(url);
            }
            curHash[e] = (f == undefined ? "" : f);
            addHash(curHash,url);
        }, removeHash: function (e,url) {
            var curHash=null,arrDel=[];
            if(!url){
                curHash = hashObj = splitHash(location.href);
            }else{//url存在表示处理url
                curHash = splitHash(url);
            }
            if(typeof e == "string"){
                delete (curHash[e]);
            }else if(e instanceof RegExp){
                for(var key in curHash){
                    if(key.match(e) && key.match(e)[0]==key){
                        arrDel.push({name:key,value:curHash[key]});
                        delete curHash[key];
                    }
                }
            }
            return addHash(curHash,url,arrDel);
        }, clearHash: function (url) {
            if(url){
                if(url.indexOf("#")==-1){
                    return url;
                }else{
                    return url.substr(0,url.indexOf("#"));
                }
            }else{
                location.hash = "";
                hashObj = {}
            }
        },
        getHashObj:function(str){
            return splitHash(str||location.href);
        }
    };
    function splitHash(url) {
        var ind = url.indexOf("#");
        if(ind==-1){
            return {};
        }
        var arr_part = url.substr(ind+1,url.length).split("|").filter(function (part, f) {
            if (!!part) {
                return part
            }
        });
        var resObj = {};
        arr_part.forEach(function (h, g) {
            var f = h.split("=");
            resObj[f[0]] = f[1] || null
        });
        return resObj;
    }
    function addHash(curHash,url,arrDel) {
        var str = "";
        for (var key in curHash) {
            if (!!str) {
                str += "|"
            }
            str += (key + "=" + curHash[key])
        }
        if(url){
            if(url.indexOf("#")!=-1){
                url = url.substr(0,url.indexOf("#"));
            }
            if(str){
                return {url:url+"#"+str,dels:arrDel};
            }else{
                return {url:url,dels:arrDel};
            }
        }else{
            location.hash = str
        }
    }
})($);