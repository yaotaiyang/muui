/**
 * Created by yaoxy on 2017/3/17.
 */
(function(){
    window.wuui= window.wuui||{};
    $.guid=function(){//生产guid
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
    var vendors = { Webkit: 'webkit', Moz: '', O: 'o' },eventPrefix="",testEl = document.createElement('div');
    $.each(vendors, function(vendor, event){
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            eventPrefix = event;
        }
    });
    $.support={
        "transition":{"end":eventPrefix+"TransitionEnd"}
    };
})($);