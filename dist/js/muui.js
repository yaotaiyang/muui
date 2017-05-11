/*!
muui样式库:https://github.com/yaotaiyang/muui
*/
/**
 * Created by yaoxy on 2017/3/17.
 */
(function(){
    window.muui= window.muui||{};
    muui.guid=function(){//生产guid
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
;muui.actionsheet = function(option){
    var source = '<ul class="muui-actionsheet-ul">\
                    {{each list as item key}}\
                    <li muui-ac="click-active" {{each item as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="muui-btn muui-border muui-ui-li">{{item.text}}</li>\
                    {{/each}}\
                    </ul>\
                    <ul class="muui-actionsheet-ul">\
                        <li data-dismiss="muui-modal" muui-ac="click-active" class="muui-btn btn-li border-1px">取消</li>\
                    </ul>';
    var opt = $.extend({
        list:[{id:"btn-1",text:'btn1'},{id:"btn-2",text:'btn2'}],
    },option);
    var render = template.compile(source),$html = $(render(opt));
    return muui.pickermodal($html);
};
/**
 * Created by yaoxy on 2017/3/20.
 */
$(function(){
    var idarr = [], arr_acdom = [];
    $("body").delegate("*[muui-ac]", "touchstart", function (e) {
        var me = $(this), klass = me.attr("muui-ac");
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
                arr_acdom[i].removeClass(arr_acdom[i].attr("muui-ac"));
            }
            arr_acdom = [];
        }, 300);
    });
    $("body").delegate("*[muui-ac]", "tap", function (e) {
        var me = $(this), klass = me.attr("muui-ac");
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
 * Created by yaoxy on 2017/3/23.
 */
muui.alert=function(option){
    if(typeof option == "string"){
        option = {content:option};
    }
    option = $.extend({
        "btns":[{text:"确定",type:"default",close:"1"}]
    },option);
    return muui.dialog(option);
}
/**
 * Created by yaoxy on 2017/3/23.
 */
muui.confirm=function(option){
    if(typeof option == "string"){
        option = {content:option};
    }
    option = $.extend({
       "title":"确定"
    },option);
    return muui.dialog(option);
}
/**
 * Created by yaoxy on 2017/3/22.
 */
;muui.dialog = function(option){
    var source = '<div class="muui-modal muui-dialog muui-fixed-center fade" style="width:{{width}}">\
        <div class="modal-header">\
            <h3>{{title}}</h3>\
        </div>\
            <div class="modal-body">\
                <p>{{content}}</p>\
            </div>\
        <div class="modal-footer">\
        {{each btns as btn key}}\
            <div {{each btn as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="muui-btn muui-border" muui-ac="click-active" {{if btn.close}}data-dismiss="muui-modal"{{/if}}>{{btn.text}}</div>\
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
/**
 * Created by yaoxy on 2017/3/22.
 */
;muui.loading = function(option){
    var source = '<div class="muui-modal muui-fixed-center muui-loading" style="width:{{width}}">\
            <div class="modal-body align-center">\
                <i class="muui-loading-icon"></i>\
                <p>{{text}}</p>\
            </div>\
    </div>';
    if(typeof option =="string"){//如果是字符串
        option = {text:option};
    }
    var opt = $.extend({
        "container":"body",
        "width":"auto",
        "text":"加载中…",
        "backdrop":"static",
        "time":"",
        "history":false//不接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    $html.data("muui-modal").$backdrop.css({"background-color":"transparent"});
    if(opt.time){
        setTimeout(function(){//关闭浮层
            $html.muuiModal("hide");
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
        if(muui.hash.hasHash(/muuimodal.+/)){//如果存在以前actionsheet的hash,都去掉
            var resObj = muui.hash.removeHash(/muuimodal.+/,location.href);
            if(resObj.dels && resObj.dels.length){
                history.go(-resObj.dels.length);//历史回退
            }
        }
    }
});
$.fn.destory = function(){
    var $html = $(this);
    $html.muuiModal('hide');
};
$.fn.mmodal = function(option){
    var $html = $(this),guid= muui.guid(),modal_id = "muuimodal-"+guid;
    var opt = $.extend({
        history:true,
        container:"body"
    },option);
    $(opt.container).append($html);
    $html.data("guid", guid);
    if(opt.history){
        muui.hash.setHash(modal_id,1);
    }
    $html.muuiModal(opt);
    var $backdrop = $html.data("muui-modal").$backdrop;
    $backdrop && $backdrop.on("touchmove",function(e){e.preventDefault();e.stopPropagation()});
    $(window).on("hashchange",function(e){
        if(!opt.history) return;
        var newUrl = e.newURL,oldUrl = e.oldURL;
        if(newUrl && oldUrl && muui.hash.getHashObj(oldUrl)[modal_id]==1&&muui.hash.getHashObj(newUrl)[modal_id]==undefined){//老地址有hash,新地址没有hash,表示返回了
            $html.data('hide-type','navigate-back').muuiModal('hide');
        }else{
            $html.data('hide-type','normal');
        }
    });
    $html.on("hidden",function(){
        if($html.data("hide-type")=="navigate-back"){
            muui.hash.removeHash(modal_id);
        }else if(opt.history){
            history.back();
        }
        $html.remove();
    });
    $html.$body = $html.find(".modal-body");
    $html.$header = $html.find(".modal-header");
    $html.$footer = $html.find(".modal-footer");
    return $html;
}
!function ($) {
    var Modal = function (element, options) {
        this.options = options
        this.$element = $(element)
            .delegate('[data-dismiss="muui-modal"]', 'click.dismiss.muui-modal', $.proxy(this.hide, this))
        this.options.remote && this.$element.find('.muui-modal-body').load(this.options.remote)
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

            $(document).off('focusin.muui-modal')

            this.$element
                .removeClass('in')
                .attr('aria-hidden', true)

            $.support.transition && this.$element.hasClass('fade') ?
                this.hideWithTransition() :
                this.hideModal()
        }

        , enforceFocus: function () {
            var that = this
            $(document).on('focusin.muui-modal', function (e) {
                if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                    that.$element.focus()
                }
            })
        }

        , escape: function () {
            var that = this
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.muui-modal', function ( e ) {
                    e.which == 27 && that.hide()
                })
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.muui-modal')
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

                this.$backdrop = $('<div class="muui-modal-backdrop ' + animate + '" />')
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

    var old = $.fn.muuiModal

    $.fn.muuiModal = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('muui-modal')
                , options = $.extend({}, $.fn.muuiModal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('muui-modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.muuiModal.defaults = {
        backdrop: true
        , keyboard: true
        , show: true
    }

    $.fn.muuiModal.Constructor = Modal;
    /* MODAL NO CONFLICT
     * ================= */
    $.fn.muuiModal.noConflict = function () {
        $.fn.muuiModal = old
        return this
    }
    /* MODAL DATA-API
     * ============== */

    $(document).on('click.muui-modal.data-api', '[data-toggle="muui-modal"]', function (e) {
        var $this = $(this)
            , href = $this.attr('href')
            , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
            , option = $target.data('muui-modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

        e.preventDefault()

        $target
            .muuiModal(option)
            .one('hide', function () {
                $this.focus()
            })
    })
}($);

/**
 * Created by yaoxy on 2017/4/16.
 */
muui.picker=function(option){
    var opt = $.extend({
        container:"body",
        html:"<div>html参数</div>",
        beforerender:function(){},
        history:true//默认hash处理,接管浏览器返回
    },option);
    var source = '<div class="muui-modal fade {{classname}}">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body"></div>\
            </div>\
        </div>\
    </div>';
    var render = template.compile(source),$wrap = $("<div class='picker-wrap'></div>"),$html = $(render(opt));
    opt.beforerender.call($html);
    $wrap.append(opt.html);
    $html.find(".modal-body").html($wrap);
    $html.on("shown",function(){
        $html.find(".modal-dialog").mscroll();
    });
    $html.mmodal(opt);
    return $html;
}
/**
 * Created by yaoxy on 2017/3/25.
 *
 */
muui.pickermodal=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-modal"
    },option);
    return muui.picker(opt);
}
/**
 * Created by yaoxy on 2017/3/22.
 * 滑动选择页
 */
muui.pickerpage=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-page",
        "backdrop":0
    },option);
   return muui.picker(opt);
}

/**
 * Created by yaoxy on 2017/4/16.
 */
muui.pickersidebar=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-sidebar",
        position:"left",
        beforerender:function(){
            $(this).addClass("position-"+opt.position);
        }
    },option);
    return muui.picker(opt);
}
/**
 * Created by yaoxy on 2017/3/25.
 */
$.fn.refreshList = function(opt){
    var opt = $.extend({
        "scrollWrap":window,//滚动容器
        "pullRefresh":1,
        "readyRefresh":function(){}, //提示松开刷新
        "resetRefresh":function(){}, //上滑取消刷新
        "refresh":function(){}, //开始刷新
        "addData":function(){}, //加载更多
        "topHeight":48 //下拉刷新顶部dom高度
    },opt);
    var $tDom = $('<div class="muui-list-pull" id="muui-list-pull"><span class="default"><i class="muui-font">&#xe796;</i><span class="text">继续下拉刷新…</span></span><span class="ready"><i class="muui-font">&#xe795;</i><span class="text">松开立即更新…</span></span></div>');
    $tDom.css({height:opt.topHeight,'line-height':opt.topHeight+'px',top:-opt.topHeight});
    var $loadmore = $('<div class="muui-list-loadmore align-center"><i class="muui-loading-icon"></i><span class="text">加载中…</span></div>');
    var listWrap = $(this);
    listWrap.after($loadmore);
    listWrap.on("refresh",opt.refresh);
    listWrap.on("addData",opt.addData);
    var tDom =$tDom, bDom = $loadmore,scrollWrap= $(opt.scrollWrap),startY = 0,transY= 0,canMove=0,canReset = 0,moveMaxY= 0,turned=0,ids = [];
    if(opt.scrollWrap == window){
        scrollWrap = $(window.document.body);
    }
    if(opt.pullRefresh){
        $("body").append($tDom);
        listWrap.on("touchstart",ontouchstart).on("touchmove",ontouchmove).on("touchend",ontouchend);
    }
    $(opt.scrollWrap).on("scroll",onscroll).trigger("scroll");
    return listWrap;
    function ontouchstart(e){
        startY = e.touches[0].pageY;
        transY = canReset = moveMaxY = turned= canMove  = 0;
        var sTop = scrollWrap.scrollTop();
        if(sTop<=2){
            canMove = 1;//是否启用显示下拉刷新
            tDom.css("visibility","visible");
        }else{
            tDom.css("visibility","hidden");
        }
        setTransition(0);
    }
    function ontouchmove(e){
        var cur_y = e.touches[0].pageY;
        if(canMove && cur_y> startY){
            transY = (cur_y-startY)/2.5;
            e.preventDefault();
            if(cur_y > moveMaxY){
                moveMaxY = cur_y;
            }
            if(transY >= opt.topHeight) {
                if (cur_y > moveMaxY) {
                    transY = opt.topHeight;
                } else{//滑动超过最大值，反向滑动的时候，需要往回挪动，如果不处理，回滑动到最大限定距离的时候，dom不会向上移动。
                    turned = 1;
                    transY = opt.topHeight + cur_y - moveMaxY;
                }
            }else if(turned == 1){//转向重置startY;返回不渲染
                startY = startY +  opt.topHeight - moveMaxY ;
                turned = 0;
                return;
            }
            if(transY >= opt.topHeight-4 && canReset == 0){
                opt.readyRefresh.call(listWrap);
                $tDom.addClass("ready");
                canReset = 1;
            }else if(transY < opt.topHeight-4 && canReset==1){//反向滑动4px才算取消
                canReset = 0;
                $tDom.removeClass("ready");
                opt.resetRefresh.call(listWrap);
            }
            trans(tDom);
        }
    }
    function ontouchend(e){
        setTransition(300);
        if(transY >= opt.topHeight-4 && canMove){
            $tDom.removeClass("ready");
            opt.refresh.call(listWrap);
        }
        transY = 0;
        trans(tDom);
    }
    function trans(dom){
        if(transY > opt.topHeight) transY = opt.topHeight;
        $(dom).css({"-webkit-transform":"translate3d(0,"+transY+"px,0)"});
    }
    function setTransition(time){
        return tDom.css({
            '-webkit-transition': 'transform '+time+'ms ease-out',
            'transition': 'transform '+time+'ms ease-out'
        });
    };
    function onscroll(){
        for(var i=0;i<ids.length;i++){
            clearTimeout(ids[i]);
        }
        ids.push(setTimeout(getData,100));
    }
    function getData(){
        var wHeight = $(window).height();
        var pos = bDom[0].getBoundingClientRect().top;
        if(pos >0 && pos < wHeight){
            opt.addData.call(listWrap);
        }
        ids = [];
    }
}
/**
 * Created by yaoxy on 2017/3/23.
 */
;(function(){
    var isSupportTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
    muui.scrollEvent = {
        "start":isSupportTouch?"touchstart":"mousedown",
        "move":isSupportTouch?"touchmove":"mousemove",
        "end":isSupportTouch?"touchend":"mouseup mouseleave"
    };
})();
$.fn.mscroll = function (options) {
    var opt = $.extend({
        animationTime: 400, //惯性动画时间长度
        onChange:function(){},// onChange回调
        bounce:0,//是否有回弹
        axis:"y",//默认纵向滑动,x为横向滑动
        position:0,
        offset:0,
        inertia:200  //惯性大小
    }, options);
    var $this = $(this),$scroll=$($this.children()[0]);
    var start=null,moveEnd,trans= parseFloat(opt.offset),startTime,scrollRange,range;
    var event = muui.scrollEvent;
    getRange();
    $(window).on("resize",getRange);
    $this.on(event.start,funcStart);
    $this.on(event.move,funcMove);
    $this.on(event.end,funcEnd);
    funcTrans(opt.offset,1);
    function getRange(){
        if(opt.axis == "x"){
            scrollRange = $this[0].scrollWidth;
            range = $this.width();
        }else{
            scrollRange = $this[0].scrollHeight;
            range = $this.height();
        }
    }
    function funcStart(e){
        moveEnd = start = getStartAxis(e);
        startTime = +new Date();
    }
    function funcMove(e){
        if(start===null){return};
        e.preventDefault();
        e.stopPropagation();
        setTransition(0);
        var coordinate = getStartAxis(e);
        trans += coordinate-moveEnd;
        setTranslate(trans);
        moveEnd = coordinate;
    }
    function funcEnd(e){
        if(start===null){return};
        setTransition(opt.animationTime);
        var entTime = + new Date();
        var coordinate = getStartAxis(e),vv = (coordinate-start)/(entTime - startTime);
        if(Math.abs(vv)>0.5){//惯性滚动
            trans += vv*opt.inertia;
        }else{
            opt.onChange.call($this);
        }
        if(trans > 0){
            trans = 0;
        }else if(trans < range - scrollRange){

            trans = range -scrollRange;
        }
        setTranslate(trans,opt.onChange);
        start = null;
    }
    function getStartAxis(e){
        var name = "pageY";
        if(opt.axis == "x"){
            name = "pageX";
        };
        if(e.touches){
            return e.changedTouches[0][name];
        }else{
            return e[name];
        }
    }
    function setTransition(time){
        return $scroll.css({
            '-webkit-transition': 'transform '+time+'ms ease-out',
            'transition': 'transform '+time+'ms ease-out'
        });
    };
    function setTranslate(diff,callback){
        var diff = diff,bouce = 4;
        if(opt.bounce){
            if(diff>0){diff = diff/bouce};
            if(diff < range-scrollRange){diff =range - scrollRange + (diff-(range - scrollRange))/bouce};
        }else{
            if(diff>0){diff = 0};
            if(diff < range-scrollRange){diff = range-scrollRange};
        }
        $scroll.one("webkitTransitionEnd",function(){
            callback && callback.call($this);
        });
        funcTrans(diff);
        return $scroll;
    };
    function funcTrans(diff,check){
        if(check){
            if(diff>0) diff = 0;
            if(diff < range-scrollRange) diff = range - scrollRange;
        }
        if(opt.axis == "x"){
            $scroll.css({
                '-webkit-transform': 'translate3d('+diff+'px, 0, 0)',
                'transform': 'translate3d('+diff+'px, 0, 0)'
            })
        }else{
            $scroll.css({
                '-webkit-transform': 'translate3d(0, '+diff+'px, 0)',
                'transform': 'translate3d(0, '+diff+'px, 0)'
            })
        }
        $this.data("mscroll",{offset:diff});
    }
};
/**
 * Created by yaoxy on 2017/3/24.
 */
$(function(){
    $("body").on("focus",".muui-searchbar .search-input",function(){
        $(this).closest("form").addClass("muui-focus");
    }).on("click",".muui-searchbar .cancel",function(){
        $(this).closest("form").removeClass("muui-focus").find(".search-input").val("");
    });
});
/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(/^$|,+/)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/[\n\r\t\s]+/g," ").replace(/<!--.*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g;e.openTag="{{",e.closeTag="}}";var y=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a,b){a=a.replace(/^\s/,"");var c=a.split(" "),e=c.shift(),f=c.join(" ");switch(e){case"if":a="if("+f+"){";break;case"else":c="if"===c.shift()?" if("+c.join(" ")+")":"",a="}else"+c+"{";break;case"/if":a="}";break;case"each":var g=c[0]||"$data",h=c[1]||"as",i=c[2]||"$value",j=c[3]||"$index",k=i+","+j;"as"!==h&&(g="[]"),a="$each("+g+",function("+k+"){";break;case"/each":a="});";break;case"echo":a="print("+f+");";break;case"print":case"include":a=e+"("+c.join(",")+");";break;default:if(-1!==f.indexOf("|")){var l=b.escape;0===a.indexOf("#")&&(a=a.substr(1),l=!1);for(var m=0,n=a.split("|"),o=n.length,p=l?"$escape":"$string",q=p+"("+n[m++]+")";o>m;m++)q=y(q,n[m]);a="=#"+q}else a=d.helpers[e]?"=#"+e+"("+c.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
/**
 * Created by yaoxy on 2017/3/22.
 */
;muui.toast = function(option){
    var source = '<div class="muui-modal muui-fixed-center muui-toast fade {{position}}" style="width:{{width}}">\
            <div class="modal-body">\
                <p>{{text}}</p>\
            </div>\
    </div>';
    if(typeof option =="string"){//如果是字符串
        option = {text:option};
    }
    var opt = $.extend({
        "container":"body",
        "position":"middle",
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
            $html.muuiModal("hide");
        },opt.time);
    }
    return $html;
};