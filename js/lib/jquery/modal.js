import Box from "../html/Box.js";
import Module from "../core/Module";

$(function () {
    $.fn.extend({
        modal: function (options) {
            let defaults = {
                unique: false,
                module:""
            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;
                    Module.call(options.module).then(function(obj){
                        $(this).append(obj.get());
                    })
                    return this;
                });
            }
        },
    });
});