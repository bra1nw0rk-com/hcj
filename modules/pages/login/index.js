/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import HTMLObject from "../../../js/lib/html/HTMLObject.js";
export default class PageLogin extends HTMLObject  {
	 constructor() {
        super("div");
        let _this = this;
        this.css = "/modules/pages/login/index.css";
        this.name = "page-login";        
        this.template = $(html`            
          <div data-module="animations/logo"></div>
          <div name="title">Libre<span class="selected">IS</span></div>
		`);
        //$("body").append(this.get());
    }
    init() {
        super.init();
        let _this = this
        $(document).ready(function(){
            _this.object.modal({module:'forms/login-form'})
        })
        
    }
}