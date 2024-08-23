import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class PageLogin extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/pages/login/index.css";
        this.name = "page-login";        
        this.template = $(html`            
          <div data-module="animation/logo"></div>
          <div data-module="forms/login-form"></div>               
		`);
        this.init();
    }
    init() {
       
    }
}