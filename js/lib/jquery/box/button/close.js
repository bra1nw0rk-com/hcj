import CloseButton from "../../../html/button/CloseButton.js";

$(function () {
    $.fn.extend({
        closeBoxButton: function (options) {
            let defaults = {
                url: "",
            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let obj = new CloseButton();
                    $(this).append(obj.object);
                    return this;
                });
            }
        },
    });
});