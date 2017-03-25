/**
 * Created by yaoxy on 2017/3/25.
 */
$.fn.refreshList = function(opt){
    var opt = $.extend({
        "scrollWrap":window,//滚动容器
        "readyRefresh":function(){}, //提示松开刷新
        "resetRefresh":function(){}, //上滑取消刷新
        "refresh":function(){}, //开始刷新
        "addData":function(){}, //加载更多
        "topHeight":44 //下拉刷新顶部dom高度
    },opt);
    var $tDom = $('<div class="muui-list-pull" id="muui-list-pull"><span class="default"><i class="muui-font">&#xe796;</i> 继续下拉刷新…</span><span class="ready"><i class="muui-font">&#xe795;</i> 松开自动动刷…</span></div>');
    var $loadmore = $('<div class="muui-list-loadmore align-center"><i class="muui-loading-icon"></i> 加载中…</div>');
    $("body").append($tDom);
    if(opt.scrollWrap==window){
        $("body").append($loadmore);
    }else{
        $(opt.scrollWrap).append($loadmore);
    }
    var listWrap = $(this),tDom =$tDom, bDom = $loadmore,scrollWrap= $(opt.scrollWrap),startY = 0,transY= 0,canMove=0,canReset = 0,moveMaxY= 0,turned=0,ids = [];
    if(opt.scrollWrap == window){
        scrollWrap = $(window.document.body);
    }
    listWrap.on(muui.scrollEvent.start,ontouchstart).on(muui.scrollEvent.move,ontouchmove).on(muui.scrollEvent.end,ontouchend);
    $(opt.scrollWrap).on("scroll",onscroll).trigger("scroll");
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
            if(transY >= opt.topHeight-1 && canReset == 0){
                opt.readyRefresh.call(listWrap);
                $tDom.addClass("ready");
                canReset = 1;
            }else if(transY < opt.topHeight-1 && canReset==1){
                canReset = 0;
                $tDom.removeClass("ready");
                opt.resetRefresh.call(listWrap);
            }
            trans(tDom);
        }
    }
    function ontouchend(e){
        setTransition(300);
        if(transY >= opt.topHeight && canMove){
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
        if(bDom[0].getBoundingClientRect().top < wHeight){
            opt.addData.call(listWrap);
        }
        ids = [];
    }
}