/**
 * Created by yaoxy on 2017/3/20.
 * 按钮组建底部弹出按钮
 */
;muui.actionsheet = function(option){
    var source = '<div class="modal muui-actionsheet fade">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                    <ul class="muui-actionsheet-ul">\
                    \{{each list as item key}}\
                    <li data-ac="click-active" {{each item as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="muui-border muui-ui-li">{{item.text}}</li>\
                    {{/each}}\
                    </ul>\
                    <ul class="muui-actionsheet-ul">\
                        <li data-dismiss="modal" data-ac="click-active" class="btn-li border-1px">取消</li>\
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
    var render = template.compile(source),$html = $(render({list:opt.list}));
    $html.mmodal(opt);
    return $html;
};