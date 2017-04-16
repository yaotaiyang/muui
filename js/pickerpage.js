/**
 * Created by yaoxy on 2017/3/22.
 * 滑动选择页
 */
muui.pickerpage=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-page",
        "backdrop":0
    },option);
   return muui.picker(opt);
}
