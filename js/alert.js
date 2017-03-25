/**
 * Created by yaoxy on 2017/3/23.
 */
muui.alert=function(option){
    if(typeof option == "string"){
        option = {content:option};
    }
    option = $.extend({
        "btns":[{text:"确定",type:"default",close:"1"}]
    },option);
    return muui.dialog(option);
}