/**
 * Created by yaoxy on 2017/3/20.
 */
$(function(){
    var idarr = [], arr_acdom = [];
    $("body").delegate("*[muui-ac]", "touchstart", function (e) {
        var me = $(this), klass = me.attr("muui-ac");
        idarr.push(setTimeout(function () {
            me.addClass(klass);
            arr_acdom.push(me);
            me.trigger("click-active")
        }, 80));
        setTimeout(function () {
            me.removeClass(klass)
        }, 300);
    });
    $("body").on("touchmove touchend", function () {
        cleardd();
        setTimeout(function () {
            for (var i = 0; i < arr_acdom.length; i++) {
                arr_acdom[i].removeClass(arr_acdom[i].attr("muui-ac"));
            }
            arr_acdom = [];
        }, 300);
    });
    $("body").delegate("*[muui-ac]", "tap", function (e) {
        var me = $(this), klass = me.attr("muui-ac");
        me.addClass(klass);
        me.trigger("click-active");
        setTimeout(function () {
            me.removeClass(klass)
        }, 300);
    });
    function cleardd() {
        for (var i = 0; i < idarr.length; i++) {
            clearTimeout(idarr[i]);
        }
        idarr = [];
    }
});