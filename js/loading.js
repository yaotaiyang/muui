/**
 * Created by yaoxy on 2017/3/22.
 */
;muui.loading = function(option){
    var source = '<div class="modal muui-fixed-center muui-loading fade" style="width:{{width}}">\
            <div class="modal-body">\
                <div class="align-center">\
                <i class="muui-loading-icon"></i>\
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