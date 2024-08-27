import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class CloseBtn extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "page-login";        
        this.template = $(html`<i class="fa fa-close" class="btn-close"></i>`);        
    }    
}