import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class CloseBtn extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "page-login";        
        this.template = $(html`            
          <div data-module="animations/logo"></div>
          <div name="title">Libre<span class="selected">IS</span></div>
          <div data-module="forms/login-form"></div>               
		`);
        $("body").html("").append(this.get());
    }    
}