
$(function () {
    $.fn.extend({
        removeClass: function (classNames) {
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    //$(this).addClass(className)
                    let _this = $(this)
                    let classArr = classNames.split(/\s+/);
                    $.each(classArr, function(index, value){
                        if(_this.hasClass(value)) {
                            _this[0].classList.remove(value);
                            _this.trigger('removeClass', {
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