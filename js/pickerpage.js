/**
 * Created by yaoxy on 2017/3/22.
 * 滑动选择页
 */
wuui.pickerpage=function(option){
    var opt = $.extend({},option);
    var source = '<div class="modal wuui-pickerpage fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                   {{#html}}\
                </div>\
            </div>\
        </div>\
    </div>';
    var opt = $.extend({
        container:"body",
        "backdrop":false,
        "html":"pickerPage 内容",
        "history":true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    $html.find(".modal-dialog").scroll();
    return $html;
}
