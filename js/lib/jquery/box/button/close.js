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
                    /*
                    this.refresh = () => {
                        this.obj.load(1);
                    };
                    this.update = () => {
                        this.obj.start();
                        this.refresh();
                        this.obj.loadCount();
                    };

                    this.update();
                    */
                    return this;
                });
            }
        },
    });
});