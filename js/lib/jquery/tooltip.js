/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../html/HTMLObject.js";

$(function () {
    $.fn.extend({
        tooltip: function (options) {
            let defaults = {
                html:""
            };
            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    if($(this)[0].parameters.tooltip !==""){
                        let tooltipObj = new HTMLObject('div')
                        tooltipObj.html = options.html
                    }
                    return this;
                });
            }
        },
    });
});