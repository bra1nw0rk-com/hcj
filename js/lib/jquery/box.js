import CloseButton from "../../../html/button/CloseButton.js";

$(function () {
    $.fn.extend({
        box: function (options) {
            let defaults = {
                url: "",
            };

            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;

                    this.obj = new CloseButton();
                    $(this).append(this.obj.object);
                    $("body").on(`click.${this.obj.name}`,`${this.obj.selector}`,function(){
                        console.log($(this).closest(`[box]`));
                    })

                    return this;
                });
            }
        },
    });
});