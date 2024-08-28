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
                    console.log("ok",`click.${this.obj.id}`,`#${this.obj.id}`)
                    $("body").on(`click.${this.obj.id}`,`#${this.obj.id}`,function(e){
                        e.stopPropagation()
                        $(this).closest(`[box]`)[0].parameters.close(function(){});
                    }).on(`mousedown.${this.obj.id}`,`#${this.obj.id}`,function(e){
                        e.stopPropagation()
                        return false
                    })

                    return this;
                });
            }
        },
    });
});