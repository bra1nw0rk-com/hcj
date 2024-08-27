import Box from "../../html/Box.js";

$(function () {
    $.fn.extend({
        about: function (options) {
            let defaults = {
                url: "",
            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;

                    this.obj = new Box();
                    this.obj.css = "/modules/about/index.css";
                    this.obj.title = "About";
                    this.obj.classes = "modal hidden";
                    this.obj.name ="aboutModal"
                    this.obj.button.close();
                    this.obj.content = `
                        <div class="strong">Libre<span class="selected">IS</span> - Libre Information System.</div>
                        <br>
                        <div>OS: Linux</div>
                        <div>Backend: Java</div>
                        <div>Frontend: JavaScript, JQuery, HTML, CSS</div>			
                    `;
                    if($(this).find(this.obj.object).length === 0) {
                        $(this).append(this.obj.object);
                    }

                    return this;
                });
            }
        },
    });
});