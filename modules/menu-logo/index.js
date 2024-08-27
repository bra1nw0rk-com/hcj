import HTMLObject from "../../js/lib/html/HTMLObject.js";

export default class MenuLogo extends HTMLObject  {
    constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/menu-logo/index.css";
        this.name = "menu-logo";
    }
    init() {
        $("body")
            .off(`.${this.name}`)
            .on(`click.${this.name}`,`${this.selector}`,function(){
                $(`#content`).modal({module:"about"});
                /*Module.call("about").then((content) => {

                });
                */

            })
    }
}