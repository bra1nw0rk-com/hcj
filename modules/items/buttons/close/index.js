import HTMLObject from "../../../../js/lib/html/HTMLObject.js";

export default class CloseBtn extends HTMLObject  {
	 constructor() {
        super("span");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "close-btn";
        this.template = $(html`<i class="fa fa-times" aria-hidden="true"></i>`);
    }    
}