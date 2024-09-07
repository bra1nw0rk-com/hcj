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

                        $(this).on(`mouseover`,function(){
                            if(_this.tooltip !== "") {
                                let posLeft = ((_this.position().left / $(window).width()) * 100).toFixed(4);
                                let posTop = ((_this.position().top / $(window).height()) * 100).toFixed(4);
                                tooltipObj.object.css({
                                    top:`${posTop}%`,
                                    left:`${posLeft}%`

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