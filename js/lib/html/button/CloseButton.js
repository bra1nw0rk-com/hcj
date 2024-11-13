/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../HTMLObject.js";

export default class CloseButton extends HTMLObject  {
	 constructor() {
        super("i");
        this.css = "/css/html/button/close.css";
        this.name = "close-btn";
        this.classes = "fa fa-times button";
        this.object.attr("aria-hidden","true")
    }
    init() {
        super.init();
        $(this.object).on(`click`,function(e){
            $(this).closest(`[box]`)[0].parameters.close(function(){});
        }).on(`mousedown`,function(e){
            e.stopPropagation()
        })
    }
}