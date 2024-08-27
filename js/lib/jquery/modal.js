import Module from "../core/Module.js";
import Box from "../html/Box.js";

$(function () {
    $.fn.extend({
        modal: function (options) {
            let defaults = {
                unique: false,
                module:"",
                type:"info",
                title:"Test",
                content:"This is test text"
            };
            options = $.extend(defaults, options);

            if ($(this).length > 0) {
                return $(this).each(function (e, i) {
                    let _this = this;
                    if(options.module !== "") {
                        Module.call(options.module).then(function (obj) {
                            $(_this).append(obj.get());
                        })
                    }else{
                        let obj = new Box(options.unique);
                        obj.title = options.title;
                        obj.classes = "modal hidden";
                        obj.name ="consoleModal"
                        obj.content = options.content;
                        obj.button.close();
                        $(_this).append(obj.get());
                    }
                    return this;
                });
            }
        },
    });
});