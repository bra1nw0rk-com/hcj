import CloseButton from "../../../html/button/CloseButton.js";

$(function () {
    $.fn.extend({
        closeBoxButton: function (options) {
            let defaults = {
                url: "",
            };

            options = $.extend(defaults, options);
            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;

                    this.obj = new CloseButton();
                    $(this).append(this.obj.object);
                    $("body").on(`click.${this.obj.name}`,`#${this.obj.id}`,function(){
                        console.log($(this).closest(`[box]`)[0])
                        $(this).closest(`[box]`)[0].parameters.close(function(){});
                    })

                    return this;
                });
            }
        },
    });
});