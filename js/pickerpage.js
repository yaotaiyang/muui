/**
 * Created by yaoxy on 2017/3/22.
 * 滑动选择页
 */
muui.pickerpage=function(option){
    var source = '<div class="modal muui-pickerpage fade">\
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
        "backdrop":false,
        "html":"pickerPage 内容",
        "history":true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$wrap = $("<div class='pickerpage-wrap'></div>");$html = $(render(opt));
    $wrap.append(opt.html);
    $html.find(".modal-body").html($wrap);
    $html.mmodal(opt);
    $html.find(".modal-dialog").mscroll();
    return $html;
}
