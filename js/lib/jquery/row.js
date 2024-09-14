/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import HTMLObject from "../html/HTMLObject.js";

$(function () {
    $.fn.extend({
        row: function () {
            if ($(this).length > 0) {
                let result = $('<div></div>')
                 $(this).each(function (e, i) {
                    let obj = new HTMLObject('div');
                    obj.classes = "row"
                    obj.name = "row"
                     console.log($(this).constructor.name)
                    $(this).append(obj.get());
                    result.append(obj.get())
                    obj.init();
                });
                return result.find(`> *`)
            }
        },
    });
});