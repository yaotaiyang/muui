/**
 * Created by yaoxy on 2017/3/24.
 */
$(function(){
    $("body").on("focus",".muui-searchbar .search-input",function(){
        $(this).closest("form").addClass("muui-focus");
    }).on("blur",".muui-searchbar .search-input",function(){
        $(this).closest("form").removeClass("muui-focus");
    });
});