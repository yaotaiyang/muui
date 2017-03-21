/**
 * Created by yaoxy on 2017/3/20.
 * 按钮组建底部弹出按钮
 */
$(window).on("pageshow",function(e){
    if(window.performance&&window.performance.navigation&&window.performance.navigation.type==1){ //刷新
        if($.Hash.hasHash(/wuuimodal.+/)){//如果存在以前actionsheet的hash,都去掉
            var resObj = $.Hash.removeHash(/wuuimodal.+/,location.href);
            if(resObj.dels && resObj.dels.length){
                history.go(-resObj.dels.length);//历史回退
            }
        }
    }
});
;$.actionsheet = function(option){
    var source = '<div class="modal wuui-actionsheet fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                    <ul class="wuui-actionsheet-ul">\
                    \{{each list as item key}}\
                    <li data-ac="active" {{each item as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="wuui-border-1px wuui-ui-li">{{item.text}}</li>\
                    {{/each}}\
                    </ul>\
                    <ul class="wuui-actionsheet-ul">\
                        <li data-dismiss="modal" data-ac="active" class="btn-li border-1px">取消</li>\
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
    var guid= $.guid(),modal_id = "wuuimodal-"+guid, render = template.compile(source),$html = $(render({list:opt.list}));
    $(opt.container).append($html);
    $html.data("guid", guid);
    if(opt.history){
        $.Hash.setHash(modal_id,1);
    }
    $html.modal();
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
    });
    return $html;
};