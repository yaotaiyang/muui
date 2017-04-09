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
        bounce:false,//是否有回弹
        axis:"y",//默认纵向滑动,x为横向滑动
        position:0,
        inertia:200  //惯性大小
    }, options);
    var $this = $(this),$scroll=$($this.children()[0]);
    var start=null,moveEnd,trans= 0,startTime,scrollRange,range;
    var event = muui.scrollEvent;
    getRange();
    $(window).on("resize",getRange);
    $this.on(event.start,funcStart);
    $this.on(event.move,funcMove);
    $this.on(event.end,funcEnd);
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
        if(Math.abs(vv)>0.3){//惯性滚动
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
        return $scroll.one("webkitTransitionEnd",function(){
            callback && callback.call($this);
        });
    };
};