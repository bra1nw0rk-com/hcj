
$(function () {
    $.fn.extend({
        addClass: function (classNames) {
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    //$(this).addClass(className)

                    let classArr = classNames.split(/\s+/);
                    $.each(classArr, function(index, value){
                        if(!$(this).hasClass(value)) {
                            console.log($(this)[0].classList)
                            $(this)[0].classList.add(value);

                            $(this).trigger('addClass', {
                                class: value
                            })
                            console.log(`Class ${value} added to`, $(this))
                        }
                    });



                    return this;
                });
            }
        },
    });
});