/**
 * Created by yaoxy on 2017/3/22.
 */
;muui.dialog = function(option){
    var source = '<div class="modal muui-dialog muui-fixed-center fade" style="width:{{width}}">\
        <div class="modal-header">\
            <h3>{{title}}</h3>\
        </div>\
            <div class="modal-body">\
                <p>{{content}}</p>\
            </div>\
        <div class="modal-footer">\
        {{each btns as btn key}}\
            <div {{each btn as val kkey}}data-{{kkey}}="{{val}}"{{/each}} class="btn muui-border" data-ac="click-active" {{if btn.close}}data-dismiss="modal"{{/if}}>{{btn.text}}</div>\
        {{/each}}\
        </div>\
    </div>';
    var opt = $.extend({
        "container":"body",
        "width":"80%",
        "title":"提醒",
        "content":"是否确认该操作",
        "btns":[{text:"取消",type:"default",close:"1"},{text:"确定",type:"primary"}],
        "backdrop":"static",
        "history":true//默认hash处理,接管浏览器返回
    },option);
    var render = template.compile(source),$html = $(render(opt));
    $html.mmodal(opt);
    return $html;
};