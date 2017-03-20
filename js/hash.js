/**
 * Created by yaoxy on 2017/3/20.
 */
(function ($) {
    var hashObj = {};
    $.hash = function(url){
        var me = this;
        me.url = url||location.href;
        this.hasHash = function (str) {
            if (!!hashObj[str]) {
                return true
            } else {
                return false
            }
        };
        this.getHash = function (str) {
            splitHash(me.url);
            return hashObj[str]
        };
        this.setHash = function (key, value) {
            $.hash.getHash();
            hashObj[key] = (value == undefined ? "" : value);
            addHash()
        };
        this.removeHash  = function (e) {
            delete (hashObj[e]);
            addHash()
        };
        this.clearHash = function () {
            location.hash = "";
            hashObj = {}
        };
    };
    function splitHash() {
        var arr_part = location.hash.substr(1).split("|").filter(function (part, f) {
            if (!!part) {
                return part
            }
        });
        hashObj = {};
        arr_part.forEach(function (h, g) {
            var f = h.split("=");
            hashObj[f[0]] = f[1] || null
        })
    }

    function addHash() {
        var str = "";
        for (var key in hashObj) {
            if (!!str) {
                str += "|"
            }
            str += (key + "=" + hashObj[key])
        }
        location.hash = str
    }
})($);