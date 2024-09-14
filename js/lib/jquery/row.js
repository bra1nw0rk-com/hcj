/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import HTMLObject from "../html/HTMLObject.js";

$(function () {
    $.fn.extend({
        row: function (options) {
            let defaults = {

            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                let result = $('<div></div>')

                 $(this).each(function (e, i) {
                    let _this = this;
                    let obj = new HTMLObject('div');
                    obj.classes = "row"
                    obj.name = "row"
                    $(_this).append(obj.get());
                    result.append(obj.get())
                    obj.init();
                });
                console.log(result.find(`> *`))
                return result
            }
        },
    });
});