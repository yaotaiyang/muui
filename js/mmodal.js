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