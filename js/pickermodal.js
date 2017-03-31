/**
 * Created by yaoxy on 2017/3/25.
 *
 */
muui.pickermodal=function(option){
    var source = '<div class="modal muui-picker fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body"></div>\
            </div>\
        </div>\
    </div>';
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        container:"body",
        "html":"<div>传递参数:{html:'这里是要插入的内融通'}</div>",
        "history":true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$wrap = $("<div class='picker-wrap'></div>"),$html = $(render(opt));
    $wrap.append(opt.html);
    $html.find(".modal-body").html($wrap);
    $html.mmodal(opt);
    $html.find(".modal-dialog").scroll();
    return $html;
}