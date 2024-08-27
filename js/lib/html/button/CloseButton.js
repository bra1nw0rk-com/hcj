import HTMLObject from "../HTMLObject.js";

export default class CloseButton extends HTMLObject  {
	 constructor() {
        super("i");
        let _this = this;
        this.css = "/modules/items/buttons/close/index.css";
        this.name = "close-btn";
        this.classes = "fa fa-times button";
        this.object.attr("aria-hidden","true")
    }
    init() {
            super.init();
        $("body").on(`click.${this.name}`,`${this.selector}`,function(){
            console.log($(this).closest(`[box]`));
        })
    }
}