/**
 * Created by yaoxy on 2017/3/20.
 * 按钮组建底部弹出按钮
 */
;muui.actionsheet = function(option){
    var source = '<ul class="muui-actionsheet-ul">\
                    {{each list as item key}}\
                    <li muui-ac="click-active" {{each item as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="muui-btn muui-border muui-ui-li">{{item.text}}</li>\
                    {{/each}}\
                    </ul>\
                    <ul class="muui-actionsheet-ul">\
                        <li data-dismiss="muui-modal" muui-ac="click-active" class="muui-btn btn-li border-1px">取消</li>\
                    </ul>';
    var opt = $.extend({
        list:[{id:"btn-1",text:'btn1'},{id:"btn-2",text:'btn2'}],
    },option);
    var render = template.compile(source),$html = $(render(opt));
    return muui.pickermodal($html);
};