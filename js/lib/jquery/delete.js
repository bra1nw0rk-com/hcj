
$(function () {
    $.fn.extend({
        delete: function (options) {
            let defaults = {

            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    $(this).animate(
                        {
                            opacity: 0,
                        },
                        500,
                        function () {
                            $(this).remove();
                        }
                    );
                    return this;
                });
            }
        },
    });
});