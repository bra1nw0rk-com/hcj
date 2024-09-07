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
                        let _this = $(this)


                        let tooltipObj = new HTMLObject('div')
                        tooltipObj.name ="tooltip-box"
                        tooltipObj.html = options.html

                        $(this).on(`mouseover`,function(e){
                            if(_this.tooltip !== "") {
                                tooltipObj.object.css({
                                    left:`calc(${e.pageX}px)`,
                                    top:`calc(${e.pageY}px - 20px)`

                                })
                                $(`body`).append(tooltipObj.get())
                            }
                        }).on(`mouseout`,function(){
                            if(_this.tooltip !== "") {
                                tooltipObj.object.remove()
                            }
                        })
                    }

                    return this;
                });
            }
        },
    });
});