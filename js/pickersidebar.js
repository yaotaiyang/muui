/**
 * Created by yaoxy on 2017/4/16.
 */
muui.pickersidebar=function(option){
    if(typeof option == "string" || $.zepto.isZ(option)){
        option = {html:option}
    }
    var opt = $.extend({
        classname:"muui-picker-sidebar",
        position:"left",
        beforerender:function(){
            $(this).addClass("position-"+opt.position);
        }
    },option);
    return muui.picker(opt);
}