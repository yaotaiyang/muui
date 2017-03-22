/**
 * Created by yaoxy on 2017/3/22.
 */
;wuui.toast = function(option){
    var source = '<div class="modal wuui-fixed-center wuui-toast fade" style="width:{{width}}">\
            <div class="modal-body">\
                <p>{{text}}</p>\
            </div>\
    </div>';
    if(typeof option =="string"){//如果是字符串
        option = {text:option};
    }
    var opt = $.extend({
        "container":"body",
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
            $html.modal("hide");
        },opt.time);
    }
    return $html;
};