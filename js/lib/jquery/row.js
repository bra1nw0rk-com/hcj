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
                title:"Test",
                content:"This is test text"
            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;
                    let obj = new HTMLObject('div');
                    obj.classes = "row"
                    obj.content = options.content
                    obj.name = "row"
                    $(_this).append(obj.get());
                    obj.init();
                });
            }
        },
    });
});