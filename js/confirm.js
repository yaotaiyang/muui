/**
 * Created by yaoxy on 2017/3/23.
 */
muui.confirm=function(option){
    if(typeof option == "string"){
        option = {content:option};
    }
    option = $.extend({
       "title":"确定"
    },option);
    return muui.dialog(option);
}