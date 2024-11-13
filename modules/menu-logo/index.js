/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/

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

            })
    }
}