/**
 * Created by yaoxy on 2017/3/25.
 *
 */
muui.pickermodal=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-modal"
    },option);
    return muui.picker(opt);
}