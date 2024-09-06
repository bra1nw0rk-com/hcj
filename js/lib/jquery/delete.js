/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
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