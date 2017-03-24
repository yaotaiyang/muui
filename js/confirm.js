/**
 * Created by yaoxy on 2017/3/23.
 */
wuui.confirm=function(option){
    if(typeof option == "string"){
        option = {content:option};
    }
    option = $.extend({
       "title":"确定"
    },option);
    wuui.dialog(option);
}