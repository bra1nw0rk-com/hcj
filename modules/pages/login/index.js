import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class PageLogin extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/pages/login/index.css";
        this.name = "page-login";        
        this.template = $(html`            
          <div data-module="animations/logo"></div>
          <div name="title">BW<span class="selected">OS</span></div>
          <div data-module="forms/login-form"></div>               
		`);
        $("body").html("").append(this.get());
        this.init();
    }
    init() {
       
    }
}