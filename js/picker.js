/**
 * Created by yaoxy on 2017/4/16.
 */
muui.picker=function(option){
    var opt = $.extend({
        container:"body",
        html:"<div>html参数</div>",
        beforerender:function(){},
        history:true//默认hash处理,接管浏览器返回
    },option);
    var source = '<div class="modal fade {{classname}}">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body"></div>\
            </div>\
        </div>\
    </div>';
    var render = template.compile(source),$wrap = $("<div class='picker-wrap'></div>"),$html = $(render(opt));
    opt.beforerender.call($html);
    $wrap.append(opt.html);
    $html.find(".modal-body").html($wrap);
    $html.on("shown",function(){
        $html.find(".modal-dialog").mscroll();
    });
    $html.mmodal(opt);
    return $html;
}