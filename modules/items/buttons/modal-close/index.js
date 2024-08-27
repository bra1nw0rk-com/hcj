import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class ModalCloseBtn extends HTMLObject  {
	 constructor() {
        super("span");
        let _this = this;
        this.css = "/modules/items/buttons/modal-close/index.css";
        this.name = "modal-close-btn";        
        this.template = $(html`<i class="fa fa-close"></i>`);        
    }    
}