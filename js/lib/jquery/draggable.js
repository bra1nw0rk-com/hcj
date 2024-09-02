
$(function () {
    $.fn.extend({
        draggable: function (options) {
            let defaults = {

            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    $(this)[0].movePosition={
                        x:null,
                        y:null
                    }

                    console.log("ok")

                    return this;
                });
            }
        },
    });
});