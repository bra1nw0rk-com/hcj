import Module from "../core/Module.js";

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
                        $(_this).append(obj.get());
                    })
                    return this;
                });
            }
        },
    });
});