/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

import HTMLObject from "../html/HTMLObject.js";

$(function () {
    $.fn.extend({
        group: function (options) {
            let defaults = {
                title:"Test",
                content:"This is test text"
            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    console.log($(this))
                    let _this = this;
                    let obj = new HTMLObject('div');
                    obj.object.attr('data-before',options.title)
                    obj.title = options.title;
                    obj.name = "group"
                    obj.content = options.content;

                    $(_this).append(obj.get());
                    obj.init();

                    return this;
                });
            }
        },
    });
});