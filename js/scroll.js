/**
 * Created by yaoxy on 2017/3/23.
 */
$.fn.scroll = function (options) {
    var opt = $.extend({
        animationTime: 400, //惯性动画时间长度
        onChange:function(){},// onChange回调
        bounce:false,//是否有回弹
        position:0,
        inertia:200  //惯性大小
    }, options);
    var $this = $(this),$scroll=$($this.children()[0]),isSupportTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
    var start=null,moveEnd,trans= 0,startTime,scrollHeight = $this[0].scrollHeight,height = $this.height();
    var event ={
        "start":isSupportTouch?"touchstart":"mousedown",
        "move":isSupportTouch?"touchmove":"mousemove",
        "end":isSupportTouch?"touchend":"mouseup mouseleave"
    };
    $(window).on("resize",function(){
        scrollHeight = $this[0].scrollHeight,height = $this.height();
    });
    $this.on(event.start,funcStart);
    $this.on(event.move,funcMove);
    $this.on(event.end,funcEnd);
    function funcStart(e){
        moveEnd = start = getY(e);
        startTime = +new Date();
    }
    function funcMove(e){
        if(start===null){return};
        e.preventDefault();
        e.stopPropagation();
        setTransition(0);
        var curY = getY(e);
        trans += curY-moveEnd;
        setTranslate(trans);
        moveEnd = curY;
    }
    function funcEnd(e){
        if(start===null){return};
        setTransition(opt.animationTime);
        var entTime = + new Date();
        var curY = getY(e),vy = (curY-start)/(entTime - startTime);
        if(Math.abs(vy)>0.3){//惯性滚动
            trans += vy*opt.inertia;
        }else{
            opt.onChange.call($this);
        }
        if(trans > 0){
            trans = 0;
        }else if(trans < height - scrollHeight){
            trans = height -scrollHeight;
        }
        setTranslate(trans,opt.onChange);
        start = null;
    }
    function getY(e){
        if(e.touches){
            return e.changedTouches[0].pageY;
        }else{
            return e.pageY;
        }
    }
    function setTransition(time){
        return $scroll.css({
            '-webkit-transition': 'transform '+time+'ms ease-out',
            'transition': 'transform '+time+'ms ease-out'
        });
    };
    function setTranslate(diff,callback){
        var dy = diff,bouce = 4;
        if(opt.bounce){
            if(dy>0){dy = dy/bouce};
            if(dy < height-scrollHeight){dy =height - scrollHeight + (dy-(height - scrollHeight))/bouce};
        }else{
            if(dy>0){dy = 0};
            if(dy < height-scrollHeight){dy = height-scrollHeight};
        }
        return $scroll.css({
            '-webkit-transform': 'translate3d(0, '+dy+'px, 0)',
            'transform': 'translate3d(0, '+dy+'px, 0)'
        }).one("webkitTransitionEnd",function(){
            callback && callback.call($this);
        });
    };
};