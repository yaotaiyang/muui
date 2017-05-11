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