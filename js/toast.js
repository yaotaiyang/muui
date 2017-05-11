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