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
    //if($html.data("modal")){
        $html.modal('hide');
    //}
};
$.fn.mmodal = function(option){
    var $html = $(this),guid= $.guid(),modal_id = "muuimodal-"+guid;
    var opt = $.extend({
        history:true,
        container:"body"
    },option);
    $(opt.container).append($html);
    $html.data("guid", guid);
    if(opt.history){
        muui.hash.setHash(modal_id,1);
    }
    $html.modal(opt);
    $(window).on("hashchange",function(e){
        if(!opt.history) return;
        var newUrl = e.newURL,oldUrl = e.oldURL;
        if(newUrl && oldUrl && muui.hash.getHashObj(oldUrl)[modal_id]==1&&muui.hash.getHashObj(newUrl)[modal_id]==undefined){//老地址有hash,新地址没有hash,表示返回了
            $html.data('hide-type','navigate-back').modal('hide');
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