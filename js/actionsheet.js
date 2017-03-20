/**
 * Created by yaoxy on 2017/3/20.
 * 按钮组建底部弹出按钮
 */
;$.actionsheet = function(option){
    var source = '<div class="modal wuui-actionsheet fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                    <ul class="wuui-actionsheet-ul">\
                    \{{each list as item key}}\
                    <li data-ac="active" data-type="{{item.type}}" class="wuui-border-1px wuui-ui-li">{{item.text}}</li>\
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
    var guid= $.guid(), render = template.compile(source),$html = $(render({list:opt.list}));
    $(opt.container).append($html);
    $html.data("guid", guid);
    $html.modal();
    return $html;
};