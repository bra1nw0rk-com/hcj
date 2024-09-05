
$(function () {
    $.fn.extend({
        addClass: function (className) {
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    $(this).addClass(className)
                    $(this).trigger('addClass',{
                        class: className
                    })
                    console.log(`Class ${className} added to`,$(this))
                    return this;
                });
            }
        },
    });
});