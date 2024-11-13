/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../HTMLObject.js";

export default class MinimizeButton extends HTMLObject  {
	 constructor() {
        super("i");
        this.css = "/css/html/button/minimize.css";
        this.name = "minimize-btn";
        this.classes = "fa fa-window-minimize button";
        this.object.attr("aria-hidden","true")
    }
    init() {
        super.init();
        $(this.object).on(`click`,function(e){
            $(this).closest(`[box]`)[0].parameters.minimize(function(){});
        }).on(`mousedown`,function(e){
            e.stopPropagation()
        })
    }
}