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
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试<br>\
                   单页滑动测试1<br>\
                   单页滑动测试2<br>\
                   单页滑动测试3<br>\
                   单页滑动测试4<br>\
                   单页滑动测试5<br>\
                   单页滑动测试6<br>\
                </div>\
            </div>\
        </div>\
    </div>';
    var opt = $.extend({
        container:"body",
        "backdrop":false,
        history:true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render({list:opt.list}));
    $html.mmodal(opt);
    return $html;
}
