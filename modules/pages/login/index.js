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
          <div data-module="forms/login-form"></div>               
		`);
        $("body").append(this.get());
    }    
}