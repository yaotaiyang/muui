/**
 * Created by yaoxy on 2017/3/17.
 */
(function(){
    window.wuui= window.wuui||{};
    $.guid=function(){//生产guid
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
    var vendors = { Webkit: 'webkit', Moz: '', O: 'o' },eventPrefix="",testEl = document.createElement('div');
    $.each(vendors, function(vendor, event){
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            eventPrefix = event;
        }
    });
    $.support={
        "transition":{"end":eventPrefix+"TransitionEnd"}
    };
})($);
/**
 * Created by yaoxy on 2017/3/20.
 * 按钮组建底部弹出按钮
 */
;wuui.actionsheet = function(option){
    var source = '<div class="modal wuui-actionsheet fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                    <ul class="wuui-actionsheet-ul">\
                    \{{each list as item key}}\
                    <li data-ac="click-active" {{each item as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="wuui-border wuui-ui-li">{{item.text}}</li>\
                    {{/each}}\
                    </ul>\
                    <ul class="wuui-actionsheet-ul">\
                        <li data-dismiss="modal" data-ac="click-active" class="btn-li border-1px">取消</li>\
                    </ul>\
                </div>\
            </div>\
        </div>\
    </div>';
    var opt = $.extend({
        list:[],
        container:"body",
        history:true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render({list:opt.list}));
    $html.mmodal(opt);
    return $html;
};
/**
 * Created by yaoxy on 2017/3/20.
 */
$(function(){
    var idarr = [], arr_acdom = [];
    $("body").delegate("*[data-ac]", "touchstart", function (e) {
        var me = $(this), klass = me.data("ac");
        idarr.push(setTimeout(function () {
            me.addClass(klass);
            arr_acdom.push(me);
            me.trigger("click-active")
        }, 80));
        setTimeout(function () {
            me.removeClass(klass)
        }, 300);
    });
    $("body").on("touchmove touchend", function () {
        cleardd();
        setTimeout(function () {
            for (var i = 0; i < arr_acdom.length; i++) {
                arr_acdom[i].removeClass(arr_acdom[i].data("ac"));
            }
            arr_acdom = [];
        }, 300);
    });
    $("body").delegate("*[data-ac]", "tap", function (e) {
        var me = $(this), klass = me.data("ac");
        me.addClass(klass);
        me.trigger("click-active");
        setTimeout(function () {
            me.removeClass(klass)
        }, 300);
    });
    function cleardd() {
        for (var i = 0; i < idarr.length; i++) {
            clearTimeout(idarr[i]);
        }
        idarr = [];
    }
});
/**
 * Created by yaoxy on 2017/3/22.
 */
;wuui.dialog = function(option){
    var source = '<div class="modal wuui-dialog wuui-fixed-center fade" style="width:{{width}}">\
        <div class="modal-header">\
            <h3>{{title}}</h3>\
        </div>\
            <div class="modal-body">\
                <p>{{content}}</p>\
            </div>\
        <div class="modal-footer">\
        {{each btns as btn key}}\
            <div {{each btn as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="btn wuui-border" data-ac="click-active" {{if btn.close}}data-dismiss="modal"{{/if}}>{{btn.text}}</div>\
        {{/each}}\
        </div>\
    </div>';
    var opt = $.extend({
        "container":"body",
        "width":"80%",
        "title":"提醒",
        "content":"是否确认该操作",
        "btns":[{text:"取消",type:"default",close:"1"},{text:"确定",type:"primary"}],
        "backdrop":"static",
        "history":true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    return $html;
};
/**
 * Created by yaoxy on 2017/3/20.
 */
(function ($) {
    var hashObj = {};
    $.Hash = {
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
/**
 * Created by yaoxy on 2017/3/22.
 */
;wuui.loading = function(option){
    var source = '<div class="modal wuui-fixed-center wuui-loading fade" style="width:{{width}}">\
            <div class="modal-body">\
                <div class="align-center">\
                <i class="wuui-loading-icon"></i>\
                <p>{{text}}</p>\
                </div>\
            </div>\
    </div>';
    if(typeof option =="string"){//如果是字符串
        option = {text:option};
    }
    var opt = $.extend({
        "container":"body",
        "width":"auto",
        "text":"加载中…",
        "backdrop":"",
        "time":"",
        "history":false//不接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    if(opt.time){
        setTimeout(function(){//关闭浮层
            $html.modal("hide");
        },opt.time);
    }
    return $html;
};
/**
 * Created by yaoxy on 2017/3/22.
 * 对modal进行封装,通用处理返回截取问题
 */
$(window).on("pageshow",function(e){//公共处理出现modal后刷新的返回问题
    if(window.performance&&window.performance.navigation&&window.performance.navigation.type==1){ //刷新
        if($.Hash.hasHash(/wuuimodal.+/)){//如果存在以前actionsheet的hash,都去掉
            var resObj = $.Hash.removeHash(/wuuimodal.+/,location.href);
            if(resObj.dels && resObj.dels.length){
                history.go(-resObj.dels.length);//历史回退
            }
        }
    }
});
$.fn.mmodal = function(option){
    var $html = $(this),guid= $.guid(),modal_id = "wuuimodal-"+guid;
    var opt = $.extend({
        history:true,
        container:"body"
    },option);
    $(opt.container).append($html);
    $html.data("guid", guid);
    if(opt.history){
        $.Hash.setHash(modal_id,1);
    }
    $html.modal(opt);
    $(window).on("hashchange",function(e){
        if(!opt.history) return;
        var newUrl = e.newURL,oldUrl = e.oldURL;
        if(newUrl && oldUrl && $.Hash.getHashObj(oldUrl)[modal_id]==1&&$.Hash.getHashObj(newUrl)[modal_id]==undefined){//老地址有hash,新地址没有hash,表示返回了
            $html.data('hide-type','navigate-back').modal('hide');
        }else{
            $html.data('hide-type','normal');
        }
    });
    $html.on("hidden",function(){
        if($html.data("hide-type")=="navigate-back"){
            $.Hash.removeHash(modal_id);
        }else{
            if(opt.history){
                history.back();
            }
            $.Hash.removeHash(modal_id);
        }
        $html.remove();
    });
    return $html;
}
/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function ($) {

    "use strict"; // jshint ;_;


    /* MODAL CLASS DEFINITION
     * ====================== */

    var Modal = function (element, options) {
        this.options = options
        this.$element = $(element)
            .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
        this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
    }

    Modal.prototype = {

        constructor: Modal

        , toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']()
        }

        , show: function () {
            var that = this
                , e = $.Event('show')

            this.$element.trigger(e)

            if (this.isShown || e.isDefaultPrevented()) return

            this.isShown = true

            this.escape()

            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade')

                if (!that.$element.parent().length) {
                    that.$element.appendTo(document.body) //don't move modals dom position
                }

                that.$element.show()

                if (transition) {
                    that.$element[0].offsetWidth // force reflow
                }

                that.$element
                    .addClass('in')
                    .attr('aria-hidden', false)

                that.enforceFocus()

                transition ?
                    that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
                    that.$element.focus().trigger('shown')

            })
        }

        , hide: function (e) {
            e && e.preventDefault()

            var that = this

            e = $.Event('hide')

            this.$element.trigger(e)

            if (!this.isShown || e.isDefaultPrevented()) return

            this.isShown = false

            this.escape()

            $(document).off('focusin.modal')

            this.$element
                .removeClass('in')
                .attr('aria-hidden', true)

            $.support.transition && this.$element.hasClass('fade') ?
                this.hideWithTransition() :
                this.hideModal()
        }

        , enforceFocus: function () {
            var that = this
            $(document).on('focusin.modal', function (e) {
                if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                    that.$element.focus()
                }
            })
        }

        , escape: function () {
            var that = this
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.modal', function ( e ) {
                    e.which == 27 && that.hide()
                })
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal')
            }
        }

        , hideWithTransition: function () {
            var that = this
                , timeout = setTimeout(function () {
                that.$element.off($.support.transition.end)
                that.hideModal()
            }, 500)

            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout)
                that.hideModal()
            })
        }

        , hideModal: function () {
            var that = this
            this.$element.hide()
            this.backdrop(function () {
                that.removeBackdrop()
                that.$element.trigger('hidden')
            })
        }

        , removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove()
            this.$backdrop = null
        }

        , backdrop: function (callback) {
            var that = this
                , animate = this.$element.hasClass('fade') ? 'fade' : ''

            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate

                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                    .appendTo(document.body)

                this.$backdrop.click(
                    this.options.backdrop == 'static' ?
                        $.proxy(this.$element[0].focus, this.$element[0])
                        : $.proxy(this.hide, this)
                )

                if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

                this.$backdrop.addClass('in')

                if (!callback) return

                doAnimate ?
                    this.$backdrop.one($.support.transition.end, callback) :
                    callback()

            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in')

                $.support.transition && this.$element.hasClass('fade')?
                    this.$backdrop.one($.support.transition.end, callback) :
                    callback()

            } else if (callback) {
                callback()
            }
        }
    }


    /* MODAL PLUGIN DEFINITION
     * ======================= */

    var old = $.fn.modal

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('modal')
                , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.modal.defaults = {
        backdrop: true
        , keyboard: true
        , show: true
    }

    $.fn.modal.Constructor = Modal


    /* MODAL NO CONFLICT
     * ================= */

    $.fn.modal.noConflict = function () {
        $.fn.modal = old
        return this
    }


    /* MODAL DATA-API
     * ============== */

    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this)
            , href = $this.attr('href')
            , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
            , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

        e.preventDefault()

        $target
            .modal(option)
            .one('hide', function () {
                $this.focus()
            })
    })
}($);

/**
 * Created by yaoxy on 2017/3/22.
 * 滑动选择页
 */
wuui.pickerpage=function(option){
    var opt = $.extend({},option);
    var source = '<div class="modal wuui-pickerpage fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试1<br>\
                   单页滑动测试2<br>\
                   单页滑动测试3<br>\
                   单页滑动测试4<br>\
                   单页滑动测试5<br>\
                   单页滑动测试6<br>\
                </div>\
            </div>\
        </div>\
    </div>';
    var opt = $.extend({
        container:"body",
        "backdrop":false,
        history:true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render({list:opt.list}));
    $html.mmodal(opt);
    return $html;
}

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
/**
 * Created by yaoxy on 2017/3/22.
 */
;wuui.toast = function(option){
    var source = '<div class="modal wuui-fixed-center wuui-toast fade" style="width:{{width}}">\
            <div class="modal-body">\
                <p>{{text}}</p>\
            </div>\
    </div>';
    if(typeof option =="string"){//如果是字符串
        option = {text:option};
    }
    var opt = $.extend({
        "container":"body",
        "width":"auto",
        "text":"toast提示!",
        "backdrop":"",
        "time":1500,
        "history":false//不接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    if(opt.time){
        setTimeout(function(){//关闭浮层
            $html.modal("hide");
        },opt.time);
    }
    return $html;
};