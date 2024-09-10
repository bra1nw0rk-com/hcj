/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

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
                            if(obj!== null) {
                                $(_this).append(obj.get());
                                obj.prepare()
                            }
                        })
                    }else{
                        let create= true;
                        let obj = new Box(options.unique);
                        obj.title = options.title;
                        obj.classes = "modal hidden";
                        obj.name = "consoleModal"
                        obj.content = options.content;
                        obj.button.close();
                        obj.button.minimize();
                        obj.draggable = true;
                        obj.resizable = true;
                        //obj.toFront()

                        if(options.type==="info"){
                            obj.icon.info();
                        }else if(options.type==="error"){
                            obj.icon.error();
                        }
                        if(options.unique){
                            if($(this).find(`${obj.selector}`).length > 0){
                                create = false;
                            }
                        }
                        if(create) {
                            $(_this).append(obj.get());
                            obj.prepare();
                        }
                    }
                    return this;
                });
            }
        },
    });
});