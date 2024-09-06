
/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
$(function () {
    $.fn.extend({
        addClass: function (classNames) {
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    //$(this).addClass(className)
                    let _this = $(this)
                    let classArr = classNames.split(/\s+/);
                    $.each(classArr, function(index, value){
                        if(!_this.hasClass(value)) {
                            _this[0].classList.add(value);
                            _this.trigger('addClass', {
                                class: value
                            })
                        }
                    });
                    return this;
                });
            }
        },
    });
});