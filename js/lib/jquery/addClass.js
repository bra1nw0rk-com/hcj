
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
                            console.log(_this[0].classList)
                            _this[0].classList.add(value);

                            _this.trigger('addClass', {
                                class: value
                            })
                            console.log(`Class ${value} added to`, _this)
                        }
                    });



                    return this;
                });
            }
        },
    });
});